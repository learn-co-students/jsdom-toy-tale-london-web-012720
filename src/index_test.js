document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/toys")
        .then(response => response.json())
        .then(json => addToys(json))

    function addToys(toyObj) {

        const mainDiv = document.querySelector("#toy-collection")
        const newElement = document.createElement("div")
        newElement.class = "card"
        for (let i = 0; i < toyObj.length; i++) {

            newElement.innerHTML += `<div class="card" >
          <h2> ${toyObj[i].name}</h2>
           <img class="toy-avatar" src=${toyObj[i].image}>
           <p> this toys had ${toyObj[i].likes} likes  </p>
           <button class="like-btn"> Like <3</button>
            </div>`
            mainDiv.append(newElement)
        }

    }

})

const likeBtn = document.querySelector(".like-btn")

function increaseLikes(likeBtn) {
    likeBtn.addEventListener("click", event => {
        const newTotal = event.target.elements.likes.value += 1


    })
}


document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".add-toy-form")
    form.addEventListener("submit", event => {
        event.preventDefault();

        const newToy = {
            name: event.target.elements.name.value,
            image: event.target.elements.image.value
        };

        const confObj = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(newToy)
        }

        fetch("http://localhost:3000/toys", confObj)
            .then(response => response.json())
            .then()

    })



})