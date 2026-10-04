"use client";

import { useState, useEffect } from "react";
import { getOlapCube } from "@/lib/api";
import type { CubeResponse, CubeNode } from "@/types";
import { Scene } from "@/components/olap/Scene";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Loader2, ArrowRight, Box } from "lucide-react";

export default function OlapCubePage() {
  const [data, setData] = useState<CubeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<CubeNode | null>(null);

  useEffect(() => {
    const fetchCube = async () => {
      try {
        const response = await getOlapCube();
        setData(response);
      } catch (error) {
        console.error("OLAP Data error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCube();
  }, []);

  return (
    <div className="flex min-h-screen bg-background bg-grid-pattern text-foreground overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        <Header />

        {/* 3D Canvas Area */}
        <div className="flex-1 relative w-full h-full bg-[#03040a]">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-electric-blue z-20">
              <Loader2 size={40} className="animate-spin mb-4 drop-shadow-[0_0_15px_rgba(0,170,255,0.5)]" />
              <p className="animate-pulse font-mono tracking-widest text-sm text-white/80">UZAY MATRİSİ YÜKLENİYOR...</p>
            </div>
          ) : (
            data && <Scene nodes={data.nodes} onHoverNode={setHoveredNode} />
          )}

          {/* Overlay UI - Glassmorphism Info Card */}
          <div className="absolute top-6 left-6 z-10 w-80 animate-fade-in-up">
            <div className="glass-card p-6 !border-white/10 !bg-[#0a0c18]/80 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center border border-electric-blue/30 text-electric-blue">
                  <Box size={20} />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-tight">Global Sony Küpü</h2>
                  <p className="text-electric-blue text-xs uppercase tracking-widest font-semibold mt-0.5">OLAP Analizi</p>
                </div>
              </div>

              <div className="space-y-4 mb-6 border-t border-white/5 pt-4">
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Toplam Küp Geliri</p>
                  <p className="stat-value text-3xl text-white">
                    ${data?.total_revenue_billion.toFixed(1)}<span className="text-text-muted text-lg">B</span>
                  </p>
                </div>

                {/* Dynamic Node Info on Hover */}
                <div className="h-24 rounded-lg bg-black/40 border border-white/5 p-3 transition-colors duration-300">
                  {hoveredNode ? (
                    <div className="animate-fade-in-up">
                      <p className="text-electric-blue text-xs font-mono mb-2 border-b border-white/10 pb-1 inline-block">
                        {hoveredNode.id.toUpperCase()}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white text-sm font-semibold">{hoveredNode.region}</p>
                          <p className="text-white/60 text-xs">{hoveredNode.category} • {hoveredNode.year}</p>
                        </div>
                        <p className="text-white font-mono font-bold text-sm">
                          ${(hoveredNode.revenue_million_usd / 1000).toFixed(2)}B
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-text-muted text-xs text-center opacity-60">
                      Detayları görmek için<br/>küp hücrelerinin üzerine gelin
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-violet to-sony-blue-light hover:to-electric-blue text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(0,170,255,0.4)]">
                Drill Down <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Overlay UI - Legend */}
          <div className="absolute bottom-6 left-6 z-10 animate-fade-in-up animate-delay-200">
            <div className="glass-card p-3 px-4 !bg-[#0a0c18]/80 backdrop-blur-xl border border-white/5 flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-electric-blue shadow-[0_0_10px_#00aaff]" />
                <span className="text-xs text-white/80 font-medium tracking-wide">Optimal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent-amber shadow-[0_0_10px_#f59e0b]" />
                <span className="text-xs text-white/80 font-medium tracking-wide">Dikkat</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent-rose shadow-[0_0_10px_#f43f5e] animate-pulse" />
                <span className="text-xs text-white/80 font-medium tracking-wide">Kritik</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
