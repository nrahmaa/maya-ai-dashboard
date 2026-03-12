import { NavLink } from 'react-router-dom';
import { Building2, LayoutDashboard, AlertTriangle, Map, BarChart3, Settings, Users } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#111827] text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shrink-0">
          <Building2 size={20} />
        </div>
        <div>
          <h1 className="text-white text-sm font-bold leading-tight tracking-tight">MAYA AI</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Portal</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
              isActive ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/issues"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
              isActive ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )
          }
        >
          <AlertTriangle size={20} />
          <span>Issues</span>
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
              isActive ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )
          }
        >
          <Map size={20} />
          <span>Map View</span>
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
              isActive ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )
          }
        >
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>

        <div className="pt-4 pb-2 px-3">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">System</p>
        </div>
        <NavLink
          to="/team"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
              isActive ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )
          }
        >
          <Users size={20} />
          <span>Maintenance Team</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
              isActive ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div
            className="w-8 h-8 rounded-full bg-slate-700 bg-cover bg-center shrink-0"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkOgc2FKGN8nCiAnCbCJwYF5ryygk04EBRprrfHS2IH0feixVDpeE_SoryAv-w4zyVTmRMWwzouqOucnrxgib1aZTETSD5zcLRmbL5pVNmPUsfabEMxoiBJn6Fk3_ibVcb5UaRHO2NOAbFbln-uoGJpG01oMMN4-B-OcREIIdyBzwz_Sj4XNlt9AleJBihiEob3Q1F2G3eihOmtOhoMWuG2IiMk4sY3NCVEhnQQHUct5Rr4mrrVJFVmHrcvRFgwoA3zf-wW2bEQi6t')",
            }}
          ></div>
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-white truncate">Alex Rivera</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
