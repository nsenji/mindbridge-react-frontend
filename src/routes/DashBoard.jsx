import { useEffect, useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { IoIosPersonAdd } from "react-icons/io";
import { TbFolderCancel } from "react-icons/tb";
import { SlPeople } from "react-icons/sl";
import { MdPendingActions } from "react-icons/md";
import { GoThumbsup } from "react-icons/go";
import Chart from "react-apexcharts";
import TableRowWidget from "../components/tableRow";
import { Appointments, Edit } from "../Services/api";
import FadeLoader from "react-spinners/FadeLoader";
import { useQuery } from "react-query";
import isValidToken from "../utils/isValidToken";
import moment from "moment";
import Person from "../assets/person.png";
import { DoctorsEarnings } from "../Services/api";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function DashBoard() {
  const { isLoading1, error, data, refetch } = useQuery({
    queryKey: ["getToken2"],
    queryFn: isValidToken,
    refetchOnMount: true,
  });

  const [scheduledApp, setScheduledApp] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    if (data) {
      var [_, userData] = data;

      async function getScheduledAppointments() {
        const scheduled = await Appointments.getScheduledAppointments({
          doctorID: userData.doc_ID,
        });
        setScheduledApp(scheduled.data.length);
        setAppointments(scheduled.data);
      }
      async function getCompletedCases() {
        const cases = await Appointments.getDoctorHistory({
          doctorID: userData.doc_ID,
        });
        setCompleted(cases.data.length);
      }
      async function fetchDoctorsEarnings() {
        let response = await DoctorsEarnings.getDoctorsEarnings({
          doctorID: userData.doc_ID,
        });
        setEarnings(response.data);
      }
      fetchDoctorsEarnings();
      getScheduledAppointments();
      getCompletedCases();
    }
  }, [data]);

  if (data) {
    var [_, userData] = data;

    let datetime = new Date();
    let time = datetime.getHours();
    const momentInstance = moment();
    const currentdate = momentInstance.format("ddd, D MMM YYYY");

    return (
      <div className="flex flex-col flex-grow  my-2 mr-2">
        <div className="h-[8%]  flex items-center justify-between">
          <div className="flex items-center ml-2">
            <CiCircleChevLeft className="" />
            <div className="font-semibold text-medium ml-2">
              {time < 12
                ? "Good Morning"
                : time <= 16
                  ? "Good Afternoon"
                  : "Good Evening"}
            </div>
          </div>

          <div className="flex items-center mr-5">
            {userData.avatar ? (
              <img
                src={`${BASE_URL}/uploads/${userData.avatar.file_name}`}
                alt="User Avatar"
                className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full mr-2"
              />
            ) : (
              <img src={Person} alt="" className="h-[40px] w-[40px]" />
            )}

            <p className="ml-1 font-semibold">Dr. {userData.name}</p>
          </div>
        </div>
        <div className="mt-3 h-[100px]  flex items-center">
          <div className="h-[80px] w-[200px] m-3 p-2 bg-red-container rounded-lg">
            <div className="flex  items-center">
              <div className="h-[35px] w-[35px] border flex items-center justify-center rounded-full bg-red-container-inner">
                <MdPendingActions size={20} color={"#ffffff"} />
              </div>
              <p className="ml-2 font-bold text-xl">{scheduledApp}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 ml-1 mt-2">
                Pending Appointments
              </p>
            </div>
          </div>
          <div className="h-[80px] w-[200px] m-3 p-2 bg-green-container rounded-lg">
            <div className="flex  items-center">
              <div className="h-[35px] w-[35px] border flex items-center justify-center rounded-full bg-green-container-inner">
                <GoThumbsup size={20} color={"#ffffff"} />
              </div>
              <p className="ml-2 font-bold text-xl">{completed}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 ml-1 mt-2">
                Done Appointments
              </p>
            </div>
          </div>
          <div className="h-[80px] w-[200px] m-3 p-2 bg-light-blue rounded-lg">
            <div className="flex  items-center">
              <div className="h-[35px] w-[35px] border flex items-center justify-center rounded-full bg-dark-blue">
                <MdPendingActions size={20} color={"#ffffff"} />
              </div>
              <p className="ml-2 font-bold text-lg">
                Shs.{" "}
                {earnings.reduce((accumulator, earning) => {
                  return accumulator + earning.amount;
                }, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 ml-1 mt-2">
                Total Earnings
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 overflow-y-auto flex-grow h-full border mx-3 rounded-lg">
          <div className="h-[40px] flex px-3 sticky top-[0px] bg-custom-color bg-dark-blue mb-1">
            <div className="w-[30%] flex items-center">
              <p className="text-white mr-4 ml-3 text-md">Appointments</p>
            </div>
            <div className="flex-grow justify-evenly flex items-center mx-2">
              <div className=" w-full max-w-[33.3%] hidden md:block">
                <p className="text-white text-md max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap ml-5">
                  Date{" "}
                </p>
              </div>
              <div className=" w-full hidden justify-center max-w-[33.3%] md:flex">
                <p className="text-white text-md max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap mr-5">
                  Time (24h)
                </p>
              </div>
              <div className=" w-full flex justify-center max-w-[33.3%] ">
                <p className="text-white text-md max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                  Action
                </p>
              </div>
            </div>
          </div>

          <table className="w-full">
            <tbody className="">
              {appointments.map((value) => (
                <tr className="" key={value.selected_apt_ID}>
                  <td>
                    <TableRowWidget
                      id={value.selected_apt_ID}
                      appointment={value}
                      isToday={
                        currentdate.toLowerCase() == value.date.toLowerCase()
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          loading={isLoading1}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
}
