import { useEffect } from "react";
import DropDown from "../Components/DropDownMenu/DropDown";
import PatientHistory from "../Components/PatientHistory/PatientHistory";
import { useState } from "react";
import { Appointments } from "../Services/api";
import { Search } from "@mui/icons-material";
import { FaRegCalendarTimes } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import isValidToken from "../utils/isValidToken";
import HistoryTableRowWidget from "../customComponents/historyTableRow";

const History = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointments_2, setAppointments_2] = useState([]);
  const [targetValue, setTargetValue] = useState("");

  const { isLoading, error, data } = useQuery("getToken", isValidToken, {
    enabled: true,
  });

  if (data) {
    var [_, userData] = data;

    useEffect(() => {
      const getDoctorHistory = async () => {
        try {
          const pastAppointments = await Appointments.getDoctorHistory({
            doctorID: userData.doc_ID,
          });
          setAppointments(pastAppointments.data);
        } catch (error) {
          console.log(error);
        }
      };
      getDoctorHistory();
    }, []);
  }

  useEffect(() => {
    return setAppointments_2(
      appointments.filter(
        (app) =>
          app.patient.name.toLowerCase().includes(targetValue.toLowerCase()) ||
          app.date.toLowerCase().includes(targetValue.toLowerCase()),
      ),
    );
  }, [targetValue]);

  return (
    <div className="flex flex-col flex-grow  my-2 mr-2">
      <div className="flex items-center px-3 mt-1">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 text-gray-500" />
          <input
            type="text"
            className="w-[300px] pl-10 pr-3 py-2 border border-dark-blue rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search patient or date"
            onChange={(e) => setTargetValue(e.target.value)}
          />
        </div>
        <div className="w-[120px] border p-2 flex justify-center rounded border-dark-blue">
          <p className="font-semibold">{appointments.length} Records</p>
        </div>
      </div>
      <div className="mt-4 overflow-y-auto flex-grow h-full border mx-3 rounded-lg">
        <div className="h-[40px] flex px-3 sticky top-[0px] bg-custom-color bg-dark-blue mb-1">
          <div className="w-[30%] flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
            <p className="text-white mr-4 ml-3 text-md">Patient name</p>
          </div>
          <div className="flex-grow justify-evenly flex items-center mx-2">
            <div className=" w-full max-w-[33.3%] hidden md:block">
              <p className="text-white text-md max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap ml-7">
                Date{" "}
              </p>
            </div>
            <div className=" w-full hidden justify-center max-w-[33.3%] md:flex">
              <p className="text-white text-md max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap ">
                Time (24h)
              </p>
            </div>
            <div className=" w-full flex justify-center max-w-[33.3%] ">
              <p className="text-white text-md max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                Status
              </p>
            </div>
          </div>
        </div>

        <table className="w-full">
          <tbody className="">
            {targetValue.length === 0
              ? appointments.map((app) => (
                  <tr className="" key={app.selected_apt_ID}>
                    <td>
                      <HistoryTableRowWidget history={app} />
                    </td>
                  </tr>
                ))
              : appointments_2.map((app) => (
                  <tr className="" key={app.selected_apt_ID}>
                    <td>
                      <HistoryTableRowWidget history={app} />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default History;
