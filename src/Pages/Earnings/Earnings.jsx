import './Earnings.css'
import Transaction from '../../Components/Transaction/Transaction';
import { CiBadgeDollar } from "react-icons/ci";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const payments = [
    {
        transactionId:'1234',
        date: '21-04-2024',
        time: '13:00',
        amount: 50000
    },
    {
        transactionId:'1235',
        date: '21-04-2024',
        time: '13:00',
        amount: 50000
    },
    {
        transactionId:'1236',
        date: '21-04-2024',
        time: '13:00',
        amount: 50000
    },
    {
        transactionId:'1237',
        date: '21-04-2024',
        time: '13:00',
        amount: 50000
    }
]

export default function Earnings(){
    return(
        <div className='main'>
            <h2 className='mb-5'>Earnings</h2>
            <h5>Summary</h5>
            <div className='d-flex gap-3 mb-5'>
                <div className='totalearnings p-2'>
                    <CiBadgeDollar size={80}/>
                    <span>Total Earnings</span>
                    <span> shs.600000</span>
                </div>
                <div className='rate p-2'>
                    <FaMoneyBillTrendUp size={80}/>
                    <span>My Rate</span>
                    <span> shs.50000</span>
                </div>
            </div>
            <h5>Payments History</h5>
            <div className='paymentshistory'>
                <div className='searchbar'>
                    <div className='searchdiv'>
                        <i className="bi bi-search"></i>
                        <input className='search' placeholder='Search Transaction'/>
                    </div>
                </div>
                {payments.map(payment => <Transaction key={payment.transactionId} transactionId={payment.transactionId} date={payment.date} time={payment.time} amount={payment.amount} />)}
            </div>
        </div>
    )
}