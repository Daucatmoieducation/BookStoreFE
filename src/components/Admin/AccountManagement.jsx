import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState({ 
        username: "", 
        email: "", 
        phone: "", 
        password: "" 
    });
    const [editingAccount, setEditingAccount] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        // Fetch accounts from API (mock data for now)
        setAccounts([
            { id: 1, username: "user1", email: "user1@example.com", phone: "1234567890", password: "123456" },
            { id: 2, username: "user2", email: "user2@example.com", phone: "0987654321", password: "123456" },
        ]);
    }, []);

    const handleAddAccount = () => {
        if (!newAccount.username || !newAccount.email || !newAccount.phone || !newAccount.password) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        setAccounts([...accounts, { ...newAccount, id: accounts.length + 1 }]);
        setNewAccount({ username: "", email: "", phone: "", password: "" });
        setShowAddModal(false);
    };

    const handleDeleteAccount = (id) => {
        setAccounts(accounts.filter((account) => account.id !== id));
    };

    const handleEditAccount = (account) => {
        setEditingAccount(account);
    };

    const handleUpdateAccount = () => {
        if (!editingAccount.username || !editingAccount.email || !editingAccount.phone || !editingAccount.password) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        setAccounts(
            accounts.map((account) =>
                account.id === editingAccount.id ? editingAccount : account
            )
        );
        setEditingAccount(null);
    };

    return (
        <div className="container mt-5">
            {/* Account List - Hiển thị password thực */}
            <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Danh sách tài khoản</h3>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.username}</td>
                                    <td>{account.email}</td>
                                    <td>{account.phone}</td>
                                    <td>{account.password}</td> {/* Hiển thị password thực */}
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEditAccount(account)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteAccount(account.id)}
                                        >
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Nút thêm tài khoản mới */}
            <div className="text-end mb-3">
                <button
                    className="btn btn-success"
                    onClick={() => setShowAddModal(true)}
                >
                    Thêm tài khoản mới
                </button>
            </div>

            {/* Modal Thêm tài khoản */}
            {showAddModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Thêm tài khoản mới</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={newAccount.username}
                                        onChange={(e) =>
                                            setNewAccount({ ...newAccount, username: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={newAccount.email}
                                        onChange={(e) =>
                                            setNewAccount({ ...newAccount, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Phone"
                                        value={newAccount.phone}
                                        onChange={(e) =>
                                            setNewAccount({ ...newAccount, phone: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="text"  // Hiển thị password dạng text để dễ chỉnh sửa
                                        className="form-control"
                                        placeholder="Password"
                                        value={newAccount.password}
                                        onChange={(e) =>
                                            setNewAccount({ ...newAccount, password: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleAddAccount}
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Chỉnh sửa tài khoản */}
            {editingAccount && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-warning text-white">
                                <h5 className="modal-title">Chỉnh sửa tài khoản</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setEditingAccount(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={editingAccount.username}
                                        onChange={(e) =>
                                            setEditingAccount({
                                                ...editingAccount,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={editingAccount.email}
                                        onChange={(e) =>
                                            setEditingAccount({
                                                ...editingAccount,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Phone"
                                        value={editingAccount.phone}
                                        onChange={(e) =>
                                            setEditingAccount({
                                                ...editingAccount,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="text"  // Hiển thị password dạng text để dễ chỉnh sửa
                                        className="form-control"
                                        placeholder="Password"
                                        value={editingAccount.password}
                                        onChange={(e) =>
                                            setEditingAccount({
                                                ...editingAccount,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setEditingAccount(null)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={handleUpdateAccount}
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountManagement;