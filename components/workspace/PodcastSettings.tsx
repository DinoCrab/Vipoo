"use client";

import { VoiceType, VoiceStyle } from "@/app/workspace/page";

interface PodcastSettingsProps {
  voiceType: VoiceType;
  voiceStyle: VoiceStyle;
  onVoiceTypeChange: (type: VoiceType) => void;
  onVoiceStyleChange: (style: VoiceStyle) => void;
}

export default function PodcastSettings({
  voiceType,
  voiceStyle,
  onVoiceTypeChange,
  onVoiceStyleChange,
}: PodcastSettingsProps) {
  const voiceStyles: { value: VoiceStyle; label: string; desc: string }[] = [
    { value: "professional", label: "专业", desc: "适合新闻、教育类" },
    { value: "casual", label: "轻松", desc: "适合日常聊天" },
    { value: "warm", label: "温暖", desc: "适合情感、故事类" },
    { value: "energetic", label: "活力", desc: "适合运动、激励类" },
  ];

  return (
    <div className="w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">播客设置</h3>

      {/* 播客形式 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          播客形式
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
            <input
              type="radio"
              name="voiceType"
              value="single"
              checked={voiceType === "single"}
              onChange={(e) => onVoiceTypeChange(e.target.value as VoiceType)}
              className="w-5 h-5 text-purple-600 focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-900">单人独白</div>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
            <input
              type="radio"
              name="voiceType"
              value="dual"
              checked={voiceType === "dual"}
              onChange={(e) => onVoiceTypeChange(e.target.value as VoiceType)}
              className="w-5 h-5 text-purple-600 focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-900">双人对谈</div>
              <div className="text-sm text-gray-500">Host / Guest</div>
            </div>
          </label>
        </div>
      </div>

      {/* 音色选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          音色选择
        </label>
        <div className="grid grid-cols-2 gap-2">
          {voiceStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => onVoiceStyleChange(style.value)}
              className={`p-3 rounded-lg text-left transition-all border-2 ${
                voiceStyle === style.value
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-medium text-gray-900">{style.label}</div>
              <div className="text-xs text-gray-500 mt-1">{style.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

