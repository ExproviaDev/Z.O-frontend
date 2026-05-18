"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SDG_GREEN = "#059669";
const SDG_BLUE = "#0ea5e9";

function normalizeSdgRows(graphData) {
  const mapped = (graphData || []).map((row) => {
    const n = row?.sdg_number ?? row?.sdgNumber ?? null;
    const num = n != null ? Number(n) : NaN;
    const label = row?.label || (Number.isInteger(num) && num >= 1 ? `SDG ${num}` : "—");
    const total = Number(row?.total ?? row?.registration_count ?? row?.count ?? 0) || 0;
    return {
      sdgNum: Number.isInteger(num) && num >= 1 && num <= 17 ? num : 999,
      label,
      shortLabel: Number.isInteger(num) && num >= 1 && num <= 17 ? String(num) : "?",
      participants: total,
    };
  });

  const bySdg = new Map();
  mapped.forEach((r) => {
    if (r.sdgNum >= 1 && r.sdgNum <= 17) {
      bySdg.set(r.sdgNum, r);
    }
  });

  const full = [];
  for (let i = 1; i <= 17; i++) {
    if (bySdg.has(i)) {
      full.push(bySdg.get(i));
    } else {
      full.push({
        sdgNum: i,
        label: `SDG ${i}`,
        shortLabel: String(i),
        participants: 0,
      });
    }
  }
  return full;
}

function SdgTooltip({ active, payload, totalAll }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  const n = row.participants;
  const pct = totalAll > 0 ? ((100 * n) / totalAll).toFixed(1) : "0";

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white/95 px-4 py-3 text-sm shadow-lg shadow-slate-900/10 backdrop-blur-sm">
      <p className="text-xs font-black uppercase tracking-wider text-slate-400">{row.label}</p>
      <p className="mt-2 font-mono text-xl font-black tabular-nums text-slate-900">{n.toLocaleString()}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">
        {pct}% of all SDG-tagged profiles in this view
      </p>
    </div>
  );
}

export default function OverviewMetricsLineChart({ sdgData }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = useMemo(() => normalizeSdgRows(sdgData), [sdgData]);
  const totalAll = useMemo(
    () => chartData.reduce((s, r) => s + r.participants, 0),
    [chartData],
  );

  return (
    <div className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm md:p-8 md:shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-extrabold tracking-tight text-slate-900">SDG participation curve</h3>
        <p className="mt-1 max-w-2xl text-xs font-medium leading-relaxed text-slate-500 md:text-sm">
          Participant count by assigned SDG (1–17), same data as the bar chart below — shown as a continuous line to
          highlight peaks and gaps across goals.
        </p>
      </div>

      <div className="h-[320px] w-full min-h-[260px] min-w-0 md:h-[380px]">
        {!mounted ? (
          <div className="h-full w-full animate-pulse rounded-2xl bg-linear-to-br from-slate-100 to-slate-50" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 16, right: 8, left: -4, bottom: 8 }}>
              <defs>
                <linearGradient id="sdgAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SDG_GREEN} stopOpacity={0.28} />
                  <stop offset="50%" stopColor={SDG_BLUE} stopOpacity={0.12} />
                  <stop offset="100%" stopColor={SDG_BLUE} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="sdgLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={SDG_BLUE} />
                  <stop offset="100%" stopColor={SDG_GREEN} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8eef4" />

              <XAxis
                dataKey="shortLabel"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }}
                label={{ value: "SDG goal", position: "insideBottom", offset: -4, fill: "#94a3b8", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                width={44}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))}
              />

              <Tooltip
                content={<SdgTooltip totalAll={totalAll} />}
                cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }}
              />

              <Area
                type="monotone"
                dataKey="participants"
                stroke="none"
                fill="url(#sdgAreaGrad)"
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="participants"
                stroke="url(#sdgLineGrad)"
                strokeWidth={3}
                dot={{ r: 3, fill: "#fff", strokeWidth: 2, stroke: SDG_GREEN }}
                activeDot={{ r: 8, strokeWidth: 2, stroke: "#fff", fill: SDG_BLUE }}
                isAnimationActive={true}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="mt-3 text-center text-[11px] font-semibold text-slate-400">
        Total across 17 SDGs:{" "}
        <span className="font-black text-slate-600 tabular-nums">{totalAll.toLocaleString()}</span> profiles
      </p>
    </div>
  );
}
