document.addEventListener("DOMContentLoaded", function () {
  const scroller = new Scroller("#root");
  console.log(scroller);
  //   const rootElement = document.querySelector("#root");
  //   const sections = document.querySelectorAll("section");
  //   let currentSectionIndex = 0;
  //   let scrollSlowler = false;

  document.addEventListener("mousewheel", scroller.listenScroll);


 
});
