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


export default function ScheduleTableRowWidget({ schedule}) {

    const navigate = useNavigate();

    async function handleButtonClick() {
    }

    return (
        <div className='h-[56px] flex px-3 group hover:bg-hover-light-blue rounded-md mb-3'>
            <div className='w-[30%] flex items-center border'>
                <div className="flex">
                    <BsCalendar2Week className='h-[20px] w-[20px] ' color='#082063' />

                    <div className='flex flex-col ml-3 justify-center'>
                        <p className='text-black font-semibold text-md overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]'>{schedule.date}</p>
                    </div>
                </div>
            </div>
            <div className='flex-grow justify-evenly flex items-center mx-2'>
                <div className=' w-full max-w-[33.3%] hidden md:block'>
                    <div className='flex items-center border'>
                        <p className='text-gray-500 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap'>{schedule.time}  </p>
                    </div>
                </div>
                <div className=' w-full hidden justify-start max-w-[33.3%] md:flex border'>
                    <p className='text-gray-500 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap mr-5'>{schedule.status}</p>
                </div>
                <div className=' w-full items-center flex justify-center'>
                    <CustomButton classname={`border border-dark-blue  w-[90px] `} content={"Start Call"} isDisabled={false} handleButtonClick={handleButtonClick}  />
                    <div className='hidden group-hover:block'>
                        <CustomButton />
                    </div>
                </div>
            </div>
        </div>
    )
}