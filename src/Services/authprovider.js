import { createContext } from "react";
export const doctorContext = createContext({
    doc_ID: '',
    name: '',
    email: '',
    gender: '',
    languages_spoken: '',
    rate: '',
    hospitalName: '',
    pro_title: '',
    med_specialty: '',
    employment_status: ''
})