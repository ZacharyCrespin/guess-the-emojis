const serverURL = 'https://server.guess-the-emojis.zacharyc.site'

let score = 0
let a

function newQ() {
  fetch(`${serverURL}/randomQuestion`)
  .then((response) => response.json())
  .then((question) => {
    console.log(question)
    const emojiDiv = document.getElementById('emojis')
    // Remove all child elements from the div
    while (emojiDiv.firstChild) {
      emojiDiv.removeChild(emojiDiv.firstChild);
    }
    for (var i = 0; i < question.emojis.imgs.length; i++) {
      // Create a new img element
      var img = document.createElement('img');
      // Set the src attribute of the img element to the URL of the image
      img.src = `${serverURL}/emojis/${question.emojis.imgs[i]}`;
      // Append the img element to the div element
      emojiDiv.appendChild(img);
    }
    a = question.answer
  })
}

function guess() {
  let guess = document.getElementById('guess').value
  a.forEach(element => {
    if (guess.toLowerCase() == element) {
      score = score + 1
      document.getElementById('score').innerText = score
      newQ()
    } else {
      document.getElementById('guess').value = ''
    }
  });
}

function skip() {
  newQ()
}

window.onload = function () {
  fetch(serverURL)
  .then((res) => {
    if (res.serverStatus = 'setup') {
      newQ()
    } else {
      alert('Server Error')
    }
  });
}
