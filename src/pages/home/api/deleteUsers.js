import axiosDefaultInstance from "axiosApi/axiosDefaultInstance";

export default function deleteUser() {
    return axiosDefaultInstance({
        method: "DELETE",
        url: "/user"
    })
}