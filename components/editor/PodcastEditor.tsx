"use client";

import { useState, useRef, useEffect } from "react";
import { PodcastData, Segment } from "@/app/editor/[id]/page";
import TextEditor from "./TextEditor";
import AudioPlayer from "./AudioPlayer";
import EditorToolbar from "./EditorToolbar";

interface PodcastEditorProps {
  podcast: PodcastData;
}

export default function PodcastEditor({ podcast: initialPodcast }: PodcastEditorProps) {
  const [podcast, setPodcast] = useState<PodcastData>(initialPodcast);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 更新段落
  const updateSegment = (segmentId: string, newText: string) => {
    setPodcast((prev) => ({
      ...prev,
      segments: prev.segments.map((seg) =>
        seg.id === segmentId ? { ...seg, text: newText, needsRegenerate: true } : seg
      ),
      script: prev.segments.map((seg) => seg.id === segmentId ? newText : seg.text).join("\n\n"),
    }));
  };

  // 删除段落
  const deleteSegment = (segmentId: string) => {
    setPodcast((prev) => ({
      ...prev,
      segments: prev.segments.filter((seg) => seg.id !== segmentId),
    }));
  };

  // 拆分段落
  const splitSegment = (segmentId: string, splitIndex: number) => {
    setPodcast((prev) => {
      const segment = prev.segments.find((s) => s.id === segmentId);
      if (!segment) return prev;

      const text1 = segment.text.substring(0, splitIndex).trim();
      const text2 = segment.text.substring(splitIndex).trim();

      if (!text1 || !text2) return prev;

      const newSegment1: Segment = {
        id: `${segmentId}_1`,
        text: text1,
        audioUrl: segment.audioUrl,
        duration: segment.duration * (splitIndex / segment.text.length),
      };

      const newSegment2: Segment = {
        id: `${segmentId}_2`,
        text: text2,
        audioUrl: segment.audioUrl,
        duration: segment.duration * ((segment.text.length - splitIndex) / segment.text.length),
      };

      const segmentIndex = prev.segments.findIndex((s) => s.id === segmentId);
      const newSegments = [...prev.segments];
      newSegments.splice(segmentIndex, 1, newSegment1, newSegment2);

      return {
        ...prev,
        segments: newSegments,
      };
    });
  };

  // 合并段落
  const mergeSegments = (segmentId1: string, segmentId2: string) => {
    setPodcast((prev) => {
      const seg1 = prev.segments.find((s) => s.id === segmentId1);
      const seg2 = prev.segments.find((s) => s.id === segmentId2);
      if (!seg1 || !seg2) return prev;

      const mergedSegment: Segment = {
        id: segmentId1,
        text: `${seg1.text}\n\n${seg2.text}`,
        audioUrl: seg1.audioUrl, // 使用第一个的音频，后续需要重新生成
        duration: seg1.duration + seg2.duration,
      };

      return {
        ...prev,
        segments: prev.segments
          .filter((s) => s.id !== segmentId1 && s.id !== segmentId2)
          .map((s, index) => (index === 0 ? mergedSegment : s))
          .sort((a, b) => {
            const aIndex = prev.segments.findIndex((s) => s.id === a.id);
            const bIndex = prev.segments.findIndex((s) => s.id === b.id);
            return aIndex - bIndex;
          }),
      };
    });
  };

  // 重新生成段落音频
  const regenerateSegmentAudio = async (segmentId: string) => {
    const segment = podcast.segments.find((s) => s.id === segmentId);
    if (!segment) return;

    // TODO: 调用API重新生成音频
    const response = await fetch("/api/podcast/regenerate-segment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        podcastId: podcast.id,
        segmentId,
        text: segment.text,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setPodcast((prev) => ({
        ...prev,
        segments: prev.segments.map((seg) =>
          seg.id === segmentId
            ? { ...seg, audioUrl: data.audioUrl, duration: data.duration }
            : seg
        ),
      }));
    }
  };

  // 点击文本段落，跳转到对应音频位置
  const handleSegmentClick = (segmentId: string) => {
    setSelectedSegmentId(segmentId);
    const segment = podcast.segments.find((s) => s.id === segmentId);
    if (segment && audioRef.current) {
      // 计算该段落在总音频中的起始时间
      const startTime = podcast.segments
        .slice(0, podcast.segments.findIndex((s) => s.id === segmentId))
        .reduce((sum, s) => sum + s.duration, 0);

      audioRef.current.currentTime = startTime;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 工具栏 */}
      <EditorToolbar
        podcastId={podcast.id}
        segments={podcast.segments}
        onRegenerateAll={() => {
          podcast.segments.forEach((seg) => {
            if (seg.needsRegenerate) {
              regenerateSegmentAudio(seg.id);
            }
          });
        }}
      />

      {/* 编辑器主体 */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* 左侧：文本编辑器 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <TextEditor
              segments={podcast.segments}
              selectedSegmentId={selectedSegmentId}
              onSegmentClick={handleSegmentClick}
              onSegmentUpdate={updateSegment}
              onSegmentDelete={deleteSegment}
              onSegmentSplit={splitSegment}
              onSegmentsMerge={mergeSegments}
            />
          </div>

          {/* 右侧：音频播放器 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <AudioPlayer
              segments={podcast.segments}
              selectedSegmentId={selectedSegmentId}
              currentTime={currentTime}
              isPlaying={isPlaying}
              onTimeUpdate={setCurrentTime}
              onPlayPause={setIsPlaying}
              audioRef={audioRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

