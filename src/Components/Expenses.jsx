import React, { useEffect } from 'react'
import { useState } from 'react'
import AddSection from './AddSection';
import Transactions from './Transactions';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import "./Expenses.css"


const Expenses = () => {
    const [balance, setBalance] = useState((localStorage.getItem("balance"))?localStorage.getItem("balance"):5000);
    const [expenses, setExpenses] = useState((localStorage.getItem("expenses"))?localStorage.getItem("expenses"):0);
    const [transactions, setTransactions] = useState((localStorage.getItem("transactions"))?JSON.parse(localStorage.getItem("transactions")):[])
    const [categories, setCategories] = useState([]);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};    

// useEffect(()=>{
//     let variable;
// if(localStorage.getItem("balance")!==5000){
//     setBalance(localStorage.getItem("balance"));
//     // console.log(localStorage.getItem("balance"));
// }
// if(localStorage.getItem("expenses")){
//     setExpenses(localStorage.getItem("expenses"));
// }
// if(localStorage.getItem("transactions")){
//     variable = localStorage.getItem("transactions");
//     setTransactions(JSON.parse(variable));
// } 
// },[])

useEffect(()=>{
localStorage.setItem("balance", balance);
localStorage.setItem("expenses", expenses);
localStorage.setItem("transactions", JSON.stringify(transactions));
},[balance,expenses,transactions])


    
    useEffect(()=>{
        let travel= 0, entertainment = 0, food = 0;

        transactions.forEach((transaction)=>{
    if(transaction.category==="travel"){travel+=transaction.value}
    if(transaction.category==="entertainment"){entertainment+=transaction.value}
    if(transaction.category==="food"){food+=transaction.value}
    })
let categoriesVar = [{value: travel, name: "Travel"}, {value: entertainment, name:"Entertainment"}, {value: food, name:"Food"}]
setCategories(categoriesVar)
// console.log(categoriesVar)
    },[transactions])

  return (
    <>
    <h2 style={{marginLeft:'20px', fontWeight:'700', fontSize:'32px'}}>Expense Tracker</h2>
    <div style={{display:'flex', justifyContent:'space-evenly',backgroundColor:"#626262", marginLeft:'20px', marginRight:'25px', borderRadius:"10px", alignItems:'center', height:'269px', flexWrap:'flex-shrink'}}>
        <div><AddSection balance={balance} setBalance={setBalance}/></div>
        <div><AddSection expenses={expenses} setExpenses={setExpenses} setBalance={setBalance} setTransactions={setTransactions} transactions={transactions} val={balance}/></div>

        <ResponsiveContainer width="20%" height="70%">

        <PieChart width={400} height={400}>
          <Pie
            data={categories}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            stroke='none'
          >
            {categories.map((category, index) => (
              <Cell style={{outline:'none'}} key={`cell-${index}`} fill={(category.name==="Food")?"#A000FF":(category.name==="Travel")?"#FDE006":"#FF9304"} />
              
            ))}
          </Pie>
        </PieChart>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{display:'flex', marginRight:'9px'}}>
        <div className='color-box' id='food'></div>
        <div style={{fontFamily:'Open Sans'}}> Food</div>
        </div>
        <div style={{display:'flex', marginRight:'9px'}}>
        <div className='color-box' id='entertainment'></div>
        <div style={{fontFamily:'Open Sans'}}> Entertainment</div>
        </div>
        <div style={{display:'flex', marginRight:'9px'}}>
        <div className='color-box' id='travel'></div>
        <div style={{fontFamily:'Open Sans'}}> Travel</div>
        </div>
        </div>
      </ResponsiveContainer>
      
      
      
    </div>
    <Transactions transactions={transactions} categories={categories} setTransactions={setTransactions} setBalance={setBalance} setExpenses={setExpenses}/>
    
    </>
  )
}

export default Expenses