document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLista = document.getElementById('navLista');
  const progressBar = document.getElementById('progressBar');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // 1. Menú móvil
  navToggle.addEventListener('click', () => {
    navLista.classList.toggle('show');
  });

  // 2. Barra de progreso en el scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  // 3. Botón de cambio de tema (Claro / Oscuro)
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    // Cambiamos el texto del botón según el modo
    if (body.classList.contains('dark-theme')) {
      themeToggle.textContent = 'Modo Claro';
    } else {
      themeToggle.textContent = 'Modo Oscuro';
    }
  });

  // 4. Resaltar enlace activo al hacer clic
  const navLinks = document.querySelectorAll('.nav-lista a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remueve la clase 'active' de todos los enlaces
      navLinks.forEach(lnk => lnk.classList.remove('active'));
      // Agrega 'active' al enlace clicado
      link.classList.add('active');
      // Ocultamos el menú móvil al hacer clic (en pantallas pequeñas)
      navLista.classList.remove('show');
    });
  });
});





//SECCION PRESENTACION 


document.addEventListener("DOMContentLoaded", function() {
  // --- Saludo aleatorio ---
  function actualizarSaludo() {
    const saludos = [
      "¡Hola, soy Sammy! 🌈",
      "¡Bienvenidos a mi mundo mágico! ✨",
      "¡Que comience la aventura de soñar! 🎉"
    ];
    const saludoEl = document.getElementById("saludoPersonalizado");
    const indice = Math.floor(Math.random() * saludos.length);
    saludoEl.textContent = saludos[indice];
  }
  actualizarSaludo();

  // --- Botón para reproducir audio de bienvenida ---
  const btnReproducirSaludo = document.getElementById("btnReproducirSaludo");
  const audioSaludo = document.getElementById("audioSaludo");
  btnReproducirSaludo.addEventListener("click", function() {
    if (audioSaludo.paused) {
      audioSaludo.play();
      btnReproducirSaludo.textContent = "⏸️ Pausar Bienvenida";
    } else {
      audioSaludo.pause();
      btnReproducirSaludo.textContent = "▶️ Reproducir Bienvenida";
    }
  });

  // --- Avatar Personalizable ---
  function guardarAvatar() {
    const cabello = document.getElementById("cabelloSelector").value;
    const ropa = document.getElementById("ropaSelector").value;
    const accesorio = document.getElementById("accesorioSelector").value;
    const avatarData = { cabello, ropa, accesorio };
    localStorage.setItem("avatarSammy", JSON.stringify(avatarData));
    alert("¡Avatar guardado con amor!");
  }
  const guardarAvatarBtn = document.getElementById("guardarAvatarBtn");
  if (guardarAvatarBtn) {
    guardarAvatarBtn.addEventListener("click", guardarAvatar);
  }
  
  // --- Lista de Avatares Predefinidos ---
  const avatarOpciones = document.querySelectorAll(".avatar-opcion");
  const avatarBase = document.getElementById("avatarBase");
  avatarOpciones.forEach(opcion => {
    opcion.addEventListener("click", function() {
      const srcNuevo = this.getAttribute("src");
      avatarBase.setAttribute("src", srcNuevo);
      localStorage.setItem("avatarSammy", JSON.stringify({ predefinido: srcNuevo }));
    });
  });

  // --- Selector de Fondo (Temas) ---
  function aplicarFondo() {
    const fondo = document.getElementById("fondoSelector").value;
    const presentacion = document.getElementById("presentacion");
    presentacion.classList.remove("fondo-dia", "fondo-noche", "fondo-atardecer");
    presentacion.classList.add("fondo-" + fondo);
    localStorage.setItem("temaFondo", fondo);
  }
  const aplicarFondoBtn = document.getElementById("aplicarFondoBtn");
  if (aplicarFondoBtn) {
    aplicarFondoBtn.addEventListener("click", aplicarFondo);
  }

  // --- Selector de Emociones ---
  function cambiarEstado(estado) {
    const estadoVisual = document.getElementById("estadoVisual");
    estadoVisual.innerHTML = "";
    const estados = {
      feliz: { fondo: "#fff9c4", icono: "😊", sonido: "audios/feliz.mp3" },
      creativa: { fondo: "#fce4ec", icono: "🎨", sonido: "audios/creativa.mp3" },
      soñadora: { fondo: "#e1bee7", icono: "🌙", sonido: "audios/sonadora.mp3" },
      aventurera: { fondo: "#c8e6c9", icono: "🧭", sonido: "audios/aventurera.mp3" },
      emocionada: { fondo: "#fff9c4", icono: "😃", sonido: "audios/emocionada.mp3" }
    };
    let config = estados[estado] || estados.feliz;
    estadoVisual.style.background = config.fondo;
    estadoVisual.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    estadoVisual.style.padding = "30px";
    estadoVisual.style.borderRadius = "15px";
    const spanIcon = document.createElement("span");
    spanIcon.style.fontSize = "3em";
    spanIcon.textContent = config.icono;
    estadoVisual.appendChild(spanIcon);
    
    const audioEstado = new Audio(config.sonido);
    audioEstado.play();
  }
  const emocionBtns = document.querySelectorAll(".emocion-btn");
  emocionBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const estado = this.getAttribute("data-estado");
      cambiarEstado(estado);
    });
  });
  
  // --- Herramienta de Dibujo Interactivo ---
  const canvas = document.getElementById("canvasDibujo");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let dibujando = false;
    
    function comenzarDibujo(e) {
      dibujando = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    }
    function dibujar(e) {
      if (!dibujando) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = "#ab47bc";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    function finalizarDibujo() {
      dibujando = false;
    }
    canvas.addEventListener("mousedown", comenzarDibujo);
    canvas.addEventListener("mousemove", dibujar);
    canvas.addEventListener("mouseup", finalizarDibujo);
    canvas.addEventListener("mouseout", finalizarDibujo);
    
    const limpiarCanvasBtn = document.getElementById("limpiarCanvasBtn");
    if (limpiarCanvasBtn) {
      limpiarCanvasBtn.addEventListener("click", function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  }

  // --- Área de Firma Mágica ---
  const guardarFirmaBtn = document.getElementById("guardarFirmaBtn");
  const firmaTexto = document.getElementById("firmaTexto");
  const firmaFeedback = document.getElementById("firmaFeedback");
  if (guardarFirmaBtn) {
    guardarFirmaBtn.addEventListener("click", function() {
      const firma = firmaTexto.value.trim();
      if (firma !== "") {
        localStorage.setItem("firmaMagica", firma);
        firmaFeedback.textContent = "¡Firma guardada con amor!";
        firmaFeedback.classList.remove("hidden");
        setTimeout(() => {
          firmaFeedback.classList.add("hidden");
        }, 2000);
      } else {
        alert("Por favor, escribe tu firma o un mensaje.");
      }
    });
  }
  
  // --- Reproducir saludo de voz al pasar el mouse sobre el avatar ---
  const avatarImg = document.getElementById("avatarBase");
  avatarImg.addEventListener("mouseenter", function() {
    // En esta versión, el audio se reproduce solo al pulsar el botón de bienvenida
    // Aquí se puede agregar otra interacción si se desea
  });
});


//SECCION MIS GUSTOS


document.addEventListener("DOMContentLoaded", function() {
  /* --- Juego "Adivina mi gusto" --- */
  const quizOptions = document.querySelectorAll(".quiz-option");
  const quizFeedback = document.getElementById("quizFeedback");
  quizOptions.forEach(button => {
    button.addEventListener("click", function() {
      const respuesta = this.getAttribute("data-respuesta");
      if (respuesta === "Helado de fresa") {
        quizFeedback.textContent = "¡Correcto! Me encanta el helado de fresa 🍓";
      } else {
        quizFeedback.textContent = "¡Ups! La respuesta correcta es 'Helado de fresa' 🍓";
      }
      quizFeedback.classList.remove("hidden");
      setTimeout(() => {
        quizFeedback.classList.add("hidden");
      }, 3000);
    });
  });

  /* --- Reacciones de usuarios --- */
  const reaccionBtns = document.querySelectorAll(".reaccion-btn");
  const contadorMeEncanta = document.getElementById("contadorMeEncanta");
  const contadorInteresante = document.getElementById("contadorInteresante");
  const contadorNoProbado = document.getElementById("contadorNoProbado");

  reaccionBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const reaccion = this.getAttribute("data-reaccion");
      if (reaccion === "meEncanta") {
        contadorMeEncanta.textContent = parseInt(contadorMeEncanta.textContent) + 1;
      } else if (reaccion === "interesante") {
        contadorInteresante.textContent = parseInt(contadorInteresante.textContent) + 1;
      } else if (reaccion === "noProbado") {
        contadorNoProbado.textContent = parseInt(contadorNoProbado.textContent) + 1;
      }
    });
  });

  /* --- Audio de Gustos --- */
  const btnReproducirGustos = document.getElementById("reproducirGustos");
  const audioGustos = document.getElementById("audioGustos");
  btnReproducirGustos.addEventListener("click", function() {
    if (audioGustos.paused) {
      audioGustos.play();
      btnReproducirGustos.textContent = "⏸️ Pausar descripción";
    } else {
      audioGustos.pause();
      btnReproducirGustos.textContent = "▶️ Reproducir descripción";
    }
  });

  /* --- Encuesta Rápida --- */
  const encuestaOpciones = document.querySelectorAll(".encuesta-opciones img");
  const encuestaResultado = document.getElementById("encuestaResultado");
  // Simulamos el registro de votos en un objeto local
  let encuestaVotos = {};
  encuestaOpciones.forEach(img => {
    img.addEventListener("click", function() {
      const opcion = this.getAttribute("data-opcion");
      if (!encuestaVotos[opcion]) {
        encuestaVotos[opcion] = 0;
      }
      encuestaVotos[opcion]++;
      actualizarEncuesta();
    });
  });
  
  function actualizarEncuesta() {
    encuestaResultado.innerHTML = "<h3>Resultados de la Encuesta</h3>";
    for (let opcion in encuestaVotos) {
      encuestaResultado.innerHTML += `<p>${opcion}: ${encuestaVotos[opcion]} votos</p>`;
    }
    encuestaResultado.classList.remove("hidden");
    setTimeout(() => {
      encuestaResultado.classList.add("hidden");
    }, 5000);
  }

  /* --- (Opcional) Reiniciar animación de typewriter en la firma o saludo ---
  function restartTypewriter() {
    const saludo = document.getElementById("saludoPersonalizado");
    saludo.style.animation = "none";
    setTimeout(() => { saludo.style.animation = ""; }, 50);
  } */

});




