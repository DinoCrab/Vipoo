"use client";

import { useRouter } from "next/navigation";

export default function FeatureBlocks() {
  const router = useRouter();

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 核心价值说明 - 三段文字 */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="space-y-16">
            {/* 功能点 1 */}
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  从一句话开始，VIPOO帮你生成完整的播客
                </h3>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  输入主题或脚本，AI自动生成片头、正文与片尾，直接得到可编辑成品。
                </p>
              </div>
            </div>

            {/* 功能点 2 */}
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">✏️</span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  音频，也可以像文本一样被修改
                </h3>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  无需时间轴剪辑，直接修改文字内容，音频实时同步更新。
                </p>
              </div>
            </div>

            {/* 功能点 3 */}
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  不止是工具，而是一套播客工作流
                </h3>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  创作、编辑、调整结构，到最终输出，全程在一个平台完成。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 功能卡片区域 */}
        <div>
          {/* 主要功能卡片（3个大卡片） */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* 卡片 1: AI 生成播客 */}
            <div className="group relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">AI 生成播客</h3>
                <p className="text-purple-100 text-sm">从主题或文本生成完整播客</p>
              </div>
              <button
                onClick={() => router.push("/workspace")}
                className="w-full px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              >
                开始生成
              </button>
            </div>

            {/* 卡片 2: 文本编辑音频 */}
            <div className="group relative bg-gradient-to-br from-pink-600 to-orange-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">文本编辑音频</h3>
                <p className="text-pink-100 text-sm">像编辑文档一样编辑播客</p>
              </div>
              <button
                onClick={() => router.push("/workspace")}
                className="w-full px-6 py-3 bg-white text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-colors shadow-lg"
              >
                开始编辑
              </button>
            </div>

            {/* 卡片 3: 音质增强 */}
            <div className="group relative bg-gradient-to-br from-green-600 to-blue-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">音质增强</h3>
                <p className="text-green-100 text-sm">一键提升音频质量</p>
              </div>
              <button
                onClick={() => router.push("/workspace")}
                className="w-full px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
              >
                开始增强
              </button>
            </div>
          </div>

          {/* 次要功能卡片（3个小卡片） */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 卡片 4: 转录音频 */}
            <div className="bg-orange-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-2xl font-bold text-orange-600">T</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">转录音频</h3>
                  <p className="text-gray-600 text-sm">将音频转换为文本或 PDF</p>
                </div>
              </div>
            </div>

            {/* 卡片 5: 录制播客 */}
            <div className="bg-pink-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">录制播客</h3>
                  <p className="text-gray-600 text-sm">单人录制或远程嘉宾对话</p>
                </div>
              </div>
            </div>

            {/* 卡片 6: 导出音频 */}
            <div className="bg-purple-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">导出音频</h3>
                  <p className="text-gray-600 text-sm">导出 MP3 或 WAV 格式</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
