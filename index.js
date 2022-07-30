const express = require('express');
const port = 8000;
const app = express();

//First install Thsi module and add it
const ExpressLayout = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.set('views','./views');

//the subpages css is load at top of page now its append on right place
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//Here we are using that module only Now create "Layout.ejs" file and make a layout
//This  "layout.ejs" file not to be render. All Files set in Layout file then render auto by the express 

app.use(express.static('assets'));
app.use(ExpressLayout);
app.use('/',require('./routers'));




app.listen(port , function(err){
    if(err){console.log(`Error occur while runnig server ${err}`);  return;}
    console.log('Server is runnig successfully...Of sample Proj');

}); 