var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    todoRoutes = require('./routes/todos');

app.get('/', function(req, res){
    res.send("HELLO FROM ROOT ROUTE");
});

//allow access to request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/todos', todoRoutes);


    
app.listen(port, function(){
   console.log("app running on port:", port);
});
    


