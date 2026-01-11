"use client";

import { useEffect, useRef } from "react";
import { Segment } from "@/app/editor/[id]/page";

interface AudioPlayerProps {
  segments: Segment[];
  selectedSegmentId: string | null;
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
  onPlayPause: (playing: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export default function AudioPlayer({
  segments,
  selectedSegmentId,
  currentTime,
  isPlaying,
  onTimeUpdate,
  onPlayPause,
  audioRef,
}: AudioPlayerProps) {
  const totalDuration = segments.reduce((sum, seg) => sum + seg.duration, 0);

  // 计算当前时间对应的段落
  const getCurrentSegment = (time: number): Segment | null => {
    let accumulated = 0;
    for (const segment of segments) {
      if (time >= accumulated && time < accumulated + segment.duration) {
        return segment;
      }
      accumulated += segment.duration;
    }
    return segments[segments.length - 1] || null;
  };

  const currentSegment = getCurrentSegment(currentTime);

  // 格式化时间
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 处理播放/暂停
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      onPlayPause(!isPlaying);
    }
  };

  // 处理进度条变化
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * totalDuration;
      audioRef.current.currentTime = newTime;
      onTimeUpdate(newTime);
    }
  };

  // 组合所有段落的音频URL（实际应该拼接音频）
  const combinedAudioUrl = segments.length > 0 ? segments[0].audioUrl : "";

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900">音频播放</h2>
        <p className="text-sm text-gray-600 mt-1">
          当前播放：{currentSegment ? `段落 ${segments.findIndex((s) => s.id === currentSegment.id) + 1}` : "-"}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 space-y-6">
        {/* 播放控制 */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePlayPause}
            className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* 进度条 */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* 段落时间轴 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 mb-3">段落时间轴</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {segments.map((segment, index) => {
              const startTime = segments
                .slice(0, index)
                .reduce((sum, s) => sum + s.duration, 0);
              const isActive = selectedSegmentId === segment.id || currentSegment?.id === segment.id;

              return (
                <div
                  key={segment.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      段落 {index + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(startTime)} - {formatTime(startTime + segment.duration)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 line-clamp-2">
                    {segment.text.substring(0, 50)}...
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 隐藏的音频元素 */}
      <audio
        ref={audioRef}
        src={combinedAudioUrl}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          onTimeUpdate(audio.currentTime);
        }}
        onEnded={() => onPlayPause(false)}
        onPlay={() => onPlayPause(true)}
        onPause={() => onPlayPause(false)}
      />
    </div>
  );
}



