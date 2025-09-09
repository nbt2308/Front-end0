import React, { useState } from "react";

// // // Hàm bỏ dấu tiếng Việt
const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD") // Tách dấu
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export default function Test() {
    const [search, setSearch] = useState("");

    const users = ["An", "Bình", "Chi", "Dũng", "Hà", "Hoàng", "Lan", "Minh", "Ánh", "oanh"];

    const filteredUsers = users.filter(user =>
        user.toLowerCase().includes(search.toLowerCase())
    );



    return (
        <div style={{ padding: "20px", maxWidth: "400px" }}>
            <input
                type="text"
                placeholder="Tìm tên người dùng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginBottom: "10px",
                }}
            />

            <ul>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => <li key={index}>{user}</li>)
                ) : (
                    <li>Không tìm thấy kết quả</li>
                )}
            </ul>
        </div>
    );
}


