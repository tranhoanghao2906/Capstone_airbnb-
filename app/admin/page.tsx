'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { apiAdmin } from "../api/apiAdmin/apiAdmin";
import { TUser } from "../types/typeUser";
import { useAppSelector } from "../redux/hooks";


// const Sidebar = () => (
//   <aside className="bg-[#3b2322] text-white w-full md:w-64 min-h-screen flex flex-col p-4 gap-2">
//     <button className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 text-blue-200 font-semibold">
//       <span className="text-lg">👤</span>
//       Quản lý người dùng
//     </button>
//     <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10">
//       <span className="text-lg">📍</span>
//       Quản lý vị trí
//     </button>
//     <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10">
//       <span className="text-lg">🏠</span>
//       Quản lý Room
//     </button>
//     <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10">
//       <span className="text-lg">📖</span>
//       Quản lý Booking
//     </button>
//   </aside>
// );

const AdminPage = () => {
  const [listUser, setListUser] = useState<TUser[]>([])
  const {isLoading} = useAppSelector(state => state.loading)
  useEffect(() => {
    apiAdmin.apiGetAllUser(1, 10, "")
      .then((res) => {
        setListUser(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="flex min-h-screen bg-[#f7f6f4]">
      {/* Sidebar */}
      {/* <div className="hidden md:block w-64"><Sidebar /></div>
      <div className="md:hidden fixed top-0 left-0 z-20"><Sidebar /></div> */}
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
                {listUser.map((user) => {
                  console.log(user)
                  return <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{user.id}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      {user.avatar ? (
                        <Image src={user.avatar} alt={user.name} width={36} height={36} className="rounded-full object-cover" />
                      ) : (
                        <span className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-2xl">👤</span>
                      )}
                      <span className="font-bold uppercase">{user.name}</span>
                    </td>
                    <td className="py-3 px-4">{user.birthday}</td>
                    <td className="py-3 px-4 underline text-blue-700">{user.email}</td>
                    <td className="py-3 px-4 font-bold" style={{ color: user.role === "ADMIN" ? "#ff0000" : "#009900" }}>{user.role}</td>
                    <td className="py-3 px-4 flex gap-3 text-xl">
                      <button title="Sửa"><span>✏️</span></button>
                      <button title="Xóa"><span>🗑️</span></button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;