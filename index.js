const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

require('dotenv').config();
const apiKey = process.env.APIKEY;


const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs')

// Load home page
app.get('/', (req, res) => {
  res.render('index');
})

// Spoontacular API

// Get the targeted client search
app.get('/search', (req, res) => {
  let query = 'tacos';
  // console.log(query)
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
    qs: {
      query: query,
      diet: 'vegan',
      excludeIngredients: '',
      intolerances: '',
      number: '3',
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
    if (error) {
      res.render('index', { title: null, error: 'No data found' });
      res.status(404)
    }
    else {
      let data = JSON.parse(body);

      if (data == undefined || data.results == null) {
        res.render('index', { title: null, error: 'No data found' });
        res.status(404)
      } else {
        // let titleData = data.results;
      
        let titleText = `Recipe name: ${data.results[0].title}`;
        let titleText2 = `Recipe name: ${data.results[1].title}`;
        let titleText3 = `Recipe name: ${data.results[2].title}`;
        res.render('index', { title: titleText, title2: titleText2, title3: titleText3, error: null })
        // res.render('index', { title2: titleText2, error: null })
        // res.render('index', { title3: titleText3, error: null })
        // data.results.forEach(ele => {

        //   console.log(ele.title)
        // });

      }
    }
  });
})





const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is running on server ${PORT}`)
})