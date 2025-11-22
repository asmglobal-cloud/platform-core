export default function Dashboard() {
  return (
    <div className="w-full max-w-[1100px] mx-auto pt-10 px-10">

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[#3c3215] mb-4">
        SpiritLynk Admin Dashboard
      </h1>

      <p className="text-[#7a6d56] mb-10 text-sm">
        Welcome! Use the left menu to access modules.
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="bg-white p-6 rounded-xl shadow border border-[#e0d8c7]/70">
          <h2 className="font-bold text-lg text-[#3c3215]">Members</h2>
          <p className="text-[#7a6d56] text-sm">
            Manage registrations & profiles.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-[#e0d8c7]/70">
          <h2 className="font-bold text-lg text-[#3c3215]">Media Library</h2>
          <p className="text-[#7a6d56] text-sm">
            Upload sermons, videos & PDFs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-[#e0d8c7]/70">
          <h2 className="font-bold text-lg text-[#3c3215]">SMS</h2>
          <p className="text-[#7a6d56] text-sm">
            Send mass messages.
          </p>
        </div>

      </div>

    </div>
  );
}
