import { Link } from 'react-router-dom';
import Rating from './Rating';
import Currency from './Currency';

function Book({ data }) {
  return (
    <Link
      to={'book/' + data._id} // Use _id from the backend
      className="container w-100 card mt-1 border-0 text-decoration-none shadow"
    >
      {/* Book Image */}
      <img
        src={data.images?.[0]?.base_url || 'placeholder.jpg'} // Fallback to placeholder if no image
        className="card-img-top"
        alt={data.name || 'Book Image'}
        height={180}
      />

      <div className="mt-2 card-body">
        {/* Book Title */}
        <h6 className="fw-normal card-title" style={{ fontSize: '1rem' }}>
          {data.name || 'No Title Available'}
        </h6>

        <div className="card-subtitle" style={{ fontSize: '0.75rem' }}>
          {/* Rating */}
          <span className="border-end pe-1">
            <Rating st={data.rating_average || 0} />
          </span>
          {/* Quantity Sold */}
          <span className="text-secondary fw-light ps-1">
            {data.quantity_sold?.text || 'No Sales Data'}
          </span>
        </div>
      </div>

      {/* Price */}
      <p className="card-text fw-medium fs-4 ms-3 mb-4" style={{ fontSize: '1.25rem' }}>
        <Currency val={data.list_price || 0} />
      </p>

      {/* Footer */}
      <div className="card-footer bg-white text-center text-body-secondary">
        Giao siêu tốc 2h
      </div>
    </Link>
  );
}

export default Book;