import React, { useEffect, useState } from 'react';
import {Route,Switch} from 'react-router-dom';
import Header from './Component/Header';
import LandingPage from './Component/LandingPage';
import axios from 'axios';
import Pizza from './Component/Pizza';
import Burger from './Component/Burger';
import Cart from './Component/Cart';
function App() {


  const [data,setData]= useState([]);
  const [cart,setCart]= useState([]);
  useEffect(() => {
    async function fetchData(){
        const response= await axios.get('/data')
        console.log(response);
        setData(response.data.results);
        return response
       }

 fetchData();
 fetchCartData();
},[])
async function fetchCartData(){
  const response= await axios.get('/cartData')
  console.log(response.data);
  setCart(response.data);
 return response
} 


const incrementValue=(items)=>{
  const itemDetails={
    name:items.name,
    price:items.price,
    image:items.image,
    description:items.description
  }
  axios.post('/addData',itemDetails)
  
  fetchCartData();
}
const removeCartItem=(index,items)=>{
  setCart(
    cart.filter((item,itemindex)=> index!==itemindex)
  )
  const data={
    _id:items._id
}
  axios.delete('/deleteData',{data})
}
const removeAll=()=>{

  
  axios.delete('/clearCart');
  setCart([]);
}

  return (<>
    <div className="App">
      <Header value={cart.length}/>  
      <Switch>
        <Route exact path="/" component={()=><LandingPage fetchdata={data} />}></Route>
        <Route exact path="/cart" component={()=><Cart cartData={cart} removeItem={removeCartItem}  clearAll={removeAll}/>}></Route>
        <Route exact path="/pizza" component={()=><Pizza  fetchdata={data} increment={incrementValue}/>}></Route>
        <Route exact path="/burger" component={()=><Burger fetchdata={data} increment={incrementValue}/>}></Route>
      </Switch>    
    </div>
    </>
  );
}

export default App;
