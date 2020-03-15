let addToy = false;
const toyCollection = document.querySelector("#toy-collection");

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

  toyForm.addEventListener("submit", e => {
    e.preventDefault();
    body = {
      name: e.target.elements.name.value,
      image: e.target.elements.image.value,
      likes: 0
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => renderToy(data))
      .catch(err => console.log(err));
  });

  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => renderToys(data));
});

function renderToys(data) {
  data.forEach(toy => {
    const div = document.createElement("div");
    div.className = "card";
    const h2 = document.createElement("h2");
    h2.innerText = toy.name;
    const img = document.createElement("img");
    img.className = "toy-avatar";
    img.src = toy.image;
    const p = document.createElement("p");
    p.innerText = toy.likes;
    const button = document.createElement("button");
    button.className = "like-btn";
    button.innerText = "Like";
    button.addEventListener("click", e => {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ likes: data.likes + 1 })
      };
      fetch(`http://localhost:3000/toys/${data.id}`, requestOptions)
        .then(response => response.json())
        .then(toy => renderToy(data))
        .catch(error => console.log("error", error));
    });
    div.append(h2, img, p, button);
    toyCollection.append(div);
  });
}

function renderToy(data) {
  console.log(data);
  const div = document.createElement("div");
  div.className = "card";
  const h2 = document.createElement("h2");
  h2.innerText = data.name;
  const img = document.createElement("img");
  img.className = "toy-avatar";
  img.src = data.image;
  const p = document.createElement("p");
  p.innerText = data.likes;
  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like";
  button.addEventListener("click", e => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ likes: data.likes + 1 })
    };
    fetch(`http://localhost:3000/toys/${data.id}`, requestOptions)
      .then(response => response.json())
      .then(toy => renderToys())
      .catch(error => console.log("error", error));
  });
  div.append(h2, img, p, button);
  toyCollection.append(div);
}

function updateLike(data) {
  console.log(data);
}

function call() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/javascript");
  myHeaders.append("Accept", "application/json");

  var raw = JSON.stringify({ likes: 7 });

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw
  };

  fetch("http://localhost:3000/toys/7", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));
}
