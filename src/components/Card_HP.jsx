import Rating from './Rating';
import React, { useState} from 'react';
import useFilter from './useFilter';

function CardL({ books }) {
    const {categories, sellers} = useFilter(books);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllSellers, setShowAllSellers] = useState(false);

    const toggleShowAllCategories = () => {
        setShowAllCategories(!showAllCategories);
    };

    const toggleShowAllSellers = () => {
        setShowAllSellers(!showAllSellers);
      };

    return (
        <>
        <div className="card m-1 shadow border-0" style={{ width: "100%" }}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h6>Danh mục sản phẩm</h6>
                    <div>
                        {categories.slice(0, showAllCategories ? categories.length : 4).map((category, index) => (
                            <li key={index} className="list-unstyled mb-0" style={{ padding: '4px 0' }}>{category}</li>
                        ))}
                        {categories.length > 4 && (
                            <button onClick={toggleShowAllCategories} className="btn btn-link text-decoration-none fw-medium">{showAllCategories ? 'Ẩn bớt' : 'Xem thêm'}</button>
                        )}
                    </div>
                </li>
                <li className="list-group-item">
                    <h6>Nhà cung cấp</h6>
                    {sellers.slice(0, showAllSellers ? sellers.length : 4).map((seller, index) => (
                        <label key={index} 
                            className="form-check-label d-flex gap-2" 
                            >
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                            {seller}
                        </label>
                    ))}
                    {sellers.length > 4 && (
                        <button onClick={toggleShowAllSellers} className='btn btn-link text-decoration-none fw-medium'>{showAllSellers ? 'Ẩn bớt' : 'Xem thêm'}</button>
                    )}
                </li>
                <li className="list-group-item mt-2">
                    <h6>Đánh giá</h6>
                    <ul className='list-unstyled'>
                        <li className='mt-3'>
                            <Rating st = '5'/>
                            <span> từ 5 sao</span>
                        </li>
                        <li>
                            <Rating st = '4'/>
                            <span> từ 4 sao</span>
                        </li>
                        <li className='mb-3'>
                            <Rating st = '3'/>
                            <span> từ 3 sao</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        </>
    )
}

export default CardL