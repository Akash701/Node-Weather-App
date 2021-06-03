const request = require('request')

const forecast = (longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6cb6f9ea028054383a935171e17e42c1&query=='+encodeURIComponent(latitude,longitude)+'&units=m'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if(response.body.error){
            callback('Unable access the location',undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0]+' It is currently '+response.body.current.temperature + " degrees out. It feels like "+response.body.current.feelslike+" degrees out.")
        }
    })
   }
   
   
     module.exports = forecast