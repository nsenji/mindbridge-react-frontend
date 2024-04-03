import './ChosenAppointments.css'
import CreatedAppointment from '../CreatedAppointments/CreatedAppointment';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

const appointments = [
    {
        time: "08:00",
        date: "2024-04-03",
        status:"Available"
    },
    {
        time: "13:30",
        date: "2024-04-02",
        status: "Available"
    },
    {
        time: "15:45",
        date: "2024-04-03",
        status: "Available"
    },
    {
        time: "10:15",
        date: "2024-04-04",
        status: "Available"
    },
    {
        time: "19:00",
        date: "2024-04-05",
        status: "Available"
    }
];

const ChosenAppointments = ()=>{
    return(
        <div>
            <div className='availabletimes'>
                <div className='appointmenttimes'>
                    <span>Time</span>
                    <span>Date</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>
                {appointments.map((app,id) => <CreatedAppointment key={id} time={app.time} date={app.date} status={app.status}/>)}
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
                           <form className='d-flex flex-column'>
                                <DatePicker/>
                                <TimePicker/>
                                <button type='submit'  className='savebtn'>Save</button>
                           </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ChosenAppointments

