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

  toyForm.addEventListener("submit", event => {
    event.preventDefault();
    const nameToy = event.target.elements.name.value;
    const imageToy = event.target.elements.image.value;
    event.target.elements.name.value = "";
    event.target.elements.image.value = "";
    const likesToy = 0;
    const createToys = () => {
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: nameToy,
          image: imageToy,
          likes: likesToy
        })
      })
        .then(resp => resp.json())
        .then(toy => renderPage(toy));
    };
    createToys();
    toyForm.style.display = "none";
  });

  const getToys = () => {
    document.querySelector("#toy-collection").innerHTML = "";
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(toysData => {
        toysData.forEach(toy => renderPage(toy));
      });
  };

  const renderPage = toyData => {
    const contain = document.querySelector("#toy-collection");
    newDiv = document.createElement("div");
    newDiv.className = "card";
    newH = document.createElement("h2");
    newH.innerText = toyData.name;
    newImg = document.createElement("img");
    newImg.src = toyData.image;
    newImg.className = "toy-avatar";
    newP = document.createElement("p");
    newP.innerText = `likes: ${toyData.likes}`;
    newBtn = document.createElement("button");
    newBtn.className = "like-btn";
    newBtn.innerText = "Like <3";
    contain.append(newDiv);
    newDiv.append(newH, newImg, newP, newBtn);
    newBtn.addEventListener("click", () => {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ likes: toyData.likes + 1 })
      };
      fetch(`http://localhost:3000/toys/${toyData.id}`, requestOptions)
        .then(response => response.json())
        .then(toy => getToys())
        .catch(error => console.log("error", error));
    });
  };
  getToys();
});