//SECCION DE VIDEO PRESENTACION


document.addEventListener("DOMContentLoaded", function() {
  // --- Pantalla Completa ---
  const videoSammy = document.getElementById("videoSammy");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  fullscreenBtn.addEventListener("click", function() {
    if (videoSammy.requestFullscreen) {
      videoSammy.requestFullscreen();
    } else if (videoSammy.webkitRequestFullscreen) {
      videoSammy.webkitRequestFullscreen();
    } else if (videoSammy.msRequestFullscreen) {
      videoSammy.msRequestFullscreen();
    }
  });
  
  // --- Subtítulos interactivos (Simulación) ---
  const subtitulos = [
    { tiempo: 0, texto: "¡Bienvenidos a mi mundo!" },
    { tiempo: 5, texto: "Aquí comparto mis sueños y aventuras." },
    { tiempo: 10, texto: "Acompáñame en esta mágica historia." }
  ];
  const videoSubtitulos = document.getElementById("videoSubtitulos");
  videoSammy.addEventListener("timeupdate", function() {
    let currentTime = videoSammy.currentTime;
    for (let i = subtitulos.length - 1; i >= 0; i--) {
      if (currentTime >= subtitulos[i].tiempo) {
        videoSubtitulos.textContent = subtitulos[i].texto;
        break;
      }
    }
  });
  
  // --- Botón de Reacción en Vivo ---
  const reaccionBtns = document.querySelectorAll(".videoPresentacion-reaccion-btn");
  reaccionBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const reaccion = this.getAttribute("data-reaccion");
      // Crear elemento flotante para feedback
      const feedback = document.createElement("div");
      feedback.textContent = this.textContent;
      feedback.classList.add("reaccion-feedback");
      document.body.appendChild(feedback);
      // Posicionar sobre el video de manera aleatoria
      feedback.style.left = (videoSammy.offsetLeft + Math.random() * videoSammy.offsetWidth) + "px";
      feedback.style.top = (videoSammy.offsetTop + Math.random() * videoSammy.offsetHeight) + "px";
      // Animar feedback y removerlo
      feedback.animate([
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(-30px)" }
      ], { duration: 1500, easing: "ease-out" });
      setTimeout(() => { feedback.remove(); }, 1500);
    });
  });
  
  // --- Encuesta Rápida ---
  const encuestaBtns = document.querySelectorAll(".encuesta-btn");
  const encuestaResultado = document.getElementById("encuestaResultado");
  let encuestaVotos = {};
  encuestaBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const opcion = this.getAttribute("data-opcion");
      if (!encuestaVotos[opcion]) { encuestaVotos[opcion] = 0; }
      encuestaVotos[opcion]++;
      mostrarEncuestaResultados();
    });
  });
  function mostrarEncuestaResultados() {
    let resultadoHTML = "<h3>Resultados:</h3>";
    for (let opcion in encuestaVotos) {
      resultadoHTML += `<p>${opcion}: ${encuestaVotos[opcion]} votos</p>`;
    }
    encuestaResultado.innerHTML = resultadoHTML;
    encuestaResultado.classList.remove("hidden");
    setTimeout(() => {
      encuestaResultado.classList.add("hidden");
    }, 5000);
  }
  
  // --- Comentario Mágico ---
  const guardarComentarioBtn = document.getElementById("guardarComentarioBtn");
  const comentarioTexto = document.getElementById("comentarioTexto");
  guardarComentarioBtn.addEventListener("click", function() {
    const comentario = comentarioTexto.value.trim();
    if (comentario !== "") {
      localStorage.setItem("comentarioMagico", comentario);
      alert("¡Mensaje enviado con magia!");
      comentarioTexto.value = "";
    } else {
      alert("Por favor, escribe un mensaje.");
    }
  });
  
  // --- (Opcional) Reiniciar efecto typewriter ---
  // La animación CSS ya se encarga del saludo.
});


//SECCION MI GALERIA


