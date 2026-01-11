"use client";

import { useState } from "react";
import WorkflowBar from "@/components/workspace/WorkflowBar";
import InputPanel from "@/components/workspace/InputPanel";
import ScriptPanel from "@/components/workspace/ScriptPanel";
import AudioTimeline from "@/components/workspace/AudioTimeline";
import PodcastSettings from "@/components/workspace/PodcastSettings";

export type GenerationMode = "refine" | "word-for-word" | "create";
export type VoiceType = "single" | "dual";
export type VoiceStyle = "professional" | "casual" | "warm" | "energetic";

export default function WorkspacePage() {
  const [currentStep, setCurrentStep] = useState<"input" | "script" | "edit" | "audition" | "export">("input");
  const [generationMode, setGenerationMode] = useState<GenerationMode>("create");
  const [inputText, setInputText] = useState("");
  const [script, setScript] = useState("");
  const [voiceType, setVoiceType] = useState<VoiceType>("single");
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("professional");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 流程提示条 */}
      <WorkflowBar currentStep={currentStep} onStepChange={setCurrentStep} />

      {/* 主工作区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧：创作输入 */}
          <div className="w-1/2 border-r border-gray-200 flex flex-col bg-white relative">
            <InputPanel
              mode={generationMode}
              onModeChange={setGenerationMode}
              inputText={inputText}
              onInputChange={setInputText}
              onGenerate={(text) => {
                setScript(text);
                setCurrentStep("script");
              }}
            />
            {/* 播客设置卡片（左上角） */}
            <div className="absolute top-4 right-4 z-10">
              <PodcastSettings
                voiceType={voiceType}
                voiceStyle={voiceStyle}
                onVoiceTypeChange={setVoiceType}
                onVoiceStyleChange={setVoiceStyle}
              />
            </div>
          </div>

          {/* 右侧：播客文稿 */}
          <div className="w-1/2 flex flex-col bg-white">
            <ScriptPanel
              script={script}
              onScriptChange={setScript}
              onSegmentClick={(time) => {
                setCurrentStep("audition");
                // TODO: 跳转到音频对应时间
              }}
            />
          </div>
        </div>

        {/* 底部：音频时间线 */}
        <div className="h-64 border-t border-gray-200 bg-white flex-shrink-0">
          <AudioTimeline
            segments={script ? script.split("\n\n").filter(s => s.trim()) : []}
            currentTime={0}
            isPlaying={false}
          />
        </div>
      </div>
    </div>
  );
}

