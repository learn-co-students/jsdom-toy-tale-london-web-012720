let addToy = false;
const baseUrl = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')

  const init = () => {
    fetchToys()
    .then( renderToys )
    // .then( (toys) => renderToys(toys) )
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const toyName = event.target.name.value
    const toyImage = event.target.image.value

    // const { name, image } = event.target

    // const options = {
    //   key: "value"
    // }
    // fetch(baseUrl + '/toys', options)

    fetch(baseUrl + '/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0,
      }),
    })
    .then( resp => resp.json() )
    // .then( newToy => renderSingleToy(newToy) )
    .then( renderSingleToy )
  })

  const fetchToys = () => {
    return fetch(baseUrl + "/toys")
    .then( resp => resp.json() )
  }
  
  const renderToys = (toys) => {
    toyCollection.innerHTML = ""
    toys.forEach( renderSingleToy )
  }

  const renderSingleToy = (toy) => {
    const toyCard = document.createElement('div')
    toyCard.className = "card"

    const toyName = document.createElement('h2')
    toyName.innerText = toy.name
    
    const toyImg = document.createElement('img')
    toyImg.className = "toy-avatar"
    toyImg.src = toy.image

    const toyLikes = document.createElement('p')
    toyLikes.innerText = `${toy.likes} Likes`
    
    const likeButton = document.createElement('button')
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"
    likeButton.addEventListener('click', () => increaseToyLikes(toy, toyLikes))
    // likeButton.addEventListener('click', (e) => increaseToyLikes(e))

    toyCard.append(toyName, toyImg, toyLikes, likeButton)
    toyCollection.append(toyCard)
  }

  const increaseToyLikes = (toy, likesEl) => {

    fetch(baseUrl + `/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        likes: ++toy.likes,
      })
    })
    .then( resp => resp.json() )
    // .then( init )
    .then((updatedToy) => {
      likesEl.innerText = `${updatedToy.likes} Likes`
    })
  }

  init()
});