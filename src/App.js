import React from 'react'
import {useState,useEffect} from 'react'
import Header from './components/Header'
import Profile from './components/Profile'
import hs1 from './assets/hs1.jpg'
import hs2 from './assets/hs2.jpg'
import hs3 from './assets/hs3.jpg'
import hs4 from './assets/hs4.jpg'
import hs5 from './assets/hs5.jpg'
import hs6 from './assets/hs6.jpg'
import hs7 from './assets/hs7.jpg'
import hs8 from './assets/hs8.jpg'
import hs9 from './assets/hs9.jpg'

function App() {  
  useEffect(()=>{
    localStorage.setItem('v1', JSON.stringify([]))
    localStorage.setItem('v2',JSON.stringify([])) 
  },[]) 

  const [users, setUsers] = useState([]);
  const [accepted,setAccepted] = useState(JSON.parse(localStorage.getItem('v1'))); 
  const [rejected, setRejected] = useState(JSON.parse(localStorage.getItem('v2')))
  const [isClicked, setClicked] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const images = [hs1,hs2,hs3,hs4,hs5,hs6,hs7,hs8, hs9]
  const [isReset, setReset] = useState(false)
  
  
   // Local Storage Stuff   
   useEffect(() =>{
  
   if([...accepted,...rejected].length < 1) return 

   localStorage.setItem('v1', JSON.stringify(accepted))
   localStorage.setItem('v2',JSON.stringify(rejected))     
    
   console.log(JSON.parse(localStorage.getItem('v1')))
   }, [accepted ,rejected])

  
  useEffect(()=>{
    handleFetch()
  },[])
 

  async function handleFetch(){
   const data = await fetch('https://jsonplaceholder.typicode.com/users')
   .then(res => res.json())
   
   const filteredData = data.filter((d) => d.id < 10)

   for(let i = 0; i < filteredData.length; i++){
    filteredData[i].image = images[i]
   }
   
   const v1 = JSON.parse(localStorage.getItem('v1')); 
   const v2 = JSON.parse(localStorage.getItem('v2'));

   const postData = {accepted:v1,rejected:v2,current:filteredData}
    // Make Server Request 
    const serverResponse = await fetch('http://localhost:2000/', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(postData)
    })
    .then(res => res.json())
    .catch(error => console.log(error))
       
    setUsers(serverResponse)


   
  }
  
  function handleApplicant(e,i){
    console.log(users)
    const usersList = [...users]
    let acceptedNums = [], rejectedNums = []; 
    switch(e.id){
      case 'btn':
        let acceptedUsers = [...usersList];

       
        acceptedNums.push(acceptedUsers[i]["id"])
         acceptedUsers = acceptedUsers.filter((u) => acceptedNums[0] === u.id)
         
         setAccepted([...accepted,...acceptedUsers])
         break; 
      case 'btn2':
       let rejectedUsers = [...usersList]
        
        
        rejectedNums.push(rejectedUsers[i]["id"])
        rejectedUsers = rejectedUsers.filter((u) => rejectedNums[0] === u.id); 
  
        setRejected([...rejected, ...rejectedUsers])
        break; 
    }
    usersList.splice(i,1); 
    setUsers(usersList)
  }
  function navButtons(e){
     e.target.classList.toggle('toggle', !isClicked);

     if(e.target.id === 'n1'){
      setIsAccepted(true)
      e.target.parentNode.children[2].classList.toggle('toggle', false)
     } else if(e.target.id === 'n2'){
      setIsAccepted(false)
      e.target.parentNode.children[0].classList.toggle('toggle',false)
     }
     setClicked(!isClicked)
  }
   
  function handleClear(){
    console.log(1);

    localStorage.setItem('v1', JSON.stringify([]))
    localStorage.setItem('v2', JSON.stringify([]))
    setReset(true)

    window.location.reload() 
  }
  return (
    <div className="App">
       <Header reset={isReset} handleClear={handleClear} navButtons={navButtons} />
       <main>
        <div className="wrap">
            <Profile images={images} accepted={accepted} rejected={rejected} isAccepted={isAccepted} isClicked={isClicked}
             handleApplicant={handleApplicant} users={users} /> 
        </div>
       </main>
    </div>
  );
}

export default App;
