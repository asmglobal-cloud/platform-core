export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#3c3215] flex flex-col">

      {/* NAVBAR */}
      <header className="bg-white border-b border-[#e5dfd2] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-20">

          {/* BRAND */}
          <h1 className="text-3xl font-extrabold tracking-wide whitespace-nowrap">
            SpiritLynk Hub
          </h1>

          {/* NAV LINKS WITH CLEAR SPACING */}
          <nav className="flex items-center gap-14 text-[20px] font-semibold">
            <a href="/features" className="hover:text-[#c89b3c] transition">Features</a>
            <a href="/pricing" className="hover:text-[#c89b3c] transition">Pricing</a>
            <a href="/about" className="hover:text-[#c89b3c] transition">About</a>
            <a href="/contact" className="hover:text-[#c89b3c] transition">Contact</a>
          </nav>

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-10 text-[18px] font-semibold">
            <a href="/login" className="px-6 py-3 border border-[#c89b3c] rounded-lg hover:bg-[#f8f3e4] transition">
              Login
            </a>

            <a href="/register" className="px-7 py-3 bg-[#c89b3c] text-white rounded-lg shadow hover:bg-[#b3872f] transition">
              Get Started
            </a>
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="h-20 bg-white border-t border-[#e5dfd2] flex items-center justify-center text-sm text-[#8b816e]">
        © {new Date().getFullYear()} SpiritLynk Outreach Mission — All Rights Reserved
      </footer>

    </div>
  );
}
