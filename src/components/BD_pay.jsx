import Currency from "./Currency"
import  React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function BD_pay({ book, AddToCart}){
    const [Quantity, SetQuantity] = useState(1);

    const Increase = () => {
        SetQuantity(num => num+1);
    }

    const Decrease = () => {
        if (Quantity > 1){
            SetQuantity(num => num-1);
        }
    }
    
    const navigate = useNavigate()
    const handleBuyNow = () => {
        navigate('/payment')
    }

    const price = <Currency val={book.list_price * Quantity} />

    const handleAddToCart = () => {
        AddToCart(book)
    }

    return(
        <>
        <h6>Số lượng</h6>
        <div className="pagination gap-1">
            <button onClick={Decrease} className="btn btn-outline-secondary">
                <i class="bi bi-dash-lg"></i>
            </button>
            <div className="border border-secondary rounded align-self-center ps-3 pe-3 pt-2 pb-2 ">{Quantity}</div>
            <button onClick={Increase} className="btn btn-outline-secondary">
                <i class="bi bi-plus-lg"></i>
            </button>
        </div>
        <h6>Tạm tính</h6>
        <p className="fw-medium fs-3"><Currency val={book.list_price * Quantity} /></p>
        <div class="d-grid gap-2">
            <button class="btn btn-danger" type="button" onClick={handleBuyNow}>Mua ngay</button>
            <button class="btn btn-outline-primary" type="button" onClick={handleAddToCart}>Thêm vào giỏ</button>
            <button class="btn btn-outline-primary" type="button">Mua trước trả sau</button>
        </div>
        </>
    )
}

export default BD_pay