document.addEventListener("DOMContentLoaded", function() {
  // --- Filtro de categorías ---
  const filtroBtns = document.querySelectorAll(".miGaleria-filtro");
  const tarjetas = document.querySelectorAll(".miGaleria-card");
  filtroBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      // Actualizar la clase activo
      filtroBtns.forEach(b => b.classList.remove("activo"));
      this.classList.add("activo");
      const filtro = this.getAttribute("data-filtro");
      tarjetas.forEach(card => {
        const categoria = card.getAttribute("data-categoria");
        if (filtro === "todos" || categoria === filtro) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- Modal/Visor de Creaciones ---
  const modal = document.getElementById("miGaleriaModal");
  const modalImg = document.getElementById("modalImagen");
  const modalDetalle = document.getElementById("modalDetalle");
  const modalClose = document.querySelector(".miGaleria-modal-close");
  const btnInspirado = document.getElementById("btnInspirado");
  const btnGuardarObra = document.getElementById("btnGuardarObra");
  
  tarjetas.forEach(card => {
    card.addEventListener("click", function() {
      const imgSrc = card.querySelector("img").getAttribute("src");
      const detalle = card.getAttribute("data-detalle");
      modalImg.setAttribute("src", imgSrc);
      modalDetalle.textContent = detalle;
      modal.classList.remove("hidden");
    });
  });
  modalClose.addEventListener("click", function() {
    modal.classList.add("hidden");
  });
  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
  
  // --- Slideshow Automático (Modo Presentación) ---
  const btnSlideshow = document.getElementById("btnSlideshow");
  btnSlideshow.addEventListener("click", function() {
    // Aquí se podría activar un slideshow automático. (Simulación)
    alert("Activando presentación mágica... (Funcionalidad en desarrollo)");
  });
  
  // --- Carrusel de Creaciones ---
  const carruselInner = document.querySelector(".miGaleria-carrusel-inner");
  const carruselPrev = document.getElementById("carruselPrev");
  const carruselNext = document.getElementById("carruselNext");
  let carruselScroll = 0;
  carruselPrev.addEventListener("click", function() {
    carruselScroll -= 220;
    carruselInner.style.transform = `translateX(-${carruselScroll}px)`;
  });
  carruselNext.addEventListener("click", function() {
    carruselScroll += 220;
    carruselInner.style.transform = `translateX(-${carruselScroll}px)`;
  });
  
  // --- (Opcional) Funciones de reacciones y encuestas se pueden ampliar según sea necesario ---
});



//SECCION MI MAPA DE SUEÑO



document.addEventListener("DOMContentLoaded", function() {
  /* =======================================
     Módulo: Mapa de Sueños - Interacciones
     Prefijo: mapaDeSuenos_
  ======================================= */
  
  // --- Modal de Sueño Desbloqueado ---
  const pins = document.querySelectorAll(".mapaDeSuenos-pin");
  const modal = document.getElementById("mapaDeSuenos-modal");
  const modalImg = document.getElementById("mapaDeSuenos-modal-imagen");
  const modalTitulo = document.getElementById("mapaDeSuenos-modal-titulo");
  const modalDescripcion = document.getElementById("mapaDeSuenos-modal-descripcion");
  const modalClose = document.querySelector(".mapaDeSuenos-modal-close");
  const btnFavorito = document.getElementById("mapaDeSuenos-btn-favorito");
  const btnVer = document.getElementById("mapaDeSuenos-btn-ver");
  
  pins.forEach(pin => {
    pin.addEventListener("click", function() {
      const titulo = pin.getAttribute("data-titulo");
      const descripcion = pin.getAttribute("data-descripcion");
      const imagen = pin.getAttribute("data-imagen");
      modalTitulo.textContent = titulo;
      modalDescripcion.textContent = descripcion;
      modalImg.setAttribute("src", imagen);
      modal.classList.remove("hidden");
      // Efecto sonoro al activar el pin
      new Audio("audios/pinClick.mp3").play();
    });
  });
  
  modalClose.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => { if(e.target === modal) modal.classList.add("hidden"); });
  
  btnVer.addEventListener("click", () => {
    window.open("https://www.google.com/maps", "_blank");
  });
  
  btnFavorito.addEventListener("click", () => {
    const favorito = {
      titulo: modalTitulo.textContent,
      descripcion: modalDescripcion.textContent,
      imagen: modalImg.getAttribute("src")
    };
    localStorage.setItem("sueñoFavorito", JSON.stringify(favorito));
    alert("¡Sueño guardado en tu lista mágica!");
  });
  
  // --- Carrusel de Metas de Vida ---
  const carruselInner = document.querySelector(".mapaDeSuenos-carrusel-inner");
  const carruselPrev = document.getElementById("carruselPrev");
  const carruselNext = document.getElementById("carruselNext");
  let carruselScroll = 0;
  carruselPrev.addEventListener("click", function() {
    carruselScroll = Math.max(carruselScroll - 220, 0);
    carruselInner.style.transform = `translateX(-${carruselScroll}px)`;
  });
  carruselNext.addEventListener("click", function() {
    carruselScroll += 220;
    carruselInner.style.transform = `translateX(-${carruselScroll}px)`;
  });
  
  // --- Activador de "Sueño del Día" ---
  const btnSueñoDelDia = document.getElementById("btnSueñoDelDia");
  const sueñoDelDiaTexto = document.getElementById("sueñoDelDiaTexto");
  const sueñosDelDia = [
    "🌈 Hoy, mi sueño es volar en un dragón por encima de los Andes.",
    "🚀 Quiero ser astronauta y ver la Tierra desde el espacio.",
    "🎭 Sueño con actuar en una obra de teatro mágica.",
    "🦄 Mi sueño es pasear en un unicornio por un bosque encantado."
  ];
  btnSueñoDelDia.addEventListener("click", function() {
    const indice = Math.floor(Math.random() * sueñosDelDia.length);
    sueñoDelDiaTexto.textContent = sueñosDelDia[indice];
    sueñoDelDiaTexto.classList.remove("hidden");
    new Audio("audios/suenoDelDia.mp3").play();
    setTimeout(() => { sueñoDelDiaTexto.classList.add("hidden"); }, 5000);
  });
  
  // --- Diario de Sueños ---
  const guardarDiarioBtn = document.getElementById("guardarDiarioBtn");
  const diarioTexto = document.getElementById("diarioTexto");
  const ultimoSueño = document.getElementById("ultimoSueño");
  const resetDiarioBtn = document.getElementById("resetDiarioBtn");
  guardarDiarioBtn.addEventListener("click", function() {
    const sueño = diarioTexto.value.trim();
    if (sueño !== "") {
      const fecha = new Date().toLocaleDateString();
      const registro = { sueño, fecha };
      localStorage.setItem("ultimoSueño", JSON.stringify(registro));
      ultimoSueño.innerHTML = `<strong>Último sueño añadido:</strong> ${sueño} <br><small>${fecha}</small>`;
      diarioTexto.value = "";
    } else {
      alert("Por favor, escribe tu sueño.");
    }
  });
  resetDiarioBtn.addEventListener("click", function() {
    localStorage.removeItem("ultimoSueño");
    ultimoSueño.innerHTML = "";
    alert("Diario reseteado.");
  });
  
  // --- Búsqueda Interactiva en el Mapa ---
  const busquedaInput = document.getElementById("mapaDeSuenos-busqueda");
  busquedaInput.addEventListener("input", function() {
    const term = this.value.toLowerCase();
    pins.forEach(pin => {
      const titulo = pin.getAttribute("data-titulo").toLowerCase();
      pin.style.display = titulo.includes(term) ? "block" : "none";
    });
  });
  
  // --- Modo Exploración (Cambio de Fondo con Parallax) ---
  const btnModoExploracion = document.getElementById("btnModoExploracion");
  let modoExploracionActivo = false;
  btnModoExploracion.addEventListener("click", function() {
    modoExploracionActivo = !modoExploracionActivo;
    const presentacion = document.getElementById("mapaDeSuenos");
    if (modoExploracionActivo) {
      presentacion.classList.add("modo-exploracion");
      btnModoExploracion.textContent = "Modo Fantasía";
    } else {
      presentacion.classList.remove("modo-exploracion");
      btnModoExploracion.textContent = "Modo Exploración";
    }
  });
  
  // --- Efecto Parallax en el Mapa (Modo Exploración) ---
  document.addEventListener("mousemove", function(e) {
    if (modoExploracionActivo) {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      const pinsArray = Array.from(pins);
      pinsArray.forEach(pin => {
        pin.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      });
    }
  });
});


//SECCION MIS SECRETOS


document.addEventListener("DOMContentLoaded", function() {
  /* =======================================
     Módulo: Mapa de Sueños - Sección #mapaDeSuenos
     Prefijo: mapaDeSuenos_
  ======================================= */
  
  // --- Modal de Sueño Desbloqueado ---
  const pins = document.querySelectorAll(".mapaDeSuenos-pin");
  const modal = document.getElementById("mapaDeSuenos-modal");
  const modalImg = document.getElementById("mapaDeSuenos-modal-imagen");
  const modalTitulo = document.getElementById("mapaDeSuenos-modal-titulo");
  const modalDescripcion = document.getElementById("mapaDeSuenos-modal-descripcion");
  const modalClose = document.querySelector(".mapaDeSuenos-modal-close");
  const btnFavorito = document.getElementById("mapaDeSuenos-btn-favorito");
  const btnVer = document.getElementById("mapaDeSuenos-btn-ver");
  
  pins.forEach(pin => {
    pin.addEventListener("click", function() {
      const titulo = pin.getAttribute("data-titulo");
      const descripcion = pin.getAttribute("data-descripcion");
      const imagen = pin.getAttribute("data-imagen");
      modalTitulo.textContent = titulo;
      modalDescripcion.textContent = descripcion;
      modalImg.setAttribute("src", imagen);
      modal.classList.remove("hidden");
      // Reproducir efecto sonoro al activar el pin
      new Audio("audios/pinClick.mp3").play();
    });
  });
  modalClose.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => { if(e.target === modal) modal.classList.add("hidden"); });
  btnVer.addEventListener("click", () => window.open("https://www.google.com/maps", "_blank"));
  btnFavorito.addEventListener("click", () => {
    const favorito = {
      titulo: modalTitulo.textContent,
      descripcion: modalDescripcion.textContent,
      imagen: modalImg.getAttribute("src")
    };
    localStorage.setItem("sueñoFavorito", JSON.stringify(favorito));
    alert("¡Sueño guardado en tu lista mágica!");
  });
  
  // --- Carrusel de Metas de Vida ---
  const carruselInner = document.querySelector(".mapaDeSuenos-carrusel-inner");
  const carruselPrev = document.getElementById("carruselPrev");
  const carruselNext = document.getElementById("carruselNext");
  let carruselScroll = 0;
  carruselPrev.addEventListener("click", () => {
    carruselScroll = Math.max(carruselScroll - 220, 0);
    carruselInner.style.transform = `translateX(-${carruselScroll}px)`;
  });
  carruselNext.addEventListener("click", () => {
    carruselScroll += 220;
    carruselInner.style.transform = `translateX(-${carruselScroll}px)`;
  });
  
  // --- Activador de "Sueño del Día" ---
  const btnSueñoDelDia = document.getElementById("btnSueñoDelDia");
  const sueñoDelDiaTexto = document.getElementById("sueñoDelDiaTexto");
  const sueñosDelDia = [
    "🌈 Hoy, mi sueño es volar en un dragón por encima de los Andes.",
    "🚀 Quiero ser astronauta y ver la Tierra desde el espacio.",
    "🎭 Sueño con actuar en una obra de teatro mágica.",
    "🦄 Mi sueño es pasear en un unicornio por un bosque encantado."
  ];
  btnSueñoDelDia.addEventListener("click", function() {
    const indice = Math.floor(Math.random() * sueñosDelDia.length);
    sueñoDelDiaTexto.textContent = sueñosDelDia[indice];
    sueñoDelDiaTexto.classList.remove("hidden");
    new Audio("audios/suenoDelDia.mp3").play();
    setTimeout(() => { sueñoDelDiaTexto.classList.add("hidden"); }, 5000);
  });
  
  // --- Diario de Sueños ---
  const guardarDiarioBtn = document.getElementById("guardarDiarioBtn");
  const diarioTexto = document.getElementById("diarioTexto");
  const ultimoSueño = document.getElementById("ultimoSueño");
  const resetDiarioBtn = document.getElementById("resetDiarioBtn");
  guardarDiarioBtn.addEventListener("click", function() {
    const sueño = diarioTexto.value.trim();
    if (sueño !== "") {
      const fecha = new Date().toLocaleDateString();
      const registro = { sueño, fecha };
      localStorage.setItem("ultimoSueño", JSON.stringify(registro));
      ultimoSueño.innerHTML = `<strong>Último sueño añadido:</strong> ${sueño} <br><small>${fecha}</small>`;
      diarioTexto.value = "";
    } else {
      alert("Por favor, escribe tu sueño.");
    }
  });
  resetDiarioBtn.addEventListener("click", function() {
    localStorage.removeItem("ultimoSueño");
    ultimoSueño.innerHTML = "";
    alert("Diario reseteado.");
  });
  
  // --- Búsqueda Interactiva de Sueños (Filtro de Pines) ---
  const busquedaInput = document.getElementById("mapaDeSuenos-busqueda");
  busquedaInput.addEventListener("input", function() {
    const term = this.value.toLowerCase();
    pins.forEach(pin => {
      const titulo = pin.getAttribute("data-titulo").toLowerCase();
      pin.style.display = titulo.includes(term) ? "block" : "none";
    });
  });
  
  // --- Modo Exploración (Cambio de Fondo y Parallax) ---
  const btnModoExploracion = document.getElementById("btnModoExploracion");
  let modoExploracionActivo = false;
  btnModoExploracion.addEventListener("click", function() {
    modoExploracionActivo = !modoExploracionActivo;
    const presentacion = document.getElementById("mapaDeSuenos");
    if (modoExploracionActivo) {
      presentacion.classList.add("modo-exploracion");
      btnModoExploracion.textContent = "Modo Fantasía";
    } else {
      presentacion.classList.remove("modo-exploracion");
      btnModoExploracion.textContent = "Modo Exploración";
    }
  });
  
  document.addEventListener("mousemove", function(e) {
    if (modoExploracionActivo) {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      pins.forEach(pin => {
        pin.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      });
    }
  });
});


