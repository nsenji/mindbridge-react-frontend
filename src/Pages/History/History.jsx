import './History.css'
import DropDown from '../../Components/DropDownMenu/DropDown'

const History = ()=>{
    return(
        <div className="main">
            <div className='searchbar'>
                <div className='searchdiv'>
                    <i className="bi bi-search"></i>
                    <input className='search' placeholder='Search Patient'/>
                </div>
                <DropDown/>
            </div>
            <div className='resultsbar'>
                <span>#</span>
                <span>Patient Name</span>
                <span>Email</span>
                <span>Appointment Date</span>
                <span>Status</span>
            </div>
        </div>
    )
}
export default History