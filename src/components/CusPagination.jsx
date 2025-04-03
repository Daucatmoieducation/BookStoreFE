function CusPagination(){
    return(
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center gap-2">
                <li class="page-item active">
                    <a class="page-link rounded-2 border-0" href="#">1</a>
                </li>
                <li class="page-item">
                    <a class="page-link border-0 rounded-2" 
                    style={{background:"#f9f9f9", color:"gray"}} href="">2</a>
                </li>
                <li class="page-item">
                    <a class="page-link border-0 rounded-2" 
                    style={{background:"#f9f9f9", color:"gray"}} href="">3</a>
                </li>
                <li class="page-item">
                    <a class="page-link border-0 rounded-2" 
                    style={{background:"#f9f9f9", color:"gray"}} href="">4</a>
                </li>
                <li class="page-item">
                    <a class="page-link border-0 rounded-2" 
                    style={{background:"#f9f9f9", color:"gray"}} href="">5</a>
                </li>
                <li class="page-item">
                    <a class="page-link border-0  text-white" 
                    style={{background:"#f9f9f9", color:"#f9f9f9"}} href="">1</a>
                </li>
                <li class="page-item">
                    <a class="page-link border-0 rounded-2" 
                    style={{background:"#f9f9f9", color:"gray"}} href="">50</a>
                </li>
            </ul>
        </nav>
    )
}

export default CusPagination