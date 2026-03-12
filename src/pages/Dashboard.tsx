import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Flame } from 'lucide-react';
import { fetchIssues, fetchStats, type DashboardStats, type IssueCluster } from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentIssues, setRecentIssues] = useState<IssueCluster[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        const [statsData, issuesData] = await Promise.all([
          fetchStats(),
          fetchIssues({ limit: 6 }),
        ]);
        setStats(statsData);
        setRecentIssues(issuesData.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      }
    }

    load();
  }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="p-2 bg-blue-50 rounded-lg w-fit mb-4">
            <AlertTriangle className="text-blue-500" size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">Open Issues</p>
          <h3 className="text-3xl font-bold mt-1 text-slate-900">{stats?.open_issues ?? '-'}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="p-2 bg-red-50 rounded-lg w-fit mb-4">
            <AlertTriangle className="text-red-500" size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">Critical Issues</p>
          <h3 className="text-3xl font-bold mt-1 text-slate-900">{stats?.critical_issues ?? '-'}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="p-2 bg-emerald-50 rounded-lg w-fit mb-4">
            <CheckCircle2 className="text-emerald-500" size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">Resolved</p>
          <h3 className="text-3xl font-bold mt-1 text-slate-900">{stats?.resolved_issues ?? '-'}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="p-2 bg-orange-50 rounded-lg w-fit mb-4">
            <Flame className="text-orange-500" size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">Hotspots</p>
          <h3 className="text-3xl font-bold mt-1 text-slate-900">{stats?.hotspots ?? '-'}</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Recent Issues</h3>
          <Link to="/issues" className="text-blue-500 text-sm font-semibold hover:underline">
            View all reports
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Issue Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reports</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentIssues.map((issue) => (
                <tr key={issue.cluster_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 capitalize">{issue.issue_type}</td>
                  <td className="px-6 py-4 text-slate-700 capitalize">{issue.severity}</td>
                  <td className="px-6 py-4 text-slate-700">{issue.report_count}</td>
                  <td className="px-6 py-4 text-slate-700">{issue.latitude.toFixed(5)}, {issue.longitude.toFixed(5)}</td>
                  <td className="px-6 py-4 text-slate-700">{issue.status}</td>
                </tr>
              ))}
              {recentIssues.length === 0 && (
                <tr>
                  <td className="px-6 py-6 text-sm text-slate-500" colSpan={5}>
                    {totalClusters === 0 ? 'No issues yet.' : 'No recent issues found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
