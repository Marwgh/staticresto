function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categoriesReceived(data)
        }
    )
}
init();

function categoriesReceived(cats) {
    createNavigation(cats);
    createSections(cats);

}

function createSections(categories) {
    categories.forEach(categorie => {
        const sect = document.createElement("section");
        sect.setAttribute("id", categorie);
        const h1 = document.createElement("h1");
        h1.textContent = categorie;
        sect.appendChild(h1);
        document.querySelector("main").appendChild(sect);
    })
}

function createNavigation(categories) {
    categories.forEach(cat => {
        console.log(cat)
        const a = document.createElement("a");
        a.textContent = cat
        a.setAttribute("href", `#${cat}`);
        document.querySelector("nav").appendChild(a);
    })
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            console.log("response")
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            datareceived(data);
        })

    function datareceived(product) {
        product.forEach(showproduct);
    }

}

function showproduct(product) {
    const templ = document.querySelector("#Template").content;

    const copy = templ.cloneNode(true);

    const h1 = copy.querySelector("h1");
    h1.textContent = product.name;
    const img = copy.querySelector(".productImg");
    img.setAttribute('src', `https://kea-alt-del.dk/t5/site/imgs/small/` + product.image + `-sm.jpg`);

    if (product.discount > 0) {
        copy.querySelector("span").textContent = product.price - (product.price * product.discount * 0.01) + "dkr";
        copy.querySelector(".discount").textContent = product.price + "dkr";
    } else {
        copy.querySelector("span").textContent = product.price + "dkr";
    }

    copy.querySelector(".descript").textContent = product.shortdescription;
    if (product.soldout == true) {
        copy.querySelector("article").classList.add("soldo");
    }
    if (product.vegetarian == true) {
        copy.querySelector("article").classList.add("vegana");
        h1.textContent += " (V)";
    }
    if (product.alcohol > 0) {
        copy.querySelector("article").classList.add("alcoholic");
    }

    copy.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${product.id}`)
            .then(res => res.json())
            .then(showDetails);
    });


    if (product.category == "starter") {
        document.querySelector("#starter").appendChild(copy);
    } else if (product.category == "main") {
        document.querySelector("#main").appendChild(copy);
    } else if (product.category == "drinks") {
        document.querySelector("#drinks").appendChild(copy);
    } else if (product.category == "dessert") {
        document.querySelector("#dessert").appendChild(copy);
    } else if (product.category == "sideorders") {
        document.querySelector("#sideorders").appendChild(copy);
    }

}


const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});


function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    if (data.discount > 0) {
        modal.querySelector(".modal-price").textContent = data.price - (data.price * data.discount * 0.01) + "dkr";
        modal.querySelector(".discount").textContent = data.price + "dkr";
    } else {
        modal.querySelector(".modal-price").textContent = data.price + "dkr";
    }
    modal.querySelector(".modal-image").setAttribute('src', `https://kea-alt-del.dk/t5/site/imgs/medium/` + data.image + `-md.jpg`);
    modal.classList.remove("hide");
}

const veggiefilter = document.querySelector("#veggiefilter");
veggiefilter.addEventListener("click", veggieFilterClicked);

function veggieFilterClicked() {
  veggiefilter.classList.toggle("active");
  //b select all non veggie
  const articles = document.querySelectorAll("article:not(.vegana)");
  //console.log(articles)
  articles.forEach(elem => {
    elem.classList.toggle("hidden")
  })
}

const alcoholfilter = document.querySelector("#alcoholfilter");
alcoholfilter.addEventListener("click", alcoholFilterClicked);

function alcoholFilterClicked() {
  alcoholfilter.classList.toggle("active");
  //b select all non veggie
  const articles = document.querySelectorAll("article.alcoholic");
  //console.log(articles)
  articles.forEach(elem => {
    elem.classList.toggle("hidden")
  })
}

/*
copy.querySelector("img").src= product.image;
copy.querySelector(".dob").textContent = hero.dob.year +"/" + hero.dob.month +"/"+ hero.dob.day ;
    if (hero.wearsACape==true) {
        copy.querySelector(".cape").textContent = "wears a cape";
    } else  {
        copy.querySelector(".cape").textContent = "does not wears a cape";
    }*/
