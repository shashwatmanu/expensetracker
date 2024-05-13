import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import ModalForm from './ModalForm';
import { IoPizzaOutline } from "react-icons/io5";
import { LuLuggage } from "react-icons/lu";
import { LuPopcorn } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IconContext } from 'react-icons/lib';
import { SnackbarProvider, useSnackbar } from 'notistack'

const Transactions = ({transactions, categories, setTransactions, setBalance, setExpenses}) => {
    const [page, setPage] = useState(1);
    const [paginatedTransactions, setPaginatedTransactions] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const handleDelete = (e) =>{
        
        let indexToDelete, valueToDelete;
        console.log(e.target.value)
transactions.forEach((transaction,index)=>{
    if(transaction.name===e.target.value){
    indexToDelete=index;
    valueToDelete = transaction.value;}
    
})
console.log(valueToDelete);
// console.log(indexToDelete)
const itensCopy = Array.from(transactions)
    itensCopy.splice(indexToDelete, 1)
    // console.log(itensCopy);
    
    
    setExpenses(prevExp => prevExp - parseFloat(valueToDelete));
    setBalance(prevBal => prevBal + parseFloat(valueToDelete));
    
    setTransactions(itensCopy);



    }

    const handlePrevPage = () => {
        if(page===1){
            enqueueSnackbar(`Can't go back further`);
            return
        }
        setPage(prevPage=>prevPage-1)

    }
    const handleNextPage = () => {
        if(page>=(transactions.length)/3){
            enqueueSnackbar(`No more Transactions to display`);
            return
        }
        setPage(prevPage=>prevPage+1)

    }

    useEffect(()=>{
        let paginatedVar= [];
        if(transactions.length<3*page){
        for(let i = 3*(page-1); i<transactions.length; i++){
paginatedVar.push(transactions[i])
        }
    }
    else{
        for(let i = 3*(page-1); i<3*page; i++){
            paginatedVar.push(transactions[i])
    }
    }
        setPaginatedTransactions(paginatedVar);
    },[page, transactions])
  return (
    <>
    <div style={{marginLeft:'20px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginRight:'20px'}}>
        <div style={{width:'738px'}}>
    <h2 style={{fontWeight:'700', fontStyle:'italic', fontSize:'28px'}}>Recent Transactions</h2>
    <div style={{backgroundColor:'#FFFFFF', color:'black', height:'297px', borderRadius:'15px', padding:'24px'}}>
        <div style={{position:'relative', height:'100%'}}>
            {(transactions.length===0)?(<div>Add Expenses to see Transaction list</div>):""}
    {paginatedTransactions.map((transaction)=> <div><div>
        <div style={{display:'flex',justifyContent:"space-between", height:'60px'}}>
       
        
<div style={{display:'flex'}}>
    <div style={{backgroundColor:'#D9D9D9', alignSelf:'center', width:'38px', height:'38px', borderRadius:'100%', textAlign:'center', verticalAlign:'middle', lineHeight:'38px', marginRight:'17px'}}>{(transaction.category==="food")?(<IoPizzaOutline style={{width:'24px', height:'24px', transform:'translate(+0%,+23%)'}}/>):(transaction.category==="entertainment")?(<LuPopcorn  style={{width:'24px', height:'24px', transform:'translate(+0%,+23%)'}}/>):(<LuLuggage style={{width:'24px', height:'24px', transform:'translate(+0%,+23%)'}}/>)}</div>
    <div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center', height:'50px'}}>
        <div>{transaction.name}</div>
        <div>{transaction.date}</div>
        </div>
        </div>
        </div>
        <div style={{alignSelf:'center', color:'#F4BB4A', fontWeight:'700', fontSize:'16px'}}><span style={{marginRight:'21px'}}>₹{transaction.value}</span>
        <IconContext.Provider value={{color:'white', size:'19px'}}>
            <button value={transaction.name} onClick={handleDelete} className='delete-button'>X</button></IconContext.Provider>
<IconContext.Provider value={{color:'white', size:'19px'}}><button onClick={handleOpen} className='edit-button'><MdEdit /></button></IconContext.Provider>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <ModalForm handleClose={handleClose} isEdit={true} setBalance={setBalance} setExpenses={setExpenses} setTransactions={setTransactions} transactions={transactions} nameToEdit={transaction.name}/>
        </Modal>
        </div>
        </div>
        </div>
        <div style={{marginBottom:'12px'}}><hr/></div>
        </div>)}
        
        <div style={{position:'absolute', display:'flex', left:'40%', bottom:'0'}}>
           
        <button onClick={handlePrevPage} style={{borderRadius:'15px', border:'none', width:'37px', boxShadow:'0 4px 4px rgba(0,0,0,0.25)'}}>←</button>
        <div style={{backgroundColor:'#43967B', width:'37px', height:'37px', display:'flex', alignItems:'center', justifyContent:'center', color:'white', borderRadius:'5px', margin:'0 20px 0 20px', boxShadow:'0 4px 4px rgba(0,0,0,0.25)'}}>{page}</div>
        <button onClick={handleNextPage} style={{borderRadius:'15px', border:'none', width:'37px', boxShadow:'0 4px 4px rgba(0,0,0,0.25)'}}>→</button>
        </div>
    
    </div>
    </div>
    </div>
    <div style={{display:'flex', flexDirection:'column'}}>
    <h2  style={{fontWeight:'700', fontStyle:'italic', fontSize:'28px'}}>Top Expenses</h2>
    <div style={{backgroundColor:'white', padding:'3px', borderRadius:'15px'}}>
    <BarChart
    layout='vertical'
      width={417}
      height={345}
      data={categories}
    //   margin={{
    //     top: 5,
    //     right: 30,
    //     left: 20,
    //     bottom: 5,
    //   }}
    >
      <XAxis type='number' tickLine={false} axisLine={false} tick={false}/>
      <YAxis dataKey="name" type='category' tickLine={false} axisLine={false} width={120} tick={{fill:'black'}}/>
      <Bar dataKey="value" fill="#8784D2" radius={[0,10,10,0]} barSize={20}/>
    </BarChart>
    </div>
    </div>
    </div>
    </>
  )
}

export default Transactions