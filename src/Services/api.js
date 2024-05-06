
// Create a schedule
import axios from "axios";
const BASE_URL = 'https://final-project-backend-production-273c.up.railway.app';

const Schedule = {
    createSchedule: async (schedule) => {
        try{
            const response = await axios.post(`${BASE_URL}/schedule/createschedule`, schedule)
            return response.data.message
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
            const response = await axios.post(`${BASE_URL}/appointments/getdoctorhistory`, doctor)
            return response.data
        } catch (error){
            return error.message
        }
    }
}

export {Schedule, Appointments}