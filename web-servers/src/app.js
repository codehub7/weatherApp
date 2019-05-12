const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//defining path for express config
const pathToViews = path.join(__dirname, '../views');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
console.log(partialsPath);

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

//set up handlebars for views directory
app.set('view engine','hbs'); //process of getting setup is like this. We need to tell express which templating engine we installed
//set allow you to set a value for a given express setting. We have a key-the setting name(view enigne) and a value(hbs) and these values are case sensitive and
// and hardcode as same.   

//modification in directory path for handlebars 
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

app.get('',(req, res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Ashish'
    }); //first argument is the name of the view to render and second argument is an object which contain values we want to show 
});

app.get('/about', (req, res) =>{
    res.render('about',{
        title:'About Page',
        name:'Ashish'
    });
});

app.get('/help', (req, res) =>{
    res.render('help',{
        title:'Help Page',
        name:'Ashish'
    });
});



//if someone visits are server like below
//app.com
//app.com/help
//app.com/about 
/* app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>');  //to display some thing like text result on browser 
    //sending html element to browser shown above   
}); */


app.get('/help',(req, res)=>{
    //res.send('What type of help you need?'); 
    //sending json data to browser
    res.send([{
        name: 'andrew',
        age: 27
    },
    {
        name: 'sara',
        age: 22
    }
]);
});

app.get('/about',(req, res)=>{
    res.send('<h1>This is a test server created by ashish</h1>');
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

/* app.get('/weather',(req, res)=>{
    //res.send('View and show weather');
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // }); 

    if(!req.query.address){
        return res.render('404', {
            errorMessage: 'You must provide a search term.',
            name: 'Ashish'
        });
    }

    //need to pass default parameters in case user tries an invalid address
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.render('404', {
                errorMessage: error,
                name: 'Ashish'
            });
        }
       
        // forecast(data.latitude,data.longitude, (error, forecastData) => {
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.render('404', {
                    errorMessage: error,
                    name: 'Ashish'
                });
            }
            res.render('weather', {
                forecast: forecastData,
                location,
                address: req.query.address,
                name:'Ashish'
            });
        });
    });
    
});
 */
app.get('/help/*', (req, res) =>{
    //res.send('help article not found');
    res.render('404',{
        title:'404',
        name:'Ashish',
        errorMessage: 'Article is not found'
    });
});

app.get('*', (req, res) =>{
    //res.send('Note: 404 page not found');
    res.render('404',{
        title:'404',
        name:'Ashish',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.');
});