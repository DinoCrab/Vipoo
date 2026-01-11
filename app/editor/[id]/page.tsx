"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PodcastEditor from "@/components/editor/PodcastEditor";

export interface Segment {
  id: string;
  text: string;
  audioUrl: string;
  duration: number;
  needsRegenerate?: boolean;
}

export interface PodcastData {
  id: string;
  script: string;
  segments: Segment[];
  voiceType: string;
  voiceStyle: string;
}

export default function EditorPage() {
  const params = useParams();
  const podcastId = params.id as string;
  const [podcast, setPodcast] = useState<PodcastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!podcastId) return;

    // 获取播客数据
    fetch(`/api/podcast/create?id=${podcastId}`)
      .then((res) => res.json())
      .then((data) => {
        setPodcast(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("加载播客失败:", err);
        setError("加载播客失败");
        setLoading(false);
      });
  }, [podcastId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "播客不存在"}</p>
          <a href="/create" className="text-blue-600 hover:underline">
            返回创作页面
          </a>
        </div>
      </div>
    );
  }

  return <PodcastEditor podcast={podcast} />;
}

