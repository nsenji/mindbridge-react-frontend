import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo-main.png'
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { RiInputCursorMove } from 'react-icons/ri';
import { RiUser2Line } from 'react-icons/ri';
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { BsCalendar2Week } from "react-icons/bs";
import localforage from 'localforage'


function SideBar() {
    const navigate = useNavigate()
    function handleLogout() {
        localforage.setItem('currentUserToken',null)
        navigate('/login')
    }
    return (
        <div className='bg-light-blue w-[18%] m-2 flex flex-col items-center rounded-xl  min-w-[235px]'>
            <div className='flex flex-col items-center flex-grow '>
                <img className="h-[40px] w-[190px] mt-9 mb-9" src={logo} alt='minddbridge' />
                <ul className='links'>
                    <li className='mb-3'>
                        <NavLink className={({ isActive }) =>
                            isActive
                                ? "flex items-center w-[210px] p-1.5 font-semibold bg-dark-blue rounded-lg text-white"
                                : "flex items-center w-[210px] p-1.5"
                        } to={'/dashboard'} ><RxDashboard className='mr-3 ml-2 size-5' /> Dashboard</NavLink>
                    </li>
                    <li className='mb-3'>
                        <NavLink className={({ isActive }) =>
                            isActive
                                ? "flex items-center w-[210px] p-1.5 font-semibold bg-dark-blue rounded-lg text-white"
                                : "flex items-center w-[210px] p-1.5"
                        } to={'/schedule'} ><BsCalendar2Week className='mr-3 ml-2 size-4' /> Schedule</NavLink>
                    </li>

                    <li className='mb-3'>
                        <NavLink className={({ isActive }) =>
                            isActive
                                ? "flex items-center w-[210px] p-1.5 font-semibold bg-dark-blue rounded-lg text-white"
                                : "flex items-center w-[210px] p-1.5"
                        } to={'/history'} ><IoFileTrayStackedOutline className='mr-3 ml-2 size-5' /> History</NavLink>
                    </li>
                    <li className='mb-3'>
                        <NavLink className={({ isActive }) =>
                            isActive
                                ? "flex items-center w-[210px] p-1.5 font-semibold bg-dark-blue rounded-lg text-white"
                                : "flex items-center w-[210px] p-1.5"
                        } to={'/earnings'} ><RiInputCursorMove className='mr-3 ml-2 size-4' /> Earnings</NavLink>
                    </li>

                    <li className='mb-3'>
                        <NavLink className={({ isActive }) =>
                            isActive
                                ? "flex items-center w-[210px] p-1.5 font-semibold bg-dark-blue rounded-lg text-white"
                                : "flex items-center w-[210px] p-1.5"
                        } to={'/profile'} ><RiUser2Line className='mr-3 ml-2 size-4' /> Profile</NavLink>
                    </li>

                </ul>
            </div>
            <div className='h-[13%] ml-1'>
                <hr className="border-t border-white  mt-4"></hr>
                <button onClick={handleLogout} className='flex items-center w-[210px] p-1.5 mt-2 hover:font-semibold hover:bg-hover-blue hover:rounded-lg hover:text-white'><IoIosLogOut className='mr-3 ml-2 size-4' /> Logout</button>
            </div>
        </div>
    )
}

export default SideBar