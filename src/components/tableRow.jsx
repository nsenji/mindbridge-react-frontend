
import { RiUser2Line } from "react-icons/ri";
import CustomButton from "./customButton";
import { useNavigate } from "react-router-dom";


export default function TableRowWidget({ appointment, isToday }) {
  const navigate = useNavigate();

  async function handleButtonClick() {
    navigate("/call-room", { state: { email: appointment.patient.email } });
  }

  return (
    <div className="h-[56px] flex px-3 group hover:bg-hover-light-blue rounded-md mb-3">
      <div className="w-[30%] flex items-center">
        <div className="flex">
          <RiUser2Line className="h-[23px] w-[23px] " color="#082063" />

          <div className="flex flex-col ml-3 justify-center">
            <p className="text-black font-semibold text-md overflow-hidden text-ellipsis whitespace-nowrap max-w-[220px]">
              {appointment.patient.name}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-grow justify-evenly flex items-center mx-2">
        <div className=" w-full max-w-[33.3%] hidden  md:block">
          <div className="flex items-center">
            <p className="text-gray-500 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
              {appointment.date}{" "}
            </p>
            {isToday && <div className="flickering-light ml-2"></div>}
          </div>
        </div>
        <div className=" w-full hidden justify-center max-w-[33.3%] md:flex">
          <p className="text-gray-500 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap mr-5">
            {appointment.time}
          </p>
        </div>
        <div className=" w-full items-center flex justify-center">
          <CustomButton
            classname={`border border-dark-blue  w-[90px] ${isToday && "group-hover:bg-dark-blue group-hover:text-white"}`}
            content={"Start Call"}
            isDisabled={!isToday}
            handleButtonClick={handleButtonClick}
          />
          <div className="hidden group-hover:block">
            <CustomButton />
          </div>
        </div>
      </div>
    </div>
  );
}
