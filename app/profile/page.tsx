import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Xin chào, tôi là AKJSDJKSSsa</h1>
          <p className="text-gray-500 mt-1">Bắt đầu tham gia vào 2023</p>
          <a href="#" className="font-semibold underline text-black mt-2 inline-block">Chỉnh sửa hồ sơ</a>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar bên trái */}
          <div className="w-full md:w-1/4 bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-5xl mb-2">
              <span role="img" aria-label="avatar">👤</span>
            </div>
            <button className="text-sm text-blue-600 underline mb-2">Cập nhật ảnh</button>
            <div className="flex items-center gap-2 mt-2 mb-2">
              <span className="text-green-600 text-xl">✔️</span>
              <span className="font-bold text-lg">Xác minh danh tính</span>
            </div>
            <p className="text-center text-gray-600 text-sm mb-4">Xác minh danh tính của bạn với huy hiệu xác minh danh tính.</p>
            <button className="px-4 py-2 border rounded mb-4">Nhận huy hiệu</button>
            <div className="w-full border-t pt-4 mt-2">
              <h3 className="font-bold text-base mb-1">AKJSDJKSSSA ĐÃ XÁC NHẬN</h3>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>✔</span>
                <span>Địa chỉ email</span>
              </div>
            </div>
          </div>
          {/* Thông tin phòng */}
          <div className="w-full md:w-3/4 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Phòng đã thuê</h2>
            <div className="rounded-2xl shadow flex flex-col md:flex-row overflow-hidden">
              {/* Ảnh phòng */}
              <div className="relative w-full md:w-2/5 min-h-[180px] flex items-center">
                <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-1 text-xs font-semibold shadow">Guest favorite</div>
                <Image src="/R.jpeg" alt="Room" width={300} height={200} className="object-cover w-full h-full" />
                <button className="absolute top-3 right-3 text-2xl">♡</button>
                <button className="absolute right-3 bottom-3 bg-white rounded-full p-2 shadow">▶</button>
              </div>
              {/* Thông tin */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Toàn bộ căn hộ dịch vụ tại Nha Trang</p>
                  <h3 className="text-xl font-bold mb-2">Tầng 25 Căn hộ 1 phòng ngủ ấm cúng và hiện đại</h3>
                  <div className="flex flex-wrap gap-2 text-gray-600 text-sm mb-2">
                    <span>4 khách</span>
                    <span>• 1 phòng ngủ</span>
                    <span>• 1 giường</span>
                    <span>• 1 phòng tắm</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-gray-600 text-sm mb-2">
                    <span>Wifi</span>
                    <span>• Bếp</span>
                    <span>• Điều hòa nhiệt độ</span>
                    <span>• Tivi</span>
                    <span>• Đỗ xe</span>
                    <span>• Hồ bơi</span>
                  </div>
                </div>
                <div className="flex justify-end items-center mt-2">
                  <span className="text-lg font-bold mr-1">$ 15</span>
                  <span className="text-gray-500">/ đêm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
