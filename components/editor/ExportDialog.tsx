"use client";

import { useState } from "react";
import { ExportFormat, ExportOptions } from "@/app/api/podcast/export/route";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  podcastId: string;
  segmentIds: string[];
}

export default function ExportDialog({
  isOpen,
  onClose,
  podcastId,
  segmentIds,
}: ExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>("mp3");
  const [quality, setQuality] = useState<"low" | "medium" | "high">("high");
  const [includeEnhancements, setIncludeEnhancements] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<{
    downloadUrl: string;
    filename: string;
    size: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    setExportResult(null);

    try {
      const response = await fetch("/api/podcast/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          podcastId,
          segmentIds,
          options: {
            format,
            quality,
            includeEnhancements,
          },
        }),
      });

      if (!response.ok) throw new Error("导出失败");

      const data = await response.json();
      setExportResult(data);
    } catch (error) {
      console.error("导出失败:", error);
      alert("导出失败，请重试");
      setIsExporting(false);
    }
  };

  const handleDownload = () => {
    if (exportResult) {
      // 创建下载链接
      const link = document.createElement("a");
      link.href = exportResult.downloadUrl;
      link.download = exportResult.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">导出播客</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isExporting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!exportResult ? (
          <>
            <div className="space-y-6 mb-6">
              {/* 格式选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  导出格式
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormat("mp3")}
                    disabled={isExporting}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      format === "mp3"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } disabled:opacity-50`}
                  >
                    MP3
                    <div className="text-xs mt-1 opacity-75">通用格式，文件较小</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat("wav")}
                    disabled={isExporting}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      format === "wav"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } disabled:opacity-50`}
                  >
                    WAV
                    <div className="text-xs mt-1 opacity-75">无损格式，文件较大</div>
                  </button>
                </div>
              </div>

              {/* 质量选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  音频质量
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["low", "medium", "high"] as const).map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuality(q)}
                      disabled={isExporting}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        quality === q
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } disabled:opacity-50`}
                    >
                      {q === "low" ? "低" : q === "medium" ? "中" : "高"}
                    </button>
                  ))}
                </div>
              </div>

              {/* 增强选项 */}
              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                <input
                  type="checkbox"
                  checked={includeEnhancements}
                  onChange={(e) => setIncludeEnhancements(e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  disabled={isExporting}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">使用增强后的音频</div>
                  <div className="text-sm text-gray-600">
                    如果已进行音质增强，导出时将使用增强版本
                  </div>
                </div>
              </label>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isExporting}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                取消
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    导出中...
                  </>
                ) : (
                  "开始导出"
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-green-900">导出成功！</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <div>文件名：{exportResult.filename}</div>
                <div>格式：{format.toUpperCase()}</div>
                <div>大小：{formatFileSize(exportResult.size)}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setExportResult(null);
                  onClose();
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                关闭
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载文件
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



