const express = require('express')
const { getEmojiImages } = require('./emoji')
const fs = require('fs')
const app = express()
const port = 3000
const allowOrigin = "*"

let serverStatus = 'runing'
let allQs = []
let categorys = []
let categoryData = {}

async function setup() {
  fs.readFile('questions.json', (err, res) => {  
    if (err) {
      console.log(err);
    } else {
      const questions = JSON.parse(res);
      const tempCategorys = [];

      questions.forEach((element, i) => {
        element.id = i;
        allQs.push(element);

        const category = element.category;
        tempCategorys.push(category);
        if (categoryData.hasOwnProperty(category)) {
          categoryData[category]++;
        } else {
          categoryData[category] = 1;
          categorys.push(category)
        }
      });
    }
  });
  serverStatus = 'setup';
}
setup()

app.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", allowOrigin)
  res.send({
    serverStatus,
    totalQuestions: allQs.length,
    categorys
  })
})

app.get('/randomQuestion', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", allowOrigin)
  let random = Math.floor(Math.random() * (allQs.length - 1));
  let question = allQs[random];
  getEmojiImages(question.emojis.string).then((imgs) => {
    question.emojis.imgs = imgs;
    res.send(question);
  })
})

app.get('/question/:index', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", allowOrigin)
  let i = req.params.index
  let question = allQs[i]
  getEmojiImages(question.emojis.string).then((imgs) => {
    question.emojis.imgs = imgs;
    res.send(question);
  })
})

app.get('/category/:category', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", allowOrigin)
  let category = req.params.category
  res.send({
    category,
    numberOfQs: categoryData[category]
  });
})

app.get('/play', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", allowOrigin)

  function getRandomQs(x) {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const indexes = Array.from({ length: allQs.length }, (_, i) => i); // Create an array with indexes [0, 1, 2, ..., allQs.length - 1]
    const shuffledIndexes = shuffle(indexes); // Shuffle the array
    return shuffledIndexes.slice(0, x); // Select the first x indexes
  }

  let category = req.query.category
  let numberOfQs = req.query.numberOfQs
  if (numberOfQs == "inf") {numberOfQs = allQs.length}
  res.send({
    category,
    numberOfQs,
    questions: getRandomQs(numberOfQs)
  });
})

app.use('/emojis', express.static('emojis'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}\nhttp://localhost:${port}`)
})