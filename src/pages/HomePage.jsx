import Book from "../components/Book"
import React, { useState, useEffect } from "react";
import CardL from "../components/Card_HP"
import BreadCrumb from "../components/BreadCrumb"
import CusPagination from "../components/CusPagination"
import axios from "axios";
import "../App.css"


function HomePage(){
  const [books, setBooks] = useState([]); // State to store books
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const beUrl = import.meta.env.VITE_APP_BE_URL;
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${beUrl}/books`); // Replace with your backend URL
        setBooks(response.data); // Set the books data
        setLoading(false);
      } catch (err) {
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
    return(
      <div className="container">
        <BreadCrumb />
        <div className="row d-flex justify-content-center">
          <div className="col-md-2 d-none d-lg-block">
            <CardL books={books}/>
          </div>
          <div className="col-md-10" id='book'>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
              {books.map(book => (
                <div key={book._id} className="col d-flex flex-wrap mb-3">
                  <Book data={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <CusPagination />
        </div>
      </div>
    )
}

export default HomePage