/**
* Template Name: Vesperr
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/vesperr-free-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

//idiomas
//cambio de idioma


// 
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()






var tnum = 'es';

$(document).ready(function(){
  
  $(document).click( function(e) {
       $('.translate_wrapper, .more_lang').removeClass('active');     
  });
  
  $('.translate_wrapper .current_lang').click(function(e){    
    e.stopPropagation();
    $(this).parent().toggleClass('active');
    
    setTimeout(function(){
      $('.more_lang').toggleClass('active');
    }, 5);
  });
  

  /*TRANSLATE*/
  translate(tnum);
  
  $('.more_lang .lang').click(function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.more_lang').removeClass('active');  
    
    var img = $(this).find('img').attr('src');    
    var lang = $(this).attr('data-value');
    var tnum = lang;
    translate(tnum);
    
    $('.current_lang .lang-txt').text(lang);
    $('.current_lang img').attr('src', img);
    
    if(lang == 'ar'){
      $('body').attr('dir', 'rtl');
    }else{
      $('body').attr('dir', 'ltr');
    }
    
  });
});

function translate(tnum){
  $(' h2.subtitulo').text(trans[0][tnum]);
  $('.boton-cv').text(trans[1][tnum]);
  $('.menu1').text(trans[2][tnum]);
  $('.menu2').text(trans[3][tnum]); 
  $('.menu3').text(trans[4][tnum]);
  $('.menu4').text(trans[5][tnum]);
  $('.subt1').text(trans[6][tnum]);
  $('.subt2').text(trans[7][tnum]);
  $('.txt1').text(trans[8][tnum]);
  $('.txt2').text(trans[9][tnum]);
  $('.subheading3').text(trans[10][tnum]);
  $('.txt3').text(trans[11][tnum]);
  $('.txt4').text(trans[12][tnum]);
  $('.txt5').text(trans[13][tnum]);
  $('.txt6').text(trans[14][tnum]);
  $('.txt7').text(trans[15][tnum]);
  $('.txt8').text(trans[16][tnum]);
  $('.txt9').text(trans[17][tnum]);
  $('.txt10').text(trans[18][tnum]);
  $('.txt11').text(trans[19][tnum]);
  $('.txt12').text(trans[20][tnum]);
  $('.txt13').text(trans[21][tnum]);
  $('.txt14').text(trans[22][tnum]);
  $('.txt15').text(trans[23][tnum]);
  $('.txt16').text(trans[24][tnum]);
  $('.txt17').text(trans[25][tnum]);
  $('.txt18').text(trans[26][tnum]);
  $('.txt19').text(trans[27][tnum]);
  $('.txt20').text(trans[28][tnum]);
  $('.txt21').text(trans[29][tnum]);
  $('.txt22').text(trans[30][tnum]);
  $('.txt23').text(trans[31][tnum]);
  $('.txt24').text(trans[32][tnum]);
  $('.txt25').text(trans[33][tnum]);
  $('.txt26').text(trans[34][tnum]);
  $('.txt27').text(trans[35][tnum]);
  $('.txt28').text(trans[36][tnum]);
  $('.formnombre').text(trans[37][tnum]);
  $('.formemail').text(trans[38][tnum]);
  $('.formasunto').text(trans[39][tnum]);
   $('.formmsj').text(trans[40][tnum]);
   $('.formbtn').text(trans[41][tnum]);
  
   
 
    
   
}


