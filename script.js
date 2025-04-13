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


  /* --- Smooth scrolling opcional para enlaces internos ---
  (Descomentar si se desea que, al hacer clic, se haga scroll suave)
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      // Para enlaces hacia secciones internas, verifica si el href es un id
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector(".header-principal").offsetHeight;
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: "smooth"
          });
        }
      }
      // Si es un link externo (a otro HTML), se deja el comportamiento natural
      if (navLista.classList.contains("show")) {
        navLista.classList.remove("show");
      }
    });
  });
});

 
 
 
 
 
 
 
 
 
 // js/script.js
  document.addEventListener("DOMContentLoaded", function() {
    /* =======================================
       Control de Música Ambiental
    ======================================= */
    const bgMusic = document.getElementById("bgMusic");
    const toggleMusicBtn = document.getElementById("toggleMusic");
  
    let musicPlaying = false;
  
    toggleMusicBtn.addEventListener("click", async function () {
      try {
        if (!musicPlaying) {
          await bgMusic.play();
          musicPlaying = true;
          toggleMusicBtn.textContent = "🔇 Música:";
        } else {
          bgMusic.pause();
          musicPlaying = false;
          toggleMusicBtn.textContent = "🎵 Música:";
        }
      } catch (error) {
        console.error("Error al reproducir música:", error);
        alert("El navegador ha bloqueado la reproducción. Toca la pantalla o permite el audio.");
      }
    });
  
    /* =======================================
       Modo Día/Noche (toggle)
    ======================================= */
    const modoToggleBtn = document.getElementById("modoToggle");
    const currentMode = localStorage.getItem("modo");
    if (currentMode === "noche") {
      document.body.classList.add("modo-noche");
      modoToggleBtn.textContent = "🌜 Modo Día";
    }
  
    modoToggleBtn.addEventListener("click", function() {
      if (document.body.classList.contains("modo-noche")) {
        document.body.classList.remove("modo-noche");
        modoToggleBtn.textContent = "🌞 Modo Noche";
        localStorage.setItem("modo", "dia");
      } else {
        document.body.classList.add("modo-noche");
        modoToggleBtn.textContent = "🌜 Modo Día";
        localStorage.setItem("modo", "noche");
      }
    });
  
    /* =======================================
       Confetti Efecto al Cargar la Página
    ======================================= */
    const confettiCanvas = document.getElementById("confettiCanvas");
    const confettiCtx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    const confettiParticles = [];
    const colors = ["#f48fb1", "#e1bee7", "#fff9c4", "#c8e6c9"];
    const maxParticles = 150;
  
    function initConfetti() {
      for (let i = 0; i < maxParticles; i++) {
        confettiParticles.push({
          x: Math.random() * confettiCanvas.width,
          y: Math.random() * confettiCanvas.height - confettiCanvas.height,
          r: Math.random() * 6 + 2,
          d: Math.random() * maxParticles,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.floor(Math.random() * 10) - 10,
          tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
          tiltAngle: 0
        });
      }
    
      let animationFrameId;
    
      function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles.forEach((p, index) => {
          p.tiltAngle += p.tiltAngleIncremental;
          p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
          p.x += Math.sin(p.d);
          p.tilt = Math.sin(p.tiltAngle) * 15;
    
          // Dibujar confetti
          confettiCtx.beginPath();
          confettiCtx.lineWidth = p.r;
          confettiCtx.strokeStyle = p.color;
          confettiCtx.moveTo(p.x + p.tilt + p.r / 2, p.y);
          confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
          confettiCtx.stroke();
    
          // Reposicionar partículas que salen de la vista
          if (p.y > confettiCanvas.height) {
            confettiParticles[index] = {
              x: Math.random() * confettiCanvas.width,
              y: -10,
              r: p.r,
              d: p.d,
              color: p.color,
              tilt: p.tilt,
              tiltAngleIncremental: p.tiltAngleIncremental,
              tiltAngle: p.tiltAngle
            };
          }
        });
    
        animationFrameId = requestAnimationFrame(animateConfetti);
      }
    
      animateConfetti();
    
      // Detener la animación después de 5 segundos
      setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height); // Limpiar el canvas
      }, 8000);
    }
  
    initConfetti();
  
    /* =======================================
       Saludo de voz al pasar el mouse sobre la foto
    ======================================= */
    const fotoSammy = document.getElementById("fotoSammy");
    const voiceGreeting = document.getElementById("voiceGreeting");
  
    fotoSammy.addEventListener("mouseenter", function() {
      // Reproducir saludo (una sola vez cada vez que se active)
      voiceGreeting.play();
    });
  
    /* =======================================
       (Opcional) Reiniciar efecto typewriter manualmente
    ======================================= */
    /* La animación CSS ya se encarga, pero se puede reiniciar si se desea.
    function restartTypewriter() {
      const animatedText = document.getElementById("animatedText");
      animatedText.style.animation = 'none';
      setTimeout(() => {
        animatedText.style.animation = '';
      }, 10);
    }
    */
  
  
