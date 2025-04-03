import "../../App.css"

function Infor(props){
    return(
        <>
        <button className="btn bg-white gap-1 d-flex me-0" id="icon" style={props.color}>
            <i className={props.icon}></i>
            {props.name}
        </button>
        </>
    )
}

export default Infor