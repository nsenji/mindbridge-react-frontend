
// Create a schedule
import axios from "axios";
const BASE_URL = 'https://final-project-backend-production-273c.up.railway.app';
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxMzRiNGM5Zi0xN2U0LTRjNjYtYjM5My02OWYyMWZhMGJkY2EiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMzQzMzA5MCwiZXhwIjoxNzE2MDI1MDkwfQ.-vCShwui2sLukx3N0clggQrTqCltP7RxvHK2WqRNoew"

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