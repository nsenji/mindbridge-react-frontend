import './CreatedAppointment.css'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuClock4 } from "react-icons/lu";

const CreatedAppointment = ({date, time, status})=>{
    return(
        <div className='createdappointment'>
            <span><LuClock4/> {time}</span>
            <span>{date}</span>
            <span className='availablestatus'>{status}</span>
            <div className='actions'>
                <FaPencilAlt className='actionbtn'/>
                <MdDelete className='delete'/>
            </div>
        </div>
    )
}
export default CreatedAppointment