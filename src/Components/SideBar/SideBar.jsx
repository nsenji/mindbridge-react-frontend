import { NavLink } from 'react-router-dom'
import './SideBar.css'
import logo from '../../assets/logo-main.png'
function SideBar(){
    return (
        <div className='SideBar'>
            <img className="logo" src={logo} alt='medbridge'/>
            <ul className='links'>
                <li className='sidebarlink'><NavLink className={({ isActive }) =>
                        isActive
                        ? "bg-primary"
                        : ""
                    } to={'/dashboard'} style={{ textDecoration: 'none' }}><i className="bi bi-bag"></i> Dashboard</NavLink>
                </li>
                <li className='sidebarlink'>
                    <div className="dropdown dropright">
                        <a className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="bi bi-calendar-event"></i> Appointments
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
                        ? "bg-primary"
                        : ""
                    } to={'/history'} style={{ textDecoration: 'none' }}><i className="bi bi-file-earmark-text"></i> History</NavLink>
                </li>
                <li className='sidebarlink'><NavLink className={({ isActive }) =>
                        isActive
                        ? "bg-primary"
                        : ""
                    } to={'/earnings'} style={{ textDecoration: 'none' }}><i className="bi bi-currency-bitcoin"></i> Earnings</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SideBar