//MIS SECRETOS 


document.addEventListener('DOMContentLoaded', function() {
  // --- Modo Oscuro/Claro ---
  const darkToggle = document.getElementById('secretos_darkToggle');
  darkToggle.addEventListener('click', function() {
    const container = document.getElementById('secretos');
    container.classList.toggle('dark');
    darkToggle.textContent = container.classList.contains('dark') ? 'Modo Claro' : 'Modo Oscuro';
  });
  
  // --- Navegación por Pestañas ---
  const tabs = document.querySelectorAll('.secretos-nav button');
  const tabPanes = document.querySelectorAll('.secretos-tab-pane');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('activo'));
      tab.classList.add('activo');
      const target = tab.getAttribute('data-tab');
      tabPanes.forEach(pane => {
        pane.style.display = (pane.id === "secretos-" + target) ? "block" : "none";
      });
    });
  });
  
  // --- Cofres Secretos y Tarjetas ---
  const chests = document.querySelectorAll('.secretos-chest');
  chests.forEach(chest => {
    chest.querySelector('.secretos-openChest').addEventListener('click', function() {
      openChest(chest);
    });
  });
  
  function openChest(chestElement) {
    const secret = chestElement.getAttribute('data-secret') || "Secreto vacío";
    chestElement.classList.add('open');
    mostrarMensaje("¡Secreto revelado! " + secret);
    addLibroEntrada("Cofre abierto: " + secret);
  }
  
  // --- Caja de Pensamientos ---
  const saveBtn = document.getElementById('secretos_saveBtn');
  saveBtn.addEventListener('click', function() {
    const textarea = document.getElementById('secretos_textarea');
    const mensaje = textarea.value.trim();
    if (mensaje === "") {
      alert("No dejes el secreto en blanco, ¡escribe algo mágico!");
      return;
    }
    localStorage.setItem('secretos_privado', mensaje);
    addLibroEntrada("Caja guardada: " + mensaje);
    mostrarMensaje("Secreto guardado para tu yo del futuro ✨");
    textarea.value = "";
  });
  
  // --- Adivinanza Mágica ---
  const riddleBtn = document.getElementById('secretos_riddleBtn');
  riddleBtn.addEventListener('click', function() {
    const userAnswer = document.getElementById('secretos_riddleInput').value.toLowerCase().trim();
    const resultDiv = document.getElementById('secretos_riddleResult');
    if (userAnswer === "taza" || userAnswer === "la taza") {
      resultDiv.textContent = "¡Correcto! Nuevo secreto desbloqueado: La magia está en cada rincón.";
      mostrarMensaje("Adivinanza resuelta, ¡sigue brillando!");
      addLibroEntrada("Adivinanza resuelta: " + resultDiv.textContent);
    } else {
      resultDiv.textContent = "Respuesta incorrecta. Inténtalo de nuevo.";
    }
  });
  
  // --- Reloj de Tiempo Secreto ---
  const timerBtn = document.getElementById('secretos_timerBtn');
  timerBtn.addEventListener('click', function() {
    const msg = document.getElementById('secretos_timedMessage').value;
    const delay = parseInt(document.getElementById('secretos_timedDelay').value, 10);
    const timerResult = document.getElementById('secretos_timerResult');
    if (msg.trim() === "" || isNaN(delay)) {
      timerResult.textContent = "Introduce un mensaje y un tiempo válido.";
      return;
    }
    timerResult.textContent = `Mensaje programado para aparecer en ${delay} segundos.`;
    setTimeout(() => {
      mostrarMensaje("Mensaje secreto: " + msg);
      addLibroEntrada("Mensaje programado: " + msg);
    }, delay * 1000);
  });
  
  // --- Secreto en Voz (Simulación con SpeechSynthesis) ---
  const voiceRecordBtn = document.getElementById('secretos_voiceRecordBtn');
  const voicePlayBtn = document.getElementById('secretos_voicePlayBtn');
  const voiceStatus = document.getElementById('secretos_voiceStatus');
  
  voiceRecordBtn.addEventListener('click', function() {
    const voiceSecret = prompt("Graba tu secreto en voz (escribe lo que dirías):");
    if (voiceSecret && voiceSecret.trim() !== "") {
      localStorage.setItem('secretos_voz', voiceSecret.trim());
      voiceStatus.textContent = "Secreto en voz grabado exitosamente.";
      addLibroEntrada("Secreto en voz guardado.");
    } else {
      voiceStatus.textContent = "Grabación cancelada o sin contenido.";
    }
  });
  
  voicePlayBtn.addEventListener('click', function() {
    const voiceSecret = localStorage.getItem('secretos_voz');
    if (voiceSecret) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(voiceSecret);
        window.speechSynthesis.speak(utterance);
        voiceStatus.textContent = "Reproduciendo tu secreto en voz...";
      } else {
        voiceStatus.textContent = "La síntesis de voz no está soportada en tu navegador.";
      }
    } else {
      voiceStatus.textContent = "No hay secreto en voz grabado.";
    }
  });
  
  // --- Mensajes Flotantes ---
  const floatingMessages = [
    "Eres más valiente de lo que crees",
    "Hoy es un gran día para inventar un dragón",
    "Tu magia interior ilumina el mundo",
    "Cada secreto es una chispa de luz",
    "Sigue brillando, tu futuro es luminoso"
  ];
  
  setInterval(() => {
    const message = floatingMessages[Math.floor(Math.random() * floatingMessages.length)];
    createFloatingMessage(message);
  }, 5000);
  
  function createFloatingMessage(text) {
    const container = document.getElementById('secretos_floatingMessages');
    const msg = document.createElement('div');
    msg.className = 'secretos-floatingMessage';
    msg.textContent = text;
    msg.style.top = Math.random() * 80 + "%";
    msg.style.left = Math.random() * 80 + "%";
    container.appendChild(msg);
    setTimeout(() => msg.remove(), 5000);
  }
  
  // --- Libro de Secretos: Registro, Edición y Drag & Drop ---
  let libroEntries = [];
  
  function addLibroEntrada(entryText) {
    const now = new Date().toLocaleString();
    const entry = { id: Date.now(), text: now + " - " + entryText };
    libroEntries.unshift(entry);
    renderLibroEntries();
    saveLibroToStorage();
  }
  
  function renderLibroEntries(filter = "") {
    const libroDiv = document.getElementById('secretos_libroEntries');
    libroDiv.innerHTML = "";
    libroEntries
      .filter(entry => entry.text.toLowerCase().includes(filter.toLowerCase()))
      .forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'secretos-libroEntry';
        entryDiv.textContent = entry.text;
        entryDiv.draggable = true;
        entryDiv.setAttribute('data-id', entry.id);
        
        // Eventos para drag and drop
        entryDiv.addEventListener('dragstart', handleDragStart);
        entryDiv.addEventListener('dragover', handleDragOver);
        entryDiv.addEventListener('drop', handleDrop);
        
        // Click para abrir modal de edición
        entryDiv.addEventListener('click', function() {
          openModal(entry);
        });
        
        libroDiv.appendChild(entryDiv);
      });
  }
  
  // --- Drag and Drop Handlers ---
  let dragSrcEl = null;
  
  function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.getAttribute('data-id'));
    this.style.opacity = '0.5';
  }
  
  function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }
  
  function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    
    const draggedId = e.dataTransfer.getData('text/plain');
    const targetId = this.getAttribute('data-id');
    if (draggedId !== targetId) {
      const draggedIndex = libroEntries.findIndex(entry => entry.id == draggedId);
      const targetIndex = libroEntries.findIndex(entry => entry.id == targetId);
      if (draggedIndex > -1 && targetIndex > -1) {
        [libroEntries[draggedIndex], libroEntries[targetIndex]] = [libroEntries[targetIndex], libroEntries[draggedIndex]];
        renderLibroEntries(document.getElementById('secretos_libroFilter').value);
        saveLibroToStorage();
      }
    }
    return false;
  }
  
  function saveLibroToStorage() {
    localStorage.setItem('secretos_libro', JSON.stringify(libroEntries));
  }
  
  function loadLibroFromStorage() {
    const stored = localStorage.getItem('secretos_libro');
    if (stored) {
      libroEntries = JSON.parse(stored);
      renderLibroEntries();
    }
  }
  
  loadLibroFromStorage();
  
  // --- Filtro de Libro ---
  const libroFilter = document.getElementById('secretos_libroFilter');
  libroFilter.addEventListener('input', function() {
    renderLibroEntries(this.value);
  });
  
  // --- Modal para Edición y Eliminación de Entradas ---
  const modal = document.getElementById('secretos_modal');
  const modalClose = document.querySelector('.secretos-close');
  let currentModalEntry = null;
  
  function openModal(entry) {
    currentModalEntry = entry;
    const modalBody = document.getElementById('secretos_modalBody');
    modalBody.textContent = entry.text;
    modal.style.display = "flex";
  }
  
  modalClose.addEventListener('click', function() {
    modal.style.display = "none";
  });
  
  // Editar entrada
  document.getElementById('secretos_modalEdit').addEventListener('click', function() {
    if (currentModalEntry) {
      const newText = prompt("Edita el secreto:", currentModalEntry.text);
      if (newText && newText.trim() !== "") {
        currentModalEntry.text = newText.trim();
        renderLibroEntries(libroFilter.value);
        saveLibroToStorage();
        mostrarMensaje("Secreto editado.");
      }
      modal.style.display = "none";
    }
  });
  
  // Eliminar entrada
  document.getElementById('secretos_modalDelete').addEventListener('click', function() {
    if (currentModalEntry) {
      const confirmDelete = confirm("¿Estás seguro de eliminar este secreto?");
      if (confirmDelete) {
        libroEntries = libroEntries.filter(entry => entry.id !== currentModalEntry.id);
        renderLibroEntries(libroFilter.value);
        saveLibroToStorage();
        mostrarMensaje("Secreto eliminado.");
      }
      modal.style.display = "none";
    }
  });
  
  // --- Mensaje Flotante para Confirmación ---
  function mostrarMensaje(texto) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'secretos-alerta';
    msgDiv.textContent = texto;
    document.querySelector('.secretos-container').appendChild(msgDiv);
    setTimeout(() => {
      msgDiv.classList.add('fade-out');
      setTimeout(() => msgDiv.remove(), 1000);
    }, 2000);
  }
});



