import { useState, useEffect } from 'react';
import './ChosenAppointments.css'
import { GridLoader } from 'react-spinners';
import CreatedAppointment from '../CreatedAppointments/CreatedAppointment';
import { Schedule } from '../../Services/api';
import { useContext } from 'react';
import { AuthContext } from '../../Services/authprovider';

const ChosenAppointments = ()=>{
    const { authUser } = useContext(AuthContext)

    const [datetime, setDateTime] = useState({date: null, time: null, doctorID: authUser.doc_ID, status: "available"})
    const [schedules, setSchedules] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getschedules = async ()=>{
            try{
                const times = await Schedule.getSchedules({doctorID: authUser.doc_ID})
                setSchedules(times.data)
                setLoading(false)
            } catch (error){
                console.log(error)
            }
        }
        getschedules()
    }, [])

    async function handleSubmit(){
       try{
            await Schedule.createSchedule(datetime)
       } catch(error){
            return error
       }
    }
    if(loading){
        <div className='loader'>
            <GridLoader size={'150px'} aria-label='Loading Spinner'/>
        </div>
    }
    return(
        <div>
            <div className='availabletimes'>
                {schedules.length ? 
                <div className='appointmenttimes'>
                    <span>Time</span>
                    <span>Date</span>
                    <span>Status</span>
                    <span>Action</span>
                </div> : null }
                {schedules.length ? schedules.map((app) => app.time ? <CreatedAppointment key={app.apt_schedule_ID} time={app.time} date={app.date} status={app.status}/> : null) : <h4 className='noactivity'>No Activity</h4>}
            </div>
            <button type="button" className='addbtn' data-bs-toggle="modal" data-bs-target="#addtime">+</button>

            {/* Modal */}
            <div className="modal" tabIndex="-1" role="dialog" id='addtime' aria-labelledby="addtime" aria-hidden="true">
                <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Available Time</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                           <form className='d-flex flex-column' onSubmit={handleSubmit}>
                                <input type='date' className='inputfield' onChange={(e) => setDateTime({...datetime, date: e.target.value})}/>
                                <input type='time' className='inputfield' onChange={(e) => setDateTime({...datetime, time: e.target.value})}/>
                                <button type='submit'  className='savebtn'>Save</button>
                           </form>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ChosenAppointments

