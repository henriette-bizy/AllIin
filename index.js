require('./models/db')
const SaleController = require('./controllers/saleController')
const express = require('express')
let app = express();


app.use(express.json()); 
app.use(express.urlencoded());


app.get('/', (req,res)=>{
    res.send("hello this is allin app");
});
app.use('/sales',SaleController);

const port = 3700;
app.listen(port,() =>console.log("we listening on port "+port))



