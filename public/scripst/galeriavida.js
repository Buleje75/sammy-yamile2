// Espera a que el DOM cargue
document.addEventListener("DOMContentLoaded", function() {
  
  /* ---------- MODO CLARO/OSCURO CON LOCALSTORAGE ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    document.body.className = storedTheme;
    themeToggle.textContent = storedTheme === "light-mode" ? "🌞" : "🌜";
  }
  themeToggle.addEventListener("click", function() {
    if (document.body.classList.contains("light-mode")) {
      document.body.classList.replace("light-mode", "dark-mode");
      themeToggle.textContent = "🌜";
      localStorage.setItem("theme", "dark-mode");
    } else {
      document.body.classList.replace("dark-mode", "light-mode");
      themeToggle.textContent = "🌞";
      localStorage.setItem("theme", "light-mode");
    }
  });

  /* ---------- INDICADOR DE PROGRESO DE SCROLL ---------- */
  window.addEventListener("scroll", function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
  });

  /* ---------- EFECTO TYPEWRITER PARA SUBTÍTULO ---------- */
  const typewriterText = "Tus recuerdos, tus emociones, tu historia.";
  const typewriterElem = document.getElementById("typewriter");
  let i = 0;
  function typeWriter() {
    if (i < typewriterText.length) {
      typewriterElem.textContent += typewriterText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();

  /* ---------- MENSAJE DE BIENVENIDA PERSONALIZADO ---------- */
  const welcomeMessage = document.getElementById("welcomeMessage");
  const hour = new Date().getHours();
  let greeting = "";
  if (hour < 12) {
    greeting = "Buenos días, explorador de recuerdos…";
  } else if (hour < 18) {
    greeting = "Buenas tardes, viajero de emociones…";
  } else {
    greeting = "Buenas noches, soñador de momentos…";
  }
  welcomeMessage.textContent = greeting;

  /* ---------- TRANSICIÓN AL HACER CLIC EN "EXPLORAR MIS RECUERDOS" ---------- */
  const exploreBtn = document.getElementById("exploreBtn");
  exploreBtn.addEventListener("click", function() {
    // Simula transición: fundido suave y zoom-out del fondo
    const heroSection = document.querySelector(".hero");
    heroSection.style.transition = "transform 1s, opacity 1s";
    heroSection.style.transform = "scale(0.9)";
    heroSection.style.opacity = "0";
    setTimeout(() => {
      // Restablece y desplaza a la siguiente sección (por ejemplo, Galería)
      heroSection.style.transform = "";
      heroSection.style.opacity = "";
      document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  });

  /* ---------- (Opcional) EVENTOS PARA "Ver más como este" EN UN RECUERDO ---------- */
  const memoryBtn = document.getElementById("memoryBtn");
  memoryBtn.addEventListener("click", function() {
    // Aquí se podría redirigir a la galería filtrada por emoción (futuro)
    alert("Filtrando galería por emoción similar...");
  });

});




document.addEventListener("DOMContentLoaded", function () {
  let viewCounter = 0;

  // Función para actualizar el contador de fotos vistas
  function updateCounter() {
    document.getElementById("counter").textContent = viewCounter;
  }

  // Alternar vistas: Grid (Mosaico) vs. Carrusel
  const gridViewBtn = document.getElementById("gridViewBtn");
  const carouselViewBtn = document.getElementById("carouselViewBtn");
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryCarousel = document.getElementById("galleryCarousel");

  gridViewBtn.addEventListener("click", function () {
    gridViewBtn.classList.add("active");
    carouselViewBtn.classList.remove("active");
    galleryGrid.style.display = "grid";
    galleryCarousel.style.display = "none";
  });

  carouselViewBtn.addEventListener("click", function () {
    carouselViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
    galleryGrid.style.display = "none";
    galleryCarousel.style.display = "flex";
  });

  // Filtrado por Categoría y Emoción
  const filterBtns = document.querySelectorAll(".filter-btn");
  const emotionBtns = document.querySelectorAll(".emotion-btn");
  // Selecciona tanto items de la galería en grid como del carrusel
  const galleryItems = document.querySelectorAll(".gallery-item, .carousel-item");

  function filterGallery() {
    const categoryFilter = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "all";
    const emotionFilter = document.querySelector(".emotion-btn.active")?.getAttribute("data-emotion") || "all";

    galleryItems.forEach(item => {
      // Si no se encuentran atributos, se asigna "all" por defecto
      const itemCategory = item.getAttribute("data-category") || "all";
      const itemEmotion = item.getAttribute("data-emotion") || "all";

      const categoryMatch = (categoryFilter === "all" || categoryFilter === itemCategory);
      const emotionMatch = (emotionFilter === "all" || emotionFilter === itemEmotion);

      item.style.display = (categoryMatch && emotionMatch) ? "" : "none";
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      filterBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      filterGallery();
    });
  });

  emotionBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      emotionBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      filterGallery();
    });
  });

  // Modal Lightbox: Abrir y Cerrar
  const lightboxModal = document.getElementById("lightboxModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDate = document.getElementById("modalDate");
  const modalStory = document.getElementById("modalStory");
  const modalEmotion = document.getElementById("modalEmotion");

  // Función para abrir el modal con datos del item seleccionado
  function openModal(item) {
    modalImg.src = item.querySelector("img")?.src || "";
    modalTitle.textContent = item.getAttribute("data-title") || item.alt || "Sin título";
    modalDate.textContent = item.getAttribute("data-date") || "Fecha desconocida";
    modalStory.textContent = item.getAttribute("data-story") || "Sin descripción.";
    modalEmotion.textContent = "Emoción: " + (item.getAttribute("data-emotion") || "Ninguna");
    lightboxModal.style.display = "flex";

    // Incrementa el contador y actualiza la vista
    viewCounter++;
    updateCounter();
  }

  // Agrega evento de clic a todos los items de la galería
  galleryItems.forEach(item => {
    item.addEventListener("click", function () {
      openModal(item);
    });
  });

  // Cerrar modal al hacer clic en la “x”
  closeModalBtn.addEventListener("click", function () {
    lightboxModal.style.display = "none";
  });

  // Cerrar modal con la tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      lightboxModal.style.display = "none";
    }
  });

  // Funcionalidad del botón "Recuerdo Aleatorio"
  const randomBtn = document.getElementById("randomBtn");
  randomBtn.addEventListener("click", function () {
    const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== "none");
    if (visibleItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * visibleItems.length);
      visibleItems[randomIndex].click(); // Abre el modal del item aleatorio
    } else {
      alert("No hay fotos que coincidan con los filtros seleccionados.");
    }
  });

  // Funcionalidad básica del carrusel
  let currentSlide = 0;
  const carouselItems = document.querySelectorAll(".carousel-item");

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      // Uso de template literals para el cálculo correcto del translateX
      item.style.transform = `translateX(-${index * 100}%)`;
      item.style.filter = i === index ? "blur(0)" : "blur(2px)";
    });
  }

  // Inicializa el carrusel mostrando la primera imagen
  showSlide(currentSlide);

  document.getElementById("prevBtn").addEventListener("click", function () {
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentSlide);
  });

  document.getElementById("nextBtn").addEventListener("click", function () {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    showSlide(currentSlide);
  });
});


