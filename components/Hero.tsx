"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[#F5F3FF] py-16 lg:py-24">
      {/* 背景装饰点 */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle, #9333EA 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：信息区域 */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                每个人<br />都可以创作自己的播客
                <br />
                <span className="text-purple-600 text-1xl sm:text-2xl lg:text-3xl font-light tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  Make Podcasts as Easy as Writing
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-xl">
                从片头到片尾，一站式AI播客创作与编辑平台
              </p>
            </div>

            {/* CTA 按钮 */}
            <div>
              <a
                href="https://my.feishu.cn/share/base/form/shrcnCnT0NLfHiX4o5UAB9t6fCd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                申请内测
              </a>
            </div>
          </div>

          {/* 右侧：视觉区域 */}
          <div className="relative lg:pl-8">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* 动态背景装饰 */}
              <div className="absolute inset-0">
                {/* 渐变圆形背景 */}
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* 主视觉容器 */}
              <div className="relative w-full h-full">
                {/* 3D 卡片效果 */}
                <div className="relative w-full h-full bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-3xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 border border-purple-100">
                  {/* 顶部装饰条 */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-t-3xl"></div>
                  
                  {/* 中心内容区域 */}
                  <div className="relative h-full flex flex-col items-center justify-center">
                    {/* 麦克风图标 - 更大更突出 */}
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                      </div>
                      {/* 彩虹渐变连接线 */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1.5 h-16 bg-gradient-to-b from-purple-500 via-pink-500 via-yellow-400 via-green-400 to-blue-500 rounded-full shadow-lg"></div>
                    </div>
                    
                    {/* 动态音频波形 - 更生动 */}
                    <div className="w-full max-w-sm space-y-3">
                      {[...Array(8)].map((_, i) => {
                        const width = 40 + Math.sin(i * 0.8) * 30 + (i % 3) * 15;
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2"
                            style={{
                              animationDelay: `${i * 0.1}s`,
                            }}
                          >
                            <div 
                              className="h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-pulse shadow-md"
                              style={{
                                width: `${width}%`,
                                animationDuration: `${1 + i * 0.1}s`,
                              }}
                            ></div>
                            <div 
                              className="h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-70"
                              style={{
                                width: `${width * 0.6}%`,
                                animationDuration: `${1.2 + i * 0.1}s`,
                              }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* 浮动装饰元素 - 更丰富 */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-40 animate-bounce shadow-lg"></div>
                    <div className="absolute bottom-8 left-6 w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-40 animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 right-8 w-10 h-10 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full opacity-40 animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                    
                    {/* 文字标签 */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-200">
                      <span className="text-sm font-semibold text-purple-600">AI 播客创作</span>
                    </div>
                  </div>
                </div>
                
                {/* 外发光效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



