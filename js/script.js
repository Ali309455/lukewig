// Product Card Animation

const cards = document.querySelectorAll(".product-card,.bundle-card");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

cards.forEach(card=>observer.observe(card));

// const slider=document.getElementById("priceRange");

// const value=document.getElementById("priceValue");

// if(slider){

// slider.oninput=function(){

// value.innerHTML="$"+this.value;

// }

// }

// const variants=[

// {

// size:"12",

// price:129,

// image:"images/wig12.jpg"

// },

// {

// size:"16",

// price:159,

// image:"images/wig16.jpg"

// },

// {

// size:"20",

// price:189,

// image:"images/wig20.jpg"

// },

// {

// size:"24",

// price:239,

// image:"images/wig24.jpg"

// }

// ];

// function changeVariant(index){

// document.getElementById("price").innerHTML="$"+variants[index].price;

// document.getElementById("mainImage").src=variants[index].image;

// document.querySelectorAll(".size").forEach(btn=>btn.classList.remove("active"));

// document.querySelectorAll(".thumb").forEach(img=>img.classList.remove("active"));

// document.querySelectorAll(".size")[index].classList.add("active");

// document.querySelectorAll(".thumb")[index].classList.add("active");

// }

// function increaseQty(){

// let qty=document.getElementById("qty");

// qty.value=parseInt(qty.value)+1;

// }

// function decreaseQty(){

// let qty=document.getElementById("qty");

// if(qty.value>1)

// qty.value=parseInt(qty.value)-1;

// }

// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function loadCart(){

// let body = document.getElementById("cartItems");

// let total = 0;

// body.innerHTML="";

// cart.forEach((item,index)=>{

// let subtotal=item.price*item.qty;

// total+=subtotal;

// body.innerHTML+=`

// <tr>

// <td>

// <img src="${item.image}"

// width="70">

// ${item.name}

// </td>

// <td>${item.size}"</td>

// <td>$${item.price}</td>

// <td>${item.qty}</td>

// <td>$${subtotal}</td>

// <td>

// <button class="btn btn-danger"

// onclick="removeItem(${index})">

// Remove

// </button>

// </td>

// </tr>

// `;

// });

// document.getElementById("grandTotal").innerHTML="$"+total;

// }

// function removeItem(index){

// cart.splice(index,1);

// localStorage.setItem("cart",JSON.stringify(cart));

// loadCart();

// }

// loadCart();

// let selectedVariant=0;

// function changeVariant(index){

// selectedVariant=index;

// document.getElementById("price").innerHTML="$"+variants[index].price;

// document.getElementById("mainImage").src=variants[index].image;

// document.querySelectorAll(".size").forEach(btn=>btn.classList.remove("active"));

// document.querySelectorAll(".thumb").forEach(img=>img.classList.remove("active"));

// document.querySelectorAll(".size")[index].classList.add("active");

// document.querySelectorAll(".thumb")[index].classList.add("active");

// }

// function addToCart(){

// let cart=JSON.parse(localStorage.getItem("cart"))||[];

// cart.push({

// name:"Silky Straight Wig",

// size:variants[selectedVariant].size,

// price:variants[selectedVariant].price,

// image:variants[selectedVariant].image,

// qty:parseInt(document.getElementById("qty").value)

// });

// localStorage.setItem("cart",JSON.stringify(cart));

// alert("Added to cart successfully!");

// }

// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// let total = 0;

// const orderItems = document.getElementById("orderItems");

// cart.forEach(item=>{

// let subtotal=item.price*item.qty;

// total+=subtotal;

// orderItems.innerHTML += `

// <div class="order-item">

// <div>

// <strong>${item.name}</strong>

// <br>

// ${item.size}" × ${item.qty}

// </div>

// <div>

// $${subtotal}

// </div>

// </div>

// `;

// });

// document.getElementById("checkoutTotal").innerHTML="$"+total;

// function placeOrder(){

// alert("🎉 Thank you! Your order has been placed successfully.");

// localStorage.removeItem("cart");

// window.location.href="index.html";

// }