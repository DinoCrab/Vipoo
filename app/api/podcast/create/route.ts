import { NextRequest, NextResponse } from "next/server";

// 模拟数据存储（实际应该使用数据库）
const podcasts: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, topic, content, inputType, voiceType, voiceStyle } = body;

    // 生成播客ID
    const podcastId = `podcast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // TODO: 调用豆包API生成脚本
    // 这里先用模拟数据
    const script = await generateScript(type, { topic, content, inputType, voiceType });
    
    // 将脚本分段（段落级）
    const segments = splitIntoSegments(script);

    // TODO: 调用TTS API为每个段落生成音频
    // 这里先用模拟数据
    const segmentsWithAudio = await generateAudioForSegments(segments, voiceType, voiceStyle);

    // 保存播客数据
    podcasts[podcastId] = {
      id: podcastId,
      type,
      script,
      segments: segmentsWithAudio,
      voiceType,
      voiceStyle,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      podcastId,
      segments: segmentsWithAudio,
    });
  } catch (error) {
    console.error("创建播客失败:", error);
    return NextResponse.json(
      { error: "创建播客失败" },
      { status: 500 }
    );
  }
}

// 生成脚本（模拟豆包API）
async function generateScript(
  type: string,
  params: any
): Promise<string> {
  // TODO: 实际调用豆包API
  // 这里返回模拟脚本
  if (type === "topic") {
    return `欢迎收听本期播客。今天我们要聊的话题是：${params.topic}。

这个话题在当下非常值得关注。让我们从几个角度来分析一下。

首先，我们需要理解这个问题的本质。它涉及到多个层面的思考。

其次，我们可以看看实际案例。很多成功的例子都说明了这一点。

最后，我想说的是，这个问题没有标准答案，每个人都可以有自己的理解。

感谢大家的收听，我们下期再见。`;
  } else {
    // 基于内容生成
    return `欢迎收听本期播客。今天我们要分享的内容来自${params.inputType === "link" ? "一篇文章" : "一段文本"}。

${params.content.substring(0, 200)}...

让我们深入探讨一下这些内容。

首先，我们需要理解这些信息的核心要点。

其次，我们可以从不同角度来分析。

最后，我想总结一下今天的内容。

感谢大家的收听。`;
  }
}

// 将脚本分段
function splitIntoSegments(script: string): Array<{ id: string; text: string }> {
  // 按段落分割（双换行）
  const paragraphs = script.split(/\n\n+/).filter(p => p.trim());
  
  return paragraphs.map((text, index) => ({
    id: `segment_${index + 1}`,
    text: text.trim(),
  }));
}

// 为段落生成音频（模拟TTS）
async function generateAudioForSegments(
  segments: Array<{ id: string; text: string }>,
  voiceType: string,
  voiceStyle: string
): Promise<Array<{ id: string; text: string; audioUrl: string; duration: number; needsRegenerate?: boolean }>> {
  // TODO: 实际调用TTS API（豆包或其他）
  // 这里返回模拟数据，每个段落有对应的音频URL
  return segments.map((segment, index) => ({
    ...segment,
    audioUrl: `/api/audio/mock/${segment.id}.mp3`, // 模拟音频URL
    duration: segment.text.length * 0.1, // 模拟时长（按字符数估算）
    needsRegenerate: false,
  }));
}

// GET 播客数据
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const podcastId = searchParams.get("id");

  if (!podcastId || !podcasts[podcastId]) {
    return NextResponse.json(
      { error: "播客不存在" },
      { status: 404 }
    );
  }

  return NextResponse.json(podcasts[podcastId]);
}

