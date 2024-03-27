import SideBar from "./SideBar/SideBar"
import { Outlet } from "react-router-dom"
const Root = ()=>(
    <>
        <SideBar/>
        <Outlet/>
    </>
)

export default Root