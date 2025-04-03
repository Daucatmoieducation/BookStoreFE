import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: "", is_leaf: false });
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        // Fetch categories from API (mock data for now)
        setCategories([
            { id: 1, name: "Category 1", is_leaf: true },
            { id: 2, name: "Category 2", is_leaf: false },
        ]);
    }, []);

    const handleAddCategory = () => {
        if (!newCategory.name) {
            alert("Tên danh mục là bắt buộc!");
            return;
        }
        setCategories([
            ...categories,
            { ...newCategory, id: categories.length + 1 },
        ]);
        setNewCategory({ name: "", is_leaf: false });
        setShowAddModal(false);
    };

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter((category) => category.id !== id));
    };

    return (
        <div className="container mt-5">

            
            {/* Category List */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h3 className="card-title mb-0">Danh sách danh mục</h3>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Tên</th>
                                <th>Là danh mục lá</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.is_leaf ? "Có" : "Không"}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDeleteCategory(category.id)
                                            }
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
            {/* Button to open Add Category Modal */}
            <div className="text-end mb-3">
                <button
                    className="btn btn-success"
                    onClick={() => setShowAddModal(true)}
                >
                    Thêm danh mục mới
                </button>
            </div>

            {/* Add Category Modal */}
            {showAddModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Thêm danh mục mới</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label>Tên danh mục</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập tên danh mục"
                                        value={newCategory.name}
                                        onChange={(e) =>
                                            setNewCategory({
                                                ...newCategory,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Là danh mục lá</label>
                                    <select
                                        className="form-control"
                                        value={newCategory.is_leaf}
                                        onChange={(e) =>
                                            setNewCategory({
                                                ...newCategory,
                                                is_leaf: e.target.value === "true",
                                            })
                                        }
                                    >
                                        <option value="true">Có</option>
                                        <option value="false">Không</option>
                                    </select>
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
                                    onClick={handleAddCategory}
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;