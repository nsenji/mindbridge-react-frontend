import "./PatientHistory.css";
const PatientHistory = ({ name, time, appointmentDate, status }) => {
  return (
    <div className="patienthistory">
      <span>{name}</span>
      <span>{time}</span>
      <span>{appointmentDate}</span>
      <span>{status}</span>
    </div>
  );
};

export default PatientHistory;
