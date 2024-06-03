// import {Controls} from "./createRoom.jsx"
// import { useContext } from 'react';
// import { AuthContext } from "../Services/authprovider.jsx";

// export default function CallRoom(){

//   const {localParticipant} = useContext(AuthContext);
//   const {participants} = useContext(AuthContext);

//     return (
//         <div className="joinedStyle">
//               <div className="mainView">
//                 <div className="online">
//                   <div className="red-circle"></div>
//                   <h3 className="small-text">Online </h3>
  
//                 </div>
//                 <Controls />
//               </div>
//               <div className="videoArea">
//                 <ParticipantView
//                   participantId={[...participants.keys()].filter(key => key !== localParticipant.id)[0]}
//                   newParticipantId={localParticipant.id}
//                 />
//               </div>
//             </div>
//     )
// }

// export function ParticipantView(props) {

//   const micRef = useRef(null);

//   const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
//     useParticipant(props.participantId);


//   const videoStream = useMemo(() => {
//     if (webcamOn && webcamStream) {
//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(webcamStream.track);
//       return mediaStream;
//     }
//   }, [webcamStream, webcamOn]);

//   useEffect(() => {
//     if (micRef.current) {
//       if (micOn && micStream) {
//         const mediaStream = new MediaStream();
//         mediaStream.addTrack(micStream.track);

//         micRef.current.srcObject = mediaStream;
//         micRef.current
//           .play()
//           .catch((error) =>
//             console.error("videoElem.current.play() failed", error)
//           );
//       } else {
//         micRef.current.srcObject = null;
//       }
//     }
//   }, [micStream, micOn]);

//   return (
//     <div style={{ height: "100%" }}>
//       <audio ref={micRef} autoPlay playsInline muted={isLocal} />
//       {webcamOn ? (
//         <div className="react-player">
//           <ReactPlayer            //
//             playsinline // extremely crucial prop
//             pip={false}
//             light={false}
//             controls={false}
//             muted={true}
//             height="100%"
//             width="100%"
//             playing={true}
//             //
//             url={videoStream}
//             //
//             onError={(err) => {
//               console.log(err, "participant video error");
//             }}
//           />
//         </div>
//       ) :
//         <div className="waiting-user">
//           Waiting for the patient to join the call...
//         </div>
//       }
//       <div className="">
//         <ParticipantView2 newParticipantId={props.newParticipantId} />
//       </div>
//     </div>
//   );
// }



// export function ParticipantView2({ newParticipantId }) {
//   const micRef = useRef(null);
//   const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
//     useParticipant(newParticipantId);


//   const videoStream = useMemo(() => {
//     if (webcamOn && webcamStream) {
//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(webcamStream.track);
//       return mediaStream;
//     }
//   }, [webcamStream, webcamOn]);

//   useEffect(() => {
//     if (micRef.current) {
//       if (micOn && micStream) {
//         const mediaStream = new MediaStream();
//         mediaStream.addTrack(micStream.track);

//         micRef.current.srcObject = mediaStream;
//         micRef.current
//           .play()
//           .catch((error) =>
//             console.error("videoElem.current.play() failed", error)
//           );
//       } else {
//         micRef.current.srcObject = null;
//       }
//     }
//   }, [micStream, micOn]);

//   return (
//     <div className="inner-react-player">
//       {/* <p>
//         Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
//         {micOn ? "ON" : "OFF"}
//       </p> */}
//       <audio ref={micRef} autoPlay playsInline muted={isLocal} />
//       {webcamOn && (
//         <ReactPlayer            //
//           playsinline // extremely crucial prop
//           pip={false}
//           light={false}
//           controls={false}
//           muted={true}
//           height="100%"
//           width="100%"
//           playing={true}
//           //
//           url={videoStream}
//           //
//           onError={(err) => {
//             console.log(err, "participant video error");
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export function CustomButton(props) {
//     return (
//         <button onClick={props.onClick} type="button" className="custom-button">
//             {props.content}
//         </button>
//     );
// }

