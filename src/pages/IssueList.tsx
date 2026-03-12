import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchIssues, type IssueCluster } from '../lib/api';

const STATUSES = ['Open', 'In Progress', 'Resolved'] as const;
const SEVERITIES = ['low', 'medium', 'high', 'critical'] as const;

export default function IssueList() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<IssueCluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [severity, setSeverity] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchIssues({
          severity: severity || undefined,
          status: status || undefined,
          department: department || undefined,
          limit: 200,
        });
        setIssues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch issues');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [severity, status, department]);

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="px-8 py-4 flex flex-wrap gap-3 items-center bg-white border-b border-slate-200 shrink-0">
        <select
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="">All Severities</option>
          {SEVERITIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <button
          className="text-xs font-semibold text-blue-500 hover:underline"
          onClick={() => {
            setSeverity('');
            setStatus('');
            setDepartment('');
          }}
          type="button"
        >
          Clear filters
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Issue</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reports</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {issues.map((issue) => (
                <tr
                  key={issue.cluster_id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/issues/${issue.cluster_id}`)}
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900 capitalize">{issue.issue_type}</div>
                    <div className="text-xs text-slate-500">{issue.summary}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 capitalize">{issue.severity}</td>
                  <td className="px-4 py-3 text-slate-700">{issue.report_count}</td>
                  <td className="px-4 py-3 text-slate-700">{issue.department}</td>
                  <td className="px-4 py-3 text-slate-700">{issue.latitude.toFixed(5)}, {issue.longitude.toFixed(5)}</td>
                  <td className="px-4 py-3 text-slate-700">{issue.status}</td>
                </tr>
              ))}
              {!loading && issues.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-500" colSpan={6}>
                    No issues found.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-500" colSpan={6}>
                    Loading issues...
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
