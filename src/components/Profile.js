import {useState,useEffect} from 'react'

const Profile = ({users,handleApplicant,isClicked, isAccepted,accepted,rejected}) => {

 return (
    <>
    {!isClicked ? users.map((pro,i) =>
    <div key={pro.id} className="account">
        <div className="Img">
       <img src={pro.image}id="pp" alt='Profile-Pic' />
       </div> 
       <div className="text">
        <h2>{pro.name}</h2>
        <p>{pro.email}</p>
       </div>
       <button onClick={(e) => handleApplicant(e.target,i)} id="btn">Accept</button>
       <button onClick={(e) => handleApplicant(e.target,i)}  id="btn2">Reject</button>
    </div>
) : isAccepted ? accepted.length > 0 ? accepted.map((pro,i) =>
<div key={pro.id} className="account">
    <div className="Img">
   <img src={pro.image} id="pp" alt='Profile-Pic' />
   </div> 
   <div className="text">
    <h2>{pro.name}</h2>
    <p>{pro.email}</p>
   </div>
   <button  style={{backgroundColor:'rgba(0,255,0,0.7'}} id="btn">Accepted</button>
   <button  id="btn2">Reject</button>
</div>) :<div className="title"><h1 id="t1">No Accepted Applicants</h1></div> : rejected.length > 0 ? rejected.map((pro,i) =>
<div key={pro.id} className="account">
    <div className="Img">
   <img src={pro.image} id="pp" alt='Profile-Pic' />
   </div> 
   <div className="text">
    <h2>{pro.name}</h2>
    <p>{pro.email}</p>
   </div>
   <button id="btn">Accepted</button>
   <button style={{backgroundColor:'rgba(255,0,0,0.7'}} id="btn2">Rejected</button>
</div>) : <div className="title"><h1 id="t2">No Rejected Applicants </h1></div>} 
    </>
 )
}

export default Profile