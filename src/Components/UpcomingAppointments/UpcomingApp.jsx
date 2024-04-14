import './UpcomingApp.css'
import Appointment from '../Appointment/Appointment'
import { FaRegCalendarTimes } from "react-icons/fa";
import { useEffect } from 'react';


let appointments = [
    {
        id: '121324',
        patientName: 'Ssekweyama Moses',
        status: 'active',
        date: '3-04-2024',
        time: '13:00'
    },
    {
        id: '121325',
        patientName: 'Ssekweyama Jordan',
        status: 'active',
        date: '21-03-2024',
        time: '13:00'
    },
    {
        id: '121326',
        patientName: 'Ssekweyama Jordan',
        status: 'active',
        date: '21-03-2024',
        time: '13:00'
    },
    {
        id: '121327',
        patientName: 'Ssekweyama Jordan',
        status: 'active',
        date: '21-03-2024',
        time: '13:00'
    },
    {
        id: '121328',
        patientName: 'Ssekweyama Jordan',
        status: 'active',
        date: '21-03-2024',
        time: '13:00'
    }
]
export default function UpcomingApp(){
    const today = new Date();
    let currentdate = `${today.getDate().toString()}-${today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1 }`}-${today.getFullYear().toString()}`
    useEffect(()=>{
        const getAppointments = async ()=>{
            
        }
    }, [])
    return(
        <div className='upcomingmain'>
            <h3 className='timeheading'>Today</h3>
            <div className='todaytab'>
                {appointments.length ? appointments.map(app => currentdate == app.date ? <Appointment key={app.id} id={app.id} patientName={app.patientName} date={app.date} time={app.time} status={app.status}/> : null) : <h5 className='noactivity'>No Activity <FaRegCalendarTimes /></h5>}
            </div>
            <h3 className='timeheading'>In a Week</h3>
            <div className='weektab'>
                {appointments.length ? appointments.map(app => currentdate== app.date ? null : <Appointment key={app.id} id={app.id} patientName={app.patientName} date={app.date} time={app.time} status={app.status}/>) : <h5 className='noactivity'>No Activity <FaRegCalendarTimes /></h5>}

            </div>
            <h3 className='timeheading'>In a Month</h3>
            <div className='monthtab'>
                {appointments.length ? appointments.map(app => currentdate== app.date ? null : <Appointment key={app.id} id={app.id} patientName={app.patientName} date={app.date} time={app.time} status={app.status}/>) : <h5 className='noactivity'>No Activity <FaRegCalendarTimes /></h5>}
            </div>
        </div>
    )
}