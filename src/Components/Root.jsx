import SideBar from "./SideBar/SideBar"
import { Outlet } from "react-router-dom"
import './Root.css'

const Root = ()=>{
    return(
    <div className="root">
        <SideBar/>
        <Outlet className="outlet"/>
    </div>
    )
}

export default Root