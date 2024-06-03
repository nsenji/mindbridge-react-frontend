import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { MeetingConfig, authToken } from "../Services/api";
import ReactPlayer from "react-player";
import { FaVideoSlash } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneSlash } from "react-icons/fa";
import useSendMail from "../Services/useSendMail";
// import { AuthContext } from "../../Services/authprovider";
// import { useContext } from "react";
import { useLocation } from "react-router-dom";
import MeetingView from "./createRoom";

function MeetingRoom() {
  const location = useLocation()
  // const { authUser } = useContext(AuthContext)
  
  const [meetingId, setMeetingId] = useState(null);

const {email} = location.state;

  const [response] = useSendMail(meetingId,email );

  console.log(email);

  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await MeetingConfig.createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}



function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="d-flex flex-column">
        <h4 className="text-active"> Join the call</h4>
        <span>The patient shall be sent the Call ID and they will join you shortly.</span>
        <div className="d-flex justify-content-center align-items-center m-4">
        </div>
        <button className="btn meetingbtn align-self-center" onClick={onClick}>Create Meeting</button>
      </div>
    </div>
  );
}


function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const [micON, switchOFFMic] = useState(true);
  const [camON, switchOFFCam] = useState(true);

  return (
    <div className="toggle-icons-container">
      {camON ? <FaVideo onClick={() => { toggleWebcam(); switchOFFCam(false) }} className="toggle-icons" />
        : <FaVideoSlash onClick={() => { toggleWebcam(); switchOFFCam(true) }} className="toggle-icons" />
      }
      {micON ? <FaMicrophone onClick={() => { toggleMic(); switchOFFMic(false) }} className="toggle-icons" />
        : <FaMicrophoneSlash onClick={() => { toggleMic(); switchOFFMic(true) }} className="toggle-icons" />
      }
      <button className="leave-button" onClick={() => leave()}>Leave</button>


    </div>
  );
}


function ParticipantView(props) {
  const micRef = useRef(null);



  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);


  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div style={{ height: "100%" }}>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn ? (
        <div className="react-player">
          <ReactPlayer            //
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            height="100%"
            width="100%"
            playing={true}
            //
            url={videoStream}
            //
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </div>
      ) :
        <div className="waiting-user">
          Waiting for the patient to join the call...
        </div>
      }
      <div className="">
        <ParticipantView2 newParticipantId={props.newParticipantId} />
      </div>
    </div>
  );
}



function ParticipantView2({ newParticipantId }) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(newParticipantId);


  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="inner-react-player">
      {/* <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
        {micOn ? "ON" : "OFF"}
      </p> */}
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer            //
          playsinline // extremely crucial prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          height="100%"
          width="100%"
          playing={true}
          //
          url={videoStream}
          //
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

function CustomButton(props) {
    return (
        <button onClick={props.onClick} type="button" className="custom-button">
            {props.content}
        </button>
    );
}


export default MeetingRoom;