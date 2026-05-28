
const express = require("express")

const app = express();

const fs = require("fs");


app.use('/about',(req,res,next) => {
    console.log("Middleware 1")
   
    console.log("METHOD : ",req.method, req.originalUrl)
    next() // go to next function

})

app.use('products',(req,res,next) =>{
    
     console.log("Middleware 2")
     next()
})
app.get("/" ,(req,res)=>{
    res.send('hello world')
})


app.get('/about' ,(req,res) =>{
    res.send("hello form about page")
})

   app.get('/products' , (req,res) =>{
        res.send([
            {id :1, title: "Product 1"},
            {id :2, title: "Product 2"}

        ])
    })


app.listen(3000, "localhost", () => {
    console.log("listing on port : 5000")
})