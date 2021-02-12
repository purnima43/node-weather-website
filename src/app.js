const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const port=process.env.PORT||3000
//define paths for express config
const path_to_use=path.join(__dirname,'../public')
const views_path=path.join(__dirname,'../templates/views')
const parialspath=path.join(__dirname,'../templates/partials')

console.log(path_to_use)
//Setup handler's engine and view's location

app.set('view engine','hbs')
app.set('views',views_path)
hbs.registerPartials(parialspath)
app.use(express.static(path_to_use))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather- App',
        name:'Purnima'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:'Purnima Garg'
    })
})
app.get('/products',(req,res)=>
{   if(!req.query.search)
    {
        return res.send({
          error:' You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"you should provide a location"
        })
    }
    else
    {
       location=req.query.address;
        geocode(location,(error,{latitude,longitude,location}={})=>{
            if(error)
            {
            return  res.send({'error ':error
            })
        }
          /// console.log('data '+data)
        
           forecast(latitude,longitude, (error, foreacstdata) => {
               if(error)
               return  res.send({'error ':error
            })

            res.send({
                forecast:foreacstdata,
                location:location,
                address:req.query.address
        
            })
            
          })
        })

    }
    
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help_msg:"This is a demo help message",
        title:"Help page",
        name:'Purnima Garg'
    })
})
app.get('/help/*',(req,res)=>
{
   res.render('error',{
       errormessage:"Help article not found",
       title:"Help page",
        name:'Purnima Garg'

   })
})
app.get('*',(req,res)=>
{
    res.render('error',{
        errormessage:"Page not found",
        title:"Help page",
        name:'Purnima Garg'


    })
})




/*app.get('/weather',(req,res)=>{
    res.send({
        forecast:"sunny",
        location:"New Delhi"
    })
})

*/
app.listen(port,()=>
    {
     console.log('sever is up on port'+port)
    })