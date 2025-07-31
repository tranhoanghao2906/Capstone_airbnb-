'use client'
import React from "react";
import "./sidebar.css";
import { toast } from "react-toastify";
// import { logOutAction } from "../../../../Customer/redux/userSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux/hooks";

export default function Sidebar() {
//   const dispatch = useDispatch();
//   const { user } = useAppSelector((state) => state.userSlice);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // dispatch(logOutAction());
    router.push("/");
  };

  return (
    <div className="sidebar-body">
      <div className="sidebar-sidebar">
        <div className="sidebar-logo">
          <i className="sidebar-icon fab fa-airbnb"></i>
          <h2 className="sidebar-h2">airbnb</h2>
        </div>
        <ul className="sidebar-ul">
          <Link href="/admin">
            <li
              className={`sidebar-li ${
                pathname === "/admin" ? "active" : ""
              }`}
            >
              <span className="sidebar-span">Quản lý người dùng</span>
            </li>
          </Link>
          <Link href="/LocationPage">
            <li
              className={`sidebar-li ${
                pathname === "/LocationPage" ? "active" : ""
              }`}
            >
              <span className="sidebar-span">Quản lý thông tin vị trí</span>
            </li>
          </Link>
          <Link href="/admin/rooms">
            <li
              className={`sidebar-li ${
                pathname === "/admin/rooms" ? "active" : ""
              }`}
            >
              <span className="sidebar-span">Quản lý phòng</span>
            </li>
          </Link>
          <Link href="/ReservationPage">
            <li
              className={`sidebar-li ${
                pathname === "/ReservationPage" ? "active" : ""
              }`}
            >
              <span className="sidebar-span">Quản lý đặt phòng</span>
            </li>
          </Link>
          {/* <div className="sidebar-logout">
            <div className="sidebar-avatar">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="avatar"
                className="sidebar-avatar-img"
              />
            </div>
            <button onClick={handleLogout} className="logout-button-text">
              <span>Đăng xuất</span>
            </button>
          </div> */}
        </ul>
      </div>
    </div>
  );
}
