import {useState} from 'react'

const Header = ({navButtons, handleClear, reset}) => {
  const [content, setContent] = useState('Hiring Manager'); 
  
  
 return (
    <>
    <nav>
    <h1 id="header">My React App</h1>
    <h3>{content}</h3>
    <div className="decisions">
        <button onClick={(e) => navButtons(e)} id='n1'>Accepted</button>
        <button onClick={handleClear} id='n3'>Reset</button>
        <button onClick={(e) => navButtons(e)} id='n2'>Dump Folder</button>
    </div>
    </nav>
    </>
 )
}

export default Header