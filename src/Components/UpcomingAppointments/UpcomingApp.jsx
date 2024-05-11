import './UpcomingApp.css'
import Appointment from '../Appointment/Appointment'
import { FaRegCalendarTimes } from "react-icons/fa";
import { useEffect, useState, useContext } from 'react';
import { Appointments } from '../../Services/api';
import { AuthContext } from '../../Services/authprovider';
import Skeleton from 'react-loading-skeleton';

export default function UpcomingApp(){

    const { authUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const today = new Date();
    let currentdate = `${today.getFullYear().toString()}-${today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1 }-${today.getDate().toString()}`}`
    const [appointments, setAppointments] = useState([])
    useEffect(()=>{
        const getAppointments = async ()=>{
        try{
            setIsLoading(true)
            let scheduledAppointments = await Appointments.getScheduledAppointments({doctorID: authUser.doc_ID})
            setAppointments(scheduledAppointments.data)
            setIsLoading(false)
        }catch(error){
            console.log(error)
            }
        }
        getAppointments()
    }, [])
    const appointmentsToday = []
    const upcomingAppointments = []
    appointments.forEach(app => app.date == currentdate ? appointmentsToday.push(app) : upcomingAppointments.push(app))
    return(
        <div className='upcomingmain'>
            <h3 className='timeheading'>Today</h3>
            <div className='todaytab'>
                {appointmentsToday.length ? appointmentsToday.map(app => <Appointment key={app.selected_apt_ID} id={app.id} patientName={app.patient.name} date={app.date} time={app.time} status={app.status} diagnosis={app.patient.diagnoses[0].result} patientEmail={app.patient.email}/>) : <h5 className='noactivity'>No Activity <FaRegCalendarTimes /></h5>}
            </div>
            <h3 className='timeheading'>Next Appointments</h3>
            <div className='weektab'>
                {isLoading ? <Skeleton count={4}/> : upcomingAppointments.length ? upcomingAppointments.map(app => currentdate == app.date ? null : <Appointment key={app.selected_apt_ID} id={app.id} patientName={app.patient.name} date={app.date} time={app.time} status={app.status} diagnosis={app.patient.diagnoses[0].result}/>) : <h5 className='noactivity'>No Activity <FaRegCalendarTimes /></h5>}
            </div>
        </div>
    )
}