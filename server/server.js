//Setup 
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

//ENV  
require('dotenv').config();
const port = process.env.PORT || 2000

//CORS  && Body Parser 
app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

//Set Static Folder 

app.use(express.static('build'));
console.log(__dirname)



//Middle Ware 
function handleData(data){
    const collectEntries = [...data.accepted, ...data.rejected]
    const collectIds = []

    for(let i = 0; i < collectEntries.length; i++){
        collectIds[i] = collectEntries[i]["id"]
    }
    console.log(collectIds); 
    return data['current'].filter((d) => !collectIds.includes(d.id))

}
// Handle Post Request 

app.post('/',(req,res) =>{
    const data = req.body
    console.log(data)
    
   const filteredData =  handleData(data)
    res.json(filteredData)
    
})


app.listen(port, () => console.log(`listening @ ${port}`))
