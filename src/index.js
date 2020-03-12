let addToy = false;
const toyForm = document.querySelector(".container");
const requests = new HTTPRequests;
const toy_collection = document.getElementById("toy-collection");
document.querySelector("form").addEventListener("submit", addNewToy);

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  addBtn.addEventListener("click", showForm);
  loadToys();
});

function showForm(){
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
}

function generateNewToy(toy){
  let new_toy = document.createElement('div');
  new_toy.classList = [`toy-number-${toy.id}`];
  new_toy.classList.add("card");

  let name = document.createElement("h2");
  name.innerText = `${toy["name"]}`;

  let img = document.createElement("img");
  img.src = `${toy["image"]}`;
  img.alt = "a toy image";
  img.classList = ['toy-avatar'];

  let likes = document.createElement("p");
  likes.innerText = `${toy["likes"]} likes`;

  let button = document.createElement("button");
  button.classList = ['like-btn'];
  button.innerText = "Like <3";
  button.addEventListener("click", addLike);

  new_toy.append(name,img,likes,button);
  return new_toy;
}

function loadToys(){
  let output = '';
  requests.get("http://localhost:3000/toys")
  .then(data => {
    data.map(toy => {
      toy_collection.append(generateNewToy(toy));
      
    })
  })
}

function addLike(e){
  const toyId = e.target.parentNode.classList[0].split("-")[2];
  const likeToAdd = parseInt(e.target.previousSibling.innerText.split(" ")[0],10) + 1; 
  const data = {likes: likeToAdd};
  requests.put(`http://localhost:3000/toys/${toyId}`,data)
  .then(toy => {
    e.target.previousSibling.innerText = `${toy["likes"]} likes`;
  });

}

function addNewToy(e){
  e.preventDefault();
  const name = e.target.elements.name.value;
  const img = e.target.elements.image.value;
  const data = {
    name: name,
    image: img,
    likes: 0
  }
  requests.post("http://localhost:3000/toys",data)
  .then(data => {
    toy_collection.append(generateNewToy(data));
    e.target.elements.name.value = "";
    e.target.elements.image.value = "";
    showForm();
  });
}



