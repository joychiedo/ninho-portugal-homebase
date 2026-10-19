import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { buyerCase, type Activity, type Task, type TaskStatus } from "@/data/case";
import { translate, type L } from "@/lib/i18n";

type Store = {
  favourites: string[];
  isFav: (id: string) => boolean;
  toggleFav: (id: string, name: L) => void;
  requested: string[];
  addRequest: (id: string, name: L) => void;
  intros: string[];
  addIntro: (id: string, name: string) => void;
  tasks: Task[];
  setTaskStatus: (taskId: string, status: TaskStatus) => void;
  activity: Activity[];
};

const StoreContext = createContext<Store | null>(null);
const KEY = "ninho-session";

const both = (f: (lang: "en" | "pt") => string): L => ({ en: f("en"), pt: f("pt") });

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favourites, setFav] = useState<string[]>(["principe-real-apartment", "foz-apartment"]);
  const [requested, setRequested] = useState<string[]>([]);
  const [intros, setIntros] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>(buyerCase.tasks);
  const [activity, setActivity] = useState<Activity[]>(buyerCase.activity);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.favourites) setFav(s.favourites);
        if (s.requested) setRequested(s.requested);
        if (s.intros) setIntros(s.intros);
        if (s.tasks) setTasks(s.tasks);
        if (s.activity) setActivity(s.activity);
      }
    } catch {
      /* ignore corrupt session data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.sessionStorage.setItem(KEY, JSON.stringify({ favourites, requested, intros, tasks, activity }));
  }, [loaded, favourites, requested, intros, tasks, activity]);

  const log = useCallback((text: L) => {
    setActivity((a) => [{ id: crypto.randomUUID(), at: new Date().toISOString(), text }, ...a]);
  }, []);

  const toggleFav = useCallback(
    (id: string, name: L) => {
      setFav((f) => {
        const has = f.includes(id);
        log(both((lg) => translate(lg, has ? "act.unsaved" : "act.saved", { name: name[lg] })));
        return has ? f.filter((x) => x !== id) : [...f, id];
      });
    },
    [log],
  );

  const addRequest = useCallback(
    (id: string, name: L) => {
      setRequested((r) => (r.includes(id) ? r : [...r, id]));
      log(both((lg) => translate(lg, "act.request", { name: name[lg] })));
    },
    [log],
  );

  const addIntro = useCallback(
    (id: string, name: string) => {
      setIntros((r) => (r.includes(id) ? r : [...r, id]));
      log(both((lg) => translate(lg, "act.intro", { name })));
    },
    [log],
  );

  const setTaskStatus = useCallback(
    (taskId: string, status: TaskStatus) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task || task.status === status) return;
      setTasks((ts) => ts.map((t) => (t.id === taskId ? { ...t, status } : t)));
      log(both((lg) => translate(lg, "act.task", { t: task.title[lg], s: translate(lg, `status.${status}`).toLowerCase() })));
    },
    [tasks, log],
  );

  return (
    <StoreContext.Provider
      value={{ favourites, isFav: (id) => favourites.includes(id), toggleFav, requested, addRequest, intros, addIntro, tasks, setTaskStatus, activity }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const c = useContext(StoreContext);
  if (!c) throw new Error("useStore outside provider");
  return c;
}

export function progressOf(tasks: Task[]) {
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((t) => t.status === "done").length / tasks.length) * 100);
}
