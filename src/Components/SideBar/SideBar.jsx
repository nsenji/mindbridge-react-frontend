import { NavLink, useNavigate } from 'react-router-dom'
import './SideBar.css'
import logo from '../../assets/logo-main.png'
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from '../../Services/authprovider'
import { useContext } from 'react'
import { RxDashboard } from "react-icons/rx";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { BsCalendar2Week } from "react-icons/bs";


function SideBar(){
    const { setAuthUser, setAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate()
    function handleLogout(){
        setAuthUser(null)
        setAuthenticated(null)
        navigate('/login')
    }
    return (
        <div className='SideBar d-flex flex-column justify-content-between'>
            <div className='d-flex flex-column'>
                <img className="logo" src={logo} alt='medbridge'/>
                <ul className='links'>
                    <li className='sidebarlink'><NavLink className={({ isActive }) =>
                            isActive
                            ? "text-primary"
                            : ""
                        } to={'/dashboard'} style={{ textDecoration: 'none' }}><RxDashboard/> Dashboard</NavLink>
                    </li>
                    <li className='sidebarlink'>
                        <div className="dropdown dropright">
                            <a className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <BsCalendar2Week/> Appointments
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <ul>
                                    <li>
                                        <NavLink className={({ isActive }) =>
                                            isActive
                                            ? ""
                                            : ""
                                        } to={'/appointments/selected'} style={{ textDecoration: 'none' }}><i className="bi bi-file-earmark-text"></i> Appointments</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) =>
                                            isActive
                                            ? ""
                                            : ""
                                        } to={'/appointments/chosen'} style={{ textDecoration: 'none' }}><i className="bi bi-file-earmark-text"></i> Available Times</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className='sidebarlink'><NavLink className={({ isActive }) =>
                            isActive
                            ? "text-primary"
                            : ""
                        } to={'/history'} style={{ textDecoration: 'none' }}><IoFileTrayStackedOutline/> History</NavLink>
                    </li>
                    <li className='sidebarlink'><NavLink className={({ isActive }) =>
                            isActive
                            ? "text-primary"
                            : ""
                        } to={'/earnings'} style={{ textDecoration: 'none' }}><i className="bi bi-currency-bitcoin"></i> Earnings</NavLink>
                    </li>
                </ul>
            </div>
            <button onClick={handleLogout} className='btn logoutbtn mb-5'><IoIosLogOut /> Logout</button>
        </div>
    )
}

export default SideBar