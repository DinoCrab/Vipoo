"use client";

import { useState } from "react";
import { GenerationMode } from "@/app/workspace/page";

interface InputPanelProps {
  mode: GenerationMode;
  onModeChange: (mode: GenerationMode) => void;
  inputText: string;
  onInputChange: (text: string) => void;
  onGenerate: (text: string) => void;
}

const modeConfig = {
  refine: {
    label: "模式 A: AI润色 (Refine)",
    placeholder: "粘贴已有脚本或大纲，AI将在不改变原意的前提下，优化为更适合播客朗读的表达",
    icon: "✨",
  },
  "word-for-word": {
    label: "模式 B: 逐字生成 (Word-for-Word)",
    placeholder: "粘贴你的最终文本，系统将逐字逐句转为音频，不会做任何修改",
    icon: "📄",
  },
  create: {
    label: "模式 C: AI策划站 (Create)",
    placeholder: "输入一个主题或想法，AI将为你生成一整期播客内容",
    icon: "🚀",
  },
};

export default function InputPanel({
  mode,
  onModeChange,
  inputText,
  onInputChange,
  onGenerate,
}: InputPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    // TODO: 调用API生成脚本
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟生成的脚本
    const generatedScript = `【片头 Intro】
欢迎收听本期播客，今天我们要聊的话题是：${inputText.substring(0, 50)}...

【正文 Segment 1】
${inputText}

【正文 Segment 2】
让我们深入探讨一下这个话题的各个方面。

【片尾 Outro】
感谢大家的收听，我们下期再见。`;

    onGenerate(generatedScript);
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 模式切换标签 */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex">
          {Object.entries(modeConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => onModeChange(key as GenerationMode)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all relative group ${
                mode === key
                  ? "text-purple-600 bg-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">{config.icon}</span>
                <span>{config.label.split(":")[1]?.trim()}</span>
              </div>
              {mode === key && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 rounded-t-lg"></div>
              )}
              {mode !== key && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-purple-600 rounded-t-lg group-hover:w-1/2 transition-all"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {modeConfig[mode].label}
          </h3>
          <p className="text-sm text-gray-500">{modeConfig[mode].placeholder}</p>
        </div>

        <div className="flex-1 flex flex-col">
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={modeConfig[mode].placeholder}
            className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={!inputText.trim() || isGenerating}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  生成中...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  生成播客文稿
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

