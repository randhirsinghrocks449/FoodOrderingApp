import React from 'react'
import { NavLink} from 'react-router-dom';

const LandingPage = (props) => {
    
    console.log(props)
        
        return <div className="item_container">{props.fetchdata.map((item, index) => {
        return <NavLink  className="item_link_container"key={index} to ={`/${item.name.toLowerCase()}`}>
            <img className="itemImage_styling" src={item.image} alt="" /><p className="category_styling">{item.name}</p>
            </NavLink>}
        )}
            </div>
   
}

export default LandingPage
