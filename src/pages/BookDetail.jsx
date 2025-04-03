import Footer from "../components/Footer";
import Header from "../components/header/Header";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BD_name from "../components/BD_name";
import BD_infor from "../components/BD_infor";
import BD_describ from "../components/BD_describ";
import BD_pay from "../components/BD_pay";
import "../App.css";

function BookDetail() {
    const { id } = useParams(); // Get book ID from URL
    const [book, setBook] = useState(null); // State to store book data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const beUrl = import.meta.env.VITE_APP_BE_URL; // Backend URL

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${beUrl}/books/${id}`); // Correct backend route
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching book details:', err.response || err.message);
                setError('Error fetching book details');
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const [CartCount, SetCartCount] = useState(0); // Cart state
    const AddToCart = () => {
        SetCartCount(CartCount + 1);
    };

    

    return (
        <>
            <Header CartCount={CartCount} />
            <div className="container mb-5 mt-5 BookDetail">
                <div className="row text-start d-flex justify-content-center">
                    <div className="col-md-3">
                        <div className="card shadow" style={{ width: "100%" }}>
                            <div id="img">
                                <img
                                    src={book?.images?.[0]?.medium_url || 'placeholder.jpg'}
                                    className="card-img-top"
                                    alt={book?.name || 'Book Image'}
                                />
                            </div>
                            <div className="card-body" id="features">
                                <h5 className="card-title">Đặc điểm nổi bật</h5>
                                <p className="card-text">
                                    <ul className="fs-6">
                                        <li>Câu chuyện cảm động về tình yêu và sự sống.</li>
                                        <li>Ngôn ngữ sâu sắc, gần gũi và tinh tế.</li>
                                        <li>Được chuyển thể thành phim điện ảnh thành công.</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="border rounded-3 p-3 bg-white" id="name">
                            <BD_name book={book} />
                        </div>
                        <div className="border rounded-3 p-3 bg-white" id="infor">
                            <BD_infor book={book} />
                        </div>
                        <div className="border mt-4 rounded-3 p-3 bg-white" id="describ">
                            <BD_describ book={book} />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="rounded-3 p-3 bg-white border" id="pay">
                            <BD_pay book={book} AddToCart={AddToCart} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BookDetail;