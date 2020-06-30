const axios=require('axios')
const API_KEY='0b079f80c262cb52a83d38ae34d02289'
const Weather=require('../model/db')
exports.renderHomePage=(req,res)=>{
    res.render('index')
}

exports.renderAboutPage=(req,res)=>{
    res.render('about')
}

exports.getWeather=(req,res)=>{
    const city=req.body.city
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const weather=new Weather(city)
    weather.validateUserInput()
    if(weather.errors.length){
        res.render('index',{
            error:weather.errors.toString()
        })
    }
    else{
        axios.get(url)
       
        .then((response)=>{
            const {temp:temperature}=response.data.main
            const {name:city}=response.data
            res.render('index',{
                // weather:`It is currently ${response.data.main.temp} in ${response.data.name}`
                weather:`It is currently ${temperature} in ${city}`
            })
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }
    
}