"use client";

import { useState } from "react";

interface ScriptPanelProps {
  script: string;
  onScriptChange: (script: string) => void;
  onSegmentClick: (time: number) => void;
}

interface ScriptSegment {
  id: string;
  type: "intro" | "segment" | "outro";
  content: string;
  startTime?: number;
  endTime?: number;
}

export default function ScriptPanel({
  script,
  onScriptChange,
  onSegmentClick,
}: ScriptPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // 解析脚本为段落
  const parseScript = (text: string): ScriptSegment[] => {
    if (!text) return [];

    const segments: ScriptSegment[] = [];
    const lines = text.split("\n\n").filter(line => line.trim());

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      let type: "intro" | "segment" | "outro" = "segment";
      let content = trimmed;

      if (trimmed.includes("【片头") || trimmed.includes("Intro")) {
        type = "intro";
        content = trimmed.replace(/【片头.*?】/g, "").replace(/Intro.*?/g, "").trim();
      } else if (trimmed.includes("【片尾") || trimmed.includes("Outro")) {
        type = "outro";
        content = trimmed.replace(/【片尾.*?】/g, "").replace(/Outro.*?/g, "").trim();
      } else if (trimmed.includes("【正文") || trimmed.includes("Segment")) {
        content = trimmed.replace(/【正文.*?】/g, "").replace(/Segment.*?/g, "").trim();
      }

      segments.push({
        id: `segment_${index}`,
        type,
        content,
        startTime: index * 10, // 模拟时间
        endTime: (index + 1) * 10,
      });
    });

    return segments;
  };

  const segments = parseScript(script);

  const handleEdit = (segment: ScriptSegment) => {
    setEditingId(segment.id);
    setEditText(segment.content);
  };

  const handleSave = (segmentId: string) => {
    if (editText.trim()) {
      const updatedScript = segments
        .map((seg) => (seg.id === segmentId ? { ...seg, content: editText.trim() } : seg))
        .map((seg) => {
          if (seg.type === "intro") return `【片头 Intro】\n${seg.content}`;
          if (seg.type === "outro") return `【片尾 Outro】\n${seg.content}`;
          return `【正文 Segment ${segments.indexOf(seg)}】\n${seg.content}`;
        })
        .join("\n\n");

      onScriptChange(updatedScript);
    }
    setEditingId(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const getSegmentLabel = (segment: ScriptSegment, index: number) => {
    if (segment.type === "intro") return "片头 Intro";
    if (segment.type === "outro") return "片尾 Outro";
    return `正文 Segment ${index}`;
  };

  const getSegmentColor = (type: "intro" | "segment" | "outro") => {
    switch (type) {
      case "intro":
        return "border-blue-200 bg-blue-50";
      case "outro":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">播客文稿（可编辑、可拆段）</h2>
        <p className="text-sm text-gray-500 mt-1">
          Hover提示: 修改后，音频将自动重新生成该段
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {segments.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <p>请在左侧输入内容并生成文稿</p>
            </div>
          </div>
        ) : (
          segments.map((segment, index) => (
            <div
              key={segment.id}
              className={`group relative p-4 rounded-lg border-2 transition-all hover:shadow-md ${getSegmentColor(
                segment.type
              )}`}
            >
              {/* 段落标签 */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600 px-2 py-1 bg-white rounded">
                  {getSegmentLabel(segment, index)}
                </span>
                {segment.startTime !== undefined && (
                  <button
                    onClick={() => onSegmentClick(segment.startTime || 0)}
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {formatTime(segment.startTime)} - {formatTime(segment.endTime || 0)}
                  </button>
                )}
              </div>

              {/* 段落内容 */}
              {editingId === segment.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(segment.id)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
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
                    onClick={() => handleEdit(segment)}
                    className="cursor-pointer text-gray-800 leading-relaxed whitespace-pre-wrap"
                  >
                    {segment.content}
                  </div>

                  {/* 操作按钮 */}
                  <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(segment)}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm font-medium hover:bg-purple-200"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => onSegmentClick(segment.startTime || 0)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200"
                    >
                      跳转音频
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

