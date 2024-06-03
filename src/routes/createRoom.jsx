import ParticipantView from "./Meeting.jsx"
import Controls from "./Meeting.jsx"
import CustomButton from "../customComponents/customButton.jsx";
import { useState } from "react";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
  } from "@videosdk.live/react-sdk";

import { useLocation } from "react-router-dom";

export default function CreateRoom(){


    const location = useLocation()
    const {meetingId, authToken} = location.state

    const [neWmeetingId, setNewMeetingId] = useState(meetingId);

    const onMeetingLeave = () => {
        setNewMeetingId(null);
    };

    return <MeetingProvider
    config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
    }}
    token={authToken}
>
    <MeetingView meetingId={neWmeetingId} onMeetingLeave={onMeetingLeave} />
</MeetingProvider>
}


export function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
    const { join, participants, localParticipant } = useMeeting({
      //callback for when meeting is joined successfully
      onMeetingJoined: () => {
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
      <div className="">
        <div className="">
          {joined && joined == "JOINED" ? (
            <div className="joinedStyle">
              <div className="mainView">
                <div className="online">
                  <div className="red-circle"></div>
                  <h3 className="small-text">Online </h3>
  
                </div>
                <Controls />
              </div>
              <div className="videoArea">
                <ParticipantView
                  participantId={[...participants.keys()].filter(key => key !== localParticipant.id)[0]}
                  newParticipantId={localParticipant.id}
                />
              </div>
            </div>
          ) : joined && joined == "JOINING" ? (
            <p>Joining the meeting...</p>
          ) : (
            <>
              <div className="enter-call">
                <div className="inner-enter-call">
                  <p className="large-text">Call room created </p>
                  <p className="small-text">Room ID : {props.meetingId}</p>
                  <p className="small-text padding-bottom">Patient will be notified and join the call shortly</p>
                  <CustomButton content={"Join now"} handleButtonClick={joinMeeting} isDisabled={false}/>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }