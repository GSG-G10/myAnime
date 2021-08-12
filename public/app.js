// <!-- by ibrahim jomaa @div.luffy -->
const containers = document.querySelector('.container');
const btnSearch = document.querySelector('.btn_search');
const inptSearch = document.querySelector('.inpt_search');
const myanime = document.querySelector('.myanime');
const category = document.querySelector('.category');
const typeAnime = document.querySelector('.type_anime');
const typeManga = document.querySelector('.type_manga');
const mode = document.querySelector('._mode_');
const waitLoadData = document.querySelector('.wait_load_data');

waitLoadData.classList.add('active');
mode.addEventListener('click', () => {
  document.querySelector('html').classList.toggle('dark');
});

let page = 1;
let link = 'home';
fetch('/home')
    .then((getData) => {
      return getData.json();
    })
    .then((data) => {
      waitLoadData.classList.remove('active');

      imgHome(data);
      window.addEventListener('scroll', () => {
        const {scrollTop, scrollHeight, clientHeight} =
        document.documentElement;
        if (
          clientHeight + scrollTop >= scrollHeight - 10 &&
        containers.children[0].classList.contains('img-card-main') &&
        link == 'home'
        ) {
          fetch('/home')
              .then((getData) => {
                return getData.json();
              })
              .then((data) => {
                imgHome(data);
              });
        }
      });
    });

inptSearch.addEventListener('keyup', () => {
  const regExpStrong = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  if (inptSearch.value.match(regExpStrong)) {
    inptSearch.classList.add('error');
  } else {
    inptSearch.classList.remove('error');
  }
});

// home
function imgHome(data) {
  for (let i = 0; i < data.length; i++) {
    containers.innerHTML += `
      <div class="img-card-main">
              <img src="${data[i].url}">
      </div>
      `;
  }
}

category.addEventListener('click', () => {
  if (category.value === 'anime') {
    typeAnime.classList.remove('active');
    typeManga.classList.remove('active');
  } else {
    typeManga.classList.add('active');
    typeAnime.classList.add('active');
  }
});

let secondSelect = typeAnime.value;
typeAnime.addEventListener('click', () => {
  secondSelect = typeAnime.value;
});
typeManga.addEventListener('click', () => {
  secondSelect = typeManga.value;
});

btnSearch.addEventListener('click', () => {
  
  waitLoadData.classList.add('active');
  link = 'search';
  searchApi(category.value, inptSearch.value, secondSelect, page);
  window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight - 10) {
      page < 8 ? page++ : page;
      if (page < 8) {
        searchApi(category.value, inptSearch.value, secondSelect, page);
      }
    }
  });
});

async function searchApi(x, y, z, p) {
  const serachData = {category: x, inpt_search: y, typeSerch: z, page: p};
  const option = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(serachData),
  };
  const res = await fetch('/api', option);
  const json = await res.json();
  sendData(json);
}

function sendData(json) {
  waitLoadData.classList.remove('active');
  if (containers.children[0].classList.contains('img-card-main')) {
    removeChild(containers);
  }
  for (let x = 0; x < 49; x++) {
    containers.innerHTML += `
    <div class="card">
       <div class="img-card">
           <img src="${json.data.results[x].image_url}">
       </div>
       <div class="info-card">
           <div class="type">
               <span>${json.data.results[x].type}</span>
           </div>
           <div class="title">
               <span>${json.data.results[x].title}</span>
           </div>
           <div class="synopsis">
               <span>${json.data.results[x].synopsis}</span>
           </div>
       </div>
    </div>
            `;
  }
}

myanime.addEventListener('click', () => {
  location.reload();
});

// for remove all content main
function removeChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
