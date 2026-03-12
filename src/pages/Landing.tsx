import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const highlights = [
  {
    title: 'AI Issue Triage',
    description: 'Automatically classifies incident reports and routes them to the right department.',
    icon: Sparkles,
  },
  {
    title: 'Live City Visibility',
    description: 'Track hotspots, severity, and response status across neighborhoods in real time.',
    icon: MapPin,
  },
  {
    title: 'Trusted Operations',
    description: 'Secure reporting workflows built for municipal teams and community collaboration.',
    icon: ShieldCheck,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <MapPin size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight">Maya AI</span>
        </div>
        <Link
          to="/dashboard"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Open Dashboard
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-6 md:grid-cols-2 md:px-8 md:pt-16">
        <section className="space-y-7">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            Community Intelligence Platform
          </span>
          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
            See City Issues Earlier. Resolve Them Faster.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            Maya AI helps municipalities and communities report, prioritize, and respond to neighborhood issues with AI-assisted workflows.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
            >
              Launch Platform
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/issues"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              View Issue Feed
            </Link>
          </div>
          <div className="grid gap-2 pt-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              AI-assisted classification and severity scoring
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Duplicate clustering and hotspot detection
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Department-focused operational dashboards
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
          <h2 className="text-xl font-bold text-slate-900">Why Teams Use Maya AI</h2>
          <div className="mt-6 space-y-5">
            {highlights.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

