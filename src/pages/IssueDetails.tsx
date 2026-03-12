import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchIssue, updateIssueStatus, type IssueCluster, type IssueStatus } from '../lib/api';

const STATUS_OPTIONS: IssueStatus[] = ['Open', 'In Progress', 'Resolved'];

export default function IssueDetails() {
  const { id } = useParams();
  const [issue, setIssue] = useState<IssueCluster | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setError(null);
        const data = await fetchIssue(id);
        setIssue(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load issue details');
      }
    }

    load();
  }, [id]);

  const daysActive = useMemo(() => {
    if (!issue) return '-';
    const created = new Date(issue.created_at).getTime();
    const diff = Date.now() - created;
    return `${Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)))}d`;
  }, [issue]);

  async function onStatusChange(nextStatus: IssueStatus) {
    if (!issue) return;
    try {
      setSaving(true);
      setError(null);
      const updated = await updateIssueStatus(issue.cluster_id, nextStatus);
      setIssue(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setSaving(false);
    }
  }

  if (!id) {
    return <div className="p-8">Missing issue id.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!issue ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">Loading issue...</div>
      ) : (
        <>
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            {issue.latest_image_url ? (
              <img src={issue.latest_image_url} alt={issue.issue_type} className="w-full h-72 object-cover" />
            ) : (
              <div className="w-full h-72 bg-slate-100 flex items-center justify-center text-slate-500">No image available</div>
            )}
            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-bold capitalize">{issue.issue_type}</h2>
              <p className="text-slate-600">{issue.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <h3 className="font-semibold text-slate-900">Issue Metadata</h3>
              <p className="text-sm text-slate-600">Department: <span className="text-slate-900">{issue.department}</span></p>
              <p className="text-sm text-slate-600">Severity: <span className="text-slate-900 capitalize">{issue.severity}</span></p>
              <p className="text-sm text-slate-600">Priority: <span className="text-slate-900 capitalize">{issue.priority}</span></p>
              <p className="text-sm text-slate-600">Reports: <span className="text-slate-900">{issue.report_count}</span></p>
              <p className="text-sm text-slate-600">Location: <span className="text-slate-900">{issue.latitude.toFixed(5)}, {issue.longitude.toFixed(5)}</span></p>
              <p className="text-sm text-slate-600">Days Active: <span className="text-slate-900">{daysActive}</span></p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <h3 className="font-semibold text-slate-900">Update Status</h3>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={issue.status}
                onChange={(e) => onStatusChange(e.target.value as IssueStatus)}
                disabled={saving}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <p className="text-xs text-slate-500">Updated at {new Date(issue.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