// FOTOGRAFIA DIARIO

/* Filtrado por emoción y marcado de días inolvidables */
document.addEventListener('DOMContentLoaded', () => {
  const emotionFilters = document.querySelectorAll('.emotion-filter');
  const diaryCards = document.querySelectorAll('.diary-card');
  const markButtons = document.querySelectorAll('.mark-inolvidable');
  const dateSelector = document.getElementById('diaryDate');

  // Filtro por emoción
  emotionFilters.forEach(filterBtn => {
    filterBtn.addEventListener('click', () => {
      const emotion = filterBtn.dataset.emotion;
      diaryCards.forEach(card => {
        // Mostrar todas o solo las que coincidan
        if (emotion === 'all' || card.dataset.emotion === emotion) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Marcar día como inolvidable
  markButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.diary-card');
      card.classList.toggle('inolvidable');
      btn.textContent = card.classList.contains('inolvidable')
        ? 'Día Marcado como Inolvidable'
        : 'Marcar como Día Inolvidable';
    });
  });

  // Filtrar por fecha
  dateSelector.addEventListener('change', () => {
    const selectedDate = dateSelector.value;  // Formato ISO: "YYYY-MM-DD"
    diaryCards.forEach(card => {
      const cardDate = card.dataset.date; // Mismo formato en data-date
      if (!selectedDate || cardDate === selectedDate) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});


// SECCION LIENA DE TIEMPO

/* Funcionalidades para la sección Línea de Tiempo */
document.addEventListener("DOMContentLoaded", function() {
  // Filtros: Si existen dropdowns para año y emoción
  const yearFilter = document.getElementById("yearFilter");
  const emotionFilter = document.getElementById("emotionFilter");
  const timelinePoints = document.querySelectorAll(".timeline-point");
  const timelineCards = document.querySelectorAll(".timeline-card");

  function filterTimeline() {
    const selectedYear = yearFilter ? yearFilter.value : "all";
    const selectedEmotion = emotionFilter ? emotionFilter.value : "all";

    timelinePoints.forEach(point => {
      const pointYear = point.getAttribute("data-year");
      const pointEmotion = point.getAttribute("data-emotion");
      point.style.display = 
        (selectedYear === "all" || selectedYear === pointYear) &&
        (selectedEmotion === "all" || selectedEmotion === pointEmotion)
          ? "block" : "none";
    });

    timelineCards.forEach(card => {
      const cardYear = card.getAttribute("data-year");
      const cardEmotion = card.getAttribute("data-emotion");
      card.style.display = 
        (selectedYear === "all" || selectedYear === cardYear) &&
        (selectedEmotion === "all" || selectedEmotion === cardEmotion)
          ? "block" : "none";
    });
  }

  if (yearFilter) yearFilter.addEventListener("change", filterTimeline);
  if (emotionFilter) emotionFilter.addEventListener("change", filterTimeline);

  // Navegación de la barra cronológica por flechas
  const prevTimeline = document.getElementById("prevTimeline");
  const nextTimeline = document.getElementById("nextTimeline");
  const timelinePointsContainer = document.querySelector(".timeline-points");

  prevTimeline.addEventListener("click", function() {
    timelinePointsContainer.scrollBy({ left: -150, behavior: "smooth" });
  });

  nextTimeline.addEventListener("click", function() {
    timelinePointsContainer.scrollBy({ left: 150, behavior: "smooth" });
  });

  // Modo viaje automático
  const autoPlayBtn = document.getElementById("autoPlayBtn");
  let autoPlayInterval;
  autoPlayBtn.addEventListener("click", function() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      autoPlayBtn.textContent = "Modo Viaje Automático";
    } else {
      autoPlayBtn.textContent = "Detener Viaje";
      autoPlayInterval = setInterval(function() {
        timelinePointsContainer.scrollBy({ left: 150, behavior: "smooth" });
      }, 2000);
    }
  });
});


//SECCION MAPA

document.addEventListener('DOMContentLoaded', () => {
  const markers = document.querySelectorAll('.marker');
  const mapModal = document.getElementById('mapModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalLocation = document.getElementById('modalLocation');
  const modalStory = document.getElementById('modalStory');
  const modalDate = document.getElementById('modalDate');
  const modalEmotion = document.getElementById('modalEmotion');
  const modalImg = document.getElementById('modalImg');
  const categoryItems = document.querySelectorAll('.map-sidebar li');
  const randomTravelBtn = document.getElementById('randomTravelBtn');
  const adventureFilter = document.getElementById('adventureFilter');
  const misteryChestBtn = document.getElementById('misteryChestBtn');
  const misteryChestContent = document.getElementById('misteryChestContent');
  const mapBase = document.getElementById('mapBase');

  // 1. Posicionar los marcadores según data-top y data-left
  markers.forEach(marker => {
    marker.style.top = marker.dataset.top;
    marker.style.left = marker.dataset.left;

    // Al hacer clic en un marcador, mostrar modal con datos
    marker.addEventListener('click', () => {
      mapModal.classList.add('active');
      modalLocation.textContent = marker.dataset.location;
      modalStory.textContent = marker.dataset.story;
      modalDate.textContent = marker.dataset.date;
      modalEmotion.textContent = marker.dataset.emotion;
      // Se puede ajustar la imagen si se requiere variar según datos
      // modalImg.src = ...
    });
  });

  // 2. Cerrar modal
  closeModalBtn.addEventListener('click', () => {
    mapModal.classList.remove('active');
  });

  // 3. Filtro por categoría en sidebar
  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const filter = item.dataset.filter;
      markers.forEach(marker => {
        marker.style.display = (filter === marker.dataset.type) ? 'block' : 'none';
      });
    });
  });

  // 4. Filtro por tipo de aventura desde select
  adventureFilter.addEventListener('change', (e) => {
    const value = e.target.value;
    markers.forEach(marker => {
      marker.style.display = (value === 'all' || value === marker.dataset.type) ? 'block' : 'none';
    });
  });

  // 5. Botón "Viaje al azar": elegir marcador visible aleatorio
  randomTravelBtn.addEventListener('click', () => {
    const visibleMarkers = Array.from(markers).filter(m => getComputedStyle(m).display !== 'none');
    if (visibleMarkers.length > 0) {
      const randomIndex = Math.floor(Math.random() * visibleMarkers.length);
      visibleMarkers[randomIndex].click();
    } else {
      alert('No hay lugares que coincidan con el filtro actual.');
    }
  });

  // 6. Cofre Mágico: mostrar/ocultar contenido
  misteryChestBtn.addEventListener('click', () => {
    misteryChestContent.style.display = (misteryChestContent.style.display === 'block') ? 'none' : 'block';
  });

  // 7. Modo Día/Noche según hora
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 18) {
    mapBase.classList.add('day-mode');
  } else {
    mapBase.classList.add('night-mode');
  }
});

