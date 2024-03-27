import './DropDown.css'
const DropDown = ()=>{
    return(
        <select className="dropdown-button">
            <option value="ascending" selected>Ascending</option>
            <option value="descending">Descending</option>
        </select>
    )
}

export default DropDown