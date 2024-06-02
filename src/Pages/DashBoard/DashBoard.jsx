import { useEffect, useState } from 'react';
import { CiCircleChevLeft } from "react-icons/ci";
import { IoIosPersonAdd } from "react-icons/io";
import { TbFolderCancel } from "react-icons/tb";
import './DashBoard.css'
import { SlPeople } from "react-icons/sl";
import Person from '../../assets/person.png'
import { MdPendingActions } from "react-icons/md";
import { GoThumbsup } from "react-icons/go";
import Chart from 'react-apexcharts'

import { Appointments, Edit } from '../../Services/api';
import FadeLoader from "react-spinners/FadeLoader";
import { useQuery } from 'react-query'
import isValidToken from '../../utils/isValidToken';


export default function DashBoard() {
    const [isLoading, setIsLoading] = useState(false)
    const [completed, setCompleted] = useState(0)
    const [scheduledApp, setScheduledApp] = useState(0)

    const [previewSrc, setPreviewSrc] = useState('');
    const [imageResource, setImageResource] = useState(null);

    const { isLoading1, error, data } = useQuery("getToken2", isValidToken, { enabled: true })

    useEffect(() => {
        if(data){
            var [_, userData] = data;

            async function getScheduledAppointments() {
                const scheduled = await Appointments.getScheduledAppointments({ doctorID: userData.doc_ID })
                setScheduledApp(scheduled.data.length)
            }
            async function getCompletedCases() {
                const cases = await Appointments.getDoctorHistory({ doctorID: userData.doc_ID })
                setCompleted(cases.data.length)
            }
            getScheduledAppointments()
            getCompletedCases()
        }
    }, [data])

    if (data) {
        var [_, userData] = data;

        let datetime = new Date()
        let time = datetime.getHours()  
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setImageResource(file)
            if (file && file.type.substr(0, 5) === "image") {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewSrc(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewSrc('');
            }
        };
        async function handleSubmit(e) {
            e.preventDefault()
            if (imageResource) {
                try {
                    setIsLoading(true)
                    const uploadImage = await Edit.editProfilePhoto(userData.doc_ID, imageResource)
                    setAuthUser({ ...userData, avatar: { file_name: uploadImage.data.file_name } })
                    setIsLoading(false)
                    $('#editdialog').modal('hide');
                } catch (error) {
                    console.log(error.message)
                }
            }
        }

       

        return (<div className='main'>
            <h1 className='greeting'><CiCircleChevLeft /> {time < 12 ? 'Good Morning' : time <= 16 ? 'Good Afternoon' : 'Good Evening'}</h1>
            <div className='personaldetails'>
                <div className='doctordetails'>
                    {
                        isLoading
                            ?
                            <FadeLoader
                                color={'#0c008a'}
                                loading={isLoading}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            :
                            <img src={userData.avatar ? `http://192.168.0.153:3000/uploads/${userData.avatar.file_name}` : Person} data-bs-toggle="modal" data-bs-target={!userData.avatar ? "#editdialog" : null} className='displayImage' />
                    }
                    <div className='title'>
                        <h4 style={{ fontWeight: '700' }}>{userData.name}</h4>
                    </div>
                </div>
                <div className='generaldetails'>
                    <div className='detailsleft'>
                        <span><span className='label'>Speciality: </span><span>{userData.pro_title}</span></span>
                        <span><span className='label'>Employment Status: </span><span>{userData.employment_status}</span></span>
                        <span><span className='label'>Gender: </span><span>{userData.gender}</span></span>
                    </div>
                    <div className='detailsright'>
                        <span><span className='label'>Hospital Name: </span><span>{userData.hospitalName}</span></span>
                        <span><span className='label'>Email: </span><span>{userData.email}</span></span>
                        <span><span className='label'>Rate: </span><span>shs. {userData.rate} / hr</span></span>
                    </div>


                </div>
            </div>
            <div className='info'>
                <div className='infoleft'>
                    <div className='patients'>
                        <span className='digit'>{scheduledApp + completed}</span>
                        <div>
                            <SlPeople size={80} color={'#B6D0E2'} />
                            <h6>All Patients</h6>
                        </div>
                    </div>
                    <div className='pendingappointments'>
                        <span className='digit'>{scheduledApp}</span>
                        <div>
                            <MdPendingActions size={80} color={'#B6D0E2'} />
                            <h6>Pending</h6>
                        </div>
                    </div>
                    <div className='finishedpatients'>
                        <span className='digit'>{completed}</span>
                        <div>
                            <GoThumbsup size={80} color={'#B6D0E2'} />
                            <h6>Finished</h6>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>)
    }

    if (error) {
        console.log(error);
        return <h1>there is a terrible error {error.message} </h1>  

    }

    if (isLoading1) {
        return <div className='flex justify-center items-center h-screen'>
            <FadeLoader
                color={'#0c008a'}
                loading={isLoading}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }




}