import { useEffect, useState } from 'react';
import './DashBoard.css'
import { SlPeople } from "react-icons/sl";
import Person from'../../assets/person.png'
import { MdPendingActions } from "react-icons/md";
import { GoThumbsup } from "react-icons/go";
import Chart from 'react-apexcharts'
import { useContext } from 'react';
import { AuthContext } from '../../Services/authprovider';
import { Appointments } from '../../Services/api';
export default function DashBoard(){
    
    const [completed , setCompleted] = useState(0)
    const [scheduledApp, setScheduledApp] = useState(0)
    const { authUser } = useContext(AuthContext)
    
    const [chartData, setChartData] = useState({
            options: {
                chart: {
                    id: 'apexchart'
                },
                labels: ["Completed", "Pending"],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }
        })

    let datetime = new Date()
    let time = datetime.getHours()

    useEffect(()=>{
        async function getScheduledAppointments(){
            const scheduled = await Appointments.getScheduledAppointments({doctorID: authUser.doc_ID})
            setScheduledApp(scheduled.data.length)
        }
        async function getCompletedCases(){
            const cases = await Appointments.getDoctorHistory({doctorID: authUser.doc_ID})
            setCompleted(cases.data.length)
        }
        getScheduledAppointments()
        getCompletedCases()
    }, [])
    return(
        <div className='main'>
            <h1>{time < 12 ? 'Good Morning' : time <= 16 ? 'Good Afternoon' : 'Good Evening'}</h1>
            <div className='personaldetails'>
                <div className='doctordetails'>
                    <img src={Person}/>
                    <div className='title'>
                        <h4>Doctor</h4>
                        <h5>{authUser.name}</h5>
                    </div>
                </div>
                <div className='generaldetails'>
                    <div className='detailsleft'>
                        <span><span className='label'>Speciality: </span><span>{authUser.pro_title}</span></span>
                        <span><span className='label'>Employment Status: </span><span>{authUser.employment_status}</span></span>
                        <span><span className='label'>Gender: </span><span>{authUser.gender}</span></span>
                    </div>
                    <div className='detailsright'>
                        <span><span className='label'>Hospital Name: </span><span>{authUser.hospitalName}</span></span>
                        <span><span className='label'>Email: </span><span>{authUser.email}</span></span>
                        <span><span className='label'>Rate: </span><span>shs. {authUser.rate} / hr</span></span>
                    </div>
                </div>
            </div>
            <div className='info'>
                <div className='infoleft'>
                    <div className='patients'>
                        <span className='digit'>{scheduledApp + completed}</span>
                        <div>
                            <SlPeople size={80}/>
                            <h6>All Patients</h6>
                        </div>
                    </div>
                    <div className='pendingappointments'>
                        <span className='digit'>{scheduledApp}</span>
                        <div>
                            <MdPendingActions size={80}/>
                            <h6>Pending</h6>
                        </div>
                    </div>
                    <div className='finishedpatients'>
                        <span className='digit'>{completed}</span>
                        <div>
                            <GoThumbsup size={80}/>
                            <h6>Finished</h6>
                        </div>
                    </div>
                </div>
                <div className='inforight'>
                    <Chart
                    series={[completed, scheduledApp]} options={chartData.options} type="donut" 
                    />
                </div>
            </div>
        </div>
    )
}