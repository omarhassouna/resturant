
let userNameInput = document.getElementById("name");
let userEmailInput = document.getElementById("email");
let userPhoneInput = document.getElementById("phone");
let userAgeInput = document.getElementById("age");
let userPasswordInput = document.getElementById("password");
let userRePasswordInput = document.getElementById("rePassword");
let userNameAlert = document.getElementById("namealert");
let  userEmailAlert = document.getElementById("emailalert");
let userPhoneAlert = document.getElementById("phonealert");
let  userAgeAlert = document.getElementById("agealert");
let userpasswordAlert = document.getElementById("passwordalert");
let userRepasswordAlert = document.getElementById("repasswordalert");
let nvWidth = 0;
let    isTrue = !0;
let   allItems = [];
search("").then(() => {
    $(".loading").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
})


$(".sx-menu").click(function () {
    isTrue ? ($(".menu").addClass("open-menu").removeClass("close-menu"), nvWidth = $(".menu").width() - 10, $(".nav-bar").css("left", nvWidth), $(".fa-align-justify").toggleClass("fa-times"), $(".menu .element1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1100), $(".menu .element2").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1200), $(".menu .element3").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1300), $(".menu .item4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1400), $(".menu .item5").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500), $(".menu .element4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1600), isTrue = !isTrue) : ($(".menu").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".nav-bar").css("left", 0), $(".menu li").animate({
        opacity: "0",
        paddingTop: "500px"
    }, 500), isTrue = !isTrue)
});

var isSearchTrue = !0;
$(".strip-search").click(function () {
    isSearchTrue ? ($(".search").addClass("open-menu").removeClass("close-search"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
        top: "49%"
    }, 1500, function () {
        $(".search-input").animate({
            top: "50%"
        }, 250)
    }), isSearchTrue = !isSearchTrue) : ($(".search").addClass("close-search").removeClass("open-menu"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
        top: "300%"
    }), isSearchTrue = !isSearchTrue)
});

var row = document.getElementById("box");

