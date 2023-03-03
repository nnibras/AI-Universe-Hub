let sortChecker = 0;
// for all data
window.addEventListener("load", () => {
  sortChecker = 1;
  btnSeeMore.classList.add("hidden");
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then((response) => response.json())
    .then((data) => {
      cards(data);
      btnSeeMore.classList.remove("hidden");
      sortElementsByDateAscending();
    })
    .catch((error) => {
      console.log(error);
    });
});

// when see more is clicked
btnSeeMore.addEventListener("click", function () {
  sortChecker = 2;
  spinner.classList.remove("hidden");
  cardContainer.innerHTML = " ";
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then((response) => response.json())
    .then((data) => {
      cards(data, 12);
    })
    .catch((error) => {
      console.log(error);
    });

  btnSeeMore.classList.add("hidden");
});

// event delegation to find which ID is clicked
cardContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const buttonId = clickedElement.id;
  const url = `https://openapi.programming-hero.com/api/ai/tool/${buttonId}`;

  if (clickedElement.tagName === "I") {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        modal(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

//when sort button is clicked, perform sorting in ascending order based on date of cards which are available
sortBtn.addEventListener("click", function () {
  spinner.classList.remove("hidden");
  btnSeeMore.classList.add("hidden");

  if (sortChecker == 1) {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
      .then((response) => response.json())
      .then((data) => {
        cardContainer.innerHTML = "";
        cardsSorted(data);
        btnSeeMore.classList.remove("hidden");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
      .then((response) => response.json())
      .then((data) => {
        cardContainer.innerHTML = "";
        cardsSorted(data, 12);
        btnSeeMore.classList.remove("hidden");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cardContainer.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const buttonId = clickedElement.id;
    const url = `https://openapi.programming-hero.com/api/ai/tool/${buttonId}`;

    if (clickedElement.tagName === "I") {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          modal(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});
