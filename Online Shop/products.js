

function displayProduct (){
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let displayList = document.getElementById("productslist");
    displayList.innerHTML = "";
    if (products  == null || products.length == 0){
        displayList.innerHTML = `<p class="text-center mt-3 small">No products added yet</p>`;
        return;
    }
    products.forEach((product, index ) => {
        displayList.innerHTML +=`
        <li id="">
              <div
                class="rounded bg-white shadow-lg p-3 w-72 h-auto"
                style="background-color: var(--secondary)"
              >
                <img
                  src=${product.image}
                  class="w-72 h-48 rounded"
                />
                <p class="mt-3 text-2xl text-center font-bold">${product.name} </p>
                <p class="text-center mt-3 small">$${product.price}</p>
                <p class="text-center mt-3 small">${product.description}</p>
                <button class="border border-white rounded p-2 text-white ml-20 text-center" style="background-color: green" onclick="addProductcart(${index})">Add to Cart</button>
                <input type="number" value="1" min="1" max="10" id="quantity${index}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-auto p-4 h-4"required></input>
            </li>
           ` 
    })
};

function addProductcart(i){
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let userCart = JSON.parse(localStorage.getItem("userCart")) || [];
    let quantity = document.getElementById(`quantity${i}`).value;
    products[i].quantity = quantity;
    console.log(products[i]);
    userCart.push(products[i]);
    localStorage.setItem("userCart", JSON.stringify(userCart));
    displayProduct();
    alert("Product added to cart");
}

onload = function () {
    displayProduct();
    headerDisplay();
    
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