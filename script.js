
fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function(response){
    console.log("response")
    return response.json();
})
.then (function(data){
    console.log(data)
    datareceived(data);
})

function datareceived(product){
    product.forEach(showproduct);
}


function showproduct(product) {
    const templ = document.querySelector("#Template").content;

    const copy = templ.cloneNode(true);

    const h1 = copy.querySelector("h1");
    h1.textContent = product.name;
    copy.querySelector("span").textContent = product.price;
    if (product.discount >0 ){
        copy.querySelector(".discount").textContent =  "discount: " + product.discount;
    }

    copy.querySelector(".descript").textContent =  product.shortdescription;
    if (product.soldout == true ) {
        copy.querySelector("article").classList.add("soldo");
    }
    if (product.vegetarian == true ) {
        copy.querySelector("article").classList.add("vegana");
        h1.textContent += " (V)";
    }


    if (product.category == "starter") {
        document.querySelector("#sectionStarter").appendChild(copy);
    } else if (product.category == "main") {
        document.querySelector("#sectionMain").appendChild(copy);
    } else if (product.category == "drinks") {
        document.querySelector("#sectionDrinks").appendChild(copy);
    } else if (product.category == "dessert") {
        document.querySelector("#sectionDessert").appendChild(copy);
    }

}


/*
copy.querySelector("img").src= product.image;
copy.querySelector(".dob").textContent = hero.dob.year +"/" + hero.dob.month +"/"+ hero.dob.day ;
    if (hero.wearsACape==true) {
        copy.querySelector(".cape").textContent = "wears a cape";
    } else  {
        copy.querySelector(".cape").textContent = "does not wears a cape";
    }*/
