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



export default function HistoryTableRowWidget({ history }) {

    return (
        <div className='h-[56px] flex px-3 group hover:bg-hover-light-blue rounded-md mb-3'>
            <div className='w-[30%] flex items-center'>
                <div className="flex ">
                    <RiUser2Line className='h-[20px] w-[20px] ' color='#082063' />

                    <div className='flex flex-col ml-3 justify-center'>
                        <p className='text-black font-semibold text-md overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]'>{history.patient.name}</p>
                    </div>
                </div>
            </div>
            <div className='flex-grow justify-evenly flex items-center mx-2'>
                <div className=' w-full items-center justify-start hidden md:flex'>
                    <p className='text-gray-500 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap'>{history.date}  </p>

                </div>
                <div className=' w-full max-w-[33.3%] hidden md:block'>
                    <div className='flex items-center justify-center'>
                        <p className='text-gray-500 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap'>{history.time}  </p>
                    </div>
                </div>
                <div className=' w-full justify-center max-w-[33.3%] md:flex'>
                    <p className='text-green-600 text-sm max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap'>{history.status}</p>
                </div>
            </div>
        </div>
    )
}