const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelector(".booking-bar").addEventListener("submit", (event) => {
  event.preventDefault();
  const destination = new FormData(event.currentTarget).get("destination").trim();
  showToast(destination ? `Lovely choice. Let’s find your place in ${destination}.` : "Tell us what kind of place you’re dreaming of and we’ll take it from there.");
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.querySelector(".form-message");
  message.textContent = "You’re on the list. A little sunshine is on its way.";
  form.reset();
});

const checkIn = document.querySelector('[name="checkin"]');
const checkOut = document.querySelector('[name="checkout"]');
const formatLocalDate = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, "0"),
  String(date.getDate()).padStart(2, "0"),
].join("-");
const today = new Date();
const localDate = formatLocalDate(today);
checkIn.min = localDate;
checkOut.min = localDate;
checkIn.addEventListener("change", () => {
  if (checkIn.value) {
    const nextDay = new Date(`${checkIn.value}T00:00:00`);
    nextDay.setDate(nextDay.getDate() + 1);
    checkOut.min = formatLocalDate(nextDay);
    if (checkOut.value && checkOut.value < checkOut.min) checkOut.value = "";
  }
});
