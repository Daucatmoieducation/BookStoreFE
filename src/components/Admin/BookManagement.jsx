import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookManagement = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        category: '',
        isbn: '',
        publishedYear: '',
        description: '',
        price: '',
        bookCover: ''
    });
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        // Fetch books from API (mock data for now)
        setBooks([{ id: 1, title: 'Book 1', author: 'Author 1', category: 'Category 1', isbn: '1234567890', publishedYear: '2020' }]);
    }, []);

    const handleAddBook = () => {
        if (!newBook.title || !newBook.author) {
            alert("Tiêu đề và tác giả là bắt buộc!");
            return;
        }
        setBooks([...books, { ...newBook, id: books.length + 1 }]);
        setNewBook({
            title: '',
            author: '',
            category: '',
            isbn: '',
            publishedYear: '',
            description: '',
            price: '',
            bookCover: ''
        });
        setShowAddModal(false);
    };

    const handleDeleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <div className="container mt-5">
            {/* Book List */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h3 className="card-title mb-0">Danh sách sách</h3>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Tiêu đề</th>
                                <th>Tác giả</th>
                                <th>Thể loại</th>
                                <th>ISBN</th>
                                <th>Năm xuất bản</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.publishedYear}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => handleDeleteBook(book.id)}
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

            {/* Button to open Add Book Modal */}
            <div className="text-end mb-3">
                <button 
                    className="btn btn-success"
                    onClick={() => setShowAddModal(true)}
                >
                    Thêm sách mới
                </button>
            </div>

            {/* Add Book Modal */}
            {showAddModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Thêm sách mới</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Tiêu đề</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Nhập tiêu đề" 
                                                value={newBook.title} 
                                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} 
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Tác giả</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Nhập tác giả" 
                                                value={newBook.author} 
                                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} 
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Thể loại</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Nhập thể loại" 
                                                value={newBook.category} 
                                                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })} 
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>ISBN</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Nhập ISBN" 
                                                value={newBook.isbn} 
                                                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Năm xuất bản</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Nhập năm xuất bản" 
                                                value={newBook.publishedYear} 
                                                onChange={(e) => setNewBook({ ...newBook, publishedYear: e.target.value })} 
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Giá</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                placeholder="Nhập giá" 
                                                value={newBook.price} 
                                                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })} 
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Ảnh bìa (URL)</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Nhập URL ảnh bìa" 
                                                value={newBook.bookCover} 
                                                onChange={(e) => setNewBook({ ...newBook, bookCover: e.target.value })} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Mô tả</label>
                                    <textarea 
                                        className="form-control" 
                                        placeholder="Nhập mô tả" 
                                        value={newBook.description} 
                                        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} 
                                        rows="3"
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
                                    onClick={handleAddBook}
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

export default BookManagement;
