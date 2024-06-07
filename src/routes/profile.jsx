import { useEffect, useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { IoIosPersonAdd } from "react-icons/io";
import { TbFolderCancel } from "react-icons/tb";
import { SlPeople } from "react-icons/sl";
import Person from "../assets/person.png";
import { MdPendingActions } from "react-icons/md";
import { GoThumbsup } from "react-icons/go";
import Chart from "react-apexcharts";
import { Appointments, Edit } from "../Services/api";
import FadeLoader from "react-spinners/FadeLoader";
import { useQuery } from "react-query";
import isValidToken from "../utils/isValidToken";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../customComponents/customButton";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Profile() {
    const [scheduledApp, setScheduledApp] = useState(0);
    const [completed, setCompleted] = useState(0);

    const { isLoading1, error, data, refetch } = useQuery({
        queryKey: ["getToken2"],
        queryFn: isValidToken,
        refetchOnMount: true,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [previewSrc, setPreviewSrc] = useState("");
    const [imageResource, setImageResource] = useState(null);

    useEffect(() => {
        if (data) {
            var [_, userData] = data;

            async function getScheduledAppointments() {
                const scheduled = await Appointments.getScheduledAppointments({
                    doctorID: userData.doc_ID,
                });
                setScheduledApp(scheduled.data.length);
            }
            async function getCompletedCases() {
                const cases = await Appointments.getDoctorHistory({
                    doctorID: userData.doc_ID,
                });
                setCompleted(cases.data.length);
            }
            getScheduledAppointments();
            getCompletedCases();
        }
    }, [data]);

    if (data) {
        var [_, userData] = data;

        let datetime = new Date();
        let time = datetime.getHours();
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setImageResource(file);
            if (file && file.type.substr(0, 5) === "image") {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewSrc(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewSrc("");
            }
        };
        async function handleSubmit(e) {
            e.preventDefault();
            if (imageResource) {
                try {
                    setIsLoading(true);
                    const uploadImage = await Edit.editProfilePhoto(
                        userData.doc_ID,
                        imageResource,
                    );
                    setAuthUser({
                        ...userData,
                        avatar: { file_name: uploadImage.data.file_name },
                    });
                    setIsLoading(false);
                } catch (error) {
                    console.log(error.message);
                }
            }
        }

        const handleClickOpen = () => {
            console.log("not implemented");
        };

        return (
            <div className="flex flex-col flex-grow  my-2 mr-2">
                <div className="h-[8%]  flex items-center justify-between mb-3 ">
                    <div className="flex items-center ">
                        <p className="font-semibold text-lg ml-4">Profile</p>
                    </div>

                    <div className="flex items-center mr-5">
                        <CustomButton
                            content={"Edit"}
                            classname={
                                "hover:bg-dark-blue hover:text-white w-[100px] border border-dark-blue"
                            }
                            handleButtonClick={handleClickOpen}
                        />
                    </div>
                </div>
                <div className="flex-grow flex flex-col  rounded-lg">
                    <div className="w-[420px] rounded-md h-[40%] hidden items-center md:flex ml-4 mr-5 border border-light-blue ">
                        <div className="relative inline-block ml-1">
                            <img
                                src={
                                    userData.avatar
                                        ? `${BASE_URL}/uploads/${userData.avatar.file_name}`
                                        : Person
                                }
                                alt="User Avatar"
                                className="w-[200px] min-w-[200px]"
                            />
                            <AddIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-full shadow-md" />
                        </div>
                        <div className="flex flex-col justify-start items-start  ">

                            <p className="font-semibold text-xl text-dark-blue ">Dr. {userData.name}</p>
                            <p className="text-sm text-nowrap">{userData.email}</p>

                            <div className=" border py-2 px-4 flex justify-center rounded border-dark-blue mt-5">
                                <p className="font-semibold whitespace-nowrap">
                                {scheduledApp + completed} Patients
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className=" rounded-lg flex flex-col flex-grow ml-2">
                        <div className="h-[40px] flex items-center ml-3 mt-6">
                            <p className="font-semibold">Professional Profile</p>
                        </div>
                        <div className="flex flex-grow justify-evenly mt-3 mr-3">
                            <div className=" flex flex-col  w-full md:w-[50%]">
                                <div className="h-[40px] border border-light-blue mx-2 rounded mt-2 flex justify-between items-center">
                                    <p className="text-sm ml-2">Title</p>
                                    <p className="font-semibold mr-2 text-nowrap">
                                        {userData.pro_title}
                                    </p>
                                </div>
                                <div className="h-[40px] border border-light-blue mx-2 rounded mt-2 flex justify-between items-center">
                                    <p className="text-sm ml-1">Work Status</p>
                                    <p className="font-semibold mr-2 text-nowrap">
                                        {userData.employment_status}
                                    </p>
                                </div>
                                <div className="h-[40px] border border-light-blue mx-2 rounded mt-2 flex justify-between items-center">
                                    <p className="text-sm ml-2">Specialty</p>
                                    <p className="font-semibold mr-2 text-nowrap">
                                        {userData.med_specialty}
                                    </p>
                                </div>
                                <div className="h-[40px] border border-light-blue mx-2 rounded mt-2 flex justify-between items-center">
                                    <p className="text-sm ml-2">Hospital</p>
                                    <p className="font-semibold mr-2 text-nowrap trancate">
                                        {userData.hospitalName}
                                    </p>
                                </div>
                            </div>
                            <div className=" flex-col w-[50%] hidden md:flex">
                                <div className="h-[40px] border border-light-blue mx-2 rounded mt-2 flex justify-between items-center ">
                                    <p className="text-sm ml-2 text-nowrap">Rate</p>
                                    <p className="font-semibold mr-2 text-nowrap">
                                        {userData.rate}
                                    </p>
                                </div>
                                <div className="h-[40px] border border-light-blue mx-2 rounded-md mt-2 flex justify-between items-center">
                                    <p className="text-sm ml-2">Email</p>
                                    <p className="font-semibold mr-2 text-nowrap">
                                        {userData.email}
                                    </p>
                                </div>
                                <div className="h-[40px] border border-light-blue mx-2 rounded mt-2 flex justify-between items-center">
                                    <p className="text-sm ml-2">Gender</p>
                                    <p className="font-semibold mr-2 text-nowrap">
                                        {userData.gender}
                                    </p>
                                </div>
                                <div className="h-[40px] border border-light-blue mx-2 rounded mt-2 flex justify-between items-center">
                                    <p className="text-sm ml-2">Languages</p>
                                    <p className="font-semibold mr-2 text-nowrap">
                                        {userData.languages_spoken}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <h1>there is a terrible error {error.message} </h1>;
    }

    if (isLoading1) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FadeLoader
                    color={"#0c008a"}
                    loading={isLoading}
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }
}

// <h1 className='greeting'><CiCircleChevLeft /> {time < 12 ? 'Good Morning' : time <= 16 ? 'Good Afternoon' : 'Good Evening'}</h1>
//             <div className='personaldetails'>
//                 <div className='doctordetails'>
//                     {
//                         isLoading
//                             ?
//                             <FadeLoader
//                                 color={'#0c008a'}
//                                 loading={isLoading}
//                                 size={150}
//                                 aria-label="Loading Spinner"
//                                 data-testid="loader"
//                             />
//                             :
//                             <img src={userData.avatar ? `http://192.168.0.153:3000/uploads/${userData.avatar.file_name}` : Person} data-bs-toggle="modal" data-bs-target={!userData.avatar ? "#editdialog" : null} className='displayImage' />
//                     }
//                     <div className='title'>
//                         <h4 style={{ fontWeight: '700' }}>{userData.name}</h4>
//                     </div>
//                 </div>
//                 <div className='generaldetails'>
//                     <div className='detailsleft'>
//                         <span><span className='label'>Speciality: </span><span>{userData.pro_title}</span></span>
//                         <span><span className='label'>Employment Status: </span><span>{userData.employment_status}</span></span>
//                         <span><span className='label'>Gender: </span><span>{userData.gender}</span></span>
//                     </div>
//                     <div className='detailsright'>
//                         <span><span className='label'>Hospital Name: </span><span>{userData.hospitalName}</span></span>
//                         <span><span className='label'>Email: </span><span>{userData.email}</span></span>
//                         <span><span className='label'>Rate: </span><span>shs. {userData.rate} / hr</span></span>
//                     </div>

//                 </div>
//             </div>
//             <div className='info'>
//                 <div className='infoleft'>
//                     <div className='patients'>
//                         <span className='digit'>{scheduledApp + completed}</span>
//                         <div>
//                             <SlPeople size={80} color={'#B6D0E2'} />
//                             <h6>All Patients</h6>
//                         </div>
//                     </div>
//                     <div className='pendingappointments'>
//                         <span className='digit'>{scheduledApp}</span>
//                         <div>
//                             <MdPendingActions size={80} color={'#B6D0E2'} />
//                             <h6>Pending</h6>
//                         </div>
//                     </div>
//                     <div className='finishedpatients'>
//                         <span className='digit'>{completed}</span>
//                         <div>
//                             <GoThumbsup size={80} color={'#B6D0E2'} />
//                             <h6>Finished</h6>
//                         </div>
//                     </div>
//                 </div>

//             </div>