// SECCION MI RUTINA

document.addEventListener('DOMContentLoaded', function() {
  // --- Default Tasks para una Niña de 10 Años ---
  const defaultTasks = [
    { id: 1, time: "mañana", icon: "☀️", title: "Despertar con una sonrisa", done: false },
    { id: 2, time: "mañana", icon: "☀️", title: "Lavar carita y cepillarse los dientes", done: false },
    { id: 3, time: "mañana", icon: "☀️", title: "Desayunar un cereal delicioso", done: false },
    { id: 4, time: "mañana", icon: "☀️", title: "Preparar la mochila para la escuela", done: false },
    { id: 5, time: "tarde", icon: "🎨", title: "Almuerzo en la escuela con amigos", done: false },
    { id: 6, time: "tarde", icon: "🎨", title: "Tiempo de arte: dibujar y colorear", done: false },
    { id: 7, time: "tarde", icon: "🎨", title: "Jugar en el recreo", done: false },
    { id: 8, time: "noche", icon: "🌙", title: "Cena en familia y contar historias", done: false },
    { id: 9, time: "noche", icon: "🌙", title: "Leer un cuento antes de dormir", done: false },
    { id: 10, time: "noche", icon: "🌙", title: "Prepararse para dormir y soñar", done: false }
  ];
  
  let tasks = JSON.parse(localStorage.getItem('miRutina_tasks')) || defaultTasks;
  let goal = localStorage.getItem('miRutina_goal') || "";
  let logs = JSON.parse(localStorage.getItem('miRutina_logs')) || { completions: 0 };

  // --- Reloj Mágico ---
  function miRutina_updateClock() {
    const clockEl = document.getElementById('miRutina_clock');
    const greetingEl = document.getElementById('miRutina_greeting');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    clockEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    
    // Mensajes y colores según el momento del día
    if(hours < 12) {
      greetingEl.textContent = "¡Buenos días, pequeña exploradora!";
      clockEl.style.color = "#FFA500";
    } else if(hours < 18) {
      greetingEl.textContent = "¡Es hora de aprender y jugar!";
      clockEl.style.color = "#4a90e2";
    } else {
      greetingEl.textContent = "Hora de soñar aventuras fantásticas";
      clockEl.style.color = "#8A2BE2";
    }
  }
  
  function pad(num) {
    return num < 10 ? "0" + num : num;
  }
  
  setInterval(miRutina_updateClock, 1000);
  miRutina_updateClock();
  
  // --- Música Ambiental ---
  const ambientAudio = document.getElementById('miRutina_ambientAudio');
  const musicToggle = document.getElementById('miRutina_musicToggle');
  musicToggle.addEventListener('click', function() {
    if(ambientAudio.paused) {
      ambientAudio.play();
      musicToggle.textContent = "Apagar Música Ambiental";
    } else {
      ambientAudio.pause();
      musicToggle.textContent = "Encender Música Ambiental";
    }
  });
  
  // --- Renderizado de Tareas ---
  function miRutina_renderTasks() {
    document.getElementById('miRutina_tasks_morning').innerHTML = "";
    document.getElementById('miRutina_tasks_afternoon').innerHTML = "";
    document.getElementById('miRutina_tasks_night').innerHTML = "";
    
    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = "miRutina-task" + (task.done ? " done" : "");
      taskDiv.setAttribute('draggable', true);
      taskDiv.setAttribute('data-id', task.id);
      
      taskDiv.innerHTML = `<span class="miRutina-taskIcon">${task.icon}</span> 
                           <span class="miRutina-taskTitle">${task.title}</span>`;
      
      const btn = document.createElement('button');
      btn.className = "miRutina_taskBtn";
      btn.textContent = "✔️";
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        miRutina_toggleTask(task.id);
      });
      taskDiv.appendChild(btn);
      
      // Drag & Drop
      taskDiv.addEventListener('dragstart', miRutina_handleDragStart);
      taskDiv.addEventListener('dragover', miRutina_handleDragOver);
      taskDiv.addEventListener('drop', miRutina_handleDrop);
      
      // Edición al doble click
      taskDiv.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        const newText = prompt("Edita la actividad:", task.title);
        if(newText && newText.trim() !== "") {
          task.title = newText.trim();
          miRutina_saveTasks();
          miRutina_renderTasks();
        }
      });
      
      if(task.time === "mañana") {
        document.getElementById('miRutina_tasks_morning').appendChild(taskDiv);
      } else if(task.time === "tarde") {
        document.getElementById('miRutina_tasks_afternoon').appendChild(taskDiv);
      } else if(task.time === "noche") {
        document.getElementById('miRutina_tasks_night').appendChild(taskDiv);
      }
    });
  }
  
  function miRutina_saveTasks() {
    localStorage.setItem('miRutina_tasks', JSON.stringify(tasks));
  }
  
  function miRutina_toggleTask(taskId) {
    const task = tasks.find(t => t.id == taskId);
    if(task) {
      task.done = !task.done;
      miRutina_playTick();
      miRutina_saveTasks();
      miRutina_renderTasks();
      miRutina_updateLog();
    }
  }
  
  // --- Sonido al Marcar Tarea ---
  function miRutina_playTick() {
    const tick = new Audio('/audios/rutina/tick.mp3');
    tick.play();
  }
  
  // --- Agregar Nueva Tarea ---
  document.getElementById('miRutina_addTaskBtn').addEventListener('click', function() {
    const input = document.getElementById('miRutina_taskInput');
    const timeSelect = document.getElementById('miRutina_taskTime');
    const text = input.value.trim();
    if(text === "") {
      alert("Escribe una actividad mágica.");
      return;
    }
    const newTask = {
      id: Date.now(),
      time: timeSelect.value,
      icon: (timeSelect.value === "mañana") ? "☀️" : (timeSelect.value === "tarde") ? "🎨" : "🌙",
      title: text,
      done: false
    };
    tasks.push(newTask);
    miRutina_saveTasks();
    miRutina_renderTasks();
    input.value = "";
  });
  
  // --- Restablecer Rutina Original ---
  document.getElementById('miRutina_resetBtn').addEventListener('click', function() {
    if(confirm("¿Seguro que deseas restablecer la rutina a la original?")) {
      tasks = defaultTasks;
      miRutina_saveTasks();
      miRutina_renderTasks();
      mostrarMensaje("Rutina restablecida a lo original.");
    }
  });
  
  // --- Drag & Drop para Reordenar Tareas ---
  let dragSrcEl = null;
  function miRutina_handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.getAttribute('data-id'));
    this.style.opacity = "0.5";
  }
  function miRutina_handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }
  function miRutina_handleDrop(e) {
    e.stopPropagation();
    const draggedId = e.dataTransfer.getData("text/plain");
    const targetId = this.getAttribute('data-id');
    if(draggedId !== targetId) {
      const draggedIndex = tasks.findIndex(t => t.id == draggedId);
      const targetIndex = tasks.findIndex(t => t.id == targetId);
      if(draggedIndex > -1 && targetIndex > -1) {
        [tasks[draggedIndex], tasks[targetIndex]] = [tasks[targetIndex], tasks[draggedIndex]];
        miRutina_saveTasks();
        miRutina_renderTasks();
      }
    }
    return false;
  }
  
  // --- Meta del Día ---
  document.getElementById('miRutina_goalInput').value = goal;
  document.getElementById('miRutina_goalBtn').addEventListener('click', function() {
    const goalInput = document.getElementById('miRutina_goalInput');
    const text = goalInput.value.trim();
    if(text === "") {
      alert("Escribe tu meta mágica.");
      return;
    }
    localStorage.setItem('miRutina_goal', text);
    goal = text;
    document.getElementById('miRutina_goalStatus').textContent = "¡Meta cumplida! 🎉";
    miRutina_showConfetti();
    miRutina_updateLog();
  });
  
  function miRutina_showConfetti() {
    const confetti = document.createElement('div');
    confetti.className = "miRutina-confetti";
    confetti.textContent = "🎉";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1000);
  }
  
  // --- Diario de Logros ---
  function miRutina_updateLog() {
    const doneCount = tasks.filter(t => t.done).length;
    let logText = `¡Hoy completaste ${doneCount} actividades mágicas!`;
    if(goal !== "") {
      logText += " Y tu meta se cumplió con éxito.";
    }
    logs.completions = doneCount;
    localStorage.setItem('miRutina_logs', JSON.stringify(logs));
    document.getElementById('miRutina_logSummary').textContent = logText;
  }
  
  // --- "Mi Día Mágico" ---
  document.getElementById('miRutina_magicBtn').addEventListener('click', function() {
    const magicMessages = [
      "Hoy descubrirás un tesoro escondido en cada rincón.",
      "Tu sonrisa ilumina hasta el día más gris.",
      "Cada paso es una aventura mágica, ¡sigue adelante!",
      "Hoy es perfecto para soñar en grande y jugar sin límites."
    ];
    const randomMsg = magicMessages[Math.floor(Math.random() * magicMessages.length)];
    document.getElementById('miRutina_magicMessage').textContent = randomMsg;
    miRutina_showConfetti();
  });
  
  // Renderizar tareas e inicializar log
  miRutina_renderTasks();
  miRutina_updateLog();
  
  // --- Modal Opcional para Edición Detallada ---
  const modal = document.getElementById('miRutina_modal');
  const modalClose = document.querySelector('.miRutina-close');
  let currentModalTask = null;
  function openModal(task) {
    currentModalTask = task;
    document.getElementById('miRutina_modalBody').textContent = task.title;
    modal.style.display = "flex";
  }
  if(modalClose) {
    modalClose.addEventListener('click', function() {
      modal.style.display = "none";
    });
  }
  
  // Funcionalidades del Modal: Editar y Eliminar tarea
  document.getElementById('miRutina_modalEdit').addEventListener('click', function() {
    if (currentModalTask) {
      const newText = prompt("Edita la actividad:", currentModalTask.title);
      if (newText && newText.trim() !== "") {
        currentModalTask.title = newText.trim();
        miRutina_saveTasks();
        miRutina_renderTasks();
        mostrarMensaje("Actividad editada.");
      }
      modal.style.display = "none";
    }
  });
  
  document.getElementById('miRutina_modalDelete').addEventListener('click', function() {
    if (currentModalTask) {
      const confirmDelete = confirm("¿Estás segura de eliminar esta actividad?");
      if (confirmDelete) {
        tasks = tasks.filter(task => task.id !== currentModalTask.id);
        miRutina_saveTasks();
        miRutina_renderTasks();
        mostrarMensaje("Actividad eliminada.");
        miRutina_updateLog();
      }
      modal.style.display = "none";
    }
  });
  
  // --- Mostrar Mensajes (Feedback Visual) ---
  function mostrarMensaje(texto) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'miRutina-alerta';
    msgDiv.textContent = texto;
    document.querySelector('.miRutina-container').appendChild(msgDiv);
    setTimeout(() => {
      msgDiv.classList.add('fade-out');
      setTimeout(() => msgDiv.remove(), 1000);
    }, 2000);
  }
});


