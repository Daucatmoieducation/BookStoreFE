import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState({ username: "", email: "", phone: "" });
    const [editingAccount, setEditingAccount] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const beUrl = import.meta.env.VITE_APP_BE_URL;
    useEffect(() => {
        const fetchAccounts= async () => {
            try {
                const response = await axios.get(`${beUrl}/users`); // Fetch accounts from API
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        fetchAccounts();
    }, []);


    

    const handleAddAccount = async () => {
        if (!newAccount.username || !newAccount.email || !newAccount.phone) {
            alert("All fields are required!");
            return;
        }
        try {
            const response = await axios.post(`${beUrl}/users/register`, newAccount); // Add account via API
            setAccounts([...accounts, response.data]);
            setNewAccount({ username: "", email: "", phone: "" });
        } catch (error) {
            console.error('Error adding account:', error);
        }
    };

    const handleDeleteAccount = async (id) => {
        try {
            await axios.delete(`${beUrl}/users/${id}`); // Delete account via API
            setAccounts(accounts.filter(account => account.id !== id));
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleUpdateAccount = async () => {
        if (!editingAccount.username || !editingAccount.email || !editingAccount.phone) {
            alert("All fields are required!");
            return;
        }
        try {
            const response = await axios.put(`${beUrl}/users/userId/${editingAccount.id}`, editingAccount); // Update account via API
            setAccounts(accounts.map(account => account.id === editingAccount.id ? response.data : account));
            setEditingAccount(null);
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    return (
        <div className="container mt-5">
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
                                <tr key={account._id}>
                                    <td>{account.username}</td>
                                    <td>{account.email}</td>
                                    <td>{account.phone}</td>
                                    <td>{account.password}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => setEditingAccount(account)}
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
                                        type="text" 
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