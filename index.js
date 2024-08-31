const express = require('express');
const app = express();

app.get('/',(reg,res)=>{
    res.send({'hello':'there'});
});



const PORT = process.env.PORT||5000;
app.listen(PORT);