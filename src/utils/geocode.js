const request=require('request')

const geocode=(address,callback)=>
{
    geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHVybmltYTQzIiwiYSI6ImNraG5qNXJxcTB4aWUycnJ0NGY2YTdiamMifQ.sOvkxolIVRZXsvtIAGpTvg'
    console.log(geocodeurl)
    request({url:geocodeurl,json:true},(error,{body})=>{ //json =true parses the data automatically
        //const data1=JSON.parse(response.body)
       // console.log(data1.current)
       if(error)
       {
           callback("network issues! unable t connect to location services")
       }
       else if(body.features.length==0)
       {
           callback("unable to find location! try again")
       }
       else
      { callback(undefined,{
         longitude:body.features[0].geometry.coordinates[1],
        latitude:body.features[0].geometry.coordinates[0],
        location:body.features[0].place_name

      })
          
       //console.log("latitude - longitude "+latitude+" "+longitude)
      }
    })

}
module.exports=geocode
/*{
    geocode:geocode
}*/