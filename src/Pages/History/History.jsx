import { useEffect } from 'react';
import DropDown from '../../Components/DropDownMenu/DropDown'
import PatientHistory from '../../Components/PatientHistory/PatientHistory';
import { useState } from 'react';
import { Appointments } from '../../Services/api';
import { useContext } from 'react';
import { AuthContext } from '../../Services/authprovider';
import { FaRegCalendarTimes } from 'react-icons/fa';
import './History.css'

const History = ()=>{
    const { authUser } = useContext(AuthContext)
    const [appointments, setAppointments] = useState([])
    const [appointments_2, setAppointments_2] = useState([])
    const [targetValue, setTargetValue] = useState("")

    useEffect(()=>{
       return  setAppointments_2(appointments.filter(app => app.patient.name.toLowerCase().includes(targetValue.toLowerCase()) || app.date.toLowerCase().includes(targetValue.toLowerCase())))
    
    }, [targetValue])

    useEffect(()=>{
        const getDoctorHistory = async ()=>{
            try{
                const pastAppointments = await Appointments.getDoctorHistory({doctorID: authUser.doc_ID})
                setAppointments(pastAppointments.data)
            } catch (error){
                console.log(error)
            }
        }
        getDoctorHistory()
    }, [])
    
    return(
        <div className="main">
            <div className='searchbar'>
                <div className='searchdiv'>
                    <i className="bi bi-search"></i>
                    <input className='search' placeholder='Search by Patient, Date' onChange={(e) =>setTargetValue(e.target.value)} />
                </div>
                <DropDown/>
            </div>
            <div className='resultsbar'>
                <span>#Patient Name</span>
                <span>Time</span>
                <span>Appointment Date</span>
                <span>Status</span>
            </div>
            { targetValue.length === 0?   appointments.length ? appointments.map((app) => <PatientHistory key={app.selected_apt_ID} name={app.patient.name} time={app.time} appointmentDate={app.date} status={app.status}/>) : <h5 className='noactivity'>No Records <FaRegCalendarTimes /></h5> : appointments_2.length ? appointments_2.map((app) => <PatientHistory key={app.selected_apt_ID} name={app.patient.name} time={app.time} appointmentDate={app.date} status={app.status}/>) : <h5 className='noactivity'>No Records <FaRegCalendarTimes /></h5>}
        </div>
    )
}
export default History