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
                    }to={'/'} style={{ textDecoration: 'none' }}><i className="bi bi-house"></i> Home</NavLink>
                </li>
                <li className='sidebarlink'><NavLink className={({ isActive }) =>
                        isActive
                        ? "bg-primary"
                        : ""
                    } to={'/dashboard'} style={{ textDecoration: 'none' }}><i className="bi bi-bag"></i> Dashboard</NavLink>
                </li>
                <li className='sidebarlink'><NavLink className={({ isActive }) =>
                        isActive
                        ? "bg-primary"
                        : ""
                    } to={'/my-schedule'} style={{ textDecoration: 'none' }}><i className="bi bi-calendar-event"></i> My Schedule</NavLink>
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