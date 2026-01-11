"use client";

import { VoiceType, VoiceStyle } from "@/app/create/page";

interface VoiceSelectorProps {
  voiceType: VoiceType;
  voiceStyle: VoiceStyle;
  onVoiceTypeChange: (type: VoiceType) => void;
  onVoiceStyleChange: (style: VoiceStyle) => void;
}

export default function VoiceSelector({
  voiceType,
  voiceStyle,
  onVoiceTypeChange,
  onVoiceStyleChange,
}: VoiceSelectorProps) {
  const voiceStyles: { value: VoiceStyle; label: string; desc: string }[] = [
    { value: "professional", label: "专业", desc: "适合新闻、教育类内容" },
    { value: "casual", label: "轻松", desc: "适合日常聊天、娱乐内容" },
    { value: "warm", label: "温暖", desc: "适合情感、故事类内容" },
    { value: "energetic", label: "活力", desc: "适合运动、激励类内容" },
  ];

  return (
    <div className="space-y-6">
      {/* 单人/双人选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          播客形式
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onVoiceTypeChange("single")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              voiceType === "single"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            单人独白
          </button>
          <button
            type="button"
            onClick={() => onVoiceTypeChange("dual")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              voiceType === "dual"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            双人对话
          </button>
        </div>
      </div>

      {/* 音色风格选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          音色风格
        </label>
        <div className="grid grid-cols-2 gap-3">
          {voiceStyles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => onVoiceStyleChange(style.value)}
              className={`px-4 py-3 rounded-lg text-left transition-colors ${
                voiceStyle === style.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="font-medium">{style.label}</div>
              <div className={`text-xs mt-1 ${
                voiceStyle === style.value ? "text-blue-100" : "text-gray-500"
              }`}>
                {style.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}



