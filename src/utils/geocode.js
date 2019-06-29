const request = require("request")

const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const baseUrlEnd = ".json?access_token=pk.eyJ1Ijoic2N1cnJlbnQiLCJhIjoiY2p4ZHU1eW91MDQzbTN0cDZzdmRrODM4NyJ9.GnksR_Tro3Z9rRQy-R4iDA"


const geocode = (address, callback) => {
    const url = baseUrl + encodeURIComponent(address) +  baseUrlEnd
   request({url:url, json:true}, (error, {body}) =>{
       if(error){
           callback("Unable to connect to loc services!", undefined)
       }else if(body.features.length===0){
           callback("Unable to find location. Try another search", undefined)
       }else{
           callback(undefined, {
              lat: body.features[0].center[0],
              long: body.features[0].center[1],
              locationName: body.features[0].place_name
           })
       }
   } )
}


module.exports = geocode