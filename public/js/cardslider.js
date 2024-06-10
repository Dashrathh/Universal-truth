//   section 1 card slider

let scrollbar = document.querySelector('.campare');
let leftBotton = document.getElementById("left-botton");
let rightBotton = document.getElementById("right-botton");

scrollbar.addEventListener("wheel",(evt) => {
  evt.preventDefault();
  scrollbar.scrollLeft += evt.deltaX;
  console.log("Wheel event triggered");
});


leftBotton.addEventListener('click', () => {
  scrollbar.style.scrollBehavior = "smooth";
  scrollbar.scrollLeft -= 700;
});

rightBotton.addEventListener('click', () => {
  scrollbar.style.scrollBehavior = "smooth";
  scrollbar.scrollLeft += 700;
});








let scrollContainer = document.querySelector(".h-swiper-wrapper");
let leftbtn = document.getElementById("left-btn");
let rightbtn = document.getElementById("right-btn");


scrollContainer.addEventListener("wheel",(evt) =>{
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaX;
})
 
rightbtn.addEventListener("click",()=>{
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft +=700;
})
leftbtn.addEventListener("click",()=>{
  scrollContainer.style.scrollBehavior = "smooth";

  scrollContainer.scrollLeft -=700;
})





