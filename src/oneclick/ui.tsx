import type { ReactNode } from "react";
import { BriefcaseBusiness, FileText, Home, UserRound, Sparkles } from "lucide-react";
import type { ScreenId } from "./flow";

export const colors = {
  black: "#1E1E1E",
  green: "#29FE29",
  blue: "#2C76FF",
  soft: "#F5F5F5",
  tint: "#EFFBFF",
  navy: "#0B1D33",
  yellow: "#FFDE59",
  coral: "#FF5C5C",
};

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 font-black tracking-tight text-[#1E1E1E]">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#1E1E1E] text-xs text-white">AW</div>
      {!compact && <span className="text-base sm:text-lg">APPLY WIZZ</span>}
    </div>
  );
}

export function Pill({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "yellow" | "red" | "gray" | "dark" }) {
  const styles = {
    blue: "bg-[#EFFBFF] text-[#185BCC]",
    green: "bg-[#E9FFE9] text-[#0B6B22]",
    yellow: "bg-[#FFF7CC] text-[#6E5900]",
    red: "bg-[#FFF0F0] text-[#B42318]",
    gray: "bg-gray-100 text-gray-600",
    dark: "bg-[#0B1D33] text-white",
  }[tone];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${styles}`}>{children}</span>;
}

export function PrimaryButton({ children, onClick, disabled = false, className = "" }: { children: ReactNode; onClick?: () => void; disabled?: boolean; className?: string }) {
  return <button onClick={onClick} disabled={disabled} className={`min-h-12 rounded-2xl bg-[#2C76FF] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#1E67EF] disabled:opacity-50 ${className}`}>{children}</button>;
}

export function SecondaryButton({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return <button onClick={onClick} className={`min-h-12 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-[#1E1E1E] transition hover:bg-gray-50 ${className}`}>{children}</button>;
}

export function DangerButton({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return <button onClick={onClick} className={`min-h-12 rounded-2xl bg-[#FF5C5C] px-5 py-3 text-sm font-extrabold text-white ${className}`}>{children}</button>;
}

export function ProgressBar({ value, tone = "blue" }: { value: number; tone?: "blue" | "green" | "yellow" }) {
  const color = tone === "green" ? colors.green : tone === "yellow" ? colors.yellow : colors.blue;
  return <div className="h-2.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} /></div>;
}

export function Metric({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><div className="text-2xl font-black text-[#1E1E1E]">{value}</div><div className="mt-1 text-xs font-semibold text-gray-500">{label}</div></div>;
}

export function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-[24px] border border-gray-100 bg-white p-5 shadow-sm sm:p-6 ${className}`}>{children}</section>;
}

export function ChoiceCard({ title, description, selected, onClick, badge }: { title: string; description: string; selected?: boolean; onClick?: () => void; badge?: ReactNode }) {
  return <button onClick={onClick} className={`min-h-28 w-full rounded-[22px] border p-5 text-left transition ${selected ? "border-[#2C76FF] bg-[#EFFBFF] ring-4 ring-blue-50" : "border-gray-200 bg-white hover:border-blue-200"}`}><div className="flex items-start justify-between gap-3"><div><div className="font-black text-[#1E1E1E]">{title}</div><p className="mt-2 text-sm leading-6 text-gray-500">{description}</p></div>{badge}</div></button>;
}

export function StatusRow({ label, value, positive = true }: { label: string; value: string; positive?: boolean }) {
  return <div className="flex min-h-12 items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-0"><span className="text-sm font-semibold text-gray-600">{label}</span><span className={`text-right text-sm font-extrabold ${positive ? "text-[#0B6B22]" : "text-[#B42318]"}`}>{value}</span></div>;
}

export function Field({ label, value, placeholder, type = "text" }: { label: string; value?: string; placeholder?: string; type?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-gray-800">{label}</span><input type={type} defaultValue={value} placeholder={placeholder} className="min-h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#2C76FF] focus:ring-4 focus:ring-blue-50" /></label>;
}

export function ToggleRow({ title, description, defaultOn = true }: { title: string; description: string; defaultOn?: boolean }) {
  return <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4"><div><div className="text-sm font-extrabold text-[#1E1E1E]">{title}</div><p className="mt-1 text-xs leading-5 text-gray-500">{description}</p></div><div className={`relative h-7 w-12 rounded-full ${defaultOn ? "bg-[#2C76FF]" : "bg-gray-200"}`}><div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm ${defaultOn ? "right-1" : "left-1"}`} /></div></div>;
}

export function PageShell({ eyebrow, title, description, children, footer }: { eyebrow?: string; title: string; description?: string; children: ReactNode; footer?: ReactNode }) {
  return <div className="min-h-screen bg-[#F7F9FC]"><div className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8"><BrandLogo /><div className="mt-8 sm:mt-12">{eyebrow && <Pill tone="blue">{eyebrow}</Pill>}<h1 className="mt-4 text-3xl font-black leading-tight text-[#1E1E1E] sm:text-4xl">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">{description}</p>}</div><div className="mt-7 space-y-4">{children}</div>{footer && <div className="sticky bottom-0 mt-7 border-t border-gray-100 bg-[#F7F9FC]/95 py-4 backdrop-blur sm:static sm:border-0 sm:bg-transparent">{footer}</div>}</div></div>;
}

const nav = [
  { id: "s22" as ScreenId, label: "Home", Icon: Home },
  { id: "s23" as ScreenId, label: "Jobs", Icon: BriefcaseBusiness },
  { id: "s37" as ScreenId, label: "Applications", Icon: FileText },
  { id: "s46" as ScreenId, label: "Profile", Icon: UserRound },
];

export function AppShell({ current, go, children }: { current: ScreenId; go: (id: ScreenId) => void; children: ReactNode }) {
  return <div className="min-h-screen bg-[#F7F9FC] lg:flex"><aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-5 lg:flex lg:flex-col"><BrandLogo /><nav className="mt-10 space-y-2">{nav.map(({ id, label, Icon }) => <button key={id} onClick={() => go(id)} className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-bold text-gray-600 hover:bg-[#EFFBFF] hover:text-[#185BCC]"><Icon size={19} />{label}</button>)}<button onClick={() => go("s40")} className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-bold text-gray-600 hover:bg-[#EFFBFF] hover:text-[#185BCC]"><Sparkles size={19}/>Career Passport</button></nav><div className="mt-auto rounded-2xl bg-[#0B1D33] p-4 text-white"><div className="flex items-center gap-2 text-sm font-extrabold"><span className="h-2 w-2 rounded-full bg-[#29FE29]"/>OneClick Agent Active</div><p className="mt-2 text-xs leading-5 text-slate-300">Monitoring approved applications and waiting only for real human-required steps.</p></div></aside><main className="mx-auto min-h-screen w-full max-w-6xl pb-24 lg:pb-8">{children}</main><nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-gray-200 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">{nav.map(({ id, label, Icon }) => <button key={id} onClick={() => go(id)} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold text-gray-500 hover:bg-gray-50 hover:text-[#2C76FF]"><Icon size={20}/>{label}</button>)}</nav></div>;
}
