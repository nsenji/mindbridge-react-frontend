import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
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

import { useLocation, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

function MeetingRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { authUser } = useContext(AuthContext)

  const [meetingId, setMeetingId] = useState(null);
  const { email } = location.state;
  // const [response] = useSendMail(meetingId, email);  // work on this email later

  useEffect(() => {
    //Getting the meeting id by calling the api we just wrote
    const getMeetingAndToken = async (id) => {
      const meetingId =
        id == null
          ? await MeetingConfig.createMeeting({ token: authToken })
          : id;
      setMeetingId(meetingId);
    };

    getMeetingAndToken();
  }, []);

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
    document.getElementById("sidebar").style.display = "flex";
    navigate("/dashboard");
  };

  if (authToken && meetingId) {
    return (
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
    );
  } else {
    return (
      <div className="flex items-center justify-center w-full">
        <FadeLoader
          color={"#0c008a"}
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
}

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants, localParticipant } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      document.getElementById("sidebar").style.display = "none";
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="flex flex-grow">
      {joined && joined == "JOINED" ? (
        <div className="flex flex-col h-full w-full m-1 bg-black rounded-lg">
          <div className="flex justify-between items-center h-[10%] bg-[#0c131b] pl-5 pr-3 rounded-t-lg ">
            <div className="online">
              <div className="red-circle"></div>
              <h3 className="small-text">Online </h3>
            </div>
            <Controls />
          </div>
          <div className="max-h-[90%] h-[90%] flex flex-row justify-center items-start w-full">
            <ParticipantView
              participantId={
                [...participants.keys()].filter(
                  (key) => key !== localParticipant.id,
                )[0]
              }
              newParticipantId={localParticipant.id}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center bg-[#101720] w-full my-2 mr-2 rounded-xl">
            <div className="inner-enter-call">
              <p className="large-text">Call room created </p>
              <p className="small-text">Room ID : {props.meetingId}</p>
              <p className="small-text padding-bottom">
                Patient will be notified and join the call shortly
              </p>
              <CallCustomButton
                content={"Join now"}
                onClick={joinMeeting}
                isButtonLoading={joined && joined == "JOINING"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const [micON, switchOFFMic] = useState(true);
  const [camON, switchOFFCam] = useState(true);

  return (
    <div className="flex items-center mr-2">
      {camON ? (
        <FaVideo
          onClick={() => {
            toggleWebcam();
            switchOFFCam(false);
          }}
          className="toggle-icons"
        />
      ) : (
        <FaVideoSlash
          onClick={() => {
            toggleWebcam();
            switchOFFCam(true);
          }}
          className="toggle-icons"
        />
      )}
      {micON ? (
        <FaMicrophone
          onClick={() => {
            toggleMic();
            switchOFFMic(false);
          }}
          className="toggle-icons"
        />
      ) : (
        <FaMicrophoneSlash
          onClick={() => {
            toggleMic();
            switchOFFMic(true);
          }}
          className="toggle-icons"
        />
      )}
      <button className="leave-button" onClick={() => leave()}>
        End Call
      </button>
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
            console.error("videoElem.current.play() failed", error),
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
          <ReactPlayer //
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
      ) : (
        <div className="waiting-user">
          Waiting for the patient to join the call...
        </div>
      )}
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
            console.error("videoElem.current.play() failed", error),
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
        <ReactPlayer //
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

function CallCustomButton(props) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="h-12 font-bold px-6 border-none text-lg bg-[#0c008a] text-white cursor-pointer rounded w-[200px]"
    >
      {props.isButtonLoading ? (
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      ) : (
        props.content
      )}
    </button>
  );
}

export default MeetingRoom;
