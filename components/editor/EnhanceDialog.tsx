"use client";

import { useState } from "react";
import { EnhanceOptions } from "@/app/api/podcast/enhance/route";

interface EnhanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  podcastId: string;
  segmentIds: string[];
  onEnhanceComplete: (enhancedSegments: Array<{ segmentId: string; enhancedAudioUrl: string }>) => void;
}

export default function EnhanceDialog({
  isOpen,
  onClose,
  podcastId,
  segmentIds,
  onEnhanceComplete,
}: EnhanceDialogProps) {
  const [options, setOptions] = useState<EnhanceOptions>({
    denoise: true,
    volumeBalance: true,
    clarity: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleEnhance = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      // 模拟进度更新
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch("/api/podcast/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          podcastId,
          segmentIds,
          options,
        }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) throw new Error("增强失败");

      const data = await response.json();
      onEnhanceComplete(data.segments);
      
      setTimeout(() => {
        onClose();
        setIsProcessing(false);
        setProgress(0);
      }, 500);
    } catch (error) {
      console.error("音频增强失败:", error);
      alert("音频增强失败，请重试");
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">AI 音质增强</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isProcessing}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-gray-600">
            选择要应用的音质增强选项，让播客听起来像在专业录音棚完成。
          </p>

          {/* 增强选项 */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
              <input
                type="checkbox"
                checked={options.denoise}
                onChange={(e) => setOptions({ ...options, denoise: e.target.checked })}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                disabled={isProcessing}
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">去噪</div>
                <div className="text-sm text-gray-600">移除背景噪音和杂音</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
              <input
                type="checkbox"
                checked={options.volumeBalance}
                onChange={(e) => setOptions({ ...options, volumeBalance: e.target.checked })}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                disabled={isProcessing}
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">音量平衡</div>
                <div className="text-sm text-gray-600">自动调整音量，确保各段落音量一致</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
              <input
                type="checkbox"
                checked={options.clarity}
                onChange={(e) => setOptions({ ...options, clarity: e.target.checked })}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                disabled={isProcessing}
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">清晰度增强</div>
                <div className="text-sm text-gray-600">提升语音清晰度和可懂度</div>
              </div>
            </label>
          </div>

          {/* 处理进度 */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>处理中...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            取消
          </button>
          <button
            onClick={handleEnhance}
            disabled={isProcessing || (!options.denoise && !options.volumeBalance && !options.clarity)}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "处理中..." : "开始增强"}
          </button>
        </div>
      </div>
    </div>
  );
}



