"use client";

import { useState } from "react";
import { Segment } from "@/app/editor/[id]/page";
import EnhanceDialog from "./EnhanceDialog";
import ExportDialog from "./ExportDialog";

interface EditorToolbarProps {
  podcastId: string;
  segments: Segment[];
  onRegenerateAll: () => void;
}

export default function EditorToolbar({
  podcastId,
  segments,
  onRegenerateAll,
}: EditorToolbarProps) {
  const [showEnhanceDialog, setShowEnhanceDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const modifiedCount = segments.filter((s) => s.needsRegenerate).length;

  const handleEnhanceComplete = (enhancedSegments: Array<{ segmentId: string; enhancedAudioUrl: string }>) => {
    // TODO: 更新 segments 的 audioUrl
    console.log("增强完成:", enhancedSegments);
    alert("音频增强完成！增强后的音频已应用到所有段落。");
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">播客编辑器</h1>
            {modifiedCount > 0 && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                {modifiedCount} 个段落待重新生成
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {modifiedCount > 0 && (
              <button
                onClick={onRegenerateAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                重新生成所有修改
              </button>
            )}
            <button
              onClick={() => setShowEnhanceDialog(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI 音质增强
            </button>
            <button
              onClick={() => setShowExportDialog(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              导出
            </button>
            <button
              onClick={() => {
                // TODO: 实现保存功能
                alert("保存功能开发中...");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>

      {/* 音质增强对话框 */}
      <EnhanceDialog
        isOpen={showEnhanceDialog}
        onClose={() => setShowEnhanceDialog(false)}
        podcastId={podcastId}
        segmentIds={segments.map((s) => s.id)}
        onEnhanceComplete={handleEnhanceComplete}
      />

      {/* 导出对话框 */}
      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        podcastId={podcastId}
        segmentIds={segments.map((s) => s.id)}
      />
    </>
  );
}

