import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Compass } from 'lucide-react';

export interface GisMapCanvasProps {
  selectedContourId?: string;
  totalArea?: number;
  overlapArea?: number;
  hasConflict?: boolean;
}

export const GisMapCanvas: React.FC<GisMapCanvasProps> = ({
  selectedContourId = '04-12-007',
  totalArea = 21.7,
  overlapArea = 3.2,
  hasConflict = true,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl overflow-hidden shadow-xs font-sans space-y-0">
      {/* Card Header Bar */}
      <div className="bg-[#F8F9FA] px-4 py-3 border-b border-[#E4E7EA] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1A1F24]">Uchastka xaritasi</span>
          <span className="text-[#5A646D]">•</span>
          <span className="font-mono text-[#5A646D]">Kvartal 12 · Kontur {selectedContourId}</span>
        </div>
        <div className="font-mono text-[11px] text-[#5A646D]">
          Bandlik tekshiruvi: 14:31 · 2,4 s · reglament ≤ 5 s
        </div>
      </div>

      {/* SVG GIS Canvas Wrapper */}
      <div className="relative bg-[#D5E5D8] aspect-[23/14] min-h-[340px] overflow-hidden select-none">
        <svg
          className="w-full h-full block"
          viewBox="0 0 920 560"
          style={{ transform: `scale(${zoomLevel / 100})`, transition: 'transform 0.2s ease-out' }}
        >
          <defs>
            <pattern id="wiz-grid-sm" width="46" height="46" patternUnits="userSpaceOnUse">
              <path d="M46 0H0v46" fill="none" stroke="rgba(18, 53, 34, 0.13)" strokeWidth="1" />
            </pattern>
            <pattern id="wiz-grid-lg" width="230" height="230" patternUnits="userSpaceOnUse">
              <path d="M230 0H0v230" fill="none" stroke="rgba(18, 53, 34, 0.26)" strokeWidth="1.4" />
            </pattern>

            {/* Overlap Red Hatching Pattern */}
            <pattern
              id="wiz-hatch-busy"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="10" height="10" fill="rgba(185, 28, 28, 0.13)" />
              <line x1="0" y1="0" x2="0" y2="10" stroke="#B91C1C" strokeWidth="3.6" />
            </pattern>

            <pattern
              id="wiz-hatch-zone"
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-45)"
            >
              <line x1="0" y1="0" x2="0" y2="9" stroke="#B45309" strokeWidth="2.2" />
            </pattern>

            <clipPath id="wiz-clip-selected">
              <polygon points="298,148 468,116 552,214 534,352 392,424 286,338" />
            </clipPath>
          </defs>

          {/* Background grid */}
          <rect width="920" height="560" fill="#D5E5D8" />
          <rect width="920" height="560" fill="url(#wiz-grid-sm)" />
          <rect width="920" height="560" fill="url(#wiz-grid-lg)" />

          {/* Coordinates Ticks */}
          <g className="font-mono text-[11px] fill-[#5A646D]">
            <text x="96" y="15">69°12′</text>
            <text x="326" y="15">69°13′</text>
            <text x="556" y="15">69°14′</text>
            <text x="786" y="15">69°15′</text>
            <text x="6" y="104">41°26′</text>
            <text x="6" y="334">41°25′</text>
            <text x="6" y="551">41°24′</text>
          </g>

          {/* Protection Zone Watercourse */}
          <path
            d="M-10,96 C90,142 152,214 168,300 C184,388 138,470 176,570"
            fill="none"
            stroke="url(#wiz-hatch-zone)"
            strokeWidth="36"
          />
          <path
            d="M-10,96 C90,142 152,214 168,300 C184,388 138,470 176,570"
            fill="none"
            stroke="#0369A1"
            strokeWidth="4"
          />

          {/* District boundary */}
          <path
            d="M270,0 C284,110 258,200 272,300 C286,398 258,470 274,560"
            fill="none"
            stroke="#1A1F24"
            strokeWidth="2"
            strokeDasharray="12 7"
            opacity="0.55"
          />

          <g className="text-[12px] font-semibold fill-[#1A1F24]">
            <text x="14" y="252">Chinoz oʻrmon boʻlimi</text>
            <text x="700" y="252">Zangiota oʻrmon boʻlimi</text>
          </g>

          {/* Free contours */}
          <g fill="rgba(127, 185, 138, 0.34)" stroke="rgba(18, 53, 34, 0.42)" strokeWidth="1.6">
            <polygon points="62,64 214,44 268,132 196,208 78,182" />
            <polygon points="640,34 812,44 862,116 780,172 656,142" />
            <polygon points="66,336 226,306 272,404 186,486 82,452" />
            <polygon points="622,378 806,352 856,452 706,510 620,452" />
            <polygon points="312,462 452,452 486,516 356,538" />
          </g>

          <g className="font-mono text-[12px] fill-[#1A1F24] font-semibold">
            <text x="112" y="126">04-12-005</text>
            <text x="700" y="98">04-12-006</text>
            <text x="118" y="400">04-12-009</text>
            <text x="676" y="436">04-12-011</text>
            <text x="344" y="500">04-12-014</text>
          </g>

          {/* Selected Contour Polygon */}
          <polygon
            points="298,148 468,116 552,214 534,352 392,424 286,338"
            fill="rgba(46, 125, 79, 0.3)"
            stroke="#2E7D4F"
            strokeWidth="3.5"
          />

          {/* Overlapping Active Permit Polygon (dashed) */}
          <polygon
            points="496,166 660,192 676,316 540,372 480,302"
            fill="none"
            stroke="#B91C1C"
            strokeWidth="2"
            strokeDasharray="9 6"
            opacity="0.85"
          />

          {/* Intersection Red Hatching */}
          {hasConflict && (
            <g clipPath="url(#wiz-clip-selected)">
              <polygon
                points="496,166 660,192 676,316 540,372 480,302"
                fill="url(#wiz-hatch-busy)"
                stroke="#B91C1C"
                strokeWidth="3"
              />
            </g>
          )}

          {/* Contour Vertex Handles */}
          <g fill="#FFFFFF" stroke="#2E7D4F" strokeWidth="2">
            <rect x="293" y="143" width="10" height="10" />
            <rect x="463" y="111" width="10" height="10" />
            <rect x="547" y="209" width="10" height="10" />
            <rect x="529" y="347" width="10" height="10" />
            <rect x="387" y="419" width="10" height="10" />
            <rect x="281" y="333" width="10" height="10" />
          </g>

          {/* Selected Contour Text Callout */}
          <text className="font-mono text-[17px] font-bold fill-[#123522]" x="316" y="252">
            {selectedContourId}
          </text>
          <text className="text-[12.5px] font-semibold fill-[#123522]" x="316" y="274">
            boʻsh {(totalArea - overlapArea).toFixed(1)} ha
          </text>

          {/* Conflict Red Callout Badge */}
          {hasConflict && (
            <g>
              <path d="M470,96 L508,250" fill="none" stroke="#B91C1C" strokeWidth="1.6" strokeDasharray="4 3" />
              <circle cx="508" cy="250" r="4" fill="#B91C1C" />
              <rect x="306" y="38" width="296" height="58" rx="8" fill="#FFFFFF" stroke="#B91C1C" strokeWidth="1.6" />
              <text x="320" y="60" className="text-[13.5px] font-bold fill-[#B91C1C]">
                Band: kesishuv {overlapArea} ha
              </text>
              <text x="320" y="80" className="text-[12px] font-mono fill-[#1A1F24]">
                RX-2026-004112 · 31.10.2026 gacha
              </text>
            </g>
          )}

          {/* Scale & North Arrow */}
          <g transform="translate(860, 480)">
            <Compass className="w-8 h-8 text-[#1A1F24]" />
            <text x="12" y="42" className="text-[11px] font-bold text-center fill-[#1A1F24]">C</text>
          </g>
        </svg>

        {/* Map Control Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 15, 160))}
            className="w-10 h-10 bg-white border border-[#767F87] rounded-lg shadow-sm flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-gray-50 cursor-pointer"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 15, 75))}
            className="w-10 h-10 bg-white border border-[#767F87] rounded-lg shadow-sm flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-gray-50 cursor-pointer"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="w-10 h-10 bg-white border border-[#767F87] rounded-lg shadow-sm flex items-center justify-center font-bold text-lg text-[#1A1F24] hover:bg-gray-50 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Map Coordinates Footnote */}
        <div className="absolute right-3 bottom-3 bg-white/95 border border-[#E4E7EA] rounded-md px-2 py-1 font-mono text-[11px] text-[#5A646D]">
          41°25′17″ sh. k. · 69°13′42″ sharq. u. · 1 : 25 000
        </div>
      </div>

      {/* Map Legend */}
      <div className="bg-[#F8F9FA] px-4 py-3 border-t border-[#E4E7EA] flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 rounded bg-[rgba(46,125,79,0.3)] border border-[#2E7D4F]" />
          <span>Tanlangan kontur</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 rounded bg-[rgba(127,185,138,0.34)] border border-[#123522]" />
          <span>Boʻsh konturlar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 rounded bg-[#FEF2F2] border border-[#B91C1C]" />
          <span>Kesishgan amaldagi ruxsatnoma</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 rounded bg-[#FFFBEB] border border-[#B45309]" />
          <span>Muhofaza zonasi</span>
        </div>
      </div>
    </div>
  );
};
