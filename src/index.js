let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function addToyCard(toy) {

  const toyCollection = document.getElementById('toy-collection');

  const div = document.createElement('div');
  div.className = "card"

  toyCollection.appendChild(div);

  const h2 = document.createElement('h2');
  h2.textContent = toy.name;
  div.appendChild(h2);

  const image = document.createElement('img');
  image.className = "toy-avatar";
  image.src = toy.image;
  div.appendChild(image);

  const likes = document.createElement('p');
  likes.textContent = toy.likes;
  div.appendChild(likes);

  // const likeTracker = document.createElement('label');
  // likeTracker.textContent = toy.likes;
  // div.appendChild(likeTracker);

  const btn = document.createElement('button');
  btn.className = "like-btn";
  btn.id = toy.id;
  div.appendChild(btn);
  btn.textContent = 'like'
}

  function fetchToys() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toysData => addToyCards(toysData))
    }

function addToyCards(toys) {
  toys.forEach(addToyCard)
}

fetchToys();

const toyForm = document.getElementById('toy-form');

toyForm.addEventListener('submit', (e) => {
  e.preventDefault()
const toy = {
  name: e.target.name.value,
  image: e.target.image.value,
  likes: 0
}

fetch('http://localhost:3000/toys', {
  method: 'POST', 
  headers: {
    'Content-Type' : 'application/json'
  },
    body: JSON.stringify(toy)
  
})
.then(res => res.json())
.then(toy => {
  addToyCard(toy)
  e.target.reset();
})
})

const likeButton = document.getElementsByClassName('like-btn');
//all buttons are in HTML collection under different id's

//patch request looks very similar to post request, except we need
//the id of the toy


// likeButton.addEventListener('click', () => {
//   fetch('http://localhost:3000/toys/id', {
//     method: 'PATCH',
//     headers: {
//     'Content-Type': 'application/json'
//   },
// body: JSON.stringify({toys: likes.value})
// })
// .then(res => res.json())
// .then(toy => {
//   likes.textContent = toy.likes;
// })
// })
