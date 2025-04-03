import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const BookManagement = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        _id: '',
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
    const [showUpModal, setShowUpModal] = useState(false);

    const beUrl = import.meta.env.VITE_APP_BE_URL;

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${beUrl}/books`); // Fetch accounts from API
            setBooks(response.data);
            console.log(books)
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAddBook = async () => {
        if (!newBook.title || !newBook.author) {
            alert("Tiêu đề và tác giả là bắt buộc!");
            return;
        }

        try {
            // Tạo cấu trúc dữ liệu phù hợp với MongoDB
            const bookToAdd = {
                name: newBook.title,
                authors: [
                    {
                        name: newBook.author,
                        slug: newBook.author.toLowerCase().replace(/\s+/g, '-')
                    }
                ],
                categories: newBook.category,
                description: newBook.description,
                book_cover: newBook.bookCover,
                list_price: newBook.price,
                original_price: newBook.price, // Giả sử giá gốc giống như giá bán
                quantity_sold: {
                    text: "Chưa bán",
                    value: 0,
                },
                rating_average: 0, // Giả sử đánh giá trung bình là 0 khi thêm mới
                short_description: newBook.description.slice(0, 100), // Lấy 100 ký tự đầu cho mô tả ngắn
                specifications: [], // Bạn có thể thêm thông số kỹ thuật nếu có
                current_seller: {
                    id: 1, // Ví dụ, ID cửa hàng hiện tại, thay đổi tùy theo yêu cầu
                    sku: 'sku-1234',
                    name: 'Store Name',
                    link: '#',
                    logo: '',
                    price: newBook.price,
                    product_id: 'prod-1234',
                    store_id: 1,
                    is_best_store: true,
                    is_offline_installment_supported: false,
                },
                images: [
                    {
                        base_url: newBook.bookCover,
                        is_gallery: false,
                        label: null,
                        large_url: newBook.bookCover,
                        medium_url: newBook.bookCover,
                        position: 0,
                        small_url: newBook.bookCover,
                        thumbnail_url: newBook.bookCover,
                    }
                ],
                id: newBook.isbn, // Có thể sử dụng ISBN làm ID, hoặc tự động tạo ID trong MongoDB
            };

            // Gửi yêu cầu POST để thêm sách vào cơ sở dữ liệu
            const response = await axios.post(`${beUrl}/books`, bookToAdd);
            const addedBook = response.data;

            // Thêm sách vào danh sách hiện tại
            setBooks([...books, addedBook]);

            // Reset form nhập liệu
            setNewBook({
                id: '',
                title: '',
                author: '',
                category: '',
                isbn: '',
                publishedYear: '',
                description: '',
                price: '',
                bookCover: ''
            });
            fetchBooks(); // Cập nhật lại danh sách sách sau khi thêm
            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Có lỗi xảy ra khi thêm sách');
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`${beUrl}/books/${id}`); // Gửi yêu cầu DELETE để xóa sách theo ID
            setBooks(books.filter(book => book._id !== id)); // Cập nhật lại danh sách sách
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Có lỗi xảy ra khi xóa sách');
        }
    };

    const handleUpdateBook = async () => {
        if (!newBook.title || !newBook.author) {
            alert("Tiêu đề và tác giả là bắt buộc!");
            return;
        }

        try {
            // Create the structure for the updated book data
            const updatedBook = {
                name: newBook.title,
                authors: [
                    {
                        name: newBook.author,
                        slug: newBook.author.toLowerCase().replace(/\s+/g, '-')
                    }
                ],
                categories: newBook.category,
                description: newBook.description,
                book_cover: newBook.bookCover,
                list_price: parseFloat(newBook.price),
                original_price: parseFloat(newBook.price),
                quantity_sold: {
                    text: "Chưa bán",
                    value: 0,
                },
                rating_average: 0,
                short_description: newBook.description.slice(0, 100), // First 100 characters as short description
                specifications: [],
                current_seller: {
                    id: 1,
                    sku: 'sku-1234',
                    name: 'Store Name',
                    link: '#',
                    logo: '',
                    price: parseFloat(newBook.price),
                    product_id: 'prod-1234',
                    store_id: 1,
                    is_best_store: true,
                    is_offline_installment_supported: false,
                },
                images: [
                    {
                        base_url: newBook.bookCover,
                        is_gallery: false,
                        label: null,
                        large_url: newBook.bookCover,
                        medium_url: newBook.bookCover,
                        position: 0,
                        small_url: newBook.bookCover,
                        thumbnail_url: newBook.bookCover,
                    }
                ],
                id: newBook.isbn, // Use ISBN as the ID
            };

            // Send the updated data to the API
            const response = await axios.put(`${beUrl}/books/${newBook.id}`, updatedBook);
            const updatedBookData = response.data;

            // Update the book list with the updated data
            setBooks(books.map(book => book.id === updatedBookData.id ? updatedBookData : book));

            // Reset form data and close the modal
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
            fetchBooks(); // Refresh the book list after updating
            setShowAddModal(false);
        } catch (error) {
            console.error('Error updating book:', error);
            alert('Có lỗi xảy ra khi cập nhật sách');
        }
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
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book?._id}>
                                    <td>{book?.name}</td>
                                    <td>{book?.authors && book.authors[0]?.name}</td>
                                    <td>{book?.categories && book.categories}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteBook(book._id)}
                                        >
                                            Xoá
                                        </button>
                                        <button
                                            className="btn btn-warning btn-sm ml-2"
                                            onClick={() => {
                                                // Populate the form with the existing book data
                                                setNewBook({
                                                    id: book._id,
                                                    title: book.name,
                                                    author: book.authors[0]?.name,
                                                    category: book.categories,
                                                    isbn: book.id,
                                                    description: book.description,
                                                    price: book.list_price,
                                                    bookCover: book.book_cover,
                                                });
                                                setShowUpModal(true); // Open the modal to edit the book
                                            }}
                                        >
                                            Sửa
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
            {showUpModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">{newBook.isbn ? "Cập nhật sách" : "Thêm sách mới"}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowUpModal(false)}
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
                                                disabled // Don't allow changing the ISBN for updates
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
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
                                    onClick={() => setShowUpModal(false)}
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleUpdateBook} // Use handleUpdateBook for updates
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

export default BookManagement;
