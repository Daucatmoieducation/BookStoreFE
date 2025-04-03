function Currency(props){
    let cur = new Intl.NumberFormat('vi-VN').format(props.val);
    return (
        <>
            {cur}
            <span style={{ fontSize: '0.8em', verticalAlign:'super'}}>₫</span>
        </>
    )
}

export default Currency