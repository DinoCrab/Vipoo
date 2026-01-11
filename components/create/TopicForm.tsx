"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VoiceType, VoiceStyle } from "@/app/create/page";
import VoiceSelector from "./VoiceSelector";

interface TopicFormProps {
  onBack: () => void;
}

export default function TopicForm({ onBack }: TopicFormProps) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [voiceType, setVoiceType] = useState<VoiceType>("single");
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("professional");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/podcast/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "topic",
          topic: topic.trim(),
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
            主题 / 提示词生成
          </h2>
          <p className="text-gray-600">
            输入你的播客主题或提示词，AI 将为你生成完整的播客内容
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 主题输入 */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              播客主题 / 提示词 *
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：聊聊人工智能对教育行业的影响，或者：制作一期关于创业故事的播客..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              描述你的播客主题、想要讨论的内容或提供详细的提示词
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
              disabled={!topic.trim() || isGenerating}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "生成中..." : "生成播客"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



