const request=require('request')

const forecast=(longitude,latitude,callback)=>
{
    url="http://api.weatherstack.com/current?access_key=2a73d1c70026fbb017684409ce8a1af6&query="+longitude+","+latitude+"&units=f"
    console.log(url)
    //geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHVybmltYTQzIiwiYSI6ImNraG5qNXJxcTB4aWUycnJ0NGY2YTdiamMifQ.sOvkxolIVRZXsvtIAGpTvg'
    //console.log(geocodeurl)
    request({url,json:true},(error,{body})=>{ //json =true parses the data automatically
        //const data1=JSON.parse(response.body)
       // console.log(data1.current)
  
       if(error)
       {
           callback("network issues! unable t connect to location services")
       }
       else if(body.error)
       {
           callback("unable to find location! try again")
       }
       else
      {   var cur=body.current
          callback(undefined,cur.weather_descriptions[0]+",it is "+cur.temperature +" degree Celcius and it feels like "+cur.feelslike+" degree celcius out")
         
      }
      })
          
       //console.log("latitude - longitude "+latitude+" "+longitude)
      
    
}
module.exports=forecast
