// import {ParticipantView} from "./Meeting.jsx"
// import CustomButton from "../customComponents/customButton.jsx";
// import { useState, useEffect } from "react";
// import {
//   MeetingProvider,
//   MeetingConsumer,
//   useMeeting,
//   useParticipant,
// } from "@videosdk.live/react-sdk";
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from "react-router-dom";
// import { useContext } from 'react';
// import { AuthContext } from "../Services/authprovider.jsx";

// export function CreateRoom() {


//   const location = useLocation()
//   const { meetingId, authToken } = location.state

//   const [neWmeetingId, setNewMeetingId] = useState(meetingId);

//   const onMeetingLeave = () => {
//     setNewMeetingId(null);
//   };

//   return <MeetingProvider
//     config={{
//       meetingId,
//       micEnabled: true,
//       webcamEnabled: true,
//       name: "C.V. Raman",
//     }}
//     token={authToken}
//   >
//     <MeetingView meetingId={neWmeetingId} onMeetingLeave={onMeetingLeave} />
//   </MeetingProvider>
// }


// export function MeetingView(props) {
//   const { setParticipants } = useContext(AuthContext);
//   const { setLocalParticipant, setUseParticipant } = useContext(AuthContext);

//   const navigate = useNavigate();
//   const [joined, setJoined] = useState(null);

//   const { join, participants, localParticipant } = useMeeting({
//     //callback for when meeting is joined successfully
//     onMeetingJoined: () => {
//       setJoined("JOINED");
//     },
//     //callback for when meeting is left
//     onMeetingLeft: () => {
//       props.onMeetingLeave();
//     },
//   });

//   useEffect(() => {

//     if (joined && joined == "JOINED") {
//       console.log(participants)
//       setParticipants(participants);
//       setLocalParticipant(localParticipant);
//       navigate("/call-room")
//     }

//   }, [joined])
//   //Get the method which will be used to join the meeting.
//   //We will also get the participants list to display all participants

//   const joinMeeting = () => {
//     setJoined("JOINING");
//     join();
//   };


//   return (
//     joined && joined == "JOINING" ? (
//       <p>Joining the meeting...</p>
//     ) : (
//       <>
//         <div className="enter-call">
//           <div className="inner-enter-call">
//             <p className="large-text">Call room created </p>
//             <p className="small-text">Room ID : {props.meetingId}</p>
//             <p className="small-text padding-bottom">Patient will be notified and join the call shortly</p>
//             <CustomButton content={"Join now"} handleButtonClick={joinMeeting} isDisabled={false} classname={"bg-blue-900 w-[150px] text-white"} />
//           </div>
//         </div>
//       </>
//     )

//   );
// }

// export function Controls() {
//   const { leave, toggleMic, toggleWebcam } = useMeeting();
//   const [micON, switchOFFMic] = useState(true);
//   const [camON, switchOFFCam] = useState(true);

//   return (
//     <div className="toggle-icons-container">
//       {camON ? <FaVideo onClick={() => { toggleWebcam(); switchOFFCam(false) }} className="toggle-icons" />
//         : <FaVideoSlash onClick={() => { toggleWebcam(); switchOFFCam(true) }} className="toggle-icons" />
//       }
//       {micON ? <FaMicrophone onClick={() => { toggleMic(); switchOFFMic(false) }} className="toggle-icons" />
//         : <FaMicrophoneSlash onClick={() => { toggleMic(); switchOFFMic(true) }} className="toggle-icons" />
//       }
//       <button className="leave-button" onClick={() => leave()}>Leave</button>


//     </div>
//   );
// }


