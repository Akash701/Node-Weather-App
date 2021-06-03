const fs = require('fs')
const request = require('request')

const geocode = (adress,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoiYWthc2g3ZGFyayIsImEiOiJja2tubmF1NTcwemxtMnFycXpsamp5NWNzIn0.zLE2PSG7qz8Snx5Oc0JdFA&limit=1'
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback('Unable to connect!',undefined)
      }
      else if(response.body.features.length===0){
            callback('Unable to assess location',undefined)
      }
      else{ 
        callback(undefined,{
          longitude:response.body.features[0].center[0],
          latitude:response.body.features[0].center[1],
          location:response.body.features[0].place_name
        }
          )
         
        
      }
    })
  }

module.exports = geocode
  
