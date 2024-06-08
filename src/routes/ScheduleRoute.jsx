import { useState, useEffect } from "react";
import { GridLoader } from "react-spinners";
import { Schedule } from "../Services/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "react-query";
import isValidToken from "../utils/isValidToken";
import CustomButton from "../components/customButton";
import ScheduleTableRowWidget from "../components/scheduleTableRow";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const ScheduleRoute = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isLoading1, error, data, refetch } = useQuery(
    "getToken3",
    isValidToken,
    { enabled: true },
  );

  const [schedules, setSchedules] = useState([]);
  const [doRefetch, setDorefetch] = useState(null);

  useEffect(() => {
    if (data || doRefetch) {
      var [_, userData] = data;
      const getschedules = async () => {
        try {
          const times = await Schedule.getSchedules({
            doctorID: userData.doc_ID,
          });
          setSchedules(times.data);
        } catch (error) {
          console.log(error);
        }
      };
      getschedules();
    }
  }, [data, doRefetch]);

  async function handleSubmit(e, datetime) {
    e.preventDefault();
    try {
      let newScheduledTime = await Schedule.createSchedule(datetime);
      setSchedules([...schedules, newScheduledTime.data]);
      setOpen(false);
      setDorefetch(true);
    } catch (error) {
      console.log(error.message);
      return error;
    }
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

  if (data) {
    var [_, userData] = data;

    return (
      <div className="flex flex-col flex-grow  my-2 mr-2">
        <div className="h-[8%]  flex items-center justify-between">
          <div className="flex items-center ">
            <p className="font-semibold text-lg ml-3">Appointment Schedule</p>
          </div>

          <div className="flex items-center mr-5">
            <CustomButton
              content={"Create schedule"}
              classname={"bg-dark-blue text-white w-[150px]"}
              handleButtonClick={handleClickOpen}
            />
            <CustomizedDialogs
              alertState={open}
              onClose={handleClose}
              handleSubmit={handleSubmit}
              userData={userData}
            />
          </div>
        </div>
        <div className="mt-6 overflow-y-auto flex-grow h-full border mx-3 rounded-lg">
          <div className="h-[40px] flex px-3 sticky top-[0px] bg-custom-color bg-dark-blue mb-1">
            <div className="w-[30%] flex items-center">
              <p className="text-white mr-4 ml-3 text-md">Date</p>
            </div>
            <div className="flex-grow justify-evenly flex items-center mx-2">
              <div className=" w-full max-w-[33.3%] hidden md:block">
                <p className="text-white text-md max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                  Time (24h)
                </p>
              </div>
              <div className=" w-full hidden justify-start max-w-[33.3%] md:flex">
                <p className="text-white text-md max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap mr-5">
                  Status
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
              {schedules.map((value) => (
                <tr className="" key={value.apt_schedule_ID}>
                  <td>
                    <ScheduleTableRowWidget
                      id={value.apt_schedule_ID}
                      schedule={value}
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
};

export default ScheduleRoute;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {},
  "& .MuiDialogActions-root": {},
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: "60%",
      maxWidth: "600px",
      height: "60%",
      background: "linear-gradient(to bottom, #353c5e 60%, #242323 100%)",
      borderRadius: theme.spacing(1),
    },
  },
}));

export function CustomizedDialogs({
  alertState,
  onClose,
  handleSubmit,
  userData,
}) {
  const [datetime, setDateTime] = useState({
    date: null,
    time: null,
    doctorID: userData.doc_ID,
    status: "active",
  });

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={alertState}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="flex flex-col items-center justify-evenly w-[600px] mb-6">
          <p className="text-lg font-semibold text-white">
            Select date and time
          </p>
          <form
            className=" flex flex-col h-[200px] justify-between"
            onSubmit={(e) => handleSubmit(e, datetime)}
          >
            <input
              type="date"
              className="w-[200px] px-3 py-3 border bg-[#353c5e] border-white text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setDateTime({ ...datetime, date: e.target.value })
              }
            />
            <input
              type="time"
              className="w-[200px] px-3 py-3 border bg-[#353c5e] border-white text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setDateTime({ ...datetime, time: e.target.value })
              }
            />
            <button
              type="submit"
              className="h-12 font-bold px-6 border border-white text-lg hover:bg-dark-blue text-white cursor-pointer rounded-lg w-[200px]"
            >
              Save
            </button>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
