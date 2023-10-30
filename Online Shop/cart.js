function displayCart (){
    let userCart = JSON.parse(localStorage.getItem("userCart")) || [];
    let displayList = document.getElementById("cartdisplay");

    displayList.innerHTML = "";
    userCart.forEach((product, index ) => {
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
                <p class="mt-3 text-2xl text-center font-bold">${product.quantity} x ${product.name}  </p>
                <p class="text-center mt-3 small">$${product.price}</p>
                <p class="text-center mt-3 small">${product.description}</p>
                <button class="border border-white rounded p-2 text-white ml-20 text-center" style="background-color: red" onclick="deleteProduct(${index})">Remove from Cart</button>
            </li>
           ` 
        product.price = parseFloat(product.price) * parseInt(product.quantity),
        totalprice += product.price;
        document
    })
    document.getElementById("totalprice").innerHTML = totalprice;
    
}
let totalprice = 0;
function  deleteProduct(i){
    let userCart = JSON.parse(localStorage.getItem("userCart")) || [];
    userCart.splice(i, 1);
    localStorage.setItem("userCart", JSON.stringify(userCart));
    displayCart();
}
function clearCart(){
    localStorage.removeItem("userCart");
    window.location.href = "cart.html";
    displayCart();
}

onload = function(){
    displayCart();
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
     
      loginbutton.style.display = "none";

      let admincheck = loggedin.admin? "admin" : "user";

      if (admincheck == "user"){
       
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