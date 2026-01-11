"use client";

interface AudioTimelineProps {
  segments: string[];
  currentTime: number;
  isPlaying: boolean;
}

export default function AudioTimeline({
  segments,
  currentTime,
  isPlaying,
}: AudioTimelineProps) {
  const totalDuration = segments.length * 10; // 模拟总时长
  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">音频时间线</h3>
        <p className="text-sm text-gray-500">播放/定位/段落级音频控制</p>
      </div>

      {/* 播放控制 */}
      <div className="flex items-center gap-4 mb-6">
        <button className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg">
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
          {/* 时间轴 */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
            {/* 段落标记 */}
            {segments.map((_, index) => {
              const segmentProgress = ((index + 1) / segments.length) * 100;
              return (
                <div
                  key={index}
                  className="absolute top-0 w-0.5 h-full bg-gray-400"
                  style={{ left: `${segmentProgress}%` }}
                ></div>
              );
            })}
            {/* 播放头 */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-lg cursor-pointer"
              style={{ left: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 段落时间轴 */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {segments.map((segment, index) => {
            const segmentDuration = 10; // 模拟每段10秒
            const segmentStart = index * segmentDuration;
            const isActive = currentTime >= segmentStart && currentTime < segmentStart + segmentDuration;

            return (
              <div
                key={index}
                className={`flex-shrink-0 w-32 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => {
                  // TODO: 跳转到对应时间
                }}
              >
                <div className="text-xs font-semibold text-gray-600 mb-1">
                  段落 {index + 1}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTime(segmentStart)} - {formatTime(segmentStart + segmentDuration)}
                </div>
                <div className="text-xs text-gray-400 mt-2 line-clamp-2">
                  {segment.substring(0, 30)}...
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

