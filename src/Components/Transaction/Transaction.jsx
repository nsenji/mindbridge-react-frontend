import "./Transaction.css";
const Transaction = ({ transactionId, date, time, amount }) => {
  return (
    <div className="transaction">
      <span>{transactionId}</span>
      <span>{date}</span>
      <span>{time}</span>
      <span>{amount}</span>
    </div>
  );
};

export default Transaction;
