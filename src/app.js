const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utiles/geocode')
const forecast = require('./utiles/forecast')
const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

 //Setup handle bars engine and views
 app.set('view engine','hbs')
 app.set('views',viewspath)
 hbs.registerPartials(partialsPath)

//setup static directory to serve
 app.use(express.static(publicDirectoryPath))

 app.get('',(req,res)=>{
     res.render('index',{
         title:'Home Page',
         name:'Created by Akash'

     })
 })

 app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Weather app",
        name:'My name is Akash'
    })
})

app.get("/help",(req,res)=>{
res.render('help',{
    title:"Help Page",
    message:"What can i do for you",
    name:'Created by Akash'
})
})

app.get('/products',(req,res)=>{
   if(!req.query.search){
  return  res.send({
    error: "You didn't search anything"
        
    })


   }
   else{
   console.log(req.query.send);
   res.send({
    product:[]
    }
   )}
    
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:"User doesn't search anything"
        })
    }
    else{
        geocode(req.query.address,(error,{longitude,latitude,location})=>{
            if (error) {
                return res.send({error:[]});
              }
              forecast(longitude,latitude,(error, forecastData) => { 
                //(data.longitude,data.latitude)
              if(error){
               return res.send({error:"Error"})
              }
              res.send({forecast:forecastData,
                location,
                address:req.query.address
            })
            })
           })
    }
})

app.get('*',(req,res)=>{
    res.render('404Page',{
        title:'404',
        message:"404 Page",
        name:'Created by Akash'
    })
})

// app.get('',(req,res)=>{
//   res.send('<h1>Hello Express</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send('<h2>Help</h2>')
// })

// app.get('/about',(req,res)=>{
//     res.send(
//     {name:'Akash',
//     age:22
// }
//     )
// })



app.listen(3000,()=>{
    console.log('Server is Running');
})