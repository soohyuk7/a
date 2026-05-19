import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "지도 — 로커부동산중개법인" },
      { name: "description", content: "지도에서 로커의 빌딩 매물 위치를 한눈에 확인하세요." },
    ],
  }),
  component: MapPage,
});

const PINS = [
  { name: "테헤란로 프라임 오피스", area: "강남구 역삼동", x: "55%", y: "55%", price: "₩ 480억" },
  { name: "도산대로 코너 빌딩", area: "강남구 신사동", x: "48%", y: "38%", price: "₩ 320억" },
  { name: "역삼 수익형 빌딩", area: "강남구 역삼동", x: "62%", y: "60%", price: "₩ 215억" },
  { name: "삼성동 사옥형 빌딩", area: "강남구 삼성동", x: "72%", y: "50%", price: "₩ 540억" },
  { name: "서초 강남대로 빌딩", area: "서초구 서초동", x: "38%", y: "62%", price: "₩ 260억" },
  { name: "잠실 메인 빌딩", area: "송파구 잠실동", x: "82%", y: "42%", price: "₩ 410억" },
];

function MapPage() {
  return (
    <PageShell
      eyebrow="Map"
      title={<>지도에서 만나는 <span className="italic">강남의 빌딩</span></>}
      intro="강남·서초·송파 — 로커가 다루는 빌딩 매물의 위치를 지도에서 확인하세요."
    >
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 relative aspect-[4/3] bg-secondary border border-border overflow-hidden">
          {/* Stylized map background */}
          <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full opacity-40">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M 100 100 Q 300 50 500 150 T 750 200 L 700 400 Q 500 450 300 380 T 50 350 Z" fill="currentColor" className="text-muted/60" />
            <path d="M 100 480 Q 200 460 280 500 L 260 560 Q 150 570 100 540 Z" fill="currentColor" className="text-muted/60" />
            <path d="M 600 440 Q 700 430 760 470 L 750 540 Q 650 550 580 510 Z" fill="currentColor" className="text-muted/60" />
          </svg>

          {PINS.map((p, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer"
              style={{ left: p.x, top: p.y }}
            >
              <div className="bg-foreground text-background p-2 rounded-full shadow-lg group-hover:bg-accent transition-colors">
                <MapPin size={16} />
              </div>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                <div className="font-medium">{p.name}</div>
                <div className="text-muted-foreground">{p.price}</div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/90 px-3 py-2">
            전체 {PINS.length}개 매물
          </div>
        </div>

        <aside className="space-y-1">
          <div className="eyebrow text-muted-foreground mb-6">매물 목록</div>
          {PINS.map((p, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-border group cursor-pointer hover:bg-secondary/50 px-2 transition-colors">
              <div className="text-3xl font-display text-muted-foreground w-10">{String(i + 1).padStart(2, "0")}</div>
              <div className="flex-1">
                <div className="font-display text-lg">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.area}</div>
              </div>
              <div className="text-sm font-medium">{p.price}</div>
            </div>
          ))}
        </aside>
      </div>
    </PageShell>
  );
}