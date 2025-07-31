import { api } from "../apiUtils"

const apiGetAllUser = async (pageIndex: number, pageSize: number, keyword: string) => {
    try {
        const res = await api.get(`users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`)
        return res.data.content
    } catch (error) {
        throw error
    }
}

const getAllRoomAdmin = () => {
    return api.get("phong-thue")
        .catch((err: any) => {
            console.log(err)
            throw err.response?.data || new Error("Không thể tải danh sách phòng.");
        });
};

/**
 * 🆕 API: Upload hình ảnh phòng
 * @param {string | number} roomId - mã phòng (API Swagger ghi là string, nhưng number cũng thường được chấp nhận)
 * @param {File} file - file hình ảnh (.jpg/.png)
 */
const uploadRoomImageService = async (roomId: string | number, file: File) => {

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    console.log("File được chọn:", file);
    console.log("Loại file:", file.type);

    if (!validTypes.includes(file.type)) {
        throw new Error(`File không hợp lệ (${file.type}). Chỉ chấp nhận JPG/PNG`);
    }

    const formData = new FormData();
    formData.append("formFile", file); // <-- kiểm tra lại nếu backend yêu cầu key khác

    try {
        const response = await api.post(`rooms/upload-hinh-phong?maPhong=${roomId}`, formData);

        if (!response.data) {
            throw new Error("Không nhận được phản hồi từ server");
        }

        return response.data;
    } catch (error: any) {
        console.error("Chi tiết lỗi upload:", {
            status: error.response?.status,
            data: error.response?.data,
            config: error.config,
        });
        throw new Error(error.response?.data?.message || "Lỗi khi upload ảnh");
    }
};

export const apiAdmin = {
    apiGetAllUser,
    uploadRoomImageService,
    getAllRoomAdmin
}
