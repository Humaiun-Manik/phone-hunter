document.getElementById("search-btn").addEventListener("click", () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";

  document.getElementById("spinner").style.display = "block";

  // load all data into search
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data.slice(0, 20)));
});

// display search phone
const displaySearchResult = (phones) => {
  const fiendPhones = document.getElementById("fiend-phones");
  fiendPhones.textContent = "";

  // display less than 20 phones
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
  document.getElementById("spinner").style.display = "none";
  document.getElementById("showAll-btn").style.display = "block";
};

// load phone detail data
const phoneDetail = (phone) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
    .then((res) => res.json())
    .then((data) => displayPhoneDetail(data.data));
};

// display phone detail
const displayPhoneDetail = (phone) => {
  const phoneInfo = document.getElementById("phone-info");
  phoneInfo.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row");
  div.classList.add("shadow-lg");
  div.innerHTML = `
    <div class="col-md-4 p-3">
        <img src="${phone.image}" class="w-100 rounded-start" alt="..." />
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h2 class="card-title">${phone.name}</h2>
            <h4 class="card-text">${phone.brand}</h4>
            <h5 class="card-text">${phone.releaseDate ? phone.releaseDate : "No release date found"}</h5>
            <ul>
                <li>${phone.mainFeatures.storage}</li>
                <li>${phone.mainFeatures.displaySize}</li>
                <li>${phone.mainFeatures.chipSet}</li>
                <li>${phone.mainFeatures.memory}</li>
                <li>${phone.others.WLAN}</li>
                <li>${phone.others.Bluetooth}</li>
                <li>${phone.others.GPS}</li>
                <li>${phone.others.NFC}</li>
                <li>${phone.others.Radio}</li>
                <li>${phone.others.USB}</li>
                <li>${phone.mainFeatures.sensors.join(", ")}</li>
            </ul>
        </div>
    </div>
  `;
  phoneInfo.appendChild(div);
};
