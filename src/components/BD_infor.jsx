function BD_infor({book}){
    return (
        <>
        <h5 className="fw-medium mt-2">{book.specifications[0].name}</h5>
        <table className="w-100">
            {book.specifications[0].attributes.map(item =>(
                <tr key={item.code} className="border-bottom">
                    <td className="text-secondary pt-2 pb-2">{item.name}</td>
                    <td>{item.value}</td>
                </tr>
            ))}
        </table>
        </>
    )
}

export default BD_infor