//SECION EDUCACION
document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todos los nodos de la línea de tiempo
  const timelineItems = document.querySelectorAll(".educacion-item");
  // Seleccionar el panel de detalles y el botón de cerrar
  const detallePanel = document.getElementById("detalleEducacion");
  const detalleTitulo = document.getElementById("detalle-titulo");
  const detalleDescripcion = document.getElementById("detalle-descripcion");
  const detalleLogros = document.getElementById("detalle-logros");
  const cerrarBtn = document.getElementById("cerrarDetalle");

  // Función para ocultar el panel
  function hideDetalle() {
    detallePanel.classList.add("hidden");
    cerrarBtn.style.display = "none";
  }

  // Inicialmente ocultar el panel
  hideDetalle();

  // Al hacer clic en cualquier nodo de la línea de tiempo
  timelineItems.forEach(item => {
    item.addEventListener("click", function() {
      // Extraer datos desde atributos data-*
      const titulo = item.getAttribute("data-titulo") || item.querySelector(".educacion-etapa").textContent;
      const ano = item.getAttribute("data-ano") || "";
      const descripcion = item.getAttribute("data-descripcion") || "Detalles no disponibles.";
      const logros = item.getAttribute("data-logros") || "";

      // Actualizar el contenido del panel
      detalleTitulo.textContent = titulo + (ano ? " (" + ano + ")" : "");
      detalleDescripcion.textContent = descripcion;
      detalleLogros.textContent = logros ? "Logros: " + logros : "";

      // Mostrar el panel con animación
      detallePanel.classList.remove("hidden");
      cerrarBtn.style.display = "block";
    });
  });

  // Acción para cerrar el panel de detalles
  cerrarBtn.addEventListener("click", function() {
    hideDetalle();
  });
});


//SECCINO FAMILIA



// js/script.js

document.addEventListener("DOMContentLoaded", function() {
  // Verificar si existe la sección #familia
  const familiaSection = document.getElementById("familia");
  if (!familiaSection) return;

  // Seleccionar elementos relevantes
  const toggleBtn = document.getElementById("toggleFamilyStories");
  const familyStories = document.getElementById("familyStories");
  // Opcional: audio de melodía familiar
  const familiaAudio = document.getElementById("familiaAudio");

  // Variable para seguimiento del estado (mostrado/oculto)
  let storiesVisible = false;

  // Función para alternar la visibilidad de las historias
  toggleBtn.addEventListener("click", function() {
    storiesVisible = !storiesVisible;
    if (storiesVisible) {
      familyStories.classList.remove("hidden");
      toggleBtn.textContent = "Ocultar Historias Familiares";
      // Opcional: activar audio si se quiere (descomentar si se requiere)
      // familiaAudio && (familiaAudio.muted = false, familiaAudio.play());
    } else {
      // Aplicar una salida suave: esperar un poco antes de ocultar
      familyStories.classList.add("hidden");
      toggleBtn.textContent = "Mostrar Historias Familiares";
      // Opcional: pausar audio si se desea
      // familiaAudio && familiaAudio.pause();
    }
  });
});


//SECCION MIS SUEÑOS 



// js/script.js

