const request = require("request")





const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/7a833d287462f592917f1b3a7173f061/" + lat +","+ long
    //url: url   -> destuct to just url
    //response destructures to just body
    request({url, json: true},  (error, {body})=> {
            console.log(url)
   
        if(error){
            callback("unable to connect to weather service", undefined)  
        }else if(body.error){
            callback("unable to find the location", undefined)
        
        }else{
            const result = body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees.  There is a " + body.currently.precipProbability + "% chance of rain."
            console.log(result)
            callback(undefined, result)
        }    
//        console.log("It is currently " + response.body.currently.temperature + " degrees.  There is a " + response.body.currently.precipProbability + "% chance of rain." )
 //       console.log(response.body.daily.data[0].summary)
    
    })    
}



module.exports = forecast