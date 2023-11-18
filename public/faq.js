document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", function () {
      faqItems.forEach((innerItem) => {
        if (innerItem !== item) {
          innerItem.classList.remove("active");
          innerItem.querySelector(".faq-answer").style.display = "none";
        }
      });

      item.classList.toggle("active");
      const answer = item.querySelector(".faq-answer");
      answer.style.display =
        answer.style.display === "block" ? "none" : "block";
    });
  });
});
