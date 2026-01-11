"use client";

import { useState } from "react";
import { Segment } from "@/app/editor/[id]/page";

interface TextEditorProps {
  segments: Segment[];
  selectedSegmentId: string | null;
  onSegmentClick: (segmentId: string) => void;
  onSegmentUpdate: (segmentId: string, newText: string) => void;
  onSegmentDelete: (segmentId: string) => void;
  onSegmentSplit: (segmentId: string, splitIndex: number) => void;
  onSegmentsMerge: (segmentId1: string, segmentId2: string) => void;
}

export default function TextEditor({
  segments,
  selectedSegmentId,
  onSegmentClick,
  onSegmentUpdate,
  onSegmentDelete,
  onSegmentSplit,
  onSegmentsMerge,
}: TextEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (segment: Segment) => {
    setEditingId(segment.id);
    setEditText(segment.text);
  };

  const handleSave = (segmentId: string) => {
    if (editText.trim()) {
      onSegmentUpdate(segmentId, editText.trim());
    }
    setEditingId(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900">播客文本</h2>
        <p className="text-sm text-gray-600 mt-1">
          点击段落可跳转到对应音频位置，编辑文本后音频会自动更新
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {segments.map((segment, index) => (
          <div
            key={segment.id}
            className={`group relative p-4 rounded-lg border-2 transition-all ${
              selectedSegmentId === segment.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {/* 段落编号 */}
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>

            {/* 段落内容 */}
            {editingId === segment.id ? (
              <div className="space-y-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(segment.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    保存
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  onClick={() => onSegmentClick(segment.id)}
                  className="cursor-pointer text-gray-800 leading-relaxed whitespace-pre-wrap"
                >
                  {segment.text}
                </div>

                {/* 操作按钮 */}
                <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(segment)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => onSegmentDelete(segment.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
                  >
                    删除
                  </button>
                  {index < segments.length - 1 && (
                    <button
                      onClick={() => onSegmentsMerge(segment.id, segments[index + 1].id)}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm font-medium hover:bg-purple-200"
                    >
                      合并下一段
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



