"use client";

import { useEffect, useMemo, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

const SPECTRUM = [
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#ec4899",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
];

function channelColor(i) {
  return SPECTRUM[i % SPECTRUM.length];
}

function SliceTip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  const pct = row._pct != null ? row._pct : 0;

  return (
    <div className="rounded-xl border border-white/70 bg-white/95 px-3 py-2.5 text-[13px] shadow-lg shadow-slate-900/15 backdrop-blur-md">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{row.name}</p>
      <p className="mt-1 font-mono text-base font-black tabular-nums text-slate-900">{Number(row.value).toLocaleString()}</p>
      <p className="mt-0.5 text-[11px] text-slate-500">{pct.toFixed(1)}% of this chart</p>
    </div>
  );
}

export function GlassDashboardDonut({
  eyebrow,
  title,
  description,
  badge,
  slices,
  centerTitle,
  centerValue,
  colorMode = "channels",
  fixedColors,
  footerNote,
  emptyHint,
  hero = false,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { chartData, paletteTotal } = useMemo(() => {
    const list = Array.isArray(slices) ? slices.filter((x) => Number(x.value) > 0) : [];
    const sum = list.reduce((acc, x) => acc + Number(x.value || 0), 0);
    const rows = list.map((x, i) => ({
      ...x,
      _total: sum,
      _pct: sum > 0 ? (100 * Number(x.value)) / sum : 0,
      _fill:
        fixedColors?.[i] ??
        (colorMode === "tiered"
          ? ["#312e81", "#0f766e", "#c2410c"][i] ?? channelColor(i)
          : channelColor(i)),
    }));
    return { chartData: rows, paletteTotal: sum };
  }, [slices, colorMode, fixedColors]);

  const shellClass = hero
    ? "rounded-[32px] border border-slate-200/80 bg-linear-to-br from-white via-slate-50/50 to-indigo-50/30 p-8 shadow-[0_28px_60px_-28px_rgba(15,23,42,0.38)] md:p-10 lg:p-12"
    : "rounded-[26px] border border-slate-200/80 bg-linear-to-br from-white via-slate-50/50 to-indigo-50/30 p-5 shadow-[0_22px_50px_-24px_rgba(15,23,42,0.35)] md:p-6";

  const titleClass = hero
    ? "mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-3xl"
    : "mt-2 text-lg font-black tracking-tight text-slate-900 md:text-xl";

  const descClass = hero
    ? "mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base"
    : "mt-2 text-xs font-medium leading-relaxed text-slate-600 md:text-sm";

  const pieShellClass = hero
    ? "relative aspect-square w-[min(20rem,calc(100vw-3rem))] shrink-0 sm:w-[min(24rem,92vw)] lg:w-[min(28rem,48vw)] xl:w-[min(32rem,42rem)]"
    : "relative aspect-square w-[min(268px,100%)] shrink-0";

  const centerValueClass = hero
    ? "mt-1 font-mono text-3xl font-black tabular-nums text-slate-900 md:text-4xl"
    : "mt-1 font-mono text-xl font-black tabular-nums text-slate-900 md:text-2xl";

  const pulseClass = hero
    ? "aspect-square w-[min(24rem,calc(100vw-3rem))] animate-pulse rounded-full bg-white/70 sm:w-[min(28rem,92vw)]"
    : "aspect-square w-[min(260px,100%)] animate-pulse rounded-full bg-white/70";

  const innerR = hero ? "58%" : "64%";
  const outerR = hero ? "96%" : "94%";
  const padAngle = colorMode === "tiered" ? (hero ? 6 : 5) : hero ? 3 : 2;
  const strokeW = colorMode === "tiered" ? (hero ? 6 : 5) : hero ? 4 : 3;
  const cornerR = colorMode === "tiered" ? (hero ? 14 : 12) : hero ? 6 : 4;

  const listClass = hero
    ? "mt-10 grid w-full max-w-full gap-3 lg:mt-0 lg:max-w-md xl:max-w-lg"
    : "mt-6 grid w-full max-w-full gap-2";

  const rowClass = hero
    ? "flex items-center justify-between gap-4 rounded-2xl border border-slate-100/90 bg-white/85 px-4 py-3.5 text-sm backdrop-blur-sm md:text-[15px]"
    : "flex items-center justify-between gap-3 rounded-xl border border-slate-100/90 bg-white/80 px-3 py-2.5 text-xs backdrop-blur-sm md:text-[13px]";

  return (
    <div className={`relative flex h-full flex-col overflow-hidden ${shellClass}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-indigo-400/15 blur-2xl"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-10 -left-10 rounded-full bg-teal-400/10 blur-2xl ${
          hero ? "size-48" : "size-40"
        }`}
      />

      {eyebrow ? (
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">{eyebrow}</p>
      ) : null}
      <h3 className={titleClass}>{title}</h3>
      {description ? <p className={descClass}>{description}</p> : null}
      {badge ? (
        <span className="mt-3 inline-flex w-fit rounded-full border border-indigo-100 bg-indigo-50/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-600">
          {badge}
        </span>
      ) : null}

      <div
        className={`relative mx-auto mt-5 flex flex-1 flex-col items-center justify-center ${
          hero ? "lg:mt-10 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-20" : ""
        }`}
      >
        {!mounted ? (
          <div className={pulseClass} />
        ) : chartData.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-4 py-8 text-center text-sm font-semibold leading-relaxed text-slate-500">
            {emptyHint ?? "No breakdown data yet."}
          </p>
        ) : (
          <>
            <div className={pieShellClass}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={innerR}
                    outerRadius={outerR}
                    paddingAngle={padAngle}
                    stroke="#f8fafc"
                    strokeWidth={strokeW}
                    cornerRadius={cornerR}
                  >
                    {chartData.map((entry, i) => (
                      <Cell key={entry.key || entry.code || `${entry.name}-${i}`} fill={entry._fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<SliceTip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 pb-4 text-center">
                <span
                  className={`font-black uppercase tracking-wider text-slate-400 ${
                    hero ? "text-[11px] md:text-xs" : "text-[10px]"
                  }`}
                >
                  {centerTitle}
                </span>
                <span className={centerValueClass}>{Number(centerValue ?? paletteTotal ?? 0).toLocaleString()}</span>
              </div>
            </div>

            <ul className={listClass}>
              {chartData.map((row, i) => (
                <li key={row.key || row.code || row.name + String(i)} className={rowClass}>
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`shrink-0 rounded-md shadow-inner ring-1 ring-white ${hero ? "size-3.5" : "size-3"}`}
                      style={{ backgroundColor: row._fill }}
                    />
                    <span className="truncate font-bold text-slate-800">{row.name}</span>
                  </div>
                  <span className="shrink-0 font-mono font-black tabular-nums text-slate-900">
                    {Number(row.value).toLocaleString()}
                    <span className="ml-1 text-[10px] font-semibold text-slate-400">
                      · {row._total > 0 ? row._pct.toFixed(1) : 0}%
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {footerNote ? (
        <p
          className={`mt-4 border-t border-slate-100/90 pt-3 text-center font-medium leading-relaxed text-slate-400 ${
            hero ? "text-xs md:text-sm" : "text-[10px]"
          }`}
        >
          {footerNote}
        </p>
      ) : null}
    </div>
  );
}

export function AudienceFunnelGlassDonut({ centreEnrolment, pies }) {
  return (
    <GlassDashboardDonut
      hero
      eyebrow="Funnel"
      title="System pipeline"
      description="Registered users versus Round 2 pool and finalists. Slice size shows each count relative to the sum of these three figures — large view for at-a-glance balance."
      badge="Dashboard totals"
      centerTitle="Total users"
      centerValue={centreEnrolment}
      colorMode="tiered"
      fixedColors={["#312e81", "#0f766e", "#c2410c"]}
      slices={pies}
      footerNote="For strict funnel percentages, derive shares from total enrolment in reporting — this chart contrasts the three KPIs visually."
    />
  );
}
