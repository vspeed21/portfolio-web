document.addEventListener('DOMContentLoaded', () => {
  iniciarApp();
});

function iniciarApp() {
  burgerClick();
  writeStrings();
  acordeon();
  tabs()
}

function burgerClick() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-menu')

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('nav-menu-desplazado')
  });
}

function writeStrings() {
  const options = {
    strings:[ 
      '<i class="nombre">Victor Torres</i>',
      '<i class="nombre">Desarrollador web Jr</i>',
      '<i class="nombre">Maquetador web</i>'
    ],
    loop: true,
    typeSpeed: 75, 
    backSpeed: 75,
    startDelay: 300

  }

  const typed = new Typed('#typed', options);
}

function acordeon() {
  const bloques = document.querySelectorAll('.bloque');
  const titulares = document.querySelectorAll('.titular');

  titulares.forEach( (titular, i) => {
    titular.addEventListener('click', () => {

      bloques.forEach( (bloque, i) => {
        bloque.classList.remove('active');
      });

      bloques[i].classList.add('active');
    })
  })
}

function tabs() {
  const tabsSuperior = document.querySelectorAll('.pestanas li')
  const bloques = document.querySelectorAll('.contenido-pestanas .bloque')

  tabsSuperior.forEach( (tab, i) => {
    tab.addEventListener('click', () => {

      tabsSuperior.forEach( (tab, i) => {
        tabsSuperior[i].classList.remove('active')
        bloques[i].classList.remove('active')
      })

      tabsSuperior[i].classList.add('active')
      bloques[i].classList.add('active')
    })
  });
}