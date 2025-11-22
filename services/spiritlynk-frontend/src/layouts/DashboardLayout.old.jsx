import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">

      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside className="w-60 bg-gradient-to-b from-[#4a2d1f] via-[#3b2419] to-[#24140f] text-slate-50 flex flex-col shadow-xl">

        {/* Logo / Brand */}
        <div className="px-5 py-6 border-b border-white/10 flex flex-col items-center">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-sm font-bold tracking-wider">
            SL
          </div>
          <h1 className="mt-3 text-sm font-semibold tracking-[0.2em] text-center">
            SPIRITLYNK HUB
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 text-[13px] font-medium space-y-1">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                isActive
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-100/90 hover:bg-white/10 hover:text-white"
              ].join(" ")
            }
          >
            <span className="text-sm">📊</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/members"
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                isActive
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-100/85 hover:bg:white/10 hover:text-white"
              ].join(" ")
            }
          >
            <span className="text-sm">👥</span>
            <span>Members</span>
          </NavLink>

          <NavLink
            to="/dashboard/media"
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                isActive
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-100/85 hover:bg-white/10 hover:text:white"
              ].join(" ")
            }
          >
            <span className="text-sm">📁</span>
            <span>Media Library</span>
          </NavLink>

          <NavLink
            to="/dashboard/podcast"
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                isActive
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-100/85 hover:bg-white/10 hover:text:white"
              ].join(" ")
            }
          >
            <span className="text-sm">🎧</span>
            <span>Podcast</span>
          </NavLink>

          <NavLink
            to="/dashboard/social"
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                isActive
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-100/85 hover:bg:white/10 hover:text:white"
              ].join(" ")
            }
          >
            <span className="text-sm">🌍</span>
            <span>Social Hub</span>
          </NavLink>

          <NavLink
            to="/dashboard/sms"
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                isActive
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-100/85 hover:bg:white/10 hover:text:white"
              ].join(" ")
            }
          >
            <span className="text-sm">✉️</span>
            <span>SMS</span>
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                isActive
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "text-slate-100/85 hover:bg:white/10 hover:text:white"
              ].join(" ")
            }
          >
            <span className="text-sm">⚙️</span>
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="px-4 py-5 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full py-2.5 rounded-md bg-red-500 hover:bg-red-600 text-xs font-semibold tracking-wide"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ───────────────── MAIN PANEL ───────────────── */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">
              SpiritLynk Dashboard
            </h2>
            <p className="text-[11px] text-slate-500">
              Outreach • Members • Communications
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] text-slate-500">Signed in as</div>
              <div className="text-[13px] font-medium text-slate-800">
                Solomon Akonnor
              </div>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              SA
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="h-11 bg-white border-t flex items-center justify-between px-6 text-[11px] text-slate-500">
          <span>© 2025 SpiritLynk Outreach Mission</span>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="hover:text-amber-600"
          >
            ← Go back
          </button>
        </footer>
      </div>
    </div>
  );
}
