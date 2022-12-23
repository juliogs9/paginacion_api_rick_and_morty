document.addEventListener("DOMContentLoaded", () => {
  getData();
});

const getData = async (url = "https://rickandmortyapi.com/api/character") => {
  try {
    loadingData(true);

    const res = await fetch(url);
    const data = await res.json();

    pintarCard(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
  }
};

const pintarCard = (data) => {
  const cards = document.getElementById("card-dinamicas");
  cards.textContent = "";
  const template = document.getElementById("template-card").content;
  const fragment = document.createDocumentFragment();

  data.results.forEach((item) => {
    const clone = template.cloneNode(true);
    clone.querySelector("h5").textContent = item.name;
    clone.querySelector("p").textContent = item.species;
    clone.querySelector(".card-img-top").setAttribute("src", item.image);

    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);

  pintarPaginacion(data.info);
};

const pintarPaginacion = (data) => {
  const paginacion = document.getElementById("paginacion");
  paginacion.textContent = "";
  const templatePaginacion = document.getElementById("template-pag").content;
  const clone = templatePaginacion.cloneNode(true);

  const btnPri = clone.querySelector(".btn-outline-primary");
  const btnSecon = clone.querySelector(".btn-outline-secondary");

  if (data.next) {
    btnPri.disabled = false;
  } else {
    btnPri.disabled = true;
  }

  if (data.prev) {
    btnSecon.disabled = false;
  } else {
    btnSecon.disabled = true;
  }

  paginacion.appendChild(clone);

  btnPri.addEventListener("click", (e) => {
    getData(data.next);
  });

  btnSecon.addEventListener("click", (e) => {
    getData(data.prev);
  });
};

const loadingData = (estado) => {
  const loading = document.getElementById("loading");
  if (estado) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
