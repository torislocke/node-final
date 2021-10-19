function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav" || "topnav-right") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

var navList = document.getElementById("nav-lists");
function Show() {
navList.classList.add("_Menus-show");
}

function Hide(){
navList.classList.remove("_Menus-show");
}


mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    // This should be your user handling code implement following the course videos
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
  
