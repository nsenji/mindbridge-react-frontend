
// Create a schedule
import axios from "axios";
const BASE_URL = 'http://localhost:3000';

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

export {Schedule}