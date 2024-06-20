import { useEffect, useState } from "react";
import { Appointments, Edit } from "../Services/api";
import FadeLoader from "react-spinners/FadeLoader";
import { useQuery } from "react-query";
import isValidToken from "../utils/isValidToken";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../components/customButton";
import localforage from "localforage";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Profile() {
  const [scheduledApp, setScheduledApp] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [localImagePresent, setLocalImagePresent] = useState(true);
  const [localImage, setLocalImage] = useState(null);

  const { isLoading1, error, data, refetch } = useQuery({
    queryKey: ["getToken"],
    queryFn: isValidToken,
    cacheTime: 40,
    staleTime: 40,
  });

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

  // For handling the temporary image display when user sets profile image
  useEffect(() => {
    if (data) {
      var [_, userData] = data;

      // Retrieve the image file from LocalForage
      localforage
        .getItem(`avatar${userData.doc_ID}`)
        .then((imageFile) => {
          if (imageFile) {
            // Create a URL for the image file
            const imageUrl = URL.createObjectURL(imageFile);
            setLocalImage(imageUrl);
          } else {
            setLocalImagePresent(false);
          }
        })
        .catch((error) => console.error("Error retrieving image file:", error));
    }
  }, [localImagePresent]);

  if (data) {
    var [_, userData] = data;

    let datetime = new Date();
    let time = datetime.getHours();

    const handleFileChange = async (event) => {
      const file = event.target.files[0];

      if (file) {
        try {
          const value = await Edit.editProfilePhoto(userData.doc_ID, file);
          if (value) {
            localforage
              .setItem(`avatar${userData.doc_ID}`, file)
              .then((value) => {
                setLocalImagePresent(true);
              });
          } else {
            console.log("server error");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    const handleEditProfile = () => {
      console.log("not implemented");
    };

    return (
      <div className="flex flex-col flex-grow  my-2 mr-2">
        <div className="h-[8%]  flex items-center justify-between mb-3">
          <div className="flex items-center ">
            <p className="font-semibold text-lg ml-4">Profile</p>
          </div>

          <div className="flex items-center mr-5">
            <CustomButton
              content={"Edit"}
              classname={
                "hover:bg-dark-blue hover:text-white w-[100px] border border-dark-blue"
              }
              handleButtonClick={handleEditProfile}
            />
          </div>
        </div>
        <div className="flex-grow flex flex-col  rounded-lg">
          <div className="w-[430px] rounded-lg h-[40%] hidden items-center md:flex ml-4 mr-5 border border-light-blue ">
            {userData.avatar ? (
              <img
                src={`${BASE_URL}/uploads/${userData.avatar.file_name}`}
                alt="User Avatar"
                className="min-h-[150px] min-w-[150px] h-[150px] w-[150px] rounded-full m-6"
              />
            ) : localImage ? (
              <img
                src={localImage}
                alt="User Avatar"
                className="min-h-[150px] min-w-[150px] h-[150px] w-[150px] rounded-full m-6"
              />
            ) : (
              <div className="relative inline-block border rounded-full min-h-[150px] min-w-[150px] m-6">
                <AddIcon className="min-w-[150px] p-12  min-h-[150px] border border-light rounded-full bg-gray-100" />
                <input
                  name="avatar"
                  type="file"
                  accept="image"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}

            <div className="flex flex-col justify-start items-start  ">
              <p className="font-semibold text-xl text-dark-blue ">
                Dr. {userData.name}
              </p>
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
    return <h1>there is a terrible error {error.message} </h1>;
  }

  if (isLoading1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader
          color={"#0c008a"}
          loading={isLoading1}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
}
