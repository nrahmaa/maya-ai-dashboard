import { useEffect, useState } from 'react';
import { fetchFeed, type IssueCluster } from '../lib/api';

export default function MapView() {
  const [issues, setIssues] = useState<IssueCluster[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        const data = await fetchFeed(100);
        setIssues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load map data');
      }
    }

    load();
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Issue Locations</h2>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Issue</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Coordinates</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Priority</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {issues.map((issue) => (
              <tr key={issue.cluster_id}>
                <td className="px-4 py-3 text-slate-800 capitalize">{issue.issue_type}</td>
                <td className="px-4 py-3 text-slate-700">{issue.latitude.toFixed(5)}, {issue.longitude.toFixed(5)}</td>
                <td className="px-4 py-3 text-slate-700 capitalize">{issue.priority}</td>
                <td className="px-4 py-3 text-slate-700">{issue.status}</td>
              </tr>
            ))}
            {issues.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-500" colSpan={4}>No map data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
