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



document.addEventListener("DOMContentLoaded", () => {

    const mainDiv = document.querySelector("#toy-collection")


    //take a toy create the element and append it to the div
    function addToys(toy) {

        const newDiv = document.createElement("div")
        newDiv.setAttribute("class", "card")

        const h2 = document.createElement("h2")
        h2.innerText = toy.name

        const img = document.createElement("img")
        img.setAttribute("src", toy.image)
        img.setAttribute("class", "toy-avatar")

        const p = document.createElement("p")
        p.innerText = toy.likes

        const likeBtn = document.createElement("button")
        likeBtn.setAttribute("class", "like-btn")
        likeBtn.setAttribute("id", toy.id)
        likeBtn.innerText = "Likes"
            //event to the button when get clicked 
        likeBtn.addEventListener("click", e => {


            like(e)
        })

        newDiv.append(h2, img, p, likeBtn)

        mainDiv.append(newDiv)
    }

    //take an event from the button in this case look for the previus tag element which contain the likes info send them with a path
    //request and use the response to update the element wit the new total 
    function like(e) {
        let total = parseInt(e.target.previousSibling.innerText) + 1
        let id = e.target.id
        const confObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                likes: total
            })
        }


        fetch(`http://localhost:3000/toys/${id}`, confObj)
            .then(response => response.json())
            .then(obj => {
                e.target.previousSibling.innerText = `${total}`
            })
    }



    //get all the toys and with a for loop passed them to the function which handle to append the toy to the div
    fetch("http://localhost:3000/toys")
        .then(response => response.json())
        .then(json => {

            for (let i = 0; i < json.length; i++) {
                addToys(json[i])
            }

        })

    const form = document.querySelector(".add-toy-form")

    form.addEventListener("submit", (e) => {

        e.preventDefault();



        const confObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: e.target.elements.name.value,
                image: e.target.elements.image.value,
                likes: 0
            })
        };


        fetch("http://localhost:3000/toys", confObj)
            .then(response => response.json())
            .then(obj => console.log(obj))
            .catch(error => console.log(error))



    })



});