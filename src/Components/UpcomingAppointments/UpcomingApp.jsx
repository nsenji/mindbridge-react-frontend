import './UpcomingApp.css'
import Appointment from '../Appointment/Appointment'
import { FaRegCalendarTimes } from "react-icons/fa";
import { useEffect, useState, useContext } from 'react';
import { Appointments } from '../../Services/api';
import { AuthContext } from '../../Services/authprovider';

export default function UpcomingApp(){

    const { authUser } = useContext(AuthContext)

    const today = new Date();
    let currentdate = `${today.getDate().toString()}-${today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1 }`}-${today.getFullYear().toString()}`
    const [appointments, setAppointments] = useState([])

    useEffect(()=>{
        const getAppointments = async ()=>{
        try{
            let scheduledAppointments = await Appointments.getScheduledAppointments({doctorID: authUser.doc_ID})
            setAppointments(scheduledAppointments.data)

        }catch(error){
            console.log(error)
            }
        }
        getAppointments()
    }, [])
    const appointmentsToday = []
    appointments.forEach(app => app.date == currentdate ? appointmentsToday.push(app) : null)
    return(
        <div className='upcomingmain'>
            <h3 className='timeheading'>Today</h3>
            <div className='todaytab'>
                {appointmentsToday.length ? appointmentsToday.map(app => <Appointment key={app.selected_apt_ID} id={app.id} patientName={app.patient.name} date={app.date} time={app.time} status={app.status} diagnosis={app.patient.diagnosis.result}/>) : <h5 className='noactivity'>No Activity <FaRegCalendarTimes /></h5>}
            </div>
            <h3 className='timeheading'>Next Appointments</h3>
            <div className='weektab'>
                {appointments.length ? appointments.map(app => currentdate == app.date ? null : <Appointment key={app.selected_apt_ID} id={app.id} patientName={app.patient.name} date={app.date} time={app.time} status={app.status} diagnosis={app.patient.diagnosis.result}/>) : <h5 className='noactivity'>No Activity <FaRegCalendarTimes /></h5>}
            </div>
        </div>
    )
}