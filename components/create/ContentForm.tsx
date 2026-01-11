"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VoiceType, VoiceStyle } from "@/app/create/page";
import VoiceSelector from "./VoiceSelector";

interface ContentFormProps {
  onBack: () => void;
}

type InputType = "text" | "link";

export default function ContentForm({ onBack }: ContentFormProps) {
  const router = useRouter();
  const [inputType, setInputType] = useState<InputType>("text");
  const [content, setContent] = useState("");
  const [voiceType, setVoiceType] = useState<VoiceType>("single");
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("professional");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/podcast/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "content",
          inputType,
          content: content.trim(),
          voiceType,
          voiceStyle,
        }),
      });

      if (!response.ok) throw new Error("生成失败");

      const data = await response.json();
      router.push(`/editor/${data.podcastId}`);
    } catch (error) {
      console.error("生成播客失败:", error);
      alert("生成失败，请重试");
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回选择
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            基于内容生成
          </h2>
          <p className="text-gray-600">
            输入文本内容或文章链接，AI 将其转换为播客格式
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 输入类型选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              输入方式
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setInputType("text")}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  inputType === "text"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                文本内容
              </button>
              <button
                type="button"
                onClick={() => setInputType("link")}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  inputType === "link"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                文章链接
              </button>
            </div>
          </div>

          {/* 内容输入 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              {inputType === "text" ? "文本内容 *" : "文章链接 *"}
            </label>
            {inputType === "text" ? (
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="粘贴你的文本内容..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={8}
                required
              />
            ) : (
              <input
                id="content"
                type="url"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            )}
            <p className="mt-2 text-sm text-gray-500">
              {inputType === "text"
                ? "粘贴你想要转换为播客的文本内容"
                : "输入文章或网页链接，AI 会自动提取内容"}
            </p>
          </div>

          {/* 音色选择 */}
          <VoiceSelector
            voiceType={voiceType}
            voiceStyle={voiceStyle}
            onVoiceTypeChange={setVoiceType}
            onVoiceStyleChange={setVoiceStyle}
          />

          {/* 提交按钮 */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!content.trim() || isGenerating}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "生成中..." : "生成播客"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