// Seleccionar elementos
const mapModal = document.getElementById('mapModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Función para cerrar el modal
function closeModal() {
  mapModal.classList.remove('active');
}

// Evento para cerrar el modal al hacer clic en el botón de cierre
closeModalBtn.addEventListener('click', closeModal);

// Opcional: Cerrar el modal al hacer clic fuera del contenido
mapModal.addEventListener('click', (e) => {
  if (e.target === mapModal) {
    closeModal();
  }
});


// SECCION EMOCIONES




document.addEventListener('DOMContentLoaded', () => {
  const emotionCards = document.querySelectorAll('.emotion-card');
  const emotionalGallery = document.querySelector('.emotional-gallery');
  const emotionalItems = document.querySelectorAll('.emotional-item');
  const emotionAudio = document.getElementById('emotionAudio');
  const searchInput = document.getElementById('searchEmotions');
  const sortDateSelect = document.getElementById('sortDate');
  const randomItemBtn = document.getElementById('randomItemBtn');
  const downloadSummaryBtn = document.getElementById('downloadSummaryBtn');
  const toggleFavoritesBtn = document.getElementById('toggleFavorites');
  const mixButton = document.getElementById('mixEmotionsBtn');

  const summaryEmotion = document.getElementById('summaryEmotion');
  const summaryHappyDay = document.getElementById('summaryHappyDay');
  const summaryNostalgicMonth = document.getElementById('summaryNostalgicMonth');
  const emotionChartCanvas = document.getElementById('emotionChart');

  // Mapa de audio para cada emoción
  const emotionAudioMap = {
    'Alegría': 'audio/alegria.mp3',
    'Nostalgia': 'audio/nostalgia.mp3',
    'Amor': 'audio/amor.mp3',
    'Orgullo': 'audio/orgullo.mp3',
    'Tristeza': 'audio/tristeza.mp3',
    'Asombro': 'audio/asombro.mp3',
    'Paz': 'audio/paz.mp3'
  };

  // Persistencia de favoritos
  let favoriteEmotions = JSON.parse(localStorage.getItem('favoriteEmotions')) || [];

  // Actualizar UI de favoritos en emociones
  function updateFavoriteUI() {
    emotionCards.forEach(card => {
      const favBtn = card.querySelector('.favorite-btn');
      const emotion = card.dataset.emotion;
      if (favoriteEmotions.includes(emotion)) {
        favBtn.classList.add('favorited');
      } else {
        favBtn.classList.remove('favorited');
      }
    });
  }
  updateFavoriteUI();

  // Actualizar resumen y (opcional) gráfico de emociones
  function updateSummary() {
    const emotionCount = {};
    emotionalItems.forEach(item => {
      if (item.classList.contains('visible')) {
        const emo = item.dataset.emotion;
        emotionCount[emo] = (emotionCount[emo] || 0) + 1;
      }
    });
    let maxEmotion = 'Ninguna', maxCount = 0;
    for (const emo in emotionCount) {
      if (emotionCount[emo] > maxCount) {
        maxCount = emotionCount[emo];
        maxEmotion = emo;
      }
    }
    summaryEmotion.textContent = maxEmotion;

    // Día más feliz: ítems de “Alegría” ordenados por fecha
    const happyItems = [...emotionalItems].filter(item =>
      item.dataset.emotion === 'Alegría' && item.classList.contains('visible')
    );
    if (happyItems.length) {
      happyItems.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
      summaryHappyDay.textContent = happyItems[0].dataset.date || '-';
    } else {
      summaryHappyDay.textContent = '-';
    }

    // Mes más nostálgico: contar ítems de “Nostalgia” por mes
    const nostalgiaItems = [...emotionalItems].filter(item =>
      item.dataset.emotion === 'Nostalgia' && item.classList.contains('visible')
    );
    const monthCount = {};
    nostalgiaItems.forEach(item => {
      const date = new Date(item.dataset.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthCount[key] = (monthCount[key] || 0) + 1;
    });
    let maxMonth = '-', maxMonthVal = 0;
    for (const m in monthCount) {
      if (monthCount[m] > maxMonthVal) {
        maxMonthVal = monthCount[m];
        maxMonth = m;
      }
    }
    summaryNostalgicMonth.textContent = maxMonth;

    // Actualizar gráfico (si Chart.js está disponible)
    if (typeof Chart !== 'undefined') {
      const labels = Object.keys(emotionCount);
      const data = Object.values(emotionCount);
      // Si ya existe una instancia, destrúyela para re-renderizar
      if (window.emotionChart) window.emotionChart.destroy();
      window.emotionChart = new Chart(emotionChartCanvas, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Distribución de Emociones',
            data: data,
            backgroundColor: ['#16a085','#2980b9','#e74c3c','#f39c12','#bdc3c7','#8e44ad','#27ae60']
          }]
        },
        options: { responsive: true }
      });
    }
  }

  // Funciones para mostrar y ocultar ítems
  function showItem(item) { item.classList.add('visible'); }
  function hideItem(item) { item.classList.remove('visible'); }

  // Agregar botones de edición y eliminación a cada ítem
  function addItemActions(item) {
    let actions = item.querySelector('.item-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'item-actions';
      actions.innerHTML = `
        <button class="edit-item">Editar</button>
        <button class="delete-item">Eliminar</button>
      `;
      item.appendChild(actions);
      // Editar ítem
      actions.querySelector('.edit-item').addEventListener('click', () => {
        const newDesc = prompt('Editar descripción:', item.querySelector('.item-desc').textContent);
        if (newDesc !== null) {
          item.querySelector('.item-desc').textContent = newDesc;
          updateSummary();
        }
      });
      // Eliminar ítem
      actions.querySelector('.delete-item').addEventListener('click', () => {
        if (confirm('¿Eliminar este ítem?')) {
          item.remove();
          updateSummary();
        }
      });
    }
  }
  // Inicialmente añade botones a todos los ítems existentes
  emotionalItems.forEach(item => addItemActions(item));

  // 1. Manejo de emoción en los selectores
  emotionCards.forEach(card => {
    const selectedEmotion = card.dataset.emotion;
    const favBtn = card.querySelector('.favorite-btn');

    // Toggle de favorito
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      favBtn.classList.toggle('favorited');
      if (favBtn.classList.contains('favorited')) {
        favoriteEmotions.push(selectedEmotion);
      } else {
        favoriteEmotions = favoriteEmotions.filter(e => e !== selectedEmotion);
      }
      localStorage.setItem('favoriteEmotions', JSON.stringify(favoriteEmotions));
      updateFavoriteUI();
    });

    // Al hacer clic, reproducir audio y filtrar ítems de la emoción
    card.addEventListener('click', () => {
      if (emotionAudioMap[selectedEmotion]) {
        emotionAudio.src = emotionAudioMap[selectedEmotion];
        emotionAudio.play().catch(() => {});
      }
      emotionalItems.forEach(item => {
        (item.dataset.emotion === selectedEmotion) ? showItem(item) : hideItem(item);
      });
      updateSummary();
    });
  });

  // 2. Filtrado por búsqueda
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    emotionalItems.forEach(item => {
      const desc = item.querySelector('.item-desc')?.textContent.toLowerCase() || '';
      (desc.includes(query)) ? showItem(item) : hideItem(item);
    });
    updateSummary();
  });

  // 3. Ordenar ítems por fecha
  sortDateSelect.addEventListener('change', () => {
    const value = sortDateSelect.value;
    const itemsArray = Array.from(document.querySelectorAll('.emotional-item'));
    itemsArray.sort((a, b) => {
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);
      return (value === 'asc') ? dateA - dateB : dateB - dateA;
    });
    itemsArray.forEach(item => emotionalGallery.appendChild(item));
  });

  // 4. Generar ítem aleatorio (con botones de acción)
  randomItemBtn.addEventListener('click', () => {
    const emotions = ['Alegría','Nostalgia','Amor','Orgullo','Tristeza','Asombro','Paz'];
    const randEmo = emotions[Math.floor(Math.random() * emotions.length)];
    const today = new Date().toISOString().split('T')[0];
    const newItem = document.createElement('div');
    newItem.className = 'emotional-item visible';
    newItem.dataset.emotion = randEmo;
    newItem.dataset.date = today;
    newItem.innerHTML = `
      <img src="https://via.placeholder.com/300x200?text=Nuevo+${randEmo}" alt="Foto de ${randEmo}">
      <div class="item-info">
        <span class="item-date">${today}</span>
        <p class="item-desc">Recuerdo fresco de ${randEmo}.</p>
        <div class="item-intensity">
          <span>⭐️⭐️⭐️☆</span>
        </div>
      </div>
    `;
    addItemActions(newItem);
    emotionalGallery.appendChild(newItem);
    updateSummary();
    alert(`Se ha generado un ítem de emoción: ${randEmo}`);
  });

  // 5. Descargar resumen (JSON)
  downloadSummaryBtn.addEventListener('click', () => {
    const summaryData = {
      emotionPredominant: summaryEmotion.textContent,
      happyDay: summaryHappyDay.textContent,
      nostalgicMonth: summaryNostalgicMonth.textContent,
      favorites: favoriteEmotions
    };
    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resumen_emociones.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // 6. Toggle para mostrar solo ítems de emociones favoritas
  let showingFavorites = false;
  toggleFavoritesBtn.addEventListener('click', () => {
    showingFavorites = !showingFavorites;
    if (showingFavorites) {
      // Filtrar ítems: mostrar solo aquellos cuya emoción esté en favoriteEmotions
      emotionalItems.forEach(item => {
        (favoriteEmotions.includes(item.dataset.emotion)) ? showItem(item) : hideItem(item);
      });
      toggleFavoritesBtn.textContent = 'Mostrar Todos';
    } else {
      emotionalItems.forEach(item => showItem(item));
      toggleFavoritesBtn.textContent = 'Mostrar Favoritos';
    }
    updateSummary();
  });

  // 7. Botón “Mezcla mágica de emociones”
  mixButton.addEventListener('click', () => {
    emotionalItems.forEach(item => showItem(item));
    emotionAudio.pause();
    emotionAudio.src = '';
    alert('Se ha mezclado todo el espectro de emociones. ¡Disfrútalo!');
    updateSummary();
  });

  // 8. Al inicio, mostrar todos los ítems y actualizar resumen
  emotionalItems.forEach(item => showItem(item));
  updateSummary();
});






