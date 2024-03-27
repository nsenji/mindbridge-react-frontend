import SideBar from "./SideBar/SideBar"
import { Outlet } from "react-router-dom"
import './Root.css'
const Root = ()=>(
    <div className="root">
        <SideBar/>
        <Outlet/>
    </div>
)

export default Root