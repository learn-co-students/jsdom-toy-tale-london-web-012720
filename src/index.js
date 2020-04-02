let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const baseUrl = 'http://localhost:3000'
  const toysUrl = 'http://localhost:3000/toys'

  const addToyForm = document.querySelector(".add-toy-form")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyForm.style.display = "block";
      } else {
        toyForm.style.display = "none";
      }
  });
 
  function getToys() {
    fetch(toysUrl) 
    .then( response => response.json() )
    .then( toysArray => renderToys(toysArray) )
  }
  getToys();

  function renderToys(toysArray) {
    toysArray.forEach(toy => renderSingleToy(toy))
  }
      
  function renderSingleToy(toy) {
    const toyCollection = document.querySelector("#toy-collection")
    const toyCard = document.createElement('div');
    const toyName = document.createElement("h2");
    const toyImg = document.createElement("img");
    const toyLikes = document.createElement('p');
    const likeButton = document.createElement('button');

    toyCard.className = "card";
    toyName.innerText = toy.name;
    toyImg.className = "toy-avatar";
    toyImg.src = toy.image;
    toyLikes.innerText = `${toy.likes} Likes`;
    likeButton.className = "like-btn";
    likeButton.innerText = "Like <3";

    likeButton.addEventListener('click', () => {
      increaseLikes(toy, toyLikes)
    })
    toyCard.append(toyName, toyImg, toyLikes, likeButton)
    toyCollection.append(toyCard)
  }

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newToyName = e.currentTarget.name.value;
    const toyImageURL = e.currentTarget.image.value;
    addNewToy(newToyName, toyImageURL)
    e.target.reset();
  })

  function addNewToy(name, image) {
    fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0,
      })

    })
    .then(res => res.json())
    .then(newToy => renderSingleToy(newToy));
  }
  
  function increaseLikes(toy, toyLikes) {
    toy.likes++
    toyLikes.innerText = `${toy.likes} Likes`
    fetch(toysUrl + `/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes,
      }),
    })
  }


})