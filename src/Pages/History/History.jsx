import './History.css'
import DropDown from '../../Components/DropDownMenu/DropDown'
import PatientHistory from '../../Components/PatientHistory/PatientHistory';

const appointments = [
    {
        patientName: "John Doe",
        time: "10:00 AM",
        appointmentDate: "2024-04-01",
        status: "Confirmed"
    },
    {
        patientName: "Jane Smith",
        time: "11:30 AM",
        appointmentDate: "2024-04-02",
        status: "Pending"
    },
    {
        patientName: "Alice Johnson",
        time: "2:00 PM",
        appointmentDate: "2024-04-03",
        status: "Cancelled"
    },
    {
        patientName: "Bob Brown",
        time: "9:15 AM",
        appointmentDate: "2024-04-04",
        status: "Confirmed"
    },
    {
        patientName: "Emily Davis",
        time: "4:45 PM",
        appointmentDate: "2024-04-05",
        status: "Pending"
    }
];

const History = ()=>{
    return(
        <div className="main">
            <div className='searchbar'>
                <div className='searchdiv'>
                    <i className="bi bi-search"></i>
                    <input className='search' placeholder='Search Patient'/>
                </div>
                <DropDown/>
            </div>
            <div className='resultsbar'>
                <span>#Patient Name</span>
                <span>Time</span>
                <span>Appointment Date</span>
                <span>Status</span>
            </div>
            {appointments.map((app, id) => <PatientHistory key={id} name={app.patientName} time={app.time} appointmentDate={app.appointmentDate} status={app.status}/>)}
        </div>
    )
}
export default History