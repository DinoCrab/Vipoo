# 音频处理实现指南

## 概述

Vipoo 需要实现音频拼接和格式转换功能，将多个段落级音频文件合并成一个完整的播客文件。

## 技术方案

### 方案 1: FFmpeg (推荐 - 服务端)

使用 Node.js 的 `fluent-ffmpeg` 库在服务端处理音频。

#### 安装依赖

```bash
npm install fluent-ffmpeg @ffmpeg-installer/ffmpeg
```

#### 实现示例

```typescript
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { promises as fs } from 'fs';
import path from 'path';

// 设置 FFmpeg 路径
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

async function concatenateAudioSegments(
  segmentUrls: string[],
  outputPath: string,
  format: 'mp3' | 'wav'
): Promise<void> {
  // 方法 1: 使用 concat demuxer (推荐)
  const concatFile = path.join(__dirname, 'concat.txt');
  const concatContent = segmentUrls
    .map(url => `file '${url}'`)
    .join('\n');
  
  await fs.writeFile(concatFile, concatContent);

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(concatFile)
      .inputOptions(['-f', 'concat', '-safe', '0'])
      .audioCodec(format === 'mp3' ? 'libmp3lame' : 'pcm_s16le')
      .audioBitrate(format === 'mp3' ? '192k' : undefined)
      .output(outputPath)
      .on('end', () => {
        fs.unlink(concatFile).catch(console.error);
        resolve();
      })
      .on('error', (err) => {
        fs.unlink(concatFile).catch(console.error);
        reject(err);
      })
      .run();
  });
}

// 使用示例
const segments = [
  '/path/to/segment1.mp3',
  '/path/to/segment2.mp3',
  '/path/to/segment3.mp3',
];

await concatenateAudioSegments(segments, 'output.mp3', 'mp3');
```

### 方案 2: Web Audio API (浏览器端)

适用于小文件，有浏览器限制。

```typescript
async function concatenateAudioInBrowser(
  audioUrls: string[],
  format: 'mp3' | 'wav'
): Promise<Blob> {
  const audioContext = new AudioContext();
  const audioBuffers = await Promise.all(
    audioUrls.map(async (url) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return audioContext.decodeAudioData(arrayBuffer);
    })
  );

  // 计算总长度
  const totalLength = audioBuffers.reduce(
    (sum, buffer) => sum + buffer.length,
    0
  );

  // 创建新的 AudioBuffer
  const mergedBuffer = audioContext.createBuffer(
    audioBuffers[0].numberOfChannels,
    totalLength,
    audioBuffers[0].sampleRate
  );

  // 复制数据
  let offset = 0;
  for (const buffer of audioBuffers) {
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      mergedBuffer
        .getChannelData(channel)
        .set(buffer.getChannelData(channel), offset);
    }
    offset += buffer.length;
  }

  // 转换为 Blob
  return new Promise((resolve) => {
    mergedBufferToWav(mergedBuffer, (blob) => {
      if (format === 'mp3') {
        // 需要额外的 MP3 编码库
        convertWavToMp3(blob).then(resolve);
      } else {
        resolve(blob);
      }
    });
  });
}
```

### 方案 3: 第三方服务

使用云服务处理音频：

- **Cloudinary**: 提供音频转换和拼接 API
- **AWS MediaConvert**: AWS 的媒体处理服务
- **AssemblyAI**: 提供音频处理 API

## 音频增强实现

### 使用 Web Audio API

```typescript
async function enhanceAudio(
  audioBuffer: AudioBuffer,
  options: {
    denoise?: boolean;
    volumeBalance?: boolean;
    clarity?: boolean;
  }
): Promise<AudioBuffer> {
  const audioContext = new AudioContext();
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  // 创建处理节点
  const gainNode = audioContext.createGain();
  const compressor = audioContext.createDynamicsCompressor();
  const filter = audioContext.createBiquadFilter();

  // 去噪（高通滤波器）
  if (options.denoise) {
    filter.type = 'highpass';
    filter.frequency.value = 80; // 过滤低频噪音
  }

  // 音量平衡（压缩器）
  if (options.volumeBalance) {
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 12;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;
  }

  // 清晰度增强（EQ）
  if (options.clarity) {
    const eq = audioContext.createBiquadFilter();
    eq.type = 'peaking';
    eq.frequency.value = 3000; // 提升中高频
    eq.gain.value = 3;
    eq.Q.value = 1;
  }

  // 连接节点
  source.connect(filter);
  filter.connect(compressor);
  compressor.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // 处理并返回
  // 注意：实际实现需要使用 OfflineAudioContext
  return audioBuffer;
}
```

### 使用第三方 API

推荐使用 AssemblyAI 或其他专业音频处理服务：

```typescript
import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });

async function enhanceAudioWithAPI(
  audioUrl: string,
  options: EnhanceOptions
): Promise<string> {
  // 上传音频
  const uploadUrl = await client.files.upload(audioUrl);

  // 应用增强
  const enhancedUrl = await client.audio.enhance(uploadUrl, {
    denoise: options.denoise,
    normalize: options.volumeBalance,
    enhanceClarity: options.clarity,
  });

  return enhancedUrl;
}
```

## 文件存储

### 本地存储（开发环境）

```typescript
import { promises as fs } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'audio');

async function saveAudioFile(
  buffer: Buffer,
  filename: string
): Promise<string> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filePath, buffer);
  return `/audio/${filename}`;
}
```

### 云存储（生产环境）

推荐使用 AWS S3、Cloudinary 或类似服务：

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

async function uploadToS3(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: `audio/${filename}`,
    Body: buffer,
    ContentType: 'audio/mpeg',
  });

  await s3Client.send(command);
  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/audio/${filename}`;
}
```

## 下一步

1. 选择技术方案（推荐 FFmpeg）
2. 安装必要的依赖
3. 实现音频拼接功能
4. 实现格式转换（MP3/WAV）
5. 集成到导出 API 中
6. 添加错误处理和进度跟踪



