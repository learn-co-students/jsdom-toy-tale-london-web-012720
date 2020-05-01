let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection') //I create this const for sixth step

  //First step -- this is not mandatory but its conventional code, so it will help
  //in case I need to change the url in the future, so only have to change it here
  //instead, not in all the code where is present below
  const baseUrl = "http://localhost:3000"
  const toysUrl = baseUrl + "/toys"


  // I create this function for the 8th step, but it works without it...
  // const init = () => {
  //   fetchAllToys()
  //   .then( renderToys )
  //   .then( (toys) => renderToys(toys) )
  // }
  
  
  //this code is already given by the exercise
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });


  // Seventh step: add an event listener for the button that create a new toy
  //I add an event listener to the form and not just the button for it to be able to listen the form action, not just the button.
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault() //this will prevent the default behaviour of pressing submit button and refresh the page completely, what I dont want
    
    const toyName = event.target.name.value //I get this info with debugger in the console too
    const toyImage = event.target.image.value //I get this info with debugger in the console too

    fetch(baseUrl + '/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ //The use of stringify is very important because it just read strings, so I need to convert the json format
        name: toyName,
        image: toyImage,
        likes: 0,
      }),
    })
    .then( resp => resp.json() )
    // .then( newToy => renderToyCard(newToy) )
    .then( renderToyCard )
  })


  // Fourth step -- here it iterates through that array and pass it to every one of them through renderToyCard, defined on fifth step
  const renderAllToys = (toys) => {
    toys.forEach(renderToyCard)
  }

  // Second step -- here we receive the value of all toys and pass it to third step
  const fetchAllToys = () => {
    return fetch(toysUrl)
    .then( resp => resp.json())
  }

  // Third step -- here we use the function renderAllToys, which is defined in fourth step
  fetchAllToys().then( renderAllToys)


  //fifth step -- here we will create the single card, creating:
  // the div and class on toyCard
  // the h2 and the innerText on toyName
  // the img, class and source on toyImg
  // the paragraph, innerText with the likes.
  // I take that information from the readme:
      /* <div class="card">
      <h2>Woody</h2>
      <img src=toy_image_url class="toy-avatar" />
      <p>4 Likes </p>
      <button class="like-btn">Like <3</button>
      </div> */
  //I have to change the single name, image and number of likes with ${} to show every one of them.
  const renderToyCard = (toy) => {
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
      likeButton.addEventListener('click', () => increaseToyLikes(toy, toyLikes)) //increaseToyLikes is still not defined at this point. It will need a patch action, which is 8th step.
    
  //Sixth step: append single elements to toyCard, and then append toyCard to the toyCollection
    toyCard.append(toyName, toyImg, toyLikes, likeButton)
    toyCollection.append(toyCard)
  }


  //Eigth step: I have to create a patch method to send the info of the like button.
  const increaseToyLikes = (toy, likesEl) => {

    fetch(baseUrl + `/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        likes: ++toy.likes
      })
    })
    .then( resp => resp.json() )
    // .then( init )
    .then((updatedToy) => {
      likesEl.innerText = `${updatedToy.likes} Likes`
    })
  }

  // init()


});