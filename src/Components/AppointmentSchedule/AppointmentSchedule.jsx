import { useState, useEffect } from 'react';
import './ChosenAppointments.css'
import { GridLoader } from 'react-spinners';
import CreatedAppointment from '../CreatedAppointments/CreatedAppointment';
import { Schedule } from '../../Services/api';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery } from 'react-query'
import isValidToken from '../../utils/isValidToken';

const AppointmentSchedule = () => {

    const { isLoading1, error, data } = useQuery("getToken3", isValidToken, { enabled: true })

    useEffect(() => {
        if (data) {
            var [_, userData] = data;
            const getschedules = async () => {
                try {
                    setIsLoading(true)
                    const times = await Schedule.getSchedules({ doctorID: userData.doc_ID })
                    setSchedules(times.data)
                    setIsLoading(false)
                } catch (error) {
                    console.log(error)
                }
            }
            getschedules()
        }
    }, [data])




    const [datetime, setDateTime] = useState({ date: null, time: null, doctorID: "", status: "available" })

    const [schedules, setSchedules] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            let newScheduledTime = await Schedule.createSchedule(datetime)
            setSchedules([...schedules, newScheduledTime.data])
            $('#addtime').modal('hide');
        } catch (error) {
            return error
        }
    }

    if (error) {
        console.log(error);
        return <h1>there is a terrible error {error.message} </h1>  

    }

    if (isLoading1) {
        return <div className='flex justify-center items-center h-screen'>
            <FadeLoader
                color={'#0c008a'}
                loading={isLoading}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }


    if(data){
        return (
            <div className='flex flex-grow h-screen overflow-y-auto'>
                <div className=''>
                    {schedules.length ?
                        <div className='appointmenttimes'>
                            <span>Time</span>
                            <span>Date</span>
                            <span>Status</span>
                            <span>Action</span>
                        </div> : null}
                    {isLoading ? <Skeleton count={4} /> : schedules.length ? schedules.map((app) => app.time ? <CreatedAppointment key={app.apt_schedule_ID} time={app.time} date={app.date} status={app.status} /> : null) : <h4 className='noactivity'>No Activity</h4>}
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
                                <form className='d-flex flex-column' onSubmit={(e) => handleSubmit(e)}>
                                    <input type='date' className='inputfield' onChange={(e) => setDateTime({ ...datetime, date: e.target.value,doctorID: userData.doc_ID})} />
                                    <input type='time' className='inputfield' onChange={(e) => setDateTime({ ...datetime, time: e.target.value,doctorID: userData.doc_ID })} />
                                    <button type='submit' className='savebtn'>Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    
}



export default AppointmentSchedule

