import Rating from "../components/Rating";
import Currency from "../components/Currency";

function BD_name({book}){
    return (
        <>
        <img src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png" 
            width={90} />
        <span style={{fontSize:"14px"}}> Tác giả: </span>
        <span style={{fontSize:"14px"}} className="text-primary">{book.authors ? book.authors[0].name: ''}</span>
        <h5 className="fw-medium mt-2">{book.name}</h5>
        {/* sao và đã bán */}
        <span> {book.rating_average} </span> 
        {/* sao */}
        <span className='border-end ps-1 pe-1'>
            <Rating st={book.rating_average} />
        </span>
        {/* đã bán */}
        <span className='text-secondary fw-light ps-1'>
            {book.quantity_sold ? book.quantity_sold.text : ''}
        </span>
        <p className="fw-medium fs-3"><Currency val={book.list_price} /></p>
        </>
    )
}

export default BD_name