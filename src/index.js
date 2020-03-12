let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
});

const ToysAPI = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")
const toyform = document.querySelector(".add-toy-form")


const getToys = () => {
  fetch(ToysAPI).then(resp => resp.json())
    .then(toys => renderToys(toys)
    )
};

const renderToys = toys => {
  toys.forEach(toy => {
    renderToy(toy)
  })
}

const renderToy = toy => {
  const toyCard = document.createElement('div')
  toyCard.className = "card"

  // adding toy name 
  const toyName = document.createElement('h2')
  toyName.innerText = toy.name
  // adding toy image 
  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"
  // adding toy likes
  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} likes!`
  // adding button 
  const toyButton = document.createElement('button')
  toyButton.innerText = "Like <3"
  toyButton.className = "like-btn"
  const deleteButton = document.createElement('button')
  deleteButton.innerText = "Delete"
  // add a like button 
  toyButton.addEventListener("click", () => {
  
  
  
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes + 1
      })
    }



    fetch(`${ToysAPI}/${toy.id}`, configObject)
    .then(res => res.json())
        .then(toy => {
          toyLikes.innerText = `${toy.likes} likes!`
        })
  
  
    })
  
  // add to HTML Element 
  toyCard.append(toyName, toyImg, toyLikes, toyButton, deleteButton)
  toyCollection.append(toyCard)

  // add a delete button 

  deleteButton.addEventListener("click", () => {
      fetch(`${ToysAPI}/${toy.id}`, {
        method: "DELETE"
      }).then(() => toyCard.remove());
    });

  }



toyform.addEventListener("submit", event => {
  event.preventDefault();
  // get values
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
  fetch(ToysAPI, configObject)
    .then(res => res.json())
    .then(toy => {
      renderToy(toy);
    });
})

getToys()









