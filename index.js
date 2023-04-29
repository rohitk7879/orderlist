let menu = document.getElementById("menu");
let section = document.getElementById("section");
let placeOrder = document.getElementById("confim-order");
let foodOrderbtns;
let foodOrder = [];
let food = [
    { name: "Greek Pizza", price: "501" },
    { name: "Italian Pizza", price: "301" },
    { name: "Red Sauce Pizza", price: "459" },
    { name: "Angus Hamburger", price: "105" },
    { name: "Mushroom & Swiss Burger", price: "149" },
    { name: "Western Burger", price: "149" },
    { name: "Black & Bleu Burger", price: "105" },
    { name: "Herb Roasted Potatoes", price: "101" },
    { name: "Fresh Veg. Medley", price: "109" },
    { name: "House-Cut Fries", price: "119" },
];
function refreshPage() {
    window.location.reload();
}

// work of getMenu() function will be automatically call when click on menu button on web screen

menu.addEventListener("click", () => {
    for (let i = 0; i < 3; i++) {
        section.removeChild(section.firstElementChild);
    }

    let div = document.createElement("div");
    div.className = "menu-card";
    div.style.height = "450px";
    for (let dish of food) {
        let row = document.createElement("div");
        row.className = "row"
        let name = document.createElement("span");
        name.innerText = dish.name;
        name.className = "dish-name";
        row.appendChild(name);
        let price = document.createElement("span");
        price.className = "dish-price"
        price.innerText = "Rs. " + dish.price;
        row.appendChild(price);
        let button = document.createElement("button");
        button.style.cursor = "pointer";
        button.className = "add-dish"
        button.innerText = "Order";
        button.dataset.dishName = name.innerText;
        button.dataset.dishPrice = price.innerText;
        row.appendChild(button);
        div.appendChild(row);
    }
    section.appendChild(div);
    placeOrder.style.display = "block";
    foodOrderbtns = document.getElementsByClassName("add-dish");
    for (let i = 0; i < foodOrderbtns.length; i++) {
        foodOrderbtns[i].addEventListener("click", (e) => {
            e.target.classList.add("changebg");
            console.log(e.target.classList);
            let dish = {};
            dish["dish"] = e.target.dataset.dishName;
            dish["price"] = e.target.dataset.dishPrice;
            foodOrder.push(dish);
            if(foodOrder.length == 1){
                document.getElementsByClassName("popup")[0].classList.add("popup-ani");
                document.getElementsByClassName("popup")[1].classList.add("popup-ani");
            }
        })
    }
});

// payOrder() - This function also returns a promise and tajes 1000 milliseconds to reolve and the resolve returns the object {order_status:true; paid:true}
function payOrder(data) {
    // generate bill
    let promise = new Promise((resolve,reject) =>{
        setInterval(() => {
            let totalBill = 0;
            for(let i =0; i < foodOrder.length; i++){
                totalBill += foodOrder[i].price;
            }
            data.paid = true;
            data["bill"] = totalBill;
            return resolve(data);
        },1000);
    });
    
    return promise;
}
// thankyouFnc() - Once {paid:true} is received, give an alert on the screen saying thankyou for eating with us today!
function thankyouFnc() {
    alert("thankyou for eating with us today!");
}
// work of TakeOrder() function will be automatically call when click of Confirm order on web screen and to place / take order minimum one item selection is necessary

placeOrder.addEventListener("click", () => {
    if (foodOrder.length === 0) {
        alert("Select atleast One food!");
    } else {
        // TakeOrder() function
        let placeOrder = new Promise((resolve,reject) =>{
            setInterval(() => {
                return resolve(foodOrder);
            }, 2500);
        });
        // takeorder() function
        placeOrder.then((orders)=>{
            // orderPrep() - This function also returns a promise and takes 1500 milliseconds to resolve and the resolve should return {order_status:true; paid:false}

            // orderPrep() function
            let orderPrepe = new Promise((resolve,reject) =>{
                setInterval(()=>{
                    return resolve({order_status:true, paid:false});
                },1500);
            });
            // payOrder() function
            orderPrepe.then((prepData) => {
                let payment = payOrder(prepData);
                // payment will return total amount and order status
                payment.then((data)=>{
                    alert("You total ammout is : " + data.bill);
                    // thankyouFnc() function
                    if(data.paid){
                        thankyouFnc();
                    }else{
                        alert(`data paid status is : ${data.paid}`);
                    }
                    
                });
            });
        });
    }

});