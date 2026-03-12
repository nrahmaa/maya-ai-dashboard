import { useEffect, useMemo, useState } from 'react';
import { fetchFeed, fetchStats, type DashboardStats, type IssueCluster } from '../lib/api';

export default function Analytics() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [issues, setIssues] = useState<IssueCluster[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        const [statsData, feedData] = await Promise.all([fetchStats(), fetchFeed(500)]);
        setStats(statsData);
        setIssues(feedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      }
    }

    load();
  }, []);

  const byType = useMemo(() => {
    const map = new Map<string, number>();
    issues.forEach((issue) => {
      map.set(issue.issue_type, (map.get(issue.issue_type) || 0) + issue.report_count);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [issues]);

  const bySeverity = useMemo(() => {
    const base = { low: 0, medium: 0, high: 0, critical: 0 };
    issues.forEach((issue) => {
      base[issue.severity] += 1;
    });
    return base;
  }, [issues]);

  const totalClusters = useMemo(() => {
    if (!stats) return 0;
    return stats.open_issues + stats.in_progress_issues + stats.resolved_issues;
  }, [stats]);

  return (
    <div className="p-8 space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Total Reports" value={stats?.total_reports ?? '-'} />
        <MetricCard label="Hotspots" value={stats?.hotspots ?? '-'} />
        <MetricCard label="Active Clusters" value={totalClusters || '-'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Reports by Issue Type</h3>
          <div className="space-y-3">
            {byType.map(([type, count]) => (
              <div key={type} className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                <span className="capitalize text-slate-700">{type}</span>
                <span className="font-semibold text-slate-900">{count}</span>
              </div>
            ))}
            {byType.length === 0 && <p className="text-sm text-slate-500">No data yet.</p>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Clusters by Severity</h3>
          <div className="space-y-3 text-sm">
            <SeverityRow label="Critical" value={bySeverity.critical} />
            <SeverityRow label="High" value={bySeverity.high} />
            <SeverityRow label="Medium" value={bySeverity.medium} />
            <SeverityRow label="Low" value={bySeverity.low} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function SeverityRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-700">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
