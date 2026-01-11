"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PathSelector from "@/components/create/PathSelector";
import TopicForm from "@/components/create/TopicForm";
import ContentForm from "@/components/create/ContentForm";

export type CreationPath = "topic" | "content" | null;
export type VoiceType = "single" | "dual";
export type VoiceStyle = "professional" | "casual" | "warm" | "energetic";

export default function CreatePage() {
  const [selectedPath, setSelectedPath] = useState<CreationPath>(null);
  const router = useRouter();

  const handlePathSelect = (path: CreationPath) => {
    setSelectedPath(path);
  };

  const handleBack = () => {
    setSelectedPath(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedPath === null ? (
          <PathSelector onSelect={handlePathSelect} />
        ) : selectedPath === "topic" ? (
          <TopicForm onBack={handleBack} />
        ) : (
          <ContentForm onBack={handleBack} />
        )}
      </div>
    </div>
  );
}



