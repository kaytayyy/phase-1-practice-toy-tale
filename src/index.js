let addToy = false;

const baseUrl = 'http://localhost:3000/'
const toysUrl = baseUrl + 'toys/'

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
    const addToyForm = document.getElementById('add-toy-form')
    addToyForm.addEventListener('submit', createNewToy)
  });
  
  
fetchToys()
});

const fetchToys = () => {
  fetch(toysUrl)
  .then(response => response.json())
  .then(renderAllToys)
}

const renderAllToys = (toys) => {
  toys.forEach(renderToyCard)
}

const renderToyCard = (toy) => {
  const toyCollectionDiv = document.getElementById('toy-collection')

  const toyCardDiv = document.createElement('div')
  toyCollectionDiv.appendChild(toyCardDiv)
  toyCardDiv.className = 'card'

  const toyCardH2 = document.createElement('h2')
  toyCardDiv.appendChild(toyCardH2)
  toyCardH2.textContent = toy.className

  const toyCardImage = document.createElement('img')
  toyCardDiv.appendChild(toyCardImage)
  toyCardImage.src = toy.image 
  toyCardImage.alt = "Picture of a toy"
  toyCardImage.className = "toy-avatar"

  const toyCardLikesP = document.createElement('p')
  toyCardDiv.appendChild(toyCardLikesP)
  toyCardLikesP.textContent = `${toy.likes} likes`

  const toyCardLikeButton = document.createElement('button')
  toyCardDiv.appendChild(toyCardLikeButton)
  toyCardLikeButton.textContent = "like!"
  toyCardLikeButton.className = 'like-btn'
  toyCardLikeButton.id =toy.id 
}

function createNewToy(event) {
  event.preventDefault()
  const toyForm = event.target

const newToy = {
  name: toyForm.name.value,
  image:  toyForm.image.value,
  likes: 0
}

fetch(toysUrl, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    accepts: "application/json"
  },
  body: JSON.stringify(newToy)
})
fetch(toysUrl, postRequest)
.then(response => response.json())
.then(newToyData => {

renderToyCard(newToyData)
toyForm.reset()
})
}