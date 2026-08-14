import { useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { renderAgentSetupScreen } from "./AgentSetupScreens";
import { renderExecutionScreen } from "./ExecutionScreens";
import { nextScreen, previousScreen, screenById, screens, type ScreenId } from "./flow";
import { renderJobScreen } from "./JobScreens";
import { renderManagementScreen } from "./ManagementScreens";
import { renderOnboardingScreen, type ScreenCtx } from "./OnboardingScreens";

export interface PrototypeState {
  resumeUploaded: boolean;
  extractionComplete: boolean;
  gmailConnected: boolean;
  telegramConnected: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
  telegramAnswer: "Yes" | "No" | "I'm unsure" | null;
}

function PrototypeNavigator({ current, go, close }: { current: ScreenId; go: (id: ScreenId) => void; close: () => void }) {
  const groups = useMemo(() => {
    const map = new Map<string, typeof screens>();
    for (const screen of screens) {
      const items = map.get(screen.journey) || [];
      map.set(screen.journey, [...items, screen]);
    }
    return [...map.entries()];
  }, []);

  return <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#0B1D33]/50 p-3 backdrop-blur-sm sm:p-6"><div className="mx-auto max-w-3xl rounded-[28px] bg-white p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[.16em] text-[#2C76FF]">Prototype Navigator</div><div className="mt-2 text-2xl font-black">Jump to any of the 51 screens</div><div className="mt-1 text-sm text-gray-500">Use this only for design review. The normal flow remains fully clickable.</div></div><button onClick={close} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gray-100"><X size={20}/></button></div><div className="mt-6 space-y-6">{groups.map(([journey, items]) => <div key={journey}><div className="mb-2 text-xs font-black uppercase tracking-wider text-gray-400">{journey.replaceAll("-", " ")}</div><div className="grid gap-2 sm:grid-cols-2">{items.map((screen) => <button key={screen.id} onClick={() => { go(screen.id); close(); }} className={`rounded-2xl border p-3 text-left transition ${current === screen.id ? "border-[#2C76FF] bg-[#EFFBFF]" : "border-gray-200 hover:bg-gray-50"}`}><div className="text-xs font-black text-[#2C76FF]">{screen.id.toUpperCase()}</div><div className="mt-1 text-sm font-extrabold">{screen.title}</div></button>)}</div></div>)}</div></div></div>;
}

export default function OneClickApp() {
  const [screen, setScreen] = useState<ScreenId>("s01");
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [state, setState] = useState<PrototypeState>({
    resumeUploaded: false,
    extractionComplete: false,
    gmailConnected: true,
    telegramConnected: false,
    pushEnabled: true,
    smsEnabled: true,
    telegramAnswer: null,
  });

  const go = (id: ScreenId) => {
    setScreen(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const patchState = (patch: Partial<PrototypeState>) => setState((current) => ({ ...current, ...patch }));
  const ctx: ScreenCtx = { go, next: () => go(nextScreen(screen)), back: () => go(previousScreen(screen)), state, setState: patchState };

  const rendered = renderOnboardingScreen(screen, ctx)
    ?? renderAgentSetupScreen(screen, ctx)
    ?? renderJobScreen(screen, ctx)
    ?? renderExecutionScreen(screen, ctx)
    ?? renderManagementScreen(screen, ctx);

  const meta = screenById(screen);

  return <div className="relative min-h-screen font-sans text-[#1E1E1E]">{rendered}<button onClick={() => setNavigatorOpen(true)} aria-label="Open prototype navigator" className="fixed bottom-[78px] right-3 z-50 flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-extrabold shadow-lg lg:bottom-4 lg:right-4"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#0B1D33] text-[9px] text-white">{meta.id.slice(1)}</span><span className="hidden sm:inline">Review screens</span><ChevronDown size={14}/></button>{navigatorOpen && <PrototypeNavigator current={screen} go={go} close={() => setNavigatorOpen(false)}/>}</div>;
}
