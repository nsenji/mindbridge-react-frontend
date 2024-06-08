import { Link } from 'react-router-dom';

import logo from "../assets/logo-main.png"

export default function NavBar() {
    return (
        <nav className="bg-white flex items-center mx-4 mt-4 justify-between">
            <Link>
                <img className='h-[40px] w-[190px]' src={logo} alt="app logo" color='#082063'/>
            </Link>
            <p className=' font-semibold text-lg text-dark-blue'>
                DOCTOR PORTAL
            </p>
        </nav>
    );
}

