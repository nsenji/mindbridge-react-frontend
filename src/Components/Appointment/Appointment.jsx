import './Appointment.css'
import { MdOutlineCalendarMonth } from "react-icons/md";

export default function Appointment({id, patientName, date, time, status, diagnosis}){
    const today = new Date();
    let currentdate = `${today.getDate().toString()}-${today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1 }`}-${today.getFullYear().toString()}`
    return(
        <>
            <div className={currentdate == date ? 'todaysappointment': 'appointment'} id={currentdate == date ? `todaysapp`: 'app'} data-bs-toggle="modal" data-bs-target={`#todaysapp${id}`}>
                <span>{patientName}</span>
                <span>{date}</span>
                <span>{time}</span>
                <span className='status'>{status}</span>
            </div>

            {/* Modal */}
            <div className="modal" tabIndex="-1" role="dialog" id={`todaysapp${id}`} aria-labelledby="todaysapp" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Appointment Details</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='modaldetails'>
                                    <span>{patientName}</span>
                                    <span>{date}</span>
                                    <span>{time}</span>
                                    <span className='status'>{status}</span>
                                    <span>{diagnosis}</span>
                                </div>
                                {currentdate == date ? <button className='btn sendlink'>Start Call</button> : null}
                            </div>
                            </div>
                        </div>
                </div>
        </>
    )
}