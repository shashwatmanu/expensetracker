import React from 'react'
import { useState } from 'react';
import "./Expenses.css"
import { SnackbarProvider, useSnackbar } from 'notistack'

const ModalForm = ({handleClose,balance, expenses, setBalance, setExpenses, setTransactions, transactions, isEdit, nameToEdit, val}) => {
    // const [objToAdd, setObjToAdd] = useState({})
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    
    const handleBalance = (e) =>{
        e.preventDefault();
        if(e.target[0].value){
        setBalance(prevBalance => parseFloat(prevBalance)+parseFloat(e.target[0].value))
        handleClose();}
        else{
            enqueueSnackbar('Add Balance to proceed');
        }
    }

    const validate = (e) => {
        if(!e.target[0].value){
            handleClose();
            enqueueSnackbar('Must add Title to proceed');
            return false;
        }
        if(!e.target[1].value){
            handleClose();
            enqueueSnackbar('Must add Value to proceed');
            return false;
        }
        if(e.target[2].value!=="food"&&e.target[2].value!=="entertainment"&&e.target[2].value!=="travel"){
            handleClose();
            enqueueSnackbar('Must choose Category to proceed');
            return false;
        }
        if(!e.target[3].value){
            handleClose();
            enqueueSnackbar('Must choose Date to proceed');
            return false;
        }
        if(e.target[1].value>val){
            handleClose();
            enqueueSnackbar('Not enough balance');
            return false
        }
    }

    const handleExpense = (e) =>{

       if(validate(e)===false){
return
       }

        
        
else{
        let newObj;
        e.preventDefault();
        setExpenses(prevExpense => parseFloat(prevExpense)+parseFloat(e.target[1].value))
        setBalance(prevBalance => prevBalance-parseFloat(e.target[1].value))
        let wholeDayVar = new Date (e.target[3].value);
        let dateVar = wholeDayVar.getDate();
        let monthNum = wholeDayVar.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      let monthVar = monthNames[monthNum];
        let yearVar = wholeDayVar.getFullYear();
        newObj = {'name':e.target[0].value, 'value':parseFloat(e.target[1].value),'category':e.target[2].value,'date': {'day':dateVar, 'month': monthVar, 'year': yearVar}}
        // setObjToAdd(newObj);


        if(isEdit){
            let indexToDelete, valueToDelete;
            
    transactions.forEach((transaction,index)=>{
    if(transaction.name===nameToEdit);
    indexToDelete=index;
    valueToDelete = transaction.value;
})
const itensCopy = Array.from(transactions)
    itensCopy.splice(indexToDelete, 1, newObj)

setTransactions(itensCopy);
setExpenses(prevExp => prevExp - valueToDelete);
setBalance(prevBal => prevBal + valueToDelete);
// setTransactions(prevTrans => prevTrans[indexToDelete]=newObj)
        }

        else{
        setTransactions([...transactions, newObj])
        }
        handleClose();
    }
    }
  return (
    <>
    
     <div style={{position:'absolute',top:'50%',left:'50%',backgroundColor:'#EFEFEF', opacity:'85%',transform: 'translate(-50%, -50%)',borderRadius:'15px', height:'275px',width:'478px',color:'black', padding:'30px'}}>
        <h2>{isEdit?"Edit":"Add"} {balance?"Balance":"Expenses"}</h2>
       <div style={{display:'flex', flexWrap:'wrap'}}> 
       <form onSubmit={balance?handleBalance:handleExpense}>
       {balance?(<input className="inputs" type='number' placeholder='Income amount'/>):(<div>
        <input className="inputs" type="text" placeholder='Title'/>
        <input className="inputs" type="number" placeholder='Price'/>
        <select className="inputs" >
            <option disabled selected>Select Category</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
        </select>
            <input className="inputs" type="date" /></div>)}
       
        <button className='add-button'>Add {balance?"Balance":"Expense"}</button>
        <button onClick={handleClose} className='cancel-button'>Cancel</button>
        </form>
        </div>
        </div>
        
    </>
  )
}

export default ModalForm