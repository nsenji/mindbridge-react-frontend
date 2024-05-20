import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Services/authprovider';
import { TbFolderCancel } from "react-icons/tb";
import Transaction from '../../Components/Transaction/Transaction';
import { CiBadgeDollar } from "react-icons/ci";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useEffect } from 'react';
import { DoctorsEarnings } from '../../Services/api';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Earnings.css'

export default function Earnings(){
    const { authUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [earnings, setEarnings] = useState([])
    const [targetValue, setTargetValue] = useState("")
    const [earnings_2, setEarnings_2] = useState([])

    useEffect(()=>{
        return  setEarnings_2(earnings.filter(earning => earning.date.toLowerCase().includes(targetValue.toLowerCase()) || earning.payment_ID.toLowerCase().includes(targetValue.toLowerCase())))
     
     }, [targetValue])

    useEffect(()=>{
       async function fetchDoctorsEarnings(){
        setIsLoading(true)
        let response = await DoctorsEarnings.getDoctorsEarnings({doctorID: authUser.doc_ID})
        setEarnings(response.data)
        setIsLoading(false)
       }
       fetchDoctorsEarnings()
    }, [])
    return(
        <div className='m-3'>
            <h2 className='mb-3'>Earnings</h2>
            <h5>Summary</h5>
            <div className='d-flex gap-3 mb-5'>
                <div className='totalearnings p-2'>
                    <CiBadgeDollar size={80}/>
                    <span>Total Earnings</span>
                    <span>shs. {isLoading ? 
                        <Skeleton/>
                        : earnings.reduce((accumulator, earning)=>{ return accumulator + earning.amount}, 0)}
                    </span>
                </div>
                <div className='rate p-2'>
                    <FaMoneyBillTrendUp size={80}/>
                    <span>My Rate</span>
                    <span>shs. {authUser.rate}</span>
                </div>
            </div>
            <h5>Payments History</h5>
            <div className='paymentshistory'>
                <div className='searchbar'>
                    <div className='searchdiv w-100'>
                        <i className="bi bi-search"></i>
                        <input className='search' placeholder='Search Transaction' onChange={(e) =>setTargetValue(e.target.value)} />
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    {isLoading ? <Skeleton count={5}/> : targetValue.length === 0 ? earnings.length ? earnings.map((earning) => <Transaction key={earning.payment_ID} transactionId={earning.payment_ID} date={earning.date} time={earning.time} amount={earning.amount} />) : <h5 className='align-self-center'><TbFolderCancel/> No Records!</h5> : earnings_2.map((earning) => <Transaction key={earning.payment_ID} transactionId={earning.payment_ID} date={earning.date} time={earning.time} amount={earning.amount} />) }
                </div>
            </div>
        </div>
    )
}