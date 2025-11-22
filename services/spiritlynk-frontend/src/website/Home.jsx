export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#f9f5ec] text-[#3c3215]">

      <h1 className="text-5xl font-bold mb-4 tracking-wide">
        Welcome to SpiritLynk Hub
      </h1>

      <p className="text-lg text-gray-700 mb-10 max-w-2xl text-center">
        A unified ministry platform for membership, media, communication, and church growth.
      </p>

      <div className="flex gap-6">
        <a
          href="/login"
          className="px-6 py-3 bg-[#c89b3c] text-white rounded-lg shadow-lg text-lg hover:bg-[#b3872f] transition"
        >
          Login
        </a>

        <a
          href="/register"
          className="px-6 py-3 bg-white border border-[#c89b3c] text-[#3c3215] rounded-lg shadow text-lg hover:bg-[#f3e9d7] transition"
        >
          Create Account
        </a>
      </div>

    </section>
  );
}
