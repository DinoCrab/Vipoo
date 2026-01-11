"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Vipoo</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/workspace"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors hidden sm:block"
            >
              {/* 工作台 */}
            </Link>
            <Link
              href="/create"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors hidden sm:block"
            >
              {/* 功能 */}
            </Link>
           
            <Link
              href="/register"
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              {/* 登录 */}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}