//SECCION COSAS QUE ESTOY APRENDIENTOD */


document.addEventListener('DOMContentLoaded', function() {
  // --- Datos Iniciales y Persistencia ---
  // Tarjetas de aprendizaje (si no hay en localStorage, se usan ejemplos por defecto)
  const defaultCards = [
    { id: 1, icon: "✍️", description: "Aprendiendo hacer paginas web", stars: 2, note: "", category: "arte" },
    { id: 2, icon: "🍬", description: "Aprendí a hacer una suma con decimales", stars: 3, note: "", category: "matematicas" },
    { id: 3, icon: "♻️", description: "Estoy entendiendo cómo funciona el reciclaje", stars: 1, note: "", category: "naturaleza" }
  ];
  let cards = JSON.parse(localStorage.getItem('cosasAprendiendo_cards')) || defaultCards;
  
  // Diario de aprendizajes
  let diaryEntries = JSON.parse(localStorage.getItem('cosasAprendiendo_diary')) || [];
  
  // Metas de aprendizaje (objetivos)
  let goals = JSON.parse(localStorage.getItem('cosasAprendiendo_goals')) || [
    { id: 1, text: "Dominar las tablas del 7", progress: 0 },
    { id: 2, text: "Leer 3 cuentos esta semana", progress: 0 },
    { id: 3, text: "Aprender 5 palabras en inglés", progress: 0 }
  ];
  
  // Reto mágico semanal
  let weeklyChallenge = JSON.parse(localStorage.getItem('cosasAprendiendo_challenge')) || { text: "Investiga por qué el cielo es azul", completed: false, timestamp: Date.now() };
  
  // --- Función para Guardar en localStorage ---
  function saveData() {
    localStorage.setItem('cosasAprendiendo_cards', JSON.stringify(cards));
    localStorage.setItem('cosasAprendiendo_diary', JSON.stringify(diaryEntries));
    localStorage.setItem('cosasAprendiendo_goals', JSON.stringify(goals));
    localStorage.setItem('cosasAprendiendo_challenge', JSON.stringify(weeklyChallenge));
  }
  
  // --- Renderizado de Tarjetas de Aprendizaje ---
  function cosasAprendiendo_renderCards() {
    const cardsContainer = document.querySelector('.cosasAprendiendo-cards');
    cardsContainer.innerHTML = "";
    cards.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.className = "cosasAprendiendo-card";
      cardDiv.setAttribute('data-id', card.id);
      
      // Estructura de la tarjeta
      cardDiv.innerHTML = `
        <div class="cosasAprendiendo-cardFront">
          <div class="cosasAprendiendo-icon">${card.icon}</div>
          <div class="cosasAprendiendo-description">${card.description}</div>
          <div class="cosasAprendiendo-progress">
            ${"⭐".repeat(card.stars)}
          </div>
        </div>
        <div class="cosasAprendiendo-cardBack">
          <button class="cosasAprendiendo-noteBtn">📝 Añadir nota</button>
          <button class="cosasAprendiendo-achieveBtn">🎉 ¡Lo logré!</button>
        </div>
      `;
      // Eventos para botones
      cardDiv.querySelector('.cosasAprendiendo-noteBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        const note = prompt("Añade una nota sobre este aprendizaje:", card.note || "");
        if(note !== null) {
          card.note = note;
          saveData();
          mostrarMensaje("Nota guardada.");
        }
      });
      cardDiv.querySelector('.cosasAprendendiendo-achieveBtn, .cosasAprendiendo-achieveBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        // Incrementar estrellas (máximo 5)
        if(card.stars < 5) card.stars++;
        else mostrarMensaje("¡Ya dominaste este tema!");
        saveData();
        cosasAprendiendo_renderCards();
      });
      
      cardsContainer.appendChild(cardDiv);
    });
  }
  
  // --- Renderizado de Categorías ---
  function cosasAprendiendo_renderCategories() {
    const categories = document.querySelectorAll('.cosasAprendiendo-category');
    categories.forEach(catEl => {
      const cat = catEl.getAttribute('data-category');
      const contentDiv = catEl.querySelector('.cosasAprendiendo-categoryContent');
      // Filtrar tarjetas según categoría
      const filtered = cards.filter(c => c.category === cat);
      contentDiv.innerHTML = "";
      filtered.forEach(card => {
        const p = document.createElement('p');
        p.textContent = `${card.icon} ${card.description} (${"⭐".repeat(card.stars)})`;
        contentDiv.appendChild(p);
      });
      
      // Toggle de categorías
      catEl.addEventListener('click', function() {
        if(contentDiv.style.display === "block") {
          contentDiv.style.display = "none";
        } else {
          contentDiv.style.display = "block";
        }
      });
    });
  }
  
  // --- Diario de Aprendizajes ---
  function cosasAprendiendo_renderDiary() {
    const diaryDiv = document.getElementById('cosasAprendiendo_diaryEntries');
    diaryDiv.innerHTML = "";
    diaryEntries.forEach(entry => {
      const div = document.createElement('div');
      div.className = "cosasAprendiendo-diaryEntry";
      div.textContent = `${entry.timestamp} - ${entry.text}`;
      diaryDiv.prepend(div);
    });
  }
  
  // Guardar entrada del diario al escribir
  document.getElementById('cosasAprendiendo_diaryInput').addEventListener('keyup', function(e) {
    if(e.key === "Enter" && this.value.trim() !== "") {
      const entry = { timestamp: new Date().toLocaleString(), text: this.value.trim() };
      diaryEntries.push(entry);
      saveData();
      cosasAprendiendo_renderDiary();
      this.value = "";
      mostrarMensaje("Aprendizaje guardado en el diario.");
    }
  });
  
  // --- Mini Metas de Aprendizaje ---
  function cosasAprendiendo_renderGoals() {
    document.querySelectorAll('.cosasAprendiendo-goalItem').forEach(goalItem => {
      const goalId = parseInt(goalItem.getAttribute('data-goal-id'));
      const goalObj = goals.find(g => g.id === goalId);
      const progressBar = goalItem.querySelector('.cosasAprendiendo-goalProgress');
      progressBar.value = goalObj.progress;
    });
  }
  // Evento para completar meta
  document.querySelectorAll('.cosasAprendiendo-completeGoalBtn').forEach(btn => {
    btn.addEventListener('click', function() {
      const goalItem = this.closest('.cosasAprendiendo-goalItem');
      const goalId = parseInt(goalItem.getAttribute('data-goal-id'));
      const goalObj = goals.find(g => g.id === goalId);
      goalObj.progress = 100;
      saveData();
      cosasAprendiendo_renderGoals();
      mostrarMensaje("Meta cumplida, ¡brilla esa estrella!");
      // Aquí se podría disparar una animación de estrellas
    });
  });
  
  // --- Reto Mágico Semanal ---
  function cosasAprendiendo_renderChallenge() {
    document.getElementById('cosasAprendiendo_challengeText').textContent = weeklyChallenge.text;
    const statusEl = document.getElementById('cosasAprendiendo_challengeStatus');
    statusEl.textContent = weeklyChallenge.completed ? "¡Reto completado!" : "";
  }
  document.getElementById('cosasAprendiendo_completeChallengeBtn').addEventListener('click', function() {
    weeklyChallenge.completed = true;
    saveData();
    cosasAprendiendo_renderChallenge();
    mostrarMensaje("Reto semanal completado, ¡felicidades!");
  });
  
  // --- Botón "Quiero aprender esto" para Agregar Nuevos Temas ---
  document.getElementById('cosasAprendiendo_addTopicBtn').addEventListener('click', function() {
    const topic = prompt("¿Qué nuevo tema quieres aprender?");
    if(topic && topic.trim() !== "") {
      const newCard = {
        id: Date.now(),
        icon: "❓",
        description: topic.trim(),
        stars: 0,
        note: "",
        category: prompt("¿Categoría? (matematicas, lectura, arte, naturaleza, tecnologia, curiosidades)") || "curiosidades"
      };
      cards.push(newCard);
      saveData();
      cosasAprendiendo_renderCards();
      cosasAprendiendo_renderCategories();
      mostrarMensaje("Nuevo tema añadido.");
    }
  });
  
  // --- Modo Aleatorio ---
  document.getElementById('cosasAprendiendo_randomModeBtn').addEventListener('click', function() {
    const randomMessages = [
      "¡Hoy aprendiste algo sorprendente!",
      "Cada pequeño conocimiento te hace brillar más.",
      "Recuerda: aprender es soñar con los ojos abiertos.",
      "Un nuevo descubrimiento te espera en cada rincón."
    ];
    const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    document.getElementById('cosasAprendiendo_randomMessage').textContent = randomMsg;
    mostrarMensaje("Modo aleatorio activado.");
  });
  
  // --- Frase Flotante (se mantiene fija con CSS animado) ---
  
  // --- Función para Mostrar Mensajes Emergentes ---
  function mostrarMensaje(texto) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'cosasAprendiendo-alerta';
    msgDiv.textContent = texto;
    document.querySelector('.cosasAprendiendo-container').appendChild(msgDiv);
    setTimeout(() => {
      msgDiv.classList.add('fade-out');
      setTimeout(() => msgDiv.remove(), 1000);
    }, 2000);
  }
  
  // --- Inicialización y Render Final ---
  cosasAprendiendo_renderCards();
  cosasAprendiendo_renderCategories();
  cosasAprendiendo_renderDiary();
  cosasAprendiendo_renderGoals();
  cosasAprendiendo_renderChallenge();
  saveData();
});


