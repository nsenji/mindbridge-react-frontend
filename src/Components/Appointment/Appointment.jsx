import './Appointment.css'
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
export default function Appointment({id, patientName, date, time, status, diagnosis, patientEmail}){
    const navigate = useNavigate()
    const today = new Date();
    let currentdate = `${today.getFullYear().toString()}-${today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1 }-${today.getDate().toString()}`}`
    return(
        <>
            <div className={currentdate == date ? 'todaysappointment': 'appointment'} id={currentdate == date ? `todaysapp`: 'app'} data-bs-toggle="modal" data-bs-target={currentdate == date ? `#todaysapp${id}` : `#app${id}`}>
                <span>{patientName}</span>
                <span>{date}</span>
                <span>{time}</span>
                <span className='status'>{status}</span>
            </div>

            {/* Modal */}
            <div className="modal" tabIndex="-1" role="dialog" id={currentdate == date ? `todaysapp${id}` : `app${id}`} aria-labelledby="todaysapp" aria-hidden="true">
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
                                    <span>Name: {patientName}</span>
                                    <span>Date: {date}</span>
                                    <span>Time: {time}</span>
                                    <span className='status'>Status: {status}</span>
                                    <span>Diagnosis: {diagnosis}</span>
                                </div>
                                {currentdate == date ? <button onClick={()=>{$('.modal-dialog').modal('hide'), $('body').removeClass('modal-open'), $('.modal-backdrop').remove(), navigate('/meeting-room', {state: {patientEmail}})}} className='btn sendlink'>Start Call</button> : null}
                            </div>
                            </div>
                        </div>
                </div>
        </>
    )
}