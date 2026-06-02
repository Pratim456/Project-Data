const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const packageButtons = document.querySelectorAll(".package-button");
const serviceSelect = document.querySelector("#service-select");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".package-card");
    const packageName = card?.dataset.package ?? "Full content studio";

    if (serviceSelect) {
      serviceSelect.value =
        packageName === "Planner" ? "Content planning" : "Full content studio";
    }

    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  });
});
