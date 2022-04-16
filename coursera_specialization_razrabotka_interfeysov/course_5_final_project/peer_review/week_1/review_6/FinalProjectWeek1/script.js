var cards=document.querySelectorAll(".card");
cards.forEach(card=>card.addEventListener("click",flip));

let isFlipped=false;
let firstOpen;

function flip(){
   var toClose=document.querySelectorAll(".flipped");
   this.classList.add("flipped")
   
   if (isFlipped){
      firstOpen = this;
      isFlipped=true;
   }else{
	  toClose.forEach(card=>{
     ard.classList.remove("flipped")
   });
   }
};

