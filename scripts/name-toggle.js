document.addEventListener("DOMContentLoaded", () => {
  const profileContainer = document.querySelector("#profile-img");
  const nameTag = document.querySelector("#name");

  profileContainer.addEventListener("mouseenter", () => {
      nameTag.style.opacity = 1;
  });

  profileContainer.addEventListener("mouseleave", () => {
      nameTag.style.opacity = 0;
  });
});
