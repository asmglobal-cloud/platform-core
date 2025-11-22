import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TypewriterText from "../components/TypewriterText";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function goBack() {
    window.history.back();
  }

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#f6f4ef] text-[#252321] overflow-x-hidden">

      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside className="w-40 bg-white border-r border-[#e5dfd2] flex flex-col shadow-sm">
        <div className="px-4 py-6 flex flex-col items-center border-b border-[#e5dfd2]">
          <div className="h-10 w-10 rounded-xl bg-[#e1b866] text-white flex items-center justify-center font-bold shadow-sm">
            SL
          </div>
        </div>

        <nav className="flex-1 px-2 py-6 space-y-1 text-[13px] font-medium">
          {[
            { to: "/dashboard", label: "Dashboard", icon: "📊" },
            { to: "/dashboard/members", label: "Members", icon: "👥" },
            { to: "/dashboard/media", label: "Media", icon: "📁" },
            { to: "/dashboard/podcast", label: "Podcast", icon: "🎧" },
            { to: "/dashboard/social", label: "Social Hub", icon: "🌍" },
            { to: "/dashboard/sms", label: "SMS", icon: "✉️" },
            { to: "/dashboard/settings", label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                  isActive
                    ? "bg-[#f8f3e4] text-[#3c3215] font-semibold"
                    : "text-[#6b614c] hover:bg-[#f2ead8]"
                ].join(" ")
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ───── BACK BUTTON ───── */}
        <div className="border-t border-[#e5dfd2] px-2 py-3">
          <button
            onClick={goBack}
            className="flex items-center gap-2 w-full px-3 py-2 text-[13px] rounded-lg text-[#6b614c] hover:bg-[#f2ead8]"
          >
            ← Back
          </button>
        </div>

        {/* ───── LOGOUT BUTTON ───── */}
        <div className="px-4 py-4 border-t border-[#e5dfd2]">
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs w-full hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN PANEL */}
      <div className="flex-1 flex flex-col">

        {/* HEADER (unchanged) */}
        <header className="h-24 bg-white border-b border-[#e5dfd2] flex items-center justify-between px-8 shadow-sm">
          <div className="w-32"></div>

          <div className="text-center">
            <h2 className="text-[18px] font-bold text-[#3c3215]">
              SpiritLynk Control Panel
            </h2>

            <TypewriterText
              texts={[
                "Members Management",
                "Media & Sermons Library",
                "SMS Messaging Center",
                "Outreach & Missions Console",
              ]}
              speed={85}
              pause={1200}
            />
          </div>

          {/* Account Dropdown */}
          <div className="relative w-32 flex justify-end">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-10 w-10 rounded-full bg-[#c89b3c] text-white flex items-center justify-center text-xs font-bold shadow"
            >
              SA
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-[#e5dfd2] p-4 z-50"
              >
                <div className="mb-3">
                  <p className="text-sm font-semibold text-[#3c3215]">Solomon Akonnor</p>
                  <p className="text-[12px] text-[#7c725d]">
                    spiritlynkoutreachmission@gmail.com
                  </p>
                </div>

                <hr className="border-[#e5dfd2] my-2" />

                <ul className="space-y-2 text-[13px] text-[#6b614c]">
                  <li className="hover:text-[#c89b3c] cursor-pointer">Account Information</li>
                  <li className="hover:text-[#c89b3c] cursor-pointer">Security</li>
                  <li className="hover:text-[#c89b3c] cursor-pointer">Account Sharing</li>
                  <li className="hover:text-[#c89b3c] cursor-pointer">Account Activity</li>
                  <li className="hover:text-[#c89b3c] cursor-pointer">Notification Settings</li>
                  <li className="hover:text-[#c89b3c] cursor-pointer">Language (English)</li>
                </ul>

                <hr className="border-[#e5dfd2] my-3" />

                <button
                  onClick={logout}
                  className="text-red-600 text-sm font-semibold hover:text-red-800"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT WRAPPER */}
        <main className="flex-1 px-6 py-10 flex justify-center">
          <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-md p-8 border border-[#e5dfd2]">
            <Outlet />
          </div>
        </main>

        <footer className="h-12 bg-white border-t border-[#e5dfd2] flex items-center justify-center text-[11px] text-[#8b816e]">
          © 2025 SpiritLynk Outreach Mission
        </footer>
      </div>
    </div>
  );
}
