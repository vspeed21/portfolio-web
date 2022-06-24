document.addEventListener('DOMContentLoaded', () => {
  iniciarApp();
});

const formulario = document.querySelector('#form');
formulario.addEventListener('submit', validarForm);


function iniciarApp() {
  burgerClick();
  writeStrings();
  acordeon();
  tabs();
  scrollNav();
  ingresarYear();
  darkMode();
  // swiperCards();

  // Da problemas el return del form
  validarForm();
}


function darkMode() {
  const darkIcon = document.querySelector('.dark-mode-btn');
  const body = document.querySelector('body');

  const preferences = window.matchMedia('(prefers-color-scheme: dark)');
  // console.log(preferences.matches);

  if(preferences.matches) {
    body.classList.add('dark-mode');
  }else{
    body.classList.remove('dark-mode');
  }

  preferences.addEventListener('change', () => {
    if(preferences.matches) {
      body.classList.add('dark-mode');
    }else{
      body.classList.remove('dark-mode');
    }
  })

  darkIcon.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    const nav = document.querySelector('.nav-menu');
    const burger = document.querySelector('.burger');
      
    burger.classList.remove('active');
    nav.classList.remove('nav-menu-desplazado');
  })
}

function burgerClick() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-menu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('nav-menu-desplazado')
  });
}

function writeStrings() {
  const options = {
    strings:[ 
      '<i class="nombre">Victor Torres</i>',
      '<i class="nombre">Desarrollador web</i>',
      '<i class="nombre">Maquetador web</i>'
    ],
    loop: true,
    typeSpeed: 75, 
    backSpeed: 75,
    startDelay: 300

  }

  const typed = new Typed('.typed', options);
}

function acordeon() {
  const bloques = document.querySelectorAll('.bloque');
  const titulares = document.querySelectorAll('.titular');

  titulares.forEach( (titular, i) => {
    titular.addEventListener('click', () => {
      
      if(bloques[i].classList.contains('active')) {
        bloques[i].classList.remove('active')
      }else{
        bloques.forEach( bloque => {
          bloque.classList.remove('active');
        });
        bloques[i].classList.add('active');
      }
    })
  });
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

function validarForm(e) {
  e.preventDefault()

  const er = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  //Campos del form
  const nombre = document.querySelector('#nombre').value;
  const email = document.querySelector('#email').value;
  const celular = document.querySelector('#celular').value;
  const mensaje = document.querySelector('#mensaje').value;
  
  //Validacion de campos
  if([nombre, celular, mensaje].includes('')) {
    alerta('Todos los campos son obligatorios', 'error');
    return;
  }

  if(!er.test(email)) {
    const campo = document.querySelector('.campo:nth-child(3)')
    const divAlerta = document.createElement('div');
    divAlerta.textContent = 'Email no valido';

    divAlerta.classList.add('alerta', 'error');
    campo.appendChild(divAlerta);

    setTimeout(() => {
      divAlerta.remove()
    }, 2500);
    return;
  }else{
    alerta('¡Mensaje enviado!')
  }

  const datos ={
    nombre,
    email,
    celular,
    mensaje
  }

  enviarDatos(datos);
  formulario.reset()
}

async function enviarDatos(datos) {
  try {
    const url = 'https://my-json-server.typicode.com/vspeed21/portfolio-web/Clientes';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    result = await response.json();

  } catch (error) {
    console.log(error);
  }
}

function alerta(mensaje, tipo) {
  const alerta = document.querySelector('.alerta');

  if(!alerta) {
    const campo = document.querySelector('.campo')
    const divAlerta = document.createElement('div');
    divAlerta.textContent = mensaje;

    divAlerta.classList.add('alerta');

    if(tipo) {
      divAlerta.classList.add('error');
    }else{
      divAlerta.classList.add('succes')
    }

    formulario.insertBefore(divAlerta, campo);
    
    setTimeout(() => {
      divAlerta.remove()
    }, 2500);
  }

}

function scrollNav() {
  const enlaces = document.querySelectorAll('.enlace');
  const nav = document.querySelector('.nav-menu');
  const burger = document.querySelector('.burger');
  
  enlaces.forEach( enlace => {
    enlace.addEventListener('click', (e) => {
      e.preventDefault();
      
      burger.classList.remove('active');
      nav.classList.remove('nav-menu-desplazado');

      const seccion = document.querySelector(e.target.attributes.href.value);
      console.log(seccion);
      seccion.scrollIntoView({behavior: 'smooth'});
    })
  })
}

function ingresarYear() {
  const year = document.querySelector('#year');
  const today = new Date()
  year.textContent = today.getFullYear()
}