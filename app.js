document.getElementById("search-btn").addEventListener("click", () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";

  // load all data into search
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
});

// display search phone
const displaySearchResult = (phones) => {
  const fiendPhones = document.getElementById("fiend-phones");

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="shadow">
        <img src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <h4 class="card-text mb-4">${phone.brand}</h4>
            <button onClick="phoneDetail('${phone.slug}')" type="button" class="btn btn-success px-5 fs-4">Details</button>
        </div>
    </div>
  `;
    fiendPhones.appendChild(div);
  });
};

// load phone detail data
const phoneDetail = (phone) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};
