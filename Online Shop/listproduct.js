function displayList (){
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let displayList = document.getElementById("productslistdisplay");
    displayList.innerHTML = "";
    if (!products){
        displayList.innerHTML = `<p class="text-center mt-3 small">No products added yet</p>`;
        return;
    }
    products.forEach((product , index) => {
        displayList.innerHTML += `
        <li>
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
                <button class="border border-white rounded p-2 text-white ml-20 text-center" style="background-color: red" onclick="deleteProduct(${index})">Delete</button>
              </div>
            </li>
           ` 
    })
};

function deleteProduct(i) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayList();
}


onload = function () {
  displayList();
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