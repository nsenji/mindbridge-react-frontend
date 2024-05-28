
// Create a schedule
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const authToken = import.meta.env.VITE_VIDEOSDK_TOKEN

const Schedule = {
    createSchedule: async (schedule) => {
        try{
            const response = await axios.post(`${BASE_URL}/schedule/createschedule`, schedule)
            return response.data
        } catch(error){
            return error.message
        }
    },
    getSchedules: async (doctor)=>{
        try{
            const response = await axios.post(`${BASE_URL}/schedule/getschedules`, doctor)
            return response.data

        } catch (error){
            return error.message
        }
    }
}

const Appointments = {
    getScheduledAppointments: async (doctor) =>{
        try{
            const response = await axios.post(`${BASE_URL}/appointments/getdoctorappointments`, doctor)
            return response.data

        } catch (error){
            return error.message
        }
    },
    getDoctorHistory: async (doctor) => {
        try{
            const response = await axios.post(`${BASE_URL}/appointments/history`, doctor)
            return response.data
        } catch (error){
            return error.message
        }
    }
}

const MeetingConfig = {
    createMeeting: async ({ token }) => {
        const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
          method: "POST",
          headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        //Destructuring the roomId from the response
        const { roomId } = await res.json();
        return roomId;
    },
    sendMail: async (callID, userEmail) => {
        const url = `${BASE_URL}/sendmail`

        const message = {
            userEmail: userEmail,
            callID: callID
        }


        const res = await fetch(url, {
            method: "POST",
            headers: {
            'Content-Type':
                'application/json',
            },
            body: JSON.stringify(message)
        });

        const  value = await res.text();

        return value;
    }
}
const Edit = {
    editProfilePhoto: async(doctorID, selectedImage) => {
        const formData = new FormData();
        formData.append('doctorID', doctorID);
        formData.append('avatar', selectedImage);
        const response = await axios.post(`${BASE_URL}/uploads/uploadavatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

       return response.data;
    }

}
const DoctorsEarnings = {
    getDoctorsEarnings: async(doctor)=>{
        const response = await axios.post(`${BASE_URL}/payments/getdoctorearnings`, doctor)
        return response.data
    }
}
export {Schedule, Appointments, MeetingConfig, authToken, Edit, DoctorsEarnings}