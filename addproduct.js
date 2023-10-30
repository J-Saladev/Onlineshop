function addProduct(e) {
    e.preventDefault();
    let form = document.querySelector("#addproductform");
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let imgfile = document.getElementById("productimage").files[0];
    if (imgfile) {
        let reader = new FileReader();
        reader.readAsDataURL(imgfile);
        console.log(document.getElementById("productname").value);   
        reader.onload = function (e) {
            let product = {
                name: document.getElementById("productname").value,
                price: document.getElementById("productprice").value,
                image: e.target.result,
                description: document.getElementById("productdescription").value,
            };
            console.log(product);
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));
    }
    }
    alert("Product added");
    console.log(products);
    setTimeout(() => {
        form.reset();
    }, 1000);
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
  onload = function () {

    headerDisplay();
  }