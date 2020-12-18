const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

require('dotenv').config();
const apiKey = process.env.APIKEY;


const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'html')

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
      diet: 'vegetarian',
      excludeIngredients: '',
      intolerances: '',
      number: '2',
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
      res.render('index')
      res.send('Bad request').status(400)
    } else {
      let data = JSON.parse(body);
      if (data == undefined || data == null) {
        res.render('index');
        res.send('No data found').status(404)
      } else {
        console.log(data)
        let title = [];
        for (var i = 0; i < data.results.length; i++) {

          title.push(data.results[i].title);

        }
        console.log(title)
        // res.render('index', {})
        // appendData(data);
      }
    }

    // console.log(body);
  });
})

// const appendData = (data) => {
//   const res = data.results;
//   // var mainContainer = document.getElementById("myData");
//   // for (var i = 0; i < res.length; i++) {
//   //   var div = document.createElement("div");
//   //   div.innerHTML = 'Name: ' + res[i].title;
//   //   mainContainer.appendChild(div);
//   //   // console.log(data.results[0])
//   // }

//   console.log(res)
// }




const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is running on server ${PORT}`)
})