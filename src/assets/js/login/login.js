const menuLinks = document.querySelectorAll('.dropdown-menu a[href^="#"]');
const menu = document.querySelector(".dropdown-menu");
console.log(menu);
console.log("asdfg");


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const menuLink = document.querySelector(`.dropdown-menu a[href="#${id}"]`);

      if (entry.isIntersecting) {
        document.querySelector(".dropdown-menu a.selected").classList.remove("selected");
        menuLink.classList.add("selected");
      }
    });
  },
  { rootMargin: "-30% 0px -70% 0px" }
);

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", function () {
    menu.classList.remove("menu_opened");
  });

  const hash = menuLink.getAttribute("href");
  const target = document.querySelector(hash);
  if (target) {
    observer.observe(target);
  }
});
