const request = require('request');

const forecast = (latitude, longitude, callback) => {
const url = 'https://api.darksky.net/forecast/d817bbd5976bc113c56a4406cf79cfb5/' + latitude + ',' + longitude; 
//using object shorthand and destructuring in here
//request({url: url, json: true}, (error, response) => {
request({url, json: true}, (error, {body}) => {
    if(error){
        callback('Unable to connect to weather service', undefined);
    } else if(body.error){
    //else if(response.body.error){ we have use above as we destructure data already above
        callback('Unable to find location',undefined);
    } else {
        //destructure the below data    
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + (body.currently.temperature - 32) * 5 / 9 + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        //callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + (response.body.currently.temperature - 32) * 5 / 9 + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
    }

});
}

module.exports = forecast;