class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector);
    this.sections = document.querySelectorAll("section");
    const sectionsArr = [...this.sections];

    const currentSectionIndex = sectionsArr.findIndex(this.isScrolledIntoView);

    this.currentSectionIndex = Math.max(currentSectionIndex, 0);

    this.isThrottled = false;

    // this.isScrollIntoView(this.sections[0]);
    this.drawNavigation();
  }

  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = Math.floor(rect.bottom);

    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  }

  listenScroll = (e) => {
    if (this.scrollSlowler) return;
    this.scrollSlowler = true;

    setTimeout(() => {
      this.scrollSlowler = false;
    }, 100);

    const direction = e.wheelDelta < 0 ? 1 : -1;
    // scroller(direction)
    this.scroll(direction);
  };
  scroll = (direction) => {
    console.log(direction);
    if (direction === 1) {
      const isLastSection =
        this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const firstSection = this.currentSectionIndex === 0;
      if (firstSection) return;
    }

    this.currentSectionIndex = this.currentSectionIndex + direction;

    this.scrollToCurrentSection();
  };
  scrollToCurrentSection() {
    this.selectActiveNavItem();
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  drawNavigation = () => {
    this.navigationContainer = document.createElement("aside");
    this.navigationContainer.setAttribute("class", "scroller__navigation");
    const list = document.createElement("ul");

    this.sections.forEach((section, index) => {
      const listItem = document.createElement("li");

      listItem.addEventListener("click", () => {
        this.currentSectionIndex = index;
        this.scrollToCurrentSection();
      });

      list.appendChild(listItem);
      const text = document.createElement("div");
      text.textContent = "SAMPLE";
      text.classList.add("lala");
      text.style.color = "white";
      listItem.addEventListener(
        "mouseover",
        function () {
          text.style.color = "red";
          text.style.opacity = "100%";
        },
        true
      );
      listItem.addEventListener(
        "mouseout",
        function () {
          text.style.color = "transparent";
          text.style.opacity = "0%";
          text.style.transition = "0.5s";
        },
        true
      );

      listItem.appendChild(text);
    });

    this.navigationContainer.appendChild(list);
    document.body.appendChild(this.navigationContainer);
  };

  selectActiveNavItem = () => {
    const navigationItems = this.navigationContainer.querySelectorAll("li");

    navigationItems.forEach((item, index) => {
      if (index === this.currentSectionIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };
}