document.addEventListener("DOMContentLoaded", function() {
  // Verificar si la sección #suenos existe
  const suenosSection = document.getElementById("suenos");
  if (!suenosSection) return;

  // Elementos para la interacción
  const secretDreamBtn = document.getElementById("secretDreamBtn");
  const secretDream = document.getElementById("secretDream");

  // Texto inicial del botón
  let mostrarTexto = "🌟 ¡Haz click para ver un sueño secreto!";
  let ocultarTexto = "Ocultar sueño secreto";

  // Configurar listener para el botón
  secretDreamBtn.addEventListener("click", function() {
    if (secretDream.classList.contains("hidden")) {
      secretDream.classList.remove("hidden");
      secretDreamBtn.textContent = ocultarTexto;
    } else {
      secretDream.classList.add("hidden");
      secretDreamBtn.textContent = mostrarTexto;
    }
  });
});


//SECCION MI BLOCK


// js/script.js

document.addEventListener("DOMContentLoaded", function() {
  // Verificar si existe la sección #blog
  const blogSection = document.getElementById("blog");
  if (!blogSection) return;

  // Seleccionar los botones del filtro y las publicaciones
  const filtroBtns = document.querySelectorAll(".blog-filtro");
  const blogPosts = document.querySelectorAll(".blog-post");

  // Función para filtrar publicaciones
  function filtrarPublicaciones(filtro) {
    blogPosts.forEach(post => {
      const categoria = post.getAttribute("data-categoria");
      if (filtro === "todos" || categoria === filtro) {
        post.style.display = "block";
        // Opcional: animación de fadeIn
        post.classList.add("fade-in");
      } else {
        post.style.display = "none";
      }
    });
  }

  // Asignar evento a cada botón del filtro
  filtroBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      // Remover la clase activo de todos los botones
      filtroBtns.forEach(b => b.classList.remove("activo"));
      // Añadir la clase activo al botón clicado
      this.classList.add("activo");
      // Filtrar las publicaciones de acuerdo al dato seleccionado
      const filtro = this.getAttribute("data-filtro");
      filtrarPublicaciones(filtro);
    });
  });

  // Placeholder para botón "Leer más"
  const verMasBtns = document.querySelectorAll(".blog-vermas");
  verMasBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      alert("Función de 'Leer más' en desarrollo.");
    });
  });
});



//SECCION MIS COSAS FAVORITAS


document.addEventListener("DOMContentLoaded", function() {
  // Verificar que la sección #favoritas exista
  const favoritasSection = document.getElementById("favoritas");
  if (!favoritasSection) return;

  // Seleccionar botones del filtro y las tarjetas
  const filtroBtns = document.querySelectorAll(".favoritas-btn");
  const favoritaItems = document.querySelectorAll(".favorita-item");

  // Función para filtrar tarjetas
  function filtrarFavoritos(filtro) {
    favoritaItems.forEach(item => {
      const categoria = item.getAttribute("data-categoria");
      if (filtro === "todas" || categoria === filtro) {
        item.style.display = "block";
        // Opcional: agregar clase para animación (fadeIn)
        item.classList.add("fadeIn");
      } else {
        item.style.display = "none";
      }
    });
  }

  // Asignar evento clic a cada botón de filtro
  filtroBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      // Remover la clase activo de todos
      filtroBtns.forEach(b => b.classList.remove("activo"));
      // Agregar la clase activo al botón clicado
      this.classList.add("activo");
      // Obtener el filtro y aplicarlo
      const filtro = this.getAttribute("data-filtro");
      filtrarFavoritos(filtro);
    });
  });
});



// SECCION CALENDARIO 



// js/script.js