async function search(q) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loading-container").fadeOut(400)
    return meals
}
async function getByLetter(letter) {
    if (letter) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $(".loading-container").fadeOut(100)
    }
}
function displayMeals(allItems) {

    let cartona = ""
    for (let i = 0; i < allItems.length; i++) {
        cartona += `
        <div class="col-md-4 my-3 M  shadow">
            <div onclick="getMeal('${allItems[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${allItems[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${allItems[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = cartona
   // $("html, body").animate({scrollTop: 0 }, 200)
}
async function getCategories(listOfMeals) {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listOfMeals}`);
    x = await x.json()
    return x;

}
function displayCategories() {
    let e = ""
    for (var i = 0; i < allItems.length; i++) e += `
    <div class="col-md-4 my-3 M shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByCategory('${allItems[i].strCategory}')" class="post">
                <img src='${allItems[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${allItems[i].strCategory}</h2>
                        <p>${allItems[i].strCategoryDescription.split(" ").slice(0,50).join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    row.innerHTML = e
    //$("html, body").animate({scrollTop: 0}, 200)
}


async function filterByCategory(category) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loading-container").fadeOut(500)
}
async function filterByArea(country) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".loading-container").fadeOut(500)
}
function displayArea() {
    let e = ""
    for (var i = 0; i < allItems.length; i++) e += `
    <div class="col-md-4 my-3 M  shadow">
        <div class="photo-meal shadow rounded position-relative">
            <div onclick=(filterByArea('${allItems[i].strArea}')) class="post bg-secondary py-4 border border-1 border-white ">
                <i class="fa-solid fa-city fa-3x "></i>
                <h2 class="text-white py-1">${allItems[i].strArea}</h2>
            </div>
        </div>
    </div>`
    row.innerHTML = e
    $("html, body").animate({scrollTop: 0}, 200)


}
async function getMainIngredient(mealName) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".loading-container").fadeOut(500)
}

function displayIngredients() {
    let e = ""
    for (var i = 0; i < allItems.length; i++) e += `
    <div class="col-md-4 my-3 M  shadow">
        <div onclick="getMainIngredient('${allItems[i].strIngredient}')" class="photo-meal shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${allItems[i].strIngredient}</h2>
                <p class="text-white">${allItems[i].strDescription.split(" ").splice(0,50).join(" ")}</p>
            </div>
        </div>
    </div>`
    row.innerHTML = e
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
async function getMeal(mealID) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
    $(".loading-container").fadeOut(500)
}

function displayMeal(meal) {
    let recipe = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipe += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tagnames = meal.strtagnames?.split(",") 
    let tagnamesStr = "" 
    for (let i = 0; i < tagnames?.length; i++) { 
        tagnamesStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tagnames[i]}</li>` 
    } 

    let str = `
    <div class="col-md-4 M text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-6 M text-white ">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>recipe :</h3>
					<ul class="d-flex " id="recipe">
					</ul>

					<h3 class="my-2 mx-1 p-1">tagnames :</h3>
					<ul class="d-flex " id="tagnames">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    row.innerHTML = str
    document.getElementById("recipe").innerHTML = recipe
    document.getElementById("tagnames").innerHTML = tagnamesStr
   // $("html, body").animate({scrollTop: 0}, 200)

}



$(".menu-item a").click(async (e) => {
    let listOfMeals = e.target.getAttribute("data-list")

    document.getElementById("search-container").innerHTML = ""
    row.innerHTML = ""
    $("html, body").animate({
        scrollTop: 0
    }, 200)

    if (listOfMeals == "contact") {

        row.innerHTML = `
        <section id="contact" class="container M w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input placeholder="Enter Your Name" class="form-control shadow " onkeyup="validation()" id="name" >
						<div class="alert mt-1 alert-danger d-none" id="namealert" >
							<p>Special Characters and Numbers not allowed</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()"   placeholder="Enter Email" class="form-control" id="email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" >
							<p>Enter valid email. *Ex: xxx@yyy.zzz</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" >
						<p>	Enter valid Phone Number</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" >
							<p>Enter valid Age</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" >
							<p>Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" >
							<p>Enter valid Repassword</p>
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn" class="btn btn-danger my-5">Submit</button>
		</div>

	</section>`
        userName.addEventListener("focus", () => {
            nameToached = true
        })
        userEmail.addEventListener("focus", () => {
            emailToached = true
        })
        userPhone.addEventListener("focus", () => {
            phoneToached = true
        })
        userAge.addEventListener("focus", () => {
            ageToached = true
        })
        userPassword.addEventListener("focus", () => {
            passwordToached = true
        })
        userRePassword.addEventListener("focus", () => {
            repasswordToached = true
        })
    }
    if (listOfMeals == "search") {
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>`

        $("#searchInput").keyup((e) => {
            search(e.target.value)
        })
        $("#letter").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }


    let click_event = new CustomEvent('click');
    document.querySelector('.sx-menu').dispatchEvent(click_event);

    let x;

    if (listOfMeals == "categories") {
        $(".loading-container").fadeIn(100)

        x = await getCategories(listOfMeals + ".php")
        allItems = x.categories.splice(0, 20);
        displayCategories()
        $(".loading-container").fadeOut(500)
    } else if (listOfMeals == "a") {
        $(".loading-container").fadeIn(100)

        x = await getCategories("list.php?a=list")
        allItems = x.meals.splice(0, 20);
        displayArea()
        $(".loading-container").fadeOut(500)
    } else if (listOfMeals == "i") {
        $(".loading-container").fadeIn(100)

        x = await getCategories("list.php?i=list")
        allItems = x.meals.splice(0, 20);
        displayIngredients()
        $(".loading-container").fadeOut(500)
    }

})

$(document).scroll((e) => {

    if ($(document).scrollTop()) {
        $(".mmm").css("backgroundColor", "#0D0D0D")
    }
})


let nameToached = false,
    emailToached = false,
    phoneToached = false,
    ageToached = false,
    passwordToached = false,
    repasswordToached = false;

function validation() {

    if (nameToached) {
        if (userNameValid()) {
            userNameInput.classList.remove("is-invalid")
            userNameInput.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userNameInput.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }

    if (emailToached) {
        if (userEmailValid()) {
            userEmailInput.classList.remove("is-invalid")
            userEmailInput.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmailInput.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }

    if (phoneToached) {
        if (userPhoneValid()) {
            userPhoneInput.classList.remove("is-invalid")
            userPhoneInput.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhoneInput.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }

    if (ageToached) {
        if (userAgeValid()) {
            userAgeInput.classList.remove("is-invalid")
            userAgeInput.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAgeInput.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }

    if (passwordToached) {
        if (userPasswordValid()) {
            userPasswordInput.classList.remove("is-invalid")
            userPasswordInput.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPasswordInput.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (repasswordToached) {
        if (userRePasswordValid()) {
            userRePasswordInput.classList.remove("is-invalid")
            userRePasswordInput.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePasswordInput.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }

}

//regex
function userNameValid() {
    return /^[a-zA-Z ]+$/.test(userNameInput.value)
}
function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhoneInput.value)
}

function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPasswordInput.value)
}

function userRePasswordValid() {
    return userPasswordInput.value == userRePasswordInput.value
}