//SECCION MI INSPIRACION


document.addEventListener('DOMContentLoaded', function() {
  // ---------------------------
  // VARIABLES Y DATOS INICIALES
  // ---------------------------
  const inspirationalPhrases = [
    "Eres más valiente de lo que crees",
    "Cada error es una pista para crecer",
    "Los grandes sueños caben en pequeños corazones",
    "Cada paso te acerca a tu estrella",
    "La inspiración vive en ti, ilumina el mundo"
  ];
  let currentPhraseIndex = 0;

  // ---------------------------
  // ROTADOR DE FRASES
  // ---------------------------
  const phraseDisplay = document.getElementById('inspiraccion_phraseDisplay');
  const phraseAudio = document.getElementById('inspiraccion_phraseAudio');
  function rotatePhrase() {
    currentPhraseIndex = (currentPhraseIndex + 1) % inspirationalPhrases.length;
    phraseDisplay.style.opacity = 0;
    setTimeout(() => {
      phraseDisplay.textContent = inspirationalPhrases[currentPhraseIndex];
      phraseDisplay.style.opacity = 1;
      // Reproducir sonido suave
      phraseAudio.currentTime = 0;
      phraseAudio.play();
    }, 800);
  }
  setInterval(rotatePhrase, 10000);

  // ---------------------------
  // EXPPLICAR CANCIÓN (Botón "¿Por qué me inspira?")
  // ---------------------------
  const explainBtns = document.querySelectorAll('.inspiraccion-explainBtn');
  explainBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      alert(this.getAttribute('data-explain'));
    });
  });

  // ---------------------------
  // GALERÍA DE INSPIRACIÓN: VISOR DE IMÁGENES
  // ---------------------------
  const galleryItems = document.querySelectorAll('.inspiraccion-galleryItem');
  const viewer = document.getElementById('inspiraccion_imageViewer');
  const viewerImg = document.getElementById('inspiraccion_viewerImg');
  const viewerText = document.getElementById('inspiraccion_viewerText');
  const viewerClose = document.getElementById('inspiraccion_viewerClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const history = this.getAttribute('data-history');
      viewerImg.src = imgSrc;
      viewerText.textContent = history;
      viewer.style.display = "block";
    });
  });
  viewerClose.addEventListener('click', function() {
    viewer.style.display = "none";
  });

  // ---------------------------
  // PERSONAJES: VER HISTORIA
  // ---------------------------
  const viewStoryBtns = document.querySelectorAll('.inspiraccion_viewStoryBtn');
  viewStoryBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.inspiraccion-characterCard');
      const story = card.getAttribute('data-story');
      alert(story);
    });
  });

  // ---------------------------
  // RETO MÁGICO ALEATORIO
  // ---------------------------
  const challengeTexts = [
    "Dibuja algo que te haga sonreír",
    "Ayuda a alguien sin decirle que fuiste tú",
    "Escribe una carta al tú del futuro",
    "Crea un poema sobre tus sueños"
  ];
  let currentChallenge = challengeTexts[0];
  const challengeTextEl = document.getElementById('inspiraccion_challengeText');
  const challengeStatusEl = document.getElementById('inspiraccion_challengeStatus');
  document.getElementById('inspiraccion_completeChallengeBtn').addEventListener('click', function() {
    challengeStatusEl.textContent = "¡Reto completado! Medalla desbloqueada ✨";
    // Mostrar animación de medalla
    const medal = document.createElement('div');
    medal.className = "inspiraccion-medal";
    medal.textContent = "🏅";
    document.getElementById('inspiraccion_medals').appendChild(medal);
    // Reproducir sonido (opcional, si tienes un audio de logro)
    // Reiniciar reto aleatorio
    currentChallenge = challengeTexts[Math.floor(Math.random() * challengeTexts.length)];
    challengeTextEl.textContent = currentChallenge;
    // Almacenar en localStorage si es necesario
  });

  // ---------------------------
  // MODO "INSPÍNAME AHORA"
  // ---------------------------
  document.getElementById('inspiraccion_inspireNowBtn').addEventListener('click', function() {
    // Generar combinación aleatoria de frase, reto e imagen (se puede ampliar)
    const randomPhrase = inspirationalPhrases[Math.floor(Math.random() * inspirationalPhrases.length)];
    const randomChallenge = challengeTexts[Math.floor(Math.random() * challengeTexts.length)];
    // Suponiendo que existen imágenes en la galería, podemos tomar una aleatoria
    const galleryArray = Array.from(galleryItems);
    let randomImageSrc = "";
    if(galleryArray.length) {
      randomImageSrc = galleryArray[Math.floor(Math.random() * galleryArray.length)].querySelector('img').src;
    }
    const inspireMsgEl = document.getElementById('inspiraccion_randomMessage');
    inspireMsgEl.innerHTML = `<strong>${randomPhrase}</strong><br>${randomChallenge}${randomImageSrc ? `<br><img src="${randomImageSrc}" alt="Inspírate" style="max-width:100px;border-radius:5px;margin-top:5px;">` : ""}`;
    mostrarMensaje("¡Inspírate ahora!");
  });

  // ---------------------------
  // DIARIO DE INSPIRACIÓN
  // ---------------------------
  let inspirationDiary = JSON.parse(localStorage.getItem('inspiraccion_diary')) || [];
  const diaryInput = document.getElementById('inspiraccion_diaryInput');
  const diaryEntriesEl = document.getElementById('inspiraccion_diaryEntries');
  diaryInput.addEventListener('keyup', function(e) {
    if(e.key === "Enter" && this.value.trim() !== "") {
      const entry = { timestamp: new Date().toLocaleString(), text: this.value.trim() };
      inspirationDiary.push(entry);
      localStorage.setItem('inspiraccion_diary', JSON.stringify(inspirationDiary));
      renderDiary();
      this.value = "";
      mostrarMensaje("Entrada guardada en el diario.");
    }
  });
  function renderDiary() {
    diaryEntriesEl.innerHTML = "";
    inspirationDiary.forEach(entry => {
      const div = document.createElement('div');
      div.className = "inspiraccion-diaryEntry";
      div.textContent = `${entry.timestamp} - ${entry.text}`;
      diaryEntriesEl.prepend(div);
    });
  }
  renderDiary();

  // ---------------------------
  // MURO DE ESPEJITOS MÁGICOS: Mensajes flotantes
  // ---------------------------
  const wallMessagesEl = document.getElementById('inspiraccion_wallMessages');
  const wallMessages = [
    "Soy valiente y creativa",
    "Tengo magia en mis manos",
    "Cada pensamiento es una chispa de luz",
    "Hoy brillo y hago brillar a otros"
  ];
  function showWallMessage() {
    const msg = wallMessages[Math.floor(Math.random() * wallMessages.length)];
    const div = document.createElement('div');
    div.className = "inspiraccion-wallMsg";
    div.textContent = msg;
    wallMessagesEl.appendChild(div);
    setTimeout(() => div.remove(), 15000);
  }
  setInterval(showWallMessage, 15000);

  // ---------------------------
  // FUNCIÓN PARA MOSTRAR MENSAJES EMERGENTES
  // ---------------------------
  function mostrarMensaje(texto) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'inspiraccion-alerta';
    msgDiv.textContent = texto;
    document.querySelector('.inspiraccion-container').appendChild(msgDiv);
    setTimeout(() => {
      msgDiv.classList.add('fade-out');
      setTimeout(() => msgDiv.remove(), 1000);
    }, 2000);
  }
});