document.addEventListener("DOMContentLoaded", function() {
  // Función para generar la tabla del calendario
  function generarCalendario(year, month) {
    const calendarioTabla = document.querySelector(".calendario-tabla");
    if (!calendarioTabla) return;
    
    // Limpiar contenido previo
    calendarioTabla.innerHTML = "";

    // Crear la tabla
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Días de la semana
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const headRow = document.createElement("tr");
    diasSemana.forEach(dia => {
      const th = document.createElement("th");
      th.textContent = dia;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);

    // Primer día del mes
    const primerDia = new Date(year, month, 1).getDay();
    // Número de días en el mes
    const ultimoDia = new Date(year, month + 1, 0).getDate();

    // Eventos especiales (para Abril 2025)
    // Si el mes es Abril de 2025 (month === 3) se definen los eventos
    const eventosEspeciales = {};
    if (year === 2025 && month === 3) { 
      eventosEspeciales[15] = true;
      eventosEspeciales[22] = true;
      eventosEspeciales[27] = true;
    }

    let currentDay = 1;
    // Se crean 6 filas para cubrir el máximo de días
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        if (i === 0 && j < primerDia) {
          cell.textContent = ""; // Celda vacía antes del inicio del mes
        } else if (currentDay > ultimoDia) {
          cell.textContent = ""; // Después de terminar el mes
        } else {
          cell.textContent = currentDay;
          // Resaltar si es un día con evento especial
          if (eventosEspeciales[currentDay]) {
            cell.classList.add("evento");
          }
          // (Opcional) Al hacer clic en un día, se puede mostrar un tooltip o modal (por ahora, placeholder)
          cell.addEventListener("click", function() {
            alert("Has seleccionado el día " + currentDay + ". ¡Aquí puedes agregar un recordatorio!");
          });
          currentDay++;
        }
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    calendarioTabla.appendChild(table);
  }

  // Variables para el mes actual
  let currentYear = 2025;
  let currentMonth = 3; // Abril (0-based: 0=Enero, 3=Abril)

  // Actualizar el texto del mes actual
  function actualizarMesActual() {
    const mesActualSpan = document.getElementById("mesActual");
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    mesActualSpan.textContent = `${meses[currentMonth]} ${currentYear}`;
  }

  // Función para actualizar el calendario en base a currentYear y currentMonth
  function actualizarCalendario() {
    generarCalendario(currentYear, currentMonth);
    actualizarMesActual();
  }

  // Inicializar calendario
  actualizarCalendario();

  // Botones para cambiar de mes
  const btnMesAnterior = document.getElementById("mesAnterior");
  const btnMesSiguiente = document.getElementById("mesSiguiente");

  btnMesAnterior.addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    actualizarCalendario();
  });

  btnMesSiguiente.addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    actualizarCalendario();
  });
});


//SECCION SECRETOS



document.addEventListener("DOMContentLoaded", function() {
  // Verificar que la sección Zona Secreta exista
  const zonaSection = document.getElementById("zonaSecreta");
  if (!zonaSection) return;

  // Elementos
  const cofre = document.getElementById("abrirCofre");
  const zonaAcceso = document.getElementById("zonaAcceso");
  const verificarBtn = document.getElementById("verificarClave");
  const claveInput = document.getElementById("claveSecreta");
  const contenidoSecreto = document.getElementById("contenidoSecreto");
  const guardarBtn = document.getElementById("guardarSecreto");

  // Lógica para mostrar el campo de clave al hacer click en el cofre
  cofre.addEventListener("click", function() {
    zonaAcceso.classList.remove("hidden");
  });

  // Lógica para verificar la clave
  verificarBtn.addEventListener("click", function() {
    const clave = claveInput.value.trim();
    if (clave === "pastelito123") {
      // Si la clave es correcta, ocultar el campo de acceso y mostrar el contenido secreto
      zonaAcceso.classList.add("hidden");
      contenidoSecreto.classList.remove("hidden");
    } else {
      alert("Clave incorrecta. ¡Intenta de nuevo!");
      claveInput.value = "";
    }
  });

  // Simulación de guardar en el diario con feedback visual
  guardarBtn.addEventListener("click", function() {
    // Aquí podrías almacenar en localStorage en el futuro. Por ahora, muestra un mensaje simulado.
    // Crear un elemento de feedback (por ejemplo, un corazón flotante)
    const feedback = document.createElement("div");
    feedback.textContent = "💖 Guardado con amor";
    feedback.style.position = "absolute";
    feedback.style.top = "50%";
    feedback.style.left = "50%";
    feedback.style.transform = "translate(-50%, -50%)";
    feedback.style.fontSize = "1.5em";
    feedback.style.opacity = "1";
    zonaSection.appendChild(feedback);
    
    // Animar el feedback (fade out y ascender)
    feedback.animate([
      { transform: "translate(-50%, -50%)", opacity: 1 },
      { transform: "translate(-50%, -100%)", opacity: 0 }
    ], {
      duration: 2000,
      easing: "ease-out"
    });
    
    // Remover el feedback después de la animación
    setTimeout(() => {
      zonaSection.removeChild(feedback);
    }, 2000);
  });
});