var trans = [ 
  { 
    es : 'Programadora Front-End',
    en : 'Front-End Developer',
  

  
  },{

   es : 'Ver CV',
   en : 'See CV',
  
    
   
  },{  

    es : 'Acerca de mi',
    en : 'About me',
    
  },{  

    es : 'Servicios',
    en : 'Services',
    

    },{  

    es : 'Portafolio',
    en : 'Portfolio',
    

    },{  

    es : 'Contacto',
    en : 'Contact',
    

    },{  

    es : 'Acerca de mi',
    en : 'About me',
    
},{  

    es : 'Formación',
    en : 'Academic Background',
    
},{  

    es : 'Estudié la carrera técnica de back-end developer en la cual aprendí lenguajes como: JAVA  y PHP del lado del servidor, MYSQL para el manejo de bases de datos,JQUERY,JAVASCRIPT para lograr dinamismo en las páginas web, y Angular como framework de éste ultimo.',
    en : 'I studied the technical major of back-end developer in which I learned languages such as: JAVA and PHP on the server side, MYSQL for database management, JQUERY, JAVASCRIPT to achieve dynamism in web pages, and Angular as a framework for the latter.',
    
},{  

    es : 'Estudié la carrera técnica de front-end developer en la cual aprendí lenguajes como: HTML5 para el maquetado de páginas web,CSS3 para darle estilo a la estructura, BOOTSTRAP para lograr que cada proyecto sea adaptable a dispositivos como celulares,tablets,etc',
    en : 'I studied the technical major of front-end developer in which I learned languages such as: HTML5 for the layout of web pages, CSS3 to style the structure, BOOTSTRAP to make each project adaptable to devices such as cell phones, tablets, etc.',

},{  

    es : 'Aplicaciones con Android',
    en : 'Apps with Android',

    },{  

    es : 'Estudié la carrera técnica de Android Developer, utilizando KOTLIN y JAVA como lenguajes para la creación de apps,FIREBASE para bases de datos, como librería he utilizado RETROFIT para obtener datos de manera estructurada.',
    en : 'I studied the technical major of Android Developer, using KOTLIN and JAVA as languages for the creation of apps, FIREBASE for databases, as a library I used RETROFIT to obtain data in a structured way.',


},{  

    es : 'Servicios',
    en : 'Services',

    },{  

    es : 'En páginas, sistemas y aplicaciones web',
    en : 'In web pages, systems and applications webs',

     },{  

    es : 'Creación',
    en : 'Creation',

    },{  

    es : 'El proceso para comenzar con la creación de todo trabajo empieza con comprender que es lo que los clientes desean y saber interpretarlo para obtener el mejor resultado posible.',
    en : 'The process to start with the creation of any job begins with understanding what the clients want and knowing how to interpret it in order to obtain the best possible result.',


 },{  

    es : 'Diseño UX : Diseño basado en la experiencia del usuario',
    en : 'UX Design : User experience based design',

    },{  

    es : 'El diseño, al ser lo primero que captura la atención, es sumamente importante que sea atrayente visualmente e intuitivo para lograr conseguir el mejor acceso a todos los usuarios',
    en : 'The design, being the first thing that captures the attention, it is extremely important that it is visually appealing and intuitive in order to achieve the best access to all users.',


 },{  

    es : 'Desarrollo',
    en : 'Development',


    },{  

    es : 'El código permite que todo lo que ya se habia visualizado en un principio se haga realidad,siempre tomando en cuenta los parámetros de cada lenguaje y las mejores prácticas para lograr la mayor optimización de carga y posicionamiento en buscadores.',
    en : 'The code allows everything that has already been visualized in the beginning to become a reality, always taking into account the parameters of each language and the best practices to achieve the best load optimization and search engine optimization.',

   
},{  

    es : 'Seguimiento',
    en : 'Follow-up',

    },{  

    es : 'Constantemente se hace un seguimiento por futuras actualizaciones o cambios para que el proyecto sea escalable a largo plazo.',
    en : 'It is constantly monitored for future updates or changes to make the project scalable in the long term.',


},{  

    es : 'Portafolio',
    en : 'Portfolio',

},{  

    es : 'Trabajos más recientes',
    en : 'Most recent works',


},{  

    es : 'Todo',
    en : 'All',


},{  

    es : 'Cafeteria Cerises',
    en : 'Coffee Shop Cerises',

    },{  

    es : 'Página Web',
    en : 'Web Page',

    },{  

    es : 'Reproductor de Música',
    en : 'Music Player',

},{  

    es : 'App de Clima',
    en : 'Weather App',

    },{  

    es : 'Lista de Tareas',
    en : 'To Do App',

},{  

    es : 'Instituto Coder',
    en : 'Coder Institute',

},{  

    es : 'Veterinaria Mi Mascota',
    en : ' My Pet Veterinary',

},{  

    es : 'Traductor',
    en : 'Translator',

    },{  

    es : 'Convertidor de Moneda',
    en : 'Currency Converter',

     },{  

    es : 'Generador de Código QR',
    en : 'QR Generator',


},{  

    es : 'Contacto',
    en : 'Contact',

    },{  

    es : 'Programadora Front-End',
    en : 'Front-End Developer',

    },{  

    es : 'Nombre Completo',
    en : 'Full Name',

  },{  

    es : 'E-mail',
    en : 'E-mail',

  },{ 
    es: 'Asunto',
    en : 'Subject',

    },{ 
    es: 'Mensaje',
    en : 'Message',

     },{ 
    es: 'Enviar Mensaje',
    en : 'Send Message',

    
   

  
    


  },
  
];


//scroll flecha
$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});


//cambiar cv con boton






















































