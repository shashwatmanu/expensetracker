import React from 'react'
import Modal from '@mui/material/Modal';
import ModalForm from './ModalForm';
import "./Expenses.css"

const AddSection = ({balance, expenses, setBalance, setExpenses, setTransactions, transactions, val}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
    <div style={{height:'181px',display:'flex',flexDirection:'column', justifyContent:'space-around',backgroundColor:'#9B9B9B', width:'355.41px',borderRadius:'15px', margin:'30px'}}>
            <div style={{alignSelf:'center', fontWeight:'400', fontSize:'30px'}}>{balance?"Wallet Balance":"Expenses"}: <span className={balance?"balance":"expense"}>₹{balance?balance:expenses}</span></div>
            <button onClick={handleOpen} className={balance?"balance":"expense"}>+ Add {balance?"Income":"Expense"}</button>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <ModalForm handleClose={handleClose} balance={balance} expenses={expenses} setBalance={setBalance} setExpenses={setExpenses} setTransactions={setTransactions} transactions={transactions} val={val}/>
        </Modal>

     </div>
    </>
  )
}

export default AddSection