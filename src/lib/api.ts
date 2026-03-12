export type IssueStatus = 'Open' | 'In Progress' | 'Resolved';
export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type IssueCluster = {
  cluster_id: string;
  issue_type: string;
  summary: string;
  severity: Severity;
  priority: string;
  department: string;
  latitude: number;
  longitude: number;
  report_count: number;
  status: IssueStatus;
  latest_image_url?: string | null;
  created_at: string;
  updated_at: string;
};

export type DashboardStats = {
  open_issues: number;
  in_progress_issues: number;
  resolved_issues: number;
  critical_issues: number;
  hotspots: number;
  total_reports: number;
};

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://scroll-backend-latest.onrender.com';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

export async function fetchStats(): Promise<DashboardStats> {
  return request<DashboardStats>('/stats');
}

export async function fetchIssues(params?: {
  severity?: string;
  status?: string;
  department?: string;
  limit?: number;
}): Promise<IssueCluster[]> {
  const query = new URLSearchParams();
  if (params?.severity) query.set('severity', params.severity);
  if (params?.status) query.set('status', params.status);
  if (params?.department) query.set('department', params.department);
  if (params?.limit) query.set('limit', String(params.limit));

  return request<IssueCluster[]>(`/issues${query.toString() ? `?${query.toString()}` : ''}`);
}

export async function fetchIssue(issueId: string): Promise<IssueCluster> {
  return request<IssueCluster>(`/issue/${issueId}`);
}

export async function fetchFeed(limit = 50): Promise<IssueCluster[]> {
  const data = await request<{ issues: IssueCluster[] }>(`/feed?limit=${limit}`);
  return data.issues;
}

export async function updateIssueStatus(issueId: string, status: IssueStatus): Promise<IssueCluster> {
  return request<IssueCluster>(`/issue/${issueId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
