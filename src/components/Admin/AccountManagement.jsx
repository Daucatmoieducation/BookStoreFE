import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Form, Input, Button } from 'antd';

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
    const [editingAccount, setNewAccount] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpModal, setShowUpModal] = useState(false);
    const beUrl = import.meta.env.VITE_APP_BE_URL;
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const token = localStorage.getItem('accessToken');

    const fetchAccounts = async () => {
        try {
            const response = await axios.get(`${beUrl}/users`); // Fetch accounts from API
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };
    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleAddAccount = async (values) => {
        try {
            const response = await axios.post(`${beUrl}/users/register`, values); // Add account via API
            setAccounts([...accounts, response.data]);
            form.resetFields();
            fetchAccounts(); // Reload the list
            setShowAddModal(false);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const serverErrors = error.response.data.errors;
                form.setFields(
                    Object.keys(serverErrors).map((field) => ({
                        name: field,
                        errors: [serverErrors[field]],
                    }))
                );
            } else {
                alert("An error occurred while adding the account.");
            }
        }
    };

    const handleDeleteAccount = async (id) => {
        try {
            await axios.delete(`${beUrl}/users/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchAccounts(); // Reload the list
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleUpdateAccount = async (values) => {
        try {
            await axios.put(`${beUrl}/users/${editingAccount.id}`, values,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }); // Update account via API
            fetchAccounts(); // Reload the list
            setNewAccount(null);
            setShowUpModal(false); // Close the modal after updating
        } catch (error) {
            console.error('Error updating account:', error);
            alert("An error occurred while updating the account. Please try again later.");
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
                                            onClick={() => {
                                                setNewAccount({
                                                    id: account._id,
                                                    username: account.username,
                                                    email: account.email,
                                                    phone: account.phone,
                                                }); // Set the account to be edited
                                                editForm.setFieldsValue({
                                                    username: account.username,
                                                    email: account.email,
                                                    phone: account.phone,
                                                }); // Pre-fill the form with account details
                                                setShowUpModal(true);
                                            }}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteAccount(account._id)}
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
                                <Form
                                    form={form}
                                    onFinish={handleAddAccount}
                                    layout="vertical"
                                    className="bg-white w-[400px] p-5 rounded-lg"
                                >
                                    <Form.Item
                                        label="Họ và tên"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên của bạn!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập tên của bạn" className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email của bạn!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Vui lòng nhập một địa chỉ email hợp lệ!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập email của bạn" className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số điện thoại của bạn!',
                                            },
                                            {
                                                min: 10,
                                                max: 11,
                                                message: 'Vui lòng nhập số diện thoại hợp lệ!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập số điện thoại của bạn" className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu của bạn!',
                                            },
                                            {
                                                min: 6,
                                                message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="Nhập mật khẩu của bạn" className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        name="confirm"
                                        label="Xác nhận mật khẩu"
                                        dependencies={['password']}
                                        hasFeedback
                                        className="mb-10"
                                        rules={[
                                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password className="p-2" placeholder="Xác nhận mật khẩu" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="w-full py-4">
                                            Thêm
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Chỉnh sửa tài khoản */}
            {showUpModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-warning text-white">
                                <h5 className="modal-title">Chỉnh sửa tài khoản</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowUpModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <Form
                                    form={editForm}
                                    onFinish={handleUpdateAccount}
                                    layout="vertical"
                                    initialValues={{
                                        username: editingAccount.username,
                                        email: editingAccount.email,
                                        phone: editingAccount.phone,
                                    }}
                                    className="bg-white w-[400px] p-5 rounded-lg"
                                >
                                    <Form.Item
                                        label="Họ và tên"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên của bạn!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập tên của bạn" className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email của bạn!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Vui lòng nhập một địa chỉ email hợp lệ!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập email của bạn" className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số điện thoại của bạn!',
                                            },
                                            {
                                                min: 10,
                                                max: 11,
                                                message: 'Vui lòng nhập số diện thoại hợp lệ!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập số điện thoại của bạn" className="p-2" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="w-full py-4 justify-center">
                                            Cập nhật
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountManagement;