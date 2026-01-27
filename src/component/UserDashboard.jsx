import React from "react";

const users = [
  {
    id: "USR001",
    username: "rahul_sharma",
    email: "rahul.sharma@gmail.com",
    company: "Tech Solutions Pvt Ltd",
    whatsapp: "+91 98765 43210",
    status: "Active",
    created: "2024-01-15",
  },
  {
    id: "USR002",
    username: "priya_patel",
    email: "priya.patel@gmail.com",
    company: "Design Studio",
    whatsapp: "+91 87654 32109",
    status: "Active",
    created: "2024-02-20",
  },
  {
    id: "USR003",
    username: "amit_kumar",
    email: "amit.kumar@gmail.com",
    company: "Gold Traders",
    whatsapp: "+91 76543 21098",
    status: "Inactive",
    created: "2024-03-10",
  },
  {
    id: "USR004",
    username: "sneha_gupta",
    email: "sneha.gupta@gmail.com",
    company: "Jewel Mart",
    whatsapp: "+91 65432 10987",
    status: "Active",
    created: "2024-04-05",
  },
  {
    id: "USR005",
    username: "vikram_singh",
    email: "vikram.singh@gmail.com",
    company: "Silver Palace",
    whatsapp: "+91 54321 09876",
    status: "Active",
    created: "2024-05-12",
  },
  {
    id: "USR006",
    username: "neha_verma",
    email: "neha.verma@gmail.com",
    company: "Ornament Hub",
    whatsapp: "+91 43210 98765",
    status: "Inactive",
    created: "2024-06-18",
  },
];

export default function UsersPage() {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [showDetail, setShowDetail] = React.useState(false);

  const openUser = (user) => {
    setSelectedUser(user);
    setTimeout(() => setShowDetail(true), 20);
  };

  const closeUser = () => {
    setShowDetail(false);
    setTimeout(() => setSelectedUser(null), 400);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 bg-[#3b2f24] flex flex-col items-center py-4 space-y-6 z-50">
        <div className="w-10 h-10 bg-[#c8a25a] rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
        <div className="text-white opacity-70">👥</div>
        <div className="text-white opacity-70">📦</div>
        <div className="text-white opacity-70">📊</div>
        <div className="text-white opacity-70 mt-auto">🚪</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* USERS TABLE */}
        <div
          className={`${selectedUser ? "opacity-40 pointer-events-none" : ""}`}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold">👤 All Users</h1>
              <p className="text-sm text-gray-500">
                {users.length} total users
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#c8a25a] text-white px-4 py-2 rounded-lg"
            >
              + Add User
            </button>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#c8a25a] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">USER ID</th>
                  <th className="px-4 py-3 text-left">USERNAME</th>
                  <th className="px-4 py-3 text-left">GMAIL</th>
                  <th className="px-4 py-3 text-left">COMPANY</th>
                  <th className="px-4 py-3 text-left">WHATSAPP</th>
                  <th className="px-4 py-3 text-left">STATUS</th>
                  <th className="px-4 py-3 text-left">CREATED</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => openUser(u)}
                    className="border-b cursor-pointer hover:bg-[#faf7f2]"
                  >
                    <td className="px-4 py-3 text-[#c8a25a]">{u.id}</td>
                    <td className="px-4 py-3 font-medium">{u.username}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.company}</td>
                    <td className="px-4 py-3">{u.whatsapp}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          u.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{u.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* SLIDE USER DETAIL PANEL */}
      {selectedUser && (
        <div
          className={`fixed top-0 right-0 h-full w-[calc(100%-4rem)]
          bg-[#faf7f2] z-40 transform transition-transform duration-400 ease-in-out
          ${showDetail ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={closeUser}
                className="text-2xl text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold">User Details</h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-full bg-[#c8a25a] text-white flex items-center justify-center text-2xl font-bold">
                  {selectedUser.username.charAt(0).toUpperCase()}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <Detail label="User ID" value={selectedUser.id} />
                  <Detail label="Username" value={selectedUser.username} />
                  <Detail label="Email" value={selectedUser.email} />
                  <Detail label="Company" value={selectedUser.company} />
                  <Detail label="WhatsApp" value={selectedUser.whatsapp} />
                  <Detail label="Created" value={selectedUser.created} />
                  <Detail
                    label="Status"
                    value={
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          selectedUser.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {selectedUser.status}
                      </span>
                    }
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 bg-[#c8a25a] text-white rounded-lg">
                  Edit User
                </button>
                <button className="px-4 py-2 border rounded-lg text-red-500">
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">Add New User</h2>
            <input
              className="w-full border p-2 rounded mb-2"
              placeholder="Username"
            />
            <input
              className="w-full border p-2 rounded mb-2"
              placeholder="Email"
            />
            <button className="w-full bg-[#c8a25a] text-white py-2 rounded">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
