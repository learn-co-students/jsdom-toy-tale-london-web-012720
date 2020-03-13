let addToy = false;
const TOY_API = ("http://localhost:3000/toys")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  const addForm = document.querySelector('form')

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetch(TOY_API)
  .then(response => response.json())
  .then(toys => renderToys(toys))

  const renderNewToy = toy => {
    const toyCard = document.createElement("div")
    toyCard.className = "card";
  
    const toyName = document.createElement('h2')
    toyName.innerText = toy.name
  
    const toyImg = document.createElement('img')
    toyImg.src = toy.image
    toyImg.className = "toy-avatar"

    const toyLike = document.createElement('p')
    toyLike.innerText = toy.likes 

    const button = document.createElement('button')
    button.innerText = "Like <3"
    button.className = "like-btn"

    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Delete"
    deleteBtn.className = "delete-btn"

    button.addEventListener('click', () => {
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes++
      })};
      fetch(`${TOY_API}/${toy.id}`, configObject)
      .then(res => res.json())
      .then(toy => { 
        toyLike.innerText = `${toy.likes} likes!`
      })
    })

    toyCard.append(toyName, toyImg, toyLike, button, deleteBtn)
  

    deleteBtn.addEventListener("click", () => {
      fetch(`${TOY_API}/${toy.id}`, {
        method: "DELETE"
      }).then(() => toyCard.remove());
      });
      toyCollection.append(toyCard) 
  }

  const renderToys = toys => { 
    toys.forEach (toy => { 
      renderNewToy(toy) 
    })
  }

  addForm.addEventListener("submit", event => {
    event.preventDefault();
    const newToy = {
      name: event.target.elements.name.value,
      image: event.target.elements.image.value,
      likes: 0
    };
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    };
    fetch(TOY_API, configObject)
      .then(res => res.json())
      .then(toy => {
        renderNewToy(toy);
      });
  });
})