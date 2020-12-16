const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

require('dotenv').config();
const apiKey = process.env.APIKEY;


const app = express();



app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('index');
})

// Spoontacular API

const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
    qs: {
      query: 'chicken',
      diet: 'vegetarian',
      excludeIngredients: '',
      intolerances: '',
      number: '5',
      offset: '0',
      type: 'main course'
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      useQueryString: true
    }
  };
  
  request(options, function (error, response, body) {
      if (error) throw new Error(error);
  
      console.log(body);
  });





const PORT = 8080;

app.listen(PORT, () => {
    console.log(`App is running on server ${PORT}`)
})