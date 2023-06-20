import axiosDefaultInstance from "axiosApi/axiosDefaultInstance";

export default function updateUser() {
    return axiosDefaultInstance({
        method: "PUT",
        url: "/user"
    })
}