const express = require('express');
const port = 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');

app.use('/',require('./routers'));


app.listen(port , function(err){
    if(err){console.log(`Error occur while runnig server ${err}`);  return;}
    console.log('Server is runnig successfully...Of sample Proj');

}); 