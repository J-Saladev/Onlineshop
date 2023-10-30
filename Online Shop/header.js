

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
      console.log(loggedin);
      loginbutton.style.display = "none";
      console.log( loggedin.admin);
      console.log(loggedin.admin ? "admin" : "user");
      let admincheck = loggedin.admin? "admin" : "user";
      console.log(admincheck);
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

  