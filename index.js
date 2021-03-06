const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

require('dotenv').config();
const apiKey = process.env.APIKEY;

const internalApi = require("./public/data.json")

const app = express();

app.use(express.static('public'));
// app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Load home page
app.get('/', (req, res) => {
  res.render('index',
    {
      title: null, title2: null, title3: null,
      readyTime: null, readyTime2: null, readyTime3: null,
      url: null, url2: null, url3: null,
      error: null, vegan: null, vegetarian: null
    });
})

// Spoontacular API

// Get the targeted client search
app.get('/search', (req, res) => {
  let query = req.query.userInput;
  console.log(query)
  let diet = req.query.vOv;
  console.log(diet)

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
    qs: {
      query: query,
      diet: diet,
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



      if (data.results[0] == undefined || data.results[0] == null) {
        res.render('index',
          {
            title: null, title2: null, title3: null,
            readyTime: null, readyTime2: null, readyTime3: null,
            url: null, url2: null, url3: null,
            error: 'No data found', vegan: null, vegetarian: null
          });
        res.status(404)
      } else if (data.results[1] == undefined || data.results[1] == null) {
        let titleText = `${data.results[0].title}`;
        let readyTime = `${data.results[0].readyInMinutes} minutes!`;
        let urlText = `${data.results[0].sourceUrl}`;

        if (diet === "vegan") {
          const veganApi = internalApi.vOv[0].vegan
          console.log(veganApi)

          res.render('index',
            {
              title: titleText, title2: null, title3: null,
              readyTime: readyTime, readyTime2: null, readyTime3: null,
              url: urlText, url2: null, url3: null,
              error: 'End of list', vegan: veganApi, vegetarian: null
            })
        } else {
          const vegetarianApi = internalApi.vOv[1].vegetarian

          res.render('index',
            {
              title: titleText, title2: null, title3: null,
            readyTime: readyTime, readyTime2: null, readyTime3: null,
            url: urlText, url2: null, url3: null,
            error: 'End of list', vegan: null, vegetarian: vegetarianApi
            })
        }

        res.status(200)
      } else if (data.results[2] == undefined || data.results[2] == null) {
        let titleText = `${data.results[0].title}`;
        let readyTime = `${data.results[0].readyInMinutes} minutes!`;
        let urlText = `${data.results[0].sourceUrl}`;

        let titleText2 = `${data.results[1].title}`;
        let readyTime2 = `${data.results[1].readyInMinutes} minutes!`;
        let urlText2 = `${data.results[1].sourceUrl}`;

        if (diet === "vegan") {
          const veganApi = internalApi.vOv[0].vegan
          console.log(veganApi)

          res.render('index',
            {
              title: titleText, title2: titleText2, title3: null,
            readyTime: readyTime, readyTime2: readyTime2, readyTime3: null,
            url: urlText, url2: urlText2, url3: null,
            error: 'No data found', vegan: veganApi, vegetarian: null
            })
        } else {
          const vegetarianApi = internalApi.vOv[1].vegetarian

          res.render('index',
            {
              title: titleText, title2: titleText2, title3: null,
            readyTime: readyTime, readyTime2: readyTime2, readyTime3: null,
            url: urlText, url2: urlText2, url3: null,
            error: 'No data found', vegan: null, vegetarian: vegetarianApi
            })
        }
        res.status(200)
      } else {
        // let titleData = data.results;

        // Get the TITLE
        let titleText = `${data.results[0].title}`;
        let titleText2 = `${data.results[1].title}`;
        let titleText3 = `${data.results[2].title}`;

        // Get the TIME
        let readyTime = `${data.results[0].readyInMinutes} minutes!`;
        let readyTime2 = `${data.results[1].readyInMinutes} minutes!`;
        let readyTime3 = `${data.results[2].readyInMinutes} minutes!`;

        // Get the URL
        let urlText = `${data.results[0].sourceUrl}`;
        let urlText2 = `${data.results[1].sourceUrl}`;
        let urlText3 = `${data.results[2].sourceUrl}`;

        // Internal API vOv
        if (diet === "vegan") {
          const veganApi = internalApi.vOv[0].vegan
          console.log(veganApi)

          res.render('index',
            {
              title: titleText, title2: titleText2, title3: titleText3,
              readyTime: readyTime, readyTime2: readyTime2, readyTime3: readyTime3,
              url: urlText, url2: urlText2, url3: urlText3,
              error: null, vegan: veganApi, vegetarian: null
            })
        } else {
          const vegetarianApi = internalApi.vOv[1].vegetarian

          res.render('index',
            {
              title: titleText, title2: titleText2, title3: titleText3,
              readyTime: readyTime, readyTime2: readyTime2, readyTime3: readyTime3,
              url: urlText, url2: urlText2, url3: urlText3,
              error: null, vegan: null, vegetarian: vegetarianApi
            })
        }



      }
    }
  });
})





const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is running on server ${PORT}`)
})