import "../../App.css"
import { Link } from 'react-router-dom'

function Cart({ CartCount }){
    return (
      <Link to = {'/cart'} >
      <button type="button" className="cart btn position-relative">
          <i className="bi bi-cart-fill" style={{color:'#0060ff'}}></i>  
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {CartCount}
            <span className="visually-hidden" aria-label="Items in Cart"></span>
          </span>
      </button>
    </Link>
  )
}

export default Cart