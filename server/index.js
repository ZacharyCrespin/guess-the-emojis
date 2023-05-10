const express = require('express')
const { getEmojiImages } = require('./emoji')
const fs = require('fs')
const app = express()
const port = 3000

let serverStatus = 'runing'
let categorys
let allQs = []

async function setup() {
  fs.readFile('categorys.json', (err, res) => {  
    if (err) {
      console.log(err);
    } else {
      categorys = JSON.parse(res);
    }
  })
  fs.readFile('questions.json', (err, res) => {  
    if (err) {
      console.log(err);
    } else {
      questions = JSON.parse(res);
    }
    questions.forEach(element => {
      allQs.push(element)
    });
  })
  serverStatus = 'setup'
}
setup()

app.get('/', (req, res) => {
  res.send(serverStatus)
})

app.get('/categorys', (req, res) => {
  res.send(categorys)
})

app.get('/randomQuestion', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  let random = Math.floor(Math.random() * (allQs.length - 1));
  let question = allQs[random];
  getEmojiImages(question.emojis.string).then((imgs) => {
    question.emojis.imgs = imgs;
    res.send(question);
  })
})

app.use('/emojis', express.static('emojis'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}\nhttp://localhost:${port}`)
})