'use client'
import React, { useCallback, useEffect, useState } from "react";
import roomStyle from "./rooms.module.css";
import { apiAdmin } from "@/app/api/apiAdmin/apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { TRoom } from "@/app/types/typeRoom";

// Component AlertMessage (để hiển thị thông báo)
const AlertMessage = ({ message, type = "error" }: { message: string | null, type: string }) => {
    if (!message) return null;
    const alertStyle = {
        padding: "10px",
        margin: "10px 0",
        border: `1px solid ${type === "error" ? "red" : "green"}`,
        color: type === "error" ? "red" : "green",
        backgroundColor: type === "error" ? "#ffebee" : "#e8f5e9",
        borderRadius: "4px",
        textAlign: "center",
    };
    return <div style={{ ...alertStyle, textAlign: "center" }}>{message}</div>;
};

// State ban đầu cho form
const initialFormState = {
    tenPhong: "",
    khach: 1,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    // banUi: false, // Kiểm tra nếu trùng với banLa
    maViTri: "", // Nếu API yêu cầu số, khởi tạo là 0 hoặc null
    hinhAnh: "", // Giữ lại để hiển thị URL ảnh hiện tại khi edit
};

const AdminsRoomsPage = () => {
    const [rooms, setRooms] = useState<TRoom[]>([]);
    const [searchRoom, setSearchRoom] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
    const [form, setForm] = useState(initialFormState);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State cho file hình ảnh đã chọn
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State cho preview hình ảnh

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const itemsPerPage = 10;

    const fetchRooms = useCallback(() => {
        setLoading(true);
        setError(null);
        apiAdmin.getAllRoomAdmin()
            .then((res) => setRooms(res?.data?.content || []))
            .catch((err) => {
                console.error("Lỗi khi tải danh sách phòng (component):", err);
                setError(err.message || "Lỗi khi tải danh sách phòng.");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setSelectedFile(null);
            setImagePreview(null);
            setError("Vui lòng chọn ảnh!");
            return;
        }

        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            setSelectedFile(null);
            setImagePreview(null);
            setError(
                `File không hợp lệ (${file.type}). Chỉ chấp nhận JPG, JPEG hoặc PNG`
            );
            return;
        }

        setSelectedFile(file);
        setError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // const handleUploadImage = async (roomId, file) => {
    //   try {
    //     const formData = new FormData();
    //     formData.append("formFile", file);

    //     await uploadRoomImageService(roomId, formData);
    //     toast.success("Tải ảnh lên thành công!");
    //     fetchRooms();
    //   } catch (error) {
    //     toast.error("Tải ảnh lên thất bại!");
    //     console.error(error);
    //   }
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        let processedValue = value;
        if (type === "number") {
            processedValue = value === "" ? "" : parseFloat(value).toString();
            if (isNaN(Number(processedValue))) processedValue = "0";
        } else if (type === "checkbox") {
            processedValue = checked ? "true" : "false";
        }
        setForm({ ...form, [name]: processedValue });
    };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError(null);
    //     setSuccessMessage(null);

    //     console.log("🧪 Kiểm tra định dạng file:", selectedFile?.type);

    //     if (
    //         selectedFile &&
    //         !["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)
    //     ) {
    //         setError(
    //             `File không hợp lệ (${selectedFile.type}). Chỉ chấp nhận JPG, JPEG hoặc PNG`
    //         );
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         const payload = {
    //             ...form,
    //             khach: parseInt(form.khach, 10),
    //             phongNgu: parseInt(form.phongNgu, 10),
    //             giuong: parseInt(form.giuong, 10),
    //             phongTam: parseInt(form.phongTam, 10),
    //             giaTien: parseInt(form.giaTien, 10),
    //         };
    //         delete payload.hinhAnh;

    //         let roomResult;

    //         if (isEditing) {
    //             // Cập nhật phòng
    //             const updated = await updateRoomService(editingRoomId, payload);
    //             roomResult = updated;

    //             // Upload ảnh nếu có
    //             if (selectedFile) {
    //                 // const formData = new FormData();
    //                 // formData.append("formFile", selectedFile);
    //                 try {
    //                     await uploadRoomImageService(editingRoomId, selectedFile);
    //                     toast.success("Cập nhật ảnh thành công");
    //                 } catch (uploadErr) {
    //                     console.error("Lỗi upload ảnh:", uploadErr);
    //                     toast.warning(
    //                         "Cập nhật phòng thành công nhưng upload ảnh thất bại"
    //                     );
    //                 }
    //             }

    //             toast.success("Cập nhật phòng thành công!");
    //         } else {
    //             // Thêm phòng
    //             const created = await addroomService(payload);
    //             roomResult = created.content;

    //             // Upload ảnh nếu có
    //             if (selectedFile) {
    //                 // const formData = new FormData();
    //                 // formData.append("formFile", selectedFile);
    //                 try {
    //                     await uploadRoomImageService(roomResult.id, selectedFile);
    //                     toast.success("Upload ảnh thành công");
    //                 } catch (uploadErr) {
    //                     console.warn("Lỗi upload ảnh:", uploadErr);
    //                     toast.warning("Thêm phòng thành công nhưng upload ảnh thất bại");
    //                 }
    //             }

    //             toast.success("Thêm phòng thành công!");
    //         }

    //         await fetchRooms();
    //         resetFormAndFile();
    //     } catch (error) {
    //         console.error("Lỗi chính:", error);
    //         toast.error(error.message || "Có lỗi xảy ra.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const resetFormAndFile = () => {
        setForm(initialFormState);
        setIsEditing(false);
        setEditingRoomId(null);
        setShowForm(false);
        setSelectedFile(null);
        setImagePreview(null);
        // setError(null); // Giữ lại để người dùng thấy lỗi nếu có
        // setSuccessMessage(null); // Sẽ tự mất sau timeout
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa phòng này không?")) {
            setLoading(true);
            try {
                // await deleteRoomService(id);
                setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
                toast.success("Xóa phòng thành công!");
                fetchRooms();
            } catch (err: any) {
                console.error("Lỗi khi xóa phòng (component):", err);
                toast.error(err.message || "Lỗi khi xóa phòng.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (room: TRoom) => {
        const formFields = {
            tenPhong: room.tenPhong || "",
            khach: room.khach || 0,
            phongNgu: room.phongNgu || 0,
            giuong: room.giuong || 0,
            phongTam: room.phongTam || 0,
            moTa: room.moTa || "",
            giaTien: room.giaTien || 0,
            mayGiat: room.mayGiat || false,
            banLa: room.banLa || false,
            tivi: room.tivi || false,
            dieuHoa: room.dieuHoa || false,
            wifi: room.wifi || false,
            bep: room.bep || false,
            doXe: room.doXe || false,
            hoBoi: room.hoBoi || false,
            maViTri: room.maViTri || "",
            hinhAnh: room.hinhAnh || "", // Để hiển thị ảnh hiện tại
        };
        setForm(formFields as any);
        setIsEditing(true);
        setEditingRoomId(room.id);
        setShowForm(true);
        setSelectedFile(null); // Reset file đã chọn khi mở form edit
        setImagePreview(room.hinhAnh || null); // Hiển thị ảnh hiện tại của phòng làm preview
        setError(null);
        setSuccessMessage(null);
    };

    // filteredRoom, totalPages, startIndex, currentRooms, changePage (giữ nguyên)
    const filteredRoom = rooms?.filter((room) =>
        room?.tenPhong?.toLowerCase().includes(searchRoom.toLowerCase())
    );
    const totalPages = Math.ceil(filteredRoom?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentRooms = filteredRoom?.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccessMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, successMessage]);

    return (
        <div className={roomStyle.roomlist_body}>
            <div className={roomStyle.roomlist_main}>
                <div className={roomStyle.roomlist_header}>
                    <h1 className={roomStyle.roomlist_h1}>Quản lý Phòng</h1>
                    <div className={roomStyle.roomlist_logout}>
                        <Link href="/">
                            <span>
                                <i className={roomStyle.roomlist_home + " fa fa-home"}></i>
                            </span>
                        </Link>
                    </div>
                </div>

                <AlertMessage message={error} type="error" />
                <AlertMessage message={successMessage} type="success" />

                <div className={roomStyle.roomlist_controls}>
                    <button
                        className={roomStyle.roomlist_btn_add}
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showForm || isEditing) resetFormAndFile();
                        }}
                    >
                        {showForm ? "Đóng Form" : "Thêm phòng"}
                    </button>
                    <input
                        type="text"
                        placeholder="Tìm kiếm phòng theo tên..."
                        className={roomStyle.roomlist_search_box}
                        value={searchRoom}
                        onChange={(e) => {
                            setSearchRoom(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {showForm && (
                    <form
                        // onSubmit={handleSubmit}
                        className={roomStyle.roomlist_form}>
                        <div className={roomStyle.roomlist_form_group}>
                            <label htmlFor="tenPhong" className={roomStyle.roomlist_label}>
                                Tên phòng:
                            </label>
                            <input
                                id="tenPhong"
                                className={roomStyle.roomlist_input}
                                name="tenPhong"
                                value={form.tenPhong}
                                onChange={handleChange}
                                placeholder="Nhập tên phòng"
                                required
                            />
                        </div>
                        <div className={roomStyle.roomlist_form_group}>
                            <label htmlFor="khach" className={roomStyle.roomlist_label}>
                                Số khách tối đa:
                            </label>
                            <input
                                id="khach"
                                className={roomStyle.roomlist_input}
                                name="khach"
                                type="number"
                                value={form.khach}
                                onChange={handleChange}
                                placeholder="Số khách"
                                required
                                min="0"
                            />
                        </div>

                        <div className={roomStyle.roomlist_form_group}>
                            <label htmlFor="phongNgu" className={roomStyle.roomlist_label}>
                                Số phòng ngủ:
                            </label>
                            <input
                                id="phongNgu"
                                className={roomStyle.roomlist_input}
                                name="phongNgu"
                                type="number"
                                value={form.phongNgu}
                                onChange={(e) => { handleChange(e as any) }}
                                placeholder="Số phòng ngủ"
                                min="0"
                            />
                        </div>
                        <div className={roomStyle.roomlist_form_group}>
                            <label htmlFor="giuong" className={roomStyle.roomlist_label}>
                                Số giường:
                            </label>
                            <input
                                id="giuong"
                                className={roomStyle.roomlist_input}
                                name="giuong"
                                type="number"
                                value={form.giuong}
                                onChange={(e) => { handleChange(e as any) }}
                                placeholder="Số giường"
                                min="0"
                            />
                        </div>

                        <div className={roomStyle.roomlist_form_group}>
                            <label htmlFor="phongTam" className={roomStyle.roomlist_label}>
                                Số phòng tắm:
                            </label>
                            <input
                                id="phongTam"
                                className={roomStyle.roomlist_input}
                                name="phongTam"
                                type="number"
                                value={form.phongTam}
                                onChange={(e) => { handleChange(e as any) }}
                                placeholder="Số phòng tắm"
                                min="0"
                            />
                        </div>
                        <div className={roomStyle.roomlist_form_group}>
                            <label htmlFor="giaTien" className={roomStyle.roomlist_label}>
                                Giá tiền / đêm:
                            </label>
                            <input
                                id="giaTien"
                                className={roomStyle.roomlist_input}
                                name="giaTien"
                                type="number"
                                value={form.giaTien}
                                onChange={(e) => { handleChange(e as any) }}
                                placeholder="Giá tiền"
                                required
                                min="0"
                                step="any"
                            />
                        </div>

                        <div className={roomStyle.roomlist_form_group + " " + roomStyle.roomlist_form_group_full_width}>
                            <label htmlFor="moTa" className={roomStyle.roomlist_label}>
                                Mô tả phòng:
                            </label>
                            <textarea
                                id="moTa"
                                className={roomStyle.roomlist_input}
                                name="moTa"
                                value={form.moTa}
                                onChange={(e) => { handleChange(e as any) }}
                                placeholder="Nhập mô tả chi tiết về phòng"
                            />
                        </div>

                        <div className={roomStyle.roomlist_form_group}>
                            <label htmlFor="maViTri" className={roomStyle.roomlist_label}>
                                Mã vị trí:
                            </label>
                            <input
                                id="maViTri"
                                className={roomStyle.roomlist_input}
                                name="maViTri"
                                value={form.maViTri}
                                onChange={(e) => { handleChange(e as any) }}
                                placeholder="Nhập mã vị trí (số)"
                                required
                            />
                        </div>
                        <div className={roomStyle.roomlist_form_group}>
                            <label htmlFor="hinhAnhFile" className={roomStyle.roomlist_label}>
                                Hình ảnh phòng:
                            </label>
                            <input
                                type="file"
                                id="hinhAnhFile"
                                // value={form.hinhAnh}
                                className={roomStyle.roomlist_input_file}
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                            />
                            {imagePreview && (
                                <div className="image-preview-container">
                                    <img src={imagePreview} alt="Xem trước" />
                                </div>
                            )}
                            {selectedFile && (
                                <p className="selected-file-name">
                                    Đã chọn: {selectedFile.name}
                                </p>
                            )}
                        </div>

                        <div className={roomStyle.roomlist_form_group + " " + roomStyle.roomlist_form_group_full_width + " " + roomStyle.roomlist_form_group_amenities}>
                            <label className={roomStyle.roomlist_label}>Tiện ích:</label>
                            <div className={roomStyle.roomlist_checkbox_container}>
                                {[
                                    { name: "mayGiat", label: "Máy giặt" },
                                    { name: "banLa", label: "Bàn là" },
                                    { name: "tivi", label: "TiVi" },
                                    { name: "dieuHoa", label: "Điều hòa" },
                                    { name: "wifi", label: "Wifi" },
                                    { name: "bep", label: "Bếp" },
                                    { name: "doXe", label: "Đỗ xe" },
                                    { name: "hoBoi", label: "Hồ bơi" },
                                    /*, {name: "banUi", label: "Bàn Ủi"} */
                                ].map((item) => (
                                    <label key={item.name} className={roomStyle.roomlist_checkbox_label}>
                                        <input
                                            type="checkbox"
                                            name={item.name}
                                            checked={form[item.name as keyof typeof form] === "true"}
                                            onChange={(e) => { handleChange(e as any) }}
                                        />{" "}
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={roomStyle.roomlist_form_actions + " " + roomStyle.roomlist_form_actions_full_width}>
                            <button className={roomStyle.roomlist_btn} type="submit" disabled={loading}>
                                {loading
                                    ? "Đang xử lý..."
                                    : isEditing
                                        ? "Cập nhật"
                                        : "Thêm mới"}
                            </button>
                            <button
                                type="button"
                                className={roomStyle.roomlist_btn_cancel}
                                onClick={resetFormAndFile}
                                disabled={loading}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                )}

                {loading && !showForm && <p>Đang tải dữ liệu phòng...</p>}
                {!loading && !filteredRoom.length && !showForm && (
                    <p>Không tìm thấy phòng nào phù hợp.</p>
                )}

                {currentRooms?.length > 0 && (
                    <table className={roomStyle.roomlist_room_table}>
                        <thead>
                            <tr>
                                <th className={roomStyle.roomlist_th}>Mã</th>
                                <th className={roomStyle.roomlist_th}>Tên phòng</th>
                                <th className={roomStyle.roomlist_th}>Hình ảnh</th>
                                <th className={roomStyle.roomlist_th}>Giá tiền</th>
                                <th className={roomStyle.roomlist_th}>Khách</th>
                                <th className={roomStyle.roomlist_th}>Mã Vị Trí</th>
                                <th className={roomStyle.roomlist_th}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRooms?.map((room) => (
                                <tr key={room.id}>
                                    <td className={roomStyle.roomlist_td}>{room.id}</td>
                                    <td className={roomStyle.roomlist_td}>{room.tenPhong}</td>
                                    <td className={roomStyle.roomlist_td}>
                                        {room.hinhAnh ? (
                                            <img
                                                src={room.hinhAnh}
                                                alt={room.tenPhong || "Hình ảnh phòng"}
                                                width="80"
                                                onError={(e: any) => {
                                                    e.target.style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    <td className={roomStyle.roomlist_td}>
                                        {room.giaTien?.toLocaleString()} $
                                    </td>
                                    <td className={roomStyle.roomlist_td}>{room.khach}</td>
                                    <td className={roomStyle.roomlist_td}>{room.maViTri}</td>
                                    <td className={roomStyle.roomlist_td}>
                                        <button
                                            className={roomStyle.roomlist_btn_edit}
                                            onClick={() => handleEdit(room)}
                                            title="Sửa"
                                        >
                                            <i className="roomlist-i fas fa-edit" />
                                        </button>
                                        <button
                                            className={roomStyle.roomlist_btn_delete}
                                            onClick={() => handleDelete(room.id)}
                                            title="Xóa"
                                        >
                                            <i className="roomlist-i fas fa-trash" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {totalPages > 1 && (
                    <div className={roomStyle.roomlist_pagination}>
                        <button
                            onClick={() => changePage(currentPage - 1)}
                            className={roomStyle.roomlist_button}
                        >
                            «
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => changePage(i + 1)}
                                className={`${roomStyle.roomlist_button} ${currentPage === i + 1 ? roomStyle.roomlist_button_active : ""
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => changePage(currentPage + 1)}
                            className={roomStyle.roomlist_button}
                        >
                            »
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}
export default AdminsRoomsPage
