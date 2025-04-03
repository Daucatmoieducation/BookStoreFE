import parse from 'html-react-parser';

function BD_describ({book}){
    return (
        <>
            <h5>Mô tả sản phẩm</h5>
            <img src={book.images[0].medium_url} alt="..." width={"100%"} />
            {parse(book.description)}
        </>
    )
}

export default BD_describ