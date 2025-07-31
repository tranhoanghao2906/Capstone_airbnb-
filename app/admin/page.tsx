import React from "react";
import Image from "next/image";

const users = [
  {
    id: 1,
    username: "ERJHHY",
    avatar: "/erjhhy.jpg", // Thay bằng ảnh thật nếu có
    birthday: "29/11/1993",
    email: "admin@gmail.com",
    role: "ADMIN",
  },
  {
    id: 43982,
    username: "TRI",
    avatar: "",
    birthday: "26/12/2024",
    email: "jimoluw@mailinator.com",
    role: "USER",
  },
  {
    id: 43983,
    username: "HÙNG CÀO",
    avatar: "",
    birthday: "27/12/2024",
    email: "dyxypa@mailinator.com",
    role: "USER",
  },
  {
    id: 43984,
    username: "VERRA",
    avatar: "/verra.jpg",
    birthday: "06/12/2024",
    email: "verra@aov.vn",
    role: "USER",
  },
  {
    id: 43986,
    username: "LONGDAN",
    avatar: "",
    birthday: "25/12/2024",
    email: "dipipuro@mailinator.com",
    role: "USER",
  },
  {
    id: 43989,
    username: "KHẢI TRẦN",
    avatar: "",
    birthday: "21/01/2025",
    email: "njceshort4@gmail.com",
    role: "ADMIN",
  },
];

const Sidebar = () => (
  <aside className="bg-[#3b2322] text-white w-full md:w-64 min-h-screen flex flex-col p-4 gap-2">
    <button className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 text-blue-200 font-semibold">
      <span className="text-lg">👤</span>
      Quản lý người dùng
    </button>
    <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10">
      <span className="text-lg">📍</span>
      Quản lý vị trí
    </button>
    <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10">
      <span className="text-lg">🏠</span>
      Quản lý Room
    </button>
    <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10">
      <span className="text-lg">📖</span>
      Quản lý Booking
    </button>
  </aside>
);

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f7f6f4]">
      {/* Sidebar */}
      <div className="hidden md:block w-64"><Sidebar /></div>
      <div className="md:hidden fixed top-0 left-0 z-20"><Sidebar /></div>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#3b2322] text-white px-8 py-4">
          <button className="md:hidden text-2xl mr-4">☰</button>
          <div></div>
          <div className="flex items-center gap-2">
            <Image src="/erjhhy.jpg" alt="avatar" width={40} height={40} className="rounded-full object-cover" />
            <span className="font-bold">ERJHHY</span>
          </div>
        </div>
        {/* Content */}
        <div className="p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3b2322]">Quản lý User</h1>
            <button className="bg-[#ff8686] text-white px-4 py-2 rounded font-semibold hover:bg-[#ff5c5c]">+ Thêm người dùng</button>
          </div>
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none"
          />
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full text-left">
              <thead className="bg-[#f7f6f4]">
                <tr>
                  <th className="py-3 px-4">Nã ID</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Birthday</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Người dùng</th>
                  <th className="py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{user.id}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      {user.avatar ? (
                        <Image src={user.avatar} alt={user.username} width={36} height={36} className="rounded-full object-cover" />
                      ) : (
                        <span className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-2xl">👤</span>
                      )}
                      <span className="font-bold uppercase">{user.username}</span>
                    </td>
                    <td className="py-3 px-4">{user.birthday}</td>
                    <td className="py-3 px-4 underline text-blue-700">{user.email}</td>
                    <td className="py-3 px-4 font-bold" style={{ color: user.role === "ADMIN" ? "#ff0000" : "#009900" }}>{user.role}</td>
                    <td className="py-3 px-4 flex gap-3 text-xl">
                      <button title="Sửa"><span>✏️</span></button>
                      <button title="Xóa"><span>🗑️</span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;