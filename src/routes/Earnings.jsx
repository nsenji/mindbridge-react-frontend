import { useState } from "react";

import { useEffect } from "react";
import { DoctorsEarnings } from "../Services/api";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "react-query";
import isValidToken from "../utils/isValidToken";
import { Search } from "@mui/icons-material";
import EarningsTableRowWidget from "../components/earningsTableRow";
import EmptyState from "../assets/empty_state.png";


export default function Earnings() {
  const [earnings, setEarnings] = useState([]);
  const [targetValue, setTargetValue] = useState("");
  const [earnings_2, setEarnings_2] = useState([]);

  const { isLoading, error, data } = useQuery("getToken", isValidToken, {
    enabled: true,
  });

  if (data) {
    var [_, userData] = data;

    useEffect(() => {
      async function fetchDoctorsEarnings() {
        let response = await DoctorsEarnings.getDoctorsEarnings({
          doctorID: userData.doc_ID,
        });
        setEarnings(response.data);
      }
      fetchDoctorsEarnings();
    }, []);
  }

  useEffect(() => {
    return setEarnings_2(
      earnings.filter(
        (earning) =>
          earning.date.toLowerCase().includes(targetValue.toLowerCase()) ||
          earning.patient.name
            .toLowerCase()
            .includes(targetValue.toLowerCase()),
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
        <div className=" border p-2 flex justify-center rounded border-dark-blue">
          <p className="font-semibold whitespace-nowrap">
            Total : Shs{" "}
            {earnings.reduce((accumulator, earning) => {
              return accumulator + earning.amount;
            }, 0)}
          </p>
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
                Amount (Shs)
              </p>
            </div>
          </div>
        </div>

        {earnings.length ? (
          <table className="w-full">
            <tbody className="">
              {targetValue.length === 0
                ? earnings.map((app) => (
                    <tr className="" key={app.payment_ID}>
                      <td>
                        <EarningsTableRowWidget earnings={app} />
                      </td>
                    </tr>
                  ))
                : earnings_2.map((app) => (
                    <tr className="" key={app.payment_ID}>
                      <td>
                        <EarningsTableRowWidget earnings={app} />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <div className=" flex-grow flex flex-col justify-center items-center mt-[100px]">
            <img
              src={EmptyState}
              className="min-h-[200px] min-w-[200px] h-[40px] w-[40px]"
            />
            <p className="font-semibold text-lg">Nothing here yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
