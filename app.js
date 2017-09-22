const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const moment = require('moment')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{

})

app.get('/:timestamp',(req,res)=>{
    
    let timestamp = req.params.timestamp;
    let unix = null;
    let natural = null;
   

   if(+timestamp >= 0){ //it is in unix format
       natural = unixToNat(Number(timestamp));
       unix = natToUnix(natural)
       
   }else if(isNaN(Number(timestamp))){ //it is natural date format
       unix = natToUnix(timestamp);
       natural = unixToNat(Number(unix));
   }
   res.json({
       unix,
       natural
   })
   
})

app.listen(PORT,()=>{
    console.log('Server is up and running');
})

function unixToNat(timestamp){
    return moment(timestamp).format('MMMM Do YYYY')
}
function natToUnix(timestamp){
    return moment(timestamp, "MMMM D, YYYY").format("x");
}
