# Vipoo 前端开发思路与架构规划

## 一、技术选型建议

### 核心框架
- **React + TypeScript** - 类型安全，组件化开发
- **Next.js 14+** (App Router) - 服务端渲染，SEO友好，路由管理
- **Tailwind CSS** - 快速样式开发
- **Zustand / Jotai** - 轻量级状态管理（播客编辑状态）

### UI 组件库
- **shadcn/ui** - 基于 Radix UI，可定制性强
- **Framer Motion** - 动画效果

### 音频处理
- **WaveSurfer.js** - 音频波形可视化
- **Howler.js** - 音频播放控制
- **Web Audio API** - 音频处理（如需要）

### 文本编辑
- **Lexical** (Meta) 或 **TipTap** - 富文本编辑器（支持时间戳标记）

### 数据管理
- **React Query / TanStack Query** - 服务端状态管理、缓存
- **Zod** - 数据验证

---

## 二、页面结构规划

```
app/
├── (marketing)/              # 营销页面组
│   ├── page.tsx             # 首页/展示页
│   └── layout.tsx
│
├── (workspace)/              # 工作区页面组
│   ├── create/              # 创作入口
│   │   ├── page.tsx         # 选择创作方式
│   │   ├── from-topic/      # 主题生成
│   │   ├── from-text/       # 文本生成
│   │   └── from-link/       # 链接生成
│   │
│   ├── editor/              # 播客编辑页（核心）
│   │   ├── [id]/
│   │   │   └── page.tsx     # 编辑页面
│   │   └── components/      # 编辑器组件
│   │
│   └── export/              # 导出页
│       ├── [id]/
│       │   └── page.tsx
│
└── api/                      # API 路由（如果需要）
```

---

## 三、核心功能模块设计

### 1. 首页/展示页 (`/`)
**功能：**
- 产品介绍
- 核心价值展示
- 快速开始入口

**组件：**
- Hero Section
- Feature Showcase
- CTA Button

---

### 2. 创作入口页 (`/create`)
**功能：**
- 选择创作方式（卡片选择）
  - 主题/提示词生成
  - 文本生成
  - 链接生成

**组件：**
- CreationMethodSelector
- MethodCard (3个)

---

### 3. 播客编辑页 (`/editor/[id]`) - **核心页面**
**功能：**
- 文本编辑器（左侧/上方）
  - 支持时间戳标记
  - 段落编辑
  - 文本高亮
- 音频播放器（右侧/下方）
  - 波形可视化
  - 播放控制
  - 时间轴同步
- 文本-音频映射
  - 点击文本 → 跳转音频位置
  - 编辑文本 → 标记需要重新生成
- 工具栏
  - 保存
  - 预览
  - 音质增强
  - 导出

**核心组件：**
```
EditorPage
├── EditorLayout
│   ├── TextEditor (左侧)
│   │   ├── TimestampMarker
│   │   ├── ParagraphEditor
│   │   └── TextHighlight
│   │
│   ├── AudioPlayer (右侧)
│   │   ├── WaveformVisualizer
│   │   ├── PlaybackControls
│   │   └── TimelineSync
│   │
│   └── Toolbar
│       ├── SaveButton
│       ├── PreviewButton
│       ├── EnhanceButton
│       └── ExportButton
```

**状态管理：**
```typescript
interface EditorState {
  podcastId: string
  text: string              // 完整文本
  audioUrl: string          // 音频URL
  segments: Segment[]       // 文本-音频映射段
  currentTime: number       // 当前播放时间
  isPlaying: boolean
  modifiedSegments: string[] // 需要重新生成的段落ID
}

interface Segment {
  id: string
  text: string
  startTime: number
  endTime: number
  audioUrl?: string
}
```

---

### 4. 导出页 (`/export/[id]`)
**功能：**
- 导出选项选择
  - 音频格式（MP3, WAV）
  - 质量设置
- 导出进度
- 下载链接

**组件：**
- ExportOptions
- ExportProgress
- DownloadButton

---

## 四、数据流设计

### 创建流程
```
用户输入（主题/文本/链接）
  ↓
POST /api/podcast/create
  ↓
返回：{ podcastId, text, audioUrl, segments }
  ↓
跳转到 /editor/[id]
```

### 编辑流程
```
用户编辑文本
  ↓
标记修改的段落
  ↓
POST /api/podcast/[id]/regenerate-segment
  ↓
更新 segments 和 audioUrl
  ↓
刷新音频播放器
```

### 导出流程
```
用户点击导出
  ↓
POST /api/podcast/[id]/export
  ↓
返回导出任务ID
  ↓
轮询导出状态
  ↓
完成后显示下载链接
```

---

## 五、关键技术实现点

### 1. 文本-音频同步
- 使用 `segments` 数组存储每个段落的时间范围
- 点击文本时，找到对应 segment，跳转到 `startTime`
- 播放音频时，根据当前时间高亮对应文本

### 2. 文本编辑器增强
- 使用 Lexical/TipTap 的自定义节点支持时间戳
- 时间戳格式：`[00:12:34]` 或 `<timestamp>12.34</timestamp>`
- 支持拖拽调整段落顺序

### 3. 音频波形可视化
- WaveSurfer.js 显示波形
- 在波形上标记段落边界
- 支持缩放、拖拽

### 4. 实时预览
- 编辑文本时，实时更新预览
- 修改段落后，标记为"待重新生成"
- 批量重新生成修改的段落

---

## 六、开发优先级

### Phase 1: 基础架构
1. ✅ 项目初始化（Next.js + TypeScript + Tailwind）
2. ✅ 路由结构搭建
3. ✅ 基础组件库集成（shadcn/ui）
4. ✅ 状态管理设置

### Phase 2: 核心页面
1. ✅ 首页/展示页
2. ✅ 创作入口页
3. ✅ 播客编辑页（基础版）
   - 文本编辑器
   - 音频播放器
   - 基础同步

### Phase 3: 编辑功能
1. ✅ 文本-音频映射
2. ✅ 时间戳标记
3. ✅ 段落编辑
4. ✅ 重新生成功能

### Phase 4: 增强功能
1. ✅ 音质增强
2. ✅ 导出功能
3. ✅ 预览功能

---

## 七、UI/UX 设计原则

1. **简洁清晰** - 突出核心编辑功能
2. **实时反馈** - 编辑操作立即反映
3. **视觉同步** - 文本和音频状态一致
4. **操作流畅** - 减少不必要的步骤

---

## 八、下一步行动

1. 初始化 Next.js 项目
2. 配置 Tailwind CSS 和 shadcn/ui
3. 搭建基础路由结构
4. 创建首页和创作入口页
5. 实现播客编辑页核心功能



