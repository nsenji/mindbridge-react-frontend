import Person from '../assets/person.png'
import { FaPlay } from 'react-icons/fa';
import { MdPendingActions } from "react-icons/md";
import { RiUser2Line } from 'react-icons/ri';
import CustomButton from './customButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSendMail from '../Services/useSendMail';
import { MeetingConfig, authToken } from '../Services/api';
import { BsCalendar2Week } from "react-icons/bs";
import moment from 'moment';



export default function ScheduleTableRowWidget({ schedule,}) {

    const navigate = useNavigate();

    async function handleEdit() {
        console.log("Not Implemented")

    }
    async function handleDelete() {
        console.log("Not Implemented")
    }

    const formattedDate = moment(schedule.date, "YYYY-MM-DD").format("ddd, DD MMM YYYY");

    return (
        <div className='h-[56px] flex px-3 group hover:bg-hover-light-blue rounded-md mb-3'>
            <div className='w-[30%] flex items-center'>
                <div className="flex">
                    <BsCalendar2Week className='h-[20px] w-[20px] ' color='#082063' />

                    <div className='flex flex-col ml-3 justify-center'>
                        <p className='text-black font-semibold text-md overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]'>{formattedDate}</p>
                    </div>
                </div>
            </div>
            <div className='flex-grow justify-evenly flex items-center mx-2'>
                <div className=' w-full max-w-[33.3%] hidden md:block'>
                    <div className='flex items-center'>
                        <p className='text-gray-500 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap ml-4'>{schedule.time}  </p>
                    </div>
                </div>
                <div className=' w-full hidden justify-start max-w-[33.3%] md:flex'>
                    <p className='text-green-600 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap mr-5 ml-1'>{schedule.status}</p>
                </div>
                <div className=' w-full items-center flex justify-center'>
                    <CustomButton classname={`border border-dark-blue  w-[80px] mr-1 hover:bg-dark-blue hover:text-white`} content={"Edit"} isDisabled={false} handleButtonClick={handleEdit}  />
                    <CustomButton classname={`border border-red-400  w-[80px] ml-1 hover:bg-red-400 hover:text-white`} content={"Delete"} isDisabled={false} handleButtonClick={handleDelete}  />
                    
                </div>
            </div>
        </div>
    )
}