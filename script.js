const email = "madison.bullard@gmail.com";
const button = document.querySelector(".email-button");
const handshake = document.querySelector(".handshake");
const emailAddress = document.querySelector(".email-address");
const hasMouse = matchMedia("(hover: hover) and (pointer: fine)").matches;

let movementHue = 0;
let emailHue = 0;
let previousX = 0;
let previousY = 0;
let animating = false;

if (hasMouse) {
  document.querySelector(".page").addEventListener("mousemove", event => {
    const increment = Math.abs(event.screenX - previousX) + Math.abs(event.screenY - previousY);
    movementHue = (movementHue + increment * 0.4) % 360;
    previousX = event.screenX;
    previousY = event.screenY;
    handshake.style.transform = `translateY(${Math.sin(movementHue * Math.PI / 180) * 60}px)`;
  });

  setInterval(() => {
    emailHue = (emailHue + 16) % 360;
    emailAddress.style.setProperty("--email-hue", `${emailHue}deg`);
  }, 1000 / 60);
} else {
  setInterval(() => {
    movementHue = (movementHue + 8) % 360;
    emailAddress.style.setProperty("--email-hue", `${movementHue * 4}deg`);
  }, 1000 / 30);
}

function copyEmail() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).catch(copyEmailFallback);
  } else {
    copyEmailFallback();
  }
}

function copyEmailFallback() {
    const selection = document.createElement("textarea");
    selection.value = email;
    selection.style.position = "fixed";
    selection.style.opacity = "0";
    document.body.append(selection);
    selection.select();
    document.execCommand("copy");
    selection.remove();
}

button.addEventListener("click", () => {
  copyEmail();

  if (animating) return;
  animating = true;
  button.classList.add("stage-1");

  setTimeout(() => {
    button.className = "email-button stage-2";
  }, 1);
  setTimeout(() => {
    button.className = "email-button stage-3";
  }, 2601);
  setTimeout(() => {
    button.className = "email-button stage-4";
  }, 2611);
  setTimeout(() => {
    button.className = "email-button";
    animating = false;
  }, 3211);
});
