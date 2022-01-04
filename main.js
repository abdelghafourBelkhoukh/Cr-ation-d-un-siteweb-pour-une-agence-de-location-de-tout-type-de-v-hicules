console.log("%cAl rights reserved !", "color:orange");

const vehicules = document.querySelector(".vehicules");
const form = document.querySelector(".reservation form");
const actualise = document.querySelector(".actualise");

function initialize() {
  vehicules.innerHTML = form.innerHTML = "";

  data.vehicules.map(mapsElements);
}

const data = {
  vehicules: [
    {
      name: "moto",
      price: 10,
      img: "https://freepngimg.com/thumb/motorcycle/1-moto-png-image-motorcycle-png-picture-download.png",
      boiteVitesse: [],
      carbirant: [
        { name: "Electrique", percent: 5 },
        { name: "Escence", percent: 14 },
      ],
    },
    // end
    {
      name: "citadine",
      price: 12,
      img: "https://i1.wp.com/www.carideal.com/blog/wp-content/uploads/2018/02/volkswagen-up-2018-e1518202458842.png?resize=770%2C364",
      boiteVitesse: [{ name: "Manuelle", percent: 0 }],
      carbirant: [
        { name: "Electrique", percent: 5 },
        { name: "Hybride", percent: 9 },
        { name: "escence", percent: 14 },
        { name: "Diesel", percent: 21 },
      ],
    },

    // begin
    {
      name: "compact",
      price: 14,
      img: "https://st.automobilemag.com/uploads/sites/10/2015/11/2015-toyota-corolla-s-at-sedan-angular-front.png",
      boiteVitesse: [{ name: "Manuelle", percent: 0 }],
      carbirant: [
        { name: "Hybride", percent: 9 },
        { name: "Escence", percent: 14 },
        { name: "Diesel", percent: 21 },
      ],
    },
    // end
    {
      name: "berline",
      price: 20,
      img: "https://unfallhilfe-berlin.de/wp-content/uploads/2019/07/mercedes-benz-2845333_640.png",
      boiteVitesse: [{ name: "Automatique", percent: 19 }],
      carbirant: [
        { name: "Hybride", percent: 9 },
        { name: "Escence", percent: 14 },
        { name: "Diesel", percent: 21 },
      ],
    },
    // begin
    // end
    {
      name: "Utilitaire",
      price: 16,
      img: "https://www.autoavantages.fr/images/voitures/defaut/std/6030-std.png",
      boiteVitesse: [{ name: "Manuelle", percent: 0 }],
      carbirant: [{ name: "Diesel", percent: 21 }],
    },
    // begin
    // end
    {
      name: "Engine de chantier",
      price: 900,
      img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.preventalis.fr%2Fextranet%2Fdocuments%2Fimages%2FR372m%2520c9.jpg&f=1&nofb=1",
      boiteVitesse: [{ name: "Manuelle", percent: 0 }],
      carbirant: [
        { name: "Escence", percent: 14 },
        { name: "Diesel", percent: 21 },
      ],
    },
    // begin
    // end
    {
      name: "camion",
      price: 250,
      img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2016%2F09%2FCargo-Truck-Free-PNG-Image.png&f=1&nofb=1",
      boiteVitesse: [{ name: "Automatique", percent: 19 }],
      carbirant: [{ name: "Diesel", percent: 21 }],
    },
    // begin
  ],
};

function mapsElements(item, index) {
  vehicules.innerHTML += `
    <div class="vehicule" data-index="${index}">
      <img src="${item.img}" alt="">
      <div class="vehicule-body">
        <h3>${item.name}</h3>
      </div>
    </div>
    `;
  const vehicule = document.querySelectorAll(".vehicule");
  vehicule.forEach(function (item) {
    item.addEventListener("click", onSelect);
  });
}

function mapForm(index) {
  form.innerHTML = "";
  const { boiteVitesse, carbirant } = data.vehicules[index];
  if (boiteVitesse.length > 0) {
    boiteVitesse.map(function (item, index) {
      if (index === 0) form.innerHTML += "<h2> Boite Vitesse :  </h2>";
      form.innerHTML += `<input type="radio" value="${item.percent}" name="bv" id="bv" checked/> ${item.name}`;
    });
  }
  if (carbirant.length > 0) {
    carbirant.map(function (item, index) {
      if (index == 0) form.innerHTML += `    <h2>    Carburant :      </h2>`;
      form.innerHTML += `
            <input type="radio" value="${item.percent}" name="carb"  id="carb"/> ${item.name}
            <br>
            `;
    });
  }
  if (carbirant.length > 0 || boiteVitesse.length > 0) {
    form.innerHTML += `
          <h2>
            Number of days :
        </h2>
        <input type="number" name="number" value="1" min="1" max="20">
      
 <input type="hidden" name="price" value="${data.vehicules[index].price}" />
        <input type="submit" value="Submit"> 
        `;
  }
}
function onSelect(e) {
  const index = e.target.parentNode.getAttribute("data-index");
  HideUnselectedItems(index);
  mapForm(index);
}

function calcul() {
  const { bv, carb, price, number } = form;
  let pricecarb = 0,
    pricebv = 0,
    total = 0;

  if (carb.value !== undefined)
    pricecarb = (Number(carb.value) / 100) * price.value;

  if (bv.value !== undefined) pricebv = (Number(bv.value) / 100) * price.value;

  total = (Number(price.value) + pricecarb + pricebv) * number.value;

  console.log(total);
  if (pricecarb == 0 || pricebv < 0) {
    document.querySelector(".resultat").innerHTML =
      "Selectionner les donnes de vehicule";
  } else {
    document.querySelector(".resultat").innerHTML = total + " $";
  }

  scrollTo(0, 0);
  // Prix total = (prix de véhicules + percentage carburant + percentage boite à vitesse)*durée de réservation
}

function onSubmit(e) {
  e.preventDefault();
  calcul();
}

function HideUnselectedItems(i) {
  vehicules.innerHTML = "";
  const filtredData = data.vehicules.filter((item, index) => index == i);
  filtredData.map(mapsElements);
  const vehicule = document.querySelectorAll(".vehicule");
  vehicule.forEach(function (item) {
    item.removeEventListener("click", onSelect);
    
  });
}

data.vehicules.map(mapsElements);

actualise.addEventListener("click", function () {
  initialize();
});

form.addEventListener("submit", onSubmit);
