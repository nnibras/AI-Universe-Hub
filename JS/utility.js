const cardContainer = document.getElementById("cards-container");
const spinner = document.getElementById("spinner");
const sortBtn = document.getElementById("sort-btn");
const btnSeeMore = document.getElementById("btn-see-more");

// creates cards dynamically
function cards(data, howMany = 6) {
  spinner.classList.remove("hidden");
  const tools = data.data.tools.slice(0, howMany);

  for (const tool of tools) {
    const imgUrl = tool.image;
    const name = tool.name;
    const date = tool.published_in;
    const f1 = tool.features[0];
    const f2 = tool.features[1];
    const f3 = tool.features[2];
    const id = tool.id;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("w-3/4", "mx-auto");
    cardDiv.innerHTML = `
    <div class="max-w-sm rounded-xl overflow-hidden shadow-lg h-96">
                <img class="w-full h-1/3 lg:h-2/4"
                    src=${imgUrl}>
                <div class="px-6 py-4 h-fit">
                    <div class="font-bold text-xl mb-2">Features</div>
                    <ol class="text-xs text-gray-400">
                        <li>1. ${f1}</li>
                        <li>2. ${f2}</li>
                        <li>3. ${f3}</li>
                    </ol>
                </div>
                <hr class="w-11/12 mx-auto">
                <div class="flex w-11/12 mx-auto mb-4">
                    <div class="justify-between w-11/12 mx-auto ">
                        <div class="w-3/4 ">
                            <div class="font-bold text-xl my-2">${name}</div>
                        </div>
                        <div class="flex">
                            <div class="mr-2"><i class="fa-regular fa-calendar-days"></i></div>
                            <div class="text-sm text-gray-400 date-element ">${date}</div>
                        </div>
                    </div>
                    <div class="my-auto">
                        <button onclick=""  class="bg-orange-100 rounded-full "><i id="${id}"
                                class="fa-solid fa-arrow-right px-2 py-2"></i></button>
                    </div>
                </div>

            </div>
    
    `;

    cardContainer.appendChild(cardDiv);
  }
  spinner.classList.add("hidden");
}
// creates modal dynamically
function modal(data) {
  const image = data.data.image_link[0];
  const description = data.data.description;
  const f1 = data.data.features[1]?.feature_name || "No Data Found";
  const f2 = data.data.features[2]?.feature_name || "No Data Found";
  const f3 = data.data.features[3]?.feature_name || "No Data Found";
  const i1 =
    data.data.integrations?.length > 0 ? data.data.integrations[0] : "";
  const i2 =
    data.data.integrations?.length > 1 ? data.data.integrations[1] : "";
  const i3 =
    data.data.integrations?.length > 2 ? data.data.integrations[2] : "";

  const pBasicValue = data.data.pricing?.[0].price;
  let pBasic = "";
  if (pBasicValue == 0) {
    pBasic = "Free";
  } else if (pBasicValue == "No cost") {
    pBasic = "Free";
  } else {
    pBasic = pBasicValue || "N/A";
  }

  const pProValue = data.data.pricing?.[1].price;
  let pPro = "";
  if (pProValue == 0) {
    pPro = "Free";
  } else if (pProValue == "No cost") {
    pPro = "Free";
  } else {
    pPro = pProValue || "N/A";
  }

  const pEntValue = data.data.pricing?.[2].price;
  let pEnt = "";
  if (pEntValue == 0) {
    pEnt = "Free";
  } else if (pEntValue == "No cost") {
    pEnt = "Free";
  } else {
    pEnt = pEntValue || "N/A";
  }

  const inputEx =
    data.data.input_output_examples?.[0].input || "Can you give any example?";
  const outputEx =
    data.data.input_output_examples?.[0].output ||
    "No! Not Yet! Take a break!!!";
  const accuracy = data.data.accuracy?.score
    ? data.data.accuracy.score * 100
    : "No Data Found";

  const modal = document.getElementById("modal-container");

  modal.innerHTML = `
  
            <div id="modal" class=" hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white rounded-lg  h-full lg:h-fit w-min lg:w-1/2 overflow-x-auto lg:overflow-visible">
                <div class="relative left-4 lg:left-9 bottom-0 lg:bottom-9 flex justify-end pt-4 pr-4">
                    <button class="text-white rounded-full bg-orange-600 px-4 py-2" onclick="closeModal()">X</button>
                </div>

                <div class="grid grid cols-1 lg:grid-cols-2">
                    <div class="px-1 mb-10 ml-0 lg:ml-14">
                        <div class="bg-red-100 border-2 border-red-300 rounded-lg px-1 lg:px-5 py-5 lg:w-fit">
                            <div>
                                <p class="font-bold mb-5">${description}</p>
                            </div>

                            <div class="flex">
                                <div class=" rounded-lg  px-2 py-2 bg-white text-green-500 mr-2">
                                    <h2>${pBasic}</h2>
                                    <h2>Basic</h2>
                                </div>
                                <div class="text-orange-500 rounded-lg  px-2 py-2 bg-white mr-2">
                                    <h2>${pPro}</h2>
                                    <h2>Pro</h2>
                                </div>
                                <div class="text-red-500 rounded-lg  px-2 py-2 bg-white">
                                    <h2>${pEnt}</h2>
                                    <h2>Enterprise</h2>
                                </div>
                            </div>

                            <div class="flex justify-between">
                                <div class="my-4 ml-2">
                                    <h1 class="font-bold">Features</h1>
                                    <ul class="text-gray-400 text-xs list-disc ml-3 mt-1">
                                        <li>${f1}</li>
                                        <li>${f2}</li>
                                        <li>${f3}</li>
                                    </ul>
                                </div>


                                <div class="my-4 mr-10">
                                <h1 class="font-bold">Integrations</h1>
                                <div id="integration">
                                    <ul class="text-gray-400 text-xs list-disc ml-3 mt-1">
                                    ${i1 ? `<li>${i1}</li>` : ""}
                                    ${i2 ? `<li>${i2}</li>` : ""}
                                    ${i3 ? `<li>${i3}</li>` : ""}
                                    ${!i1 && !i2 && !i3 ? "No Data Found" : ""}
                                    </ul>
                                </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div class="w-3/4 mx-auto border-2 mb-10 rounded-xl ">
                        <div class="max-w-sm rounded-xl overflow-hidden">
                            <div id="accuracy"
                                class=" lg:absolute bg-orange-600 rounded-md px-2 py-2  text-white font-bold w-full lg:w-max text-center">
                                
                            </div>
                            <img class="w-full h-40"
                                src=${image}>
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2 text-center">${inputEx}</div>

                                <div class="text-center text-gray-600 text-sm">${outputEx}</div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


        </div>
  
  `;

  const accuracyDiv = document.getElementById("accuracy");

  if (accuracy == null || accuracy == "No Data Found") {
    accuracyDiv.style.display = "none";
  } else {
    accuracyDiv.innerText = `${accuracy}% Accuracy`;
  }

  openModal();
}
// sorts cards that are available on the screen in ascending order based on date
function cardsSorted(data, howMany = 6) {
  spinner.classList.remove("hidden");
  const tools = data.data.tools.slice(0, howMany);

  // Sort the tools by date in ascending order
  tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));

  for (const tool of tools) {
    const imgUrl = tool.image;
    const name = tool.name;
    const date = tool.published_in;
    const f1 = tool.features[0];
    const f2 = tool.features[1];
    const f3 = tool.features[2];
    const id = tool.id;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("w-3/4", "mx-auto");
    cardDiv.innerHTML = `
      <div class="max-w-sm rounded-xl overflow-hidden shadow-lg h-96">
        <img class="w-full h-1/3 lg:h-2/4" src=${imgUrl}>
        <div class="px-6 py-4 h-fit">
          <div class="font-bold text-xl mb-2">Features</div>
          <ol class="text-xs text-gray-400">
            <li>1. ${f1}</li>
            <li>2. ${f2}</li>
            <li>3. ${f3}</li>
          </ol>
        </div>
        <hr class="w-11/12 mx-auto">
        <div class="flex w-11/12 mx-auto mb-4">
          <div class="justify-between w-11/12 mx-auto ">
            <div class="w-3/4 ">
              <div class="font-bold text-xl my-2">${name}</div>
            </div>
            <div class="flex">
              <div class="mr-2"><i class="fa-regular fa-calendar-days"></i></div>
              <div class="text-sm text-gray-400 date-element ">${date}</div>
            </div>
          </div>
          <div class="my-auto">
            <button onclick=""  class="bg-orange-100 rounded-full "><i id="${id}" class="fa-solid fa-arrow-right px-2 py-2"></i></button>
          </div>
        </div>
      </div>
    `;

    cardContainer.appendChild(cardDiv);
  }

  spinner.classList.add("hidden");
}

// for checking
function sortElementsByDateAscending() {
  const elements = Array.from(document.querySelectorAll(".date-element"));
  for (const element of elements) {
    const dateString = element.innerText.trim();
    const [day, month, year] = dateString.split("/");
    const dateValue = new Date(year, month - 1, day);
    // console.log(dateValue);
  }

  const elementDates = elements.map((element) => {
    const dateString = element.textContent.trim();
    const [day, month, year] = dateString.split("/");
    const dateValue = new Date(year, month - 1, day);
    return { element, dateValue };
  });
  // Map the elements to an array of objects containing the element and its date

  // Sort the array by date value
  const arr = elementDates.sort((a, b) => a.dateValue - b.dateValue);

  for (const ar of arr) {
    // console.log(ar.dateValue);
  }
}
