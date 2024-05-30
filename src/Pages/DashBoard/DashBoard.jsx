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
import { useContext } from 'react';
import { AuthContext } from '../../Services/authprovider';
import { Appointments, Edit } from '../../Services/api';
import FadeLoader from "react-spinners/FadeLoader";
import { useQuery } from 'react-query'
import isValidToken from '../../utils/isValidToken';


export default function DashBoard() {
    const [isLoading, setIsLoading] = useState(false)
    const [completed, setCompleted] = useState(0)
    const [scheduledApp, setScheduledApp] = useState(0)


    const { isLoading1, error, data } = useQuery("getToken", isValidToken, { enabled: true })

    if (data) {
        var [_, userData] = data;

        useEffect(() => {
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
        }, [data])
    }

    if (error) {
        console.log(error);
    }

    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: 'apexchart'
            },
            labels: ["Completed", "Pending"],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    })

    let datetime = new Date()
    let time = datetime.getHours()


    const [previewSrc, setPreviewSrc] = useState('');
    const [imageResource, setImageResource] = useState(null);

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
    return (
        <>
            {isLoading1 ?
                <div className='border border-red-500 flex justify-center items-center h-screen'>
                    <FadeLoader
                        color={'#0c008a'}
                        loading={isLoading}
                        size={80}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                :
                error ?
                    <h1>there is a terrible error </h1>
                    :
                    <div className='main'>
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

                                {/* Modal */}
                                <div className="modal" tabIndex="-1" role="dialog" id='editdialog' aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Edit Details</h5>
                                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body d-flex flex-column">
                                                <div className='d-flex flex-column mb-4'>
                                                    <div className='align-self-center'>
                                                        <div className='d-flex justify-content-center'>
                                                            {previewSrc ? <img src={previewSrc} alt="preview" className='addprofileicon' /> : <IoIosPersonAdd size={120} />}
                                                        </div>
                                                        <div className='d-flex justify-content-center'>
                                                            <input type="file" id="myFile" name="avatar" accept="image" onChange={handleFileChange} />
                                                            <button className='clearbtn btn btn-danger' onClick={() => setPreviewSrc('')}>Clear</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className='btn btn-primary w-25 align-self-center image-uploadbtn' onClick={(e) => handleSubmit(e)} disabled={!imageResource}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
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
                            <div className='d-flex justify-content-center align-items-center inforight'>
                                {
                                    completed == 0 && scheduledApp == 0 ?
                                        <h5><TbFolderCancel size={30} /> No Data to Display!</h5>
                                        :
                                        <Chart
                                            series={[completed, scheduledApp]} options={chartData.options} type="donut"
                                        />
                                }
                            </div>
                        </div>
                    </div>}
        </>
    )
}