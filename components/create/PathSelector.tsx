"use client";

import { CreationPath } from "@/app/create/page";

interface PathSelectorProps {
  onSelect: (path: CreationPath) => void;
}

export default function PathSelector({ onSelect }: PathSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          选择创作方式
        </h1>
        <p className="text-xl text-gray-600">
          选择最适合你的播客创作起点
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 路径 A：主题 / 提示词生成 */}
        <div
          onClick={() => onSelect("topic")}
          className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
          
          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                主题 / 提示词生成
              </h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              只有一个想法或主题？输入你的主题或提示词，AI 帮你生成完整的播客脚本和音频。
            </p>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="px-3 py-1 bg-blue-50 rounded text-blue-600 font-medium">
                  主题
                </span>
                <span className="text-blue-400">→</span>
                <span className="px-3 py-1 bg-blue-50 rounded text-blue-600 font-medium">
                  脚本
                </span>
                <span className="text-blue-400">→</span>
                <span className="px-3 py-1 bg-blue-50 rounded text-blue-600 font-medium">
                  音频
                </span>
              </div>
            </div>
            
            <div className="pt-4">
              <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                开始创作
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* 路径 B：基于内容生成 */}
        <div
          onClick={() => onSelect("content")}
          className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-500"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
          
          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                基于内容生成
              </h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              已有文本内容或文章链接？输入文本或链接，AI 将其转换为播客格式并生成音频。
            </p>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-purple-50 rounded text-purple-600 font-medium">
                    文本 / 链接
                  </span>
                  <span className="text-purple-400">→</span>
                  <span className="px-3 py-1 bg-purple-50 rounded text-purple-600 font-medium">
                    播客脚本
                  </span>
                  <span className="text-purple-400">→</span>
                  <span className="px-3 py-1 bg-purple-50 rounded text-purple-600 font-medium">
                    音频
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <span className="inline-flex items-center gap-2 text-purple-600 font-semibold">
                开始创作
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



