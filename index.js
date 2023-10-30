const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller_inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute(`aria-hidden`, true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}


onload = function () {
  headerDisplay();
  normaldisplay();
}

function normaldisplay() {
  let products = JSON.parse(localStorage.getItem("products"));
  let linearanimation = document.querySelector(".scroller_inner");
  if (!products) {
    linearanimation.innerHTML = `<p class="text-center mt-3 small">No products added yet</p>`;
    return;
  }
  products.forEach((product) => {
    linearanimation.innerHTML += `<li id="">
        <div
          class="rounded bg-white shadow-lg p-3 w-72 h-72"
          style="background-color: var(--secondary)"
        >
          <img
            src="${product.image}"
            class="w-72 h-48 rounded"
          />
          <p class="mt-3 text-2xl text-center font-bold">${product.name}</p>
          <p class="text-center mt-3 small">$${product.price}</p>
        </div>
      </li>`;
  });
}

function showSidebar() {
  let sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("openbar");
  sidebar.classList.toggle("closebar");

}

  
  
function headerDisplay(){
  let loggedin = JSON.parse(localStorage.getItem("loggedin"));
    let loginbutton = document.querySelector("#logInbutton");
    let addProduct = document.querySelector("#addProductbutton");
    let listProduct = document.querySelector("#listProductbutton");
    let logout = document.querySelector("#logOutbutton");
    let cart = JSON.parse(localStorage.getItem("userCart")) || [];
    if (cart.length > 0) {
    let cartlength = cart.length;
    document.getElementById("cart-count").innerHTML = cartlength;
  }
   
  if (loggedin){

    loginbutton.style.display = "none";

    let admincheck = loggedin.admin? "admin" : "user";

    if (admincheck == "user"){
      console.log("athis is a user");
      addProduct.style.display = "none";
      listProduct.style.display = "none";
     
    } 
    
  } else
  {
    
    addProduct.style.display = "none";
    listProduct.style.display = "none";
    logout.style.display = "none";
  }
}
 function logIn(){
    let loginmodal = document.getElementById("loginModal");
    loginmodal.hidden = false;

 }
  
function loguser(e){
  e.preventDefault();
  let form = document.querySelector("#loginForm");
  if (!form.checkValidity()){
    form.classList.add("was-validated");
    form.reportValidity();
    return;
  }
  let username = document.getElementById("loginusername").value;
  let password = document.getElementById("loginpassword").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((user) => user.username === username);
  if (!user){
    alert("Invalid username or password, click register to make an account");
    return;
}
if (users.some((user) => user.username === username && user.password === password)){
  localStorage.setItem("loggedin", JSON.stringify(user));
  alert("Logged in");
  window.location.href = "index.html";
}
}
function registerUser(){
  let form = document.querySelector("#registerForm");
  if (!form.checkValidity()){
    form.classList.add("was-validated");
    form.reportValidity();
    return;
  }
  let username = document.getElementById("registerusername").value;
  let password = document.getElementById("registerpassword").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let admincheck = document.getElementById("admincheck").checked;
  if (admincheck === true){
    alert("Use password `password` to register as admin");
    let adminpass = prompt("Enter admin password!");
    if (adminpass === "password"){
      admincheck = true;
    }else {
      alert("Wrong password!");
      return;
    }
  }
  let admin = admincheck ? `admin` : `user`;
  let user = {
    username,
    password,
    admin,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  console.log(users);
  alert("Account created");
  window.location.href = "index.html";
}
function logOut(){
  localStorage.removeItem("loggedin");
  window.location.href = "index.html";
}