// SECCION BUZON

document.addEventListener('DOMContentLoaded', function() {
  // Lista de palabras prohibidas (para filtrar contenido)
  const badWords = ["odio", "malo", "feo", "tonto", "estúpido"];

  // Cargar mensajes desde localStorage o iniciar array vacío
  let buzonMessages = JSON.parse(localStorage.getItem('buzon_messages')) || [];

  // Función para guardar mensajes
  function buzon_saveMessages() {
    localStorage.setItem('buzon_messages', JSON.stringify(buzonMessages));
  }

  // Renderizar mensajes en la galería
  function buzon_renderMessages() {
    const container = document.getElementById('buzon_messages');
    container.innerHTML = "";
    buzonMessages.forEach((msg, index) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = "buzon-message";
      // Puedes variar el estilo si deseas (sobre, estrella o cofre)
      msgDiv.innerHTML = `<span>${msg.emoji}</span>`;
      msgDiv.addEventListener('click', function() {
        buzon_openModal(index);
      });
      container.appendChild(msgDiv);
    });
  }

  // Función para abrir el modal con los detalles del mensaje
  function buzon_openModal(index) {
    const msg = buzonMessages[index];
    const modal = document.getElementById('buzon_modal');
    const modalBody = document.getElementById('buzon_modalBody');
    modalBody.innerHTML = `
      <p><strong>De:</strong> ${msg.nombre || "Anónimo"}</p>
      <p><strong>Mensaje:</strong> ${msg.mensaje}</p>
      <p><strong>Emoji:</strong> ${msg.emoji}</p>
      <p><small>${msg.timestamp}</small></p>
    `;
    // Guardar el índice actual para usar en acciones de reacción
    modal.setAttribute('data-index', index);
    modal.style.display = "block";
  }

  // Cerrar modal
  document.querySelector('.buzon-close').addEventListener('click', function() {
    document.getElementById('buzon_modal').style.display = "none";
  });

  // Reacciones en el modal
  document.getElementById('buzon_likeBtn').addEventListener('click', function() {
    alert("¡Gracias por tu cariño!");
  });
  document.getElementById('buzon_favBtn').addEventListener('click', function() {
    alert("Mensaje guardado como especial.");
  });
  document.getElementById('buzon_replyBtn').addEventListener('click', function() {
    alert("Podrás responder este mensaje luego. ¡Gracias por inspirar!");
  });

  // Envío del mensaje
  document.getElementById('buzon_form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('buzon_nombre').value.trim();
    const mensaje = document.getElementById('buzon_mensaje').value.trim();
    const emoji = document.getElementById('buzon_emoji').value;
    // Filtro de contenido negativo
    const lowerMsg = mensaje.toLowerCase();
    if (badWords.some(word => lowerMsg.includes(word))) {
      alert("Ups, solo mensajes con amor aquí 🧼💗");
      return;
    }
    const newMsg = {
      nombre,
      mensaje,
      emoji,
      timestamp: new Date().toLocaleString()
    };
    buzonMessages.push(newMsg);
    buzon_saveMessages();
    buzon_renderMessages();
    // Mostrar confirmación y animación de estrella
    const confirmation = document.getElementById('buzon_confirmation');
    confirmation.style.display = "block";
    // Reproducir sonido al enviar (opcional)
    const sendSound = new Audio('/audios/buzon/enviar.mp3');
    sendSound.play();
    setTimeout(() => { confirmation.style.display = "none"; }, 2000);
    // Limpiar formulario
    document.getElementById('buzon_form').reset();
  });

  // Exportar mensajes como JSON
  document.getElementById('buzon_exportBtn').addEventListener('click', function() {
    const dataStr = JSON.stringify(buzonMessages, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buzon_mensajes_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Función para mostrar mensajes emergentes (feedback)
  function mostrarMensaje(texto) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'buzon-alerta';
    msgDiv.textContent = texto;
    document.querySelector('.buzon-container').appendChild(msgDiv);
    setTimeout(() => {
      msgDiv.classList.add('fade-out');
      setTimeout(() => msgDiv.remove(), 1000);
    }, 2000);
  }

  // Renderizado inicial
  buzon_renderMessages();
});