// SECCION RECUERDOS


/* Funcionalidades extendidas para la sección Recuerdos */
document.addEventListener("DOMContentLoaded", function() {
  // Dinamizar el título de la sección
  const recuerdosTitle = document.getElementById("recuerdosTitle");
  recuerdosTitle.textContent = "Recuerdos"; // Puedes actualizar dinámicamente según contexto

  // Filtros de recuerdo
  const filtroBtns = document.querySelectorAll(".filtro-btn");
  const recuerdoItems = document.querySelectorAll(".recuerdo-item");

  filtroBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filtroBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      recuerdoItems.forEach(item => {
        if (filter === "todo" || item.getAttribute("data-filter") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Modal para ampliar recuerdo
  const modal = document.getElementById("recuerdoModal");
  const closeModal = document.getElementById("closeRecuerdoModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalFecha = document.getElementById("modalFecha");
  const modalHistoria = document.getElementById("modalHistoria");
  const modalEmocion = document.getElementById("modalEmocion");
  const modalMusica = document.getElementById("modalMusica");
  const btnVolverVivir = document.getElementById("btnVolverVivir");
  const btnCompartir = document.getElementById("btnCompartir");

  // Abrir modal al hacer clic en una tarjeta del mosaico
  recuerdoItems.forEach(item => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      const titulo = item.querySelector(".recuerdo-titulo").textContent;
      const fecha = item.querySelector(".recuerdo-fecha").textContent;
      const historia = item.querySelector(".recuerdo-texto").textContent;
      const emocion = item.querySelector(".recuerdo-emocion").textContent;
      modalImg.src = imgSrc;
      modalTitulo.textContent = titulo;
      modalFecha.textContent = fecha;
      modalHistoria.textContent = historia;
      modalEmocion.textContent = "Emoción: " + emocion;
      // Asigna música según emoción
      if (emocion.includes("🌟")) {
        modalMusica.src = "audio/inolvidable.mp3";
      } else if (emocion.includes("🌱")) {
        modalMusica.src = "audio/primeras.mp3";
      } else if (emocion.includes("💔")) {
        modalMusica.src = "audio/dificil.mp3";
      } else if (emocion.includes("🎉")) {
        modalMusica.src = "audio/no-volvera.mp3";
      } else if (emocion.includes("💖")) {
        modalMusica.src = "audio/favoritos.mp3";
      } else {
        modalMusica.src = "audio/default.mp3";
      }
      modalMusica.play().catch(() => {});
      modal.style.display = "flex";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modalMusica.pause();
  });

  // Botón "Volver a vivir este momento"
  btnVolverVivir.addEventListener("click", () => {
    // Aquí podrías reiniciar animaciones o simplemente cerrar el modal
    modal.style.display = "none";
    modalMusica.pause();
  });

  // Botón "Compartir este recuerdo"
  btnCompartir.addEventListener("click", () => {
    // Simulamos una acción de compartir (por ejemplo, mostrar un mensaje o abrir una ventana)
    alert("Compartir este recuerdo... (acción simulada)");
  });

  // Panel flotante "Hoy recordamos..."
  const randomRecuerdoPanel = document.getElementById("randomRecuerdo");
  const mensajesRecuerdo = [
    "Hoy recordamos: la risa compartida en un día perfecto.",
    "Hoy recordamos: ese abrazo que lo decía todo.",
    "Hoy recordamos: un instante de paz en medio del caos.",
    "Hoy recordamos: el inicio de una aventura inolvidable."
  ];
  function actualizarRecuerdoAleatorio() {
    const mensaje = mensajesRecuerdo[Math.floor(Math.random() * mensajesRecuerdo.length)];
    randomRecuerdoPanel.textContent = mensaje;
  }
  actualizarRecuerdoAleatorio();
  setInterval(actualizarRecuerdoAleatorio, 30000);

  // Botón "Enviar al futuro" (simulación)
  const sendFutureBtn = document.getElementById("sendFutureBtn");
  sendFutureBtn.addEventListener("click", () => {
    alert("Este recuerdo se enviará al futuro... (acción simulada)");
  });

  // Botón "Cadena de recuerdos" (simulación de transición o concatenación de imágenes)
  const chainRecuerdosBtn = document.getElementById("chainRecuerdosBtn");
  chainRecuerdosBtn.addEventListener("click", () => {
    alert("Iniciando cadena de recuerdos... (acción simulada)");
    // Aquí podrías iniciar una animación que conecte recuerdos por tema o emoción
  });
});



//FOOTER


/* Funcionalidades para el Footer */
document.addEventListener("DOMContentLoaded", function() {
  // Frases inspiradoras para el footer
  const footerPhrases = [
    "Cada recuerdo merece ser contado… y guardado con amor.",
    "Gracias por volver a sentir tu historia.",
    "La vida no se vive solo una vez… se revive en cada foto.",
    "Un final que inspira un nuevo comienzo.",
    "Tus pasos dejan huella en el corazón del tiempo."
  ];

  // Elemento para la frase
  const footerPhraseElem = document.getElementById("footerPhrase");

  // Función para alternar frases automáticamente
  let phraseIndex = 0;
  function updateFooterPhrase() {
    footerPhraseElem.textContent = footerPhrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % footerPhrases.length;
  }

  updateFooterPhrase();
  setInterval(updateFooterPhrase, 5000); // Cambia la frase cada 5 segundos

  // Botón secreto: muestra un recuerdo oculto con efecto sorpresa
  const secretBtn = document.getElementById("secretBtn");
  secretBtn.addEventListener("click", function() {
    // Aquí se puede hacer una animación o desplegar contenido oculto
    alert("¡Has desbloqueado un recuerdo secreto! 'El primer atardecer en el lugar donde nacieron tus sueños.'");
  });

  // Opcional: cambiar el color del footer según la hora del día (modo noche)
  function updateFooterTheme() {
    const hour = new Date().getHours();
    const footer = document.getElementById("footer");
    if (hour >= 19 || hour < 7) {
      footer.style.background = "linear-gradient(to right, #2c3e50, #4ca1af)"; // tonos más oscuros
      footer.style.color = "#ccc";
      document.querySelectorAll(".footer-nav ul li a").forEach(link => {
        link.style.color = "#ccc";
      });
    } else {
      footer.style.background = "linear-gradient(to right, #f8f9fa, #fff2f7)";
      footer.style.color = "#444";
      document.querySelectorAll(".footer-nav ul li a").forEach(link => {
        link.style.color = "#444";
      });
    }
  }
  updateFooterTheme();
  // Actualizar tema cada vez que se carga la página
});
