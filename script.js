const interior = document.getElementById('interiorFrasco');
const frasco = document.getElementById('frasco');
const audio = document.getElementById('musica');
const btn = document.getElementById('btnMusica');

const frasesDeseos = [
    "Siempre juntos ✨",
    "Felicidad infinita para ti ❤️",
    "Que nunca falte tu sonrisa 😊",
    "Mucho amor y risas 💖",
    "Cumplir todos tus sueños 🌟",
    "Días llenos de luz ☀️",
    "Un futuro brillante para nosotros ✨",
    "Momentos inolvidables 💞"
];

//  Generador Automático de Estrellas 
const maxEstrellas = 80;
for (let i = 0; i < maxEstrellas; i++) {
    let estrella = document.createElement('div');
    estrella.className = 'estrella';
    let tamano = Math.random() * 2.5 + 1;
    estrella.style.width = tamano + 'px';
    estrella.style.height = tamano + 'px';
    estrella.style.top = Math.random() * 100 + 'vh';
    estrella.style.left = Math.random() * 100 + 'vw';
    estrella.style.animationDuration = Math.random() * 3 + 2 + 's';
    estrella.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(estrella);
}

//  Generar Luciérnagas Orgánicas 
const cantidadLuciernagas = 18;
for (let i = 0; i < cantidadLuciernagas; i++) {
    let luc = document.createElement('div');
    luc.className = 'particula luciernaga';
    
    let tam = Math.random() * 5 + 4;
    luc.style.width = tam + 'px';
    luc.style.height = tam + 'px';

    luc.style.setProperty('--mx-1', Math.random() * 160 + 10 + 'px');
    luc.style.setProperty('--my-1', Math.random() * 240 + 30 + 'px');
    luc.style.setProperty('--mx-2', Math.random() * 160 + 10 + 'px');
    luc.style.setProperty('--my-2', Math.random() * 240 + 30 + 'px');
    
    luc.style.setProperty('--scale-1', Math.random() * 0.5 + 0.6);
    luc.style.setProperty('--scale-2', Math.random() * 0.4 + 1.1);

    luc.style.animationDuration = Math.random() * 5 + 4 + 's';
    luc.style.animationDelay = '-' + (Math.random() * 6) + 's';

    interior.appendChild(luc);
}

// Lanzamiento Mágico 
function liberarMagia() {
    frasco.classList.add('agitar');
    setTimeout(() => frasco.classList.remove('agitar'), 900);

    if (audio.paused) {
        toggleMusica();
    }

    const rectFrasco = frasco.getBoundingClientRect();
    const centroX = rectFrasco.left + rectFrasco.width / 2;
    const bocaY = rectFrasco.top + 10;

    // 1. FRASE DE DESEO - HIPER LENTA (15 SEGUNDOS EN PANTALLA)
    const fraseAleatoria = frasesDeseos[Math.floor(Math.random() * frasesDeseos.length)];
    const contenedorTexto = document.createElement('div');
    contenedorTexto.className = 'texto-deseo';
    contenedorTexto.innerText = fraseAleatoria;
    
    document.body.appendChild(contenedorTexto);
    contenedorTexto.style.left = (centroX - contenedorTexto.offsetWidth / 2) + 'px';
    contenedorTexto.style.top = bocaY + 'px';

    let despXTexto = (Math.random() * 60 - 30); 
    let despYTexto = -(Math.random() * 120 + 280); 

    contenedorTexto.animate([
        { transform: 'translate(0, 0) scale(0.6)', opacity: 0 },
        { transform: `translate(${despXTexto * 0.2}px, ${despYTexto * 0.15}px) scale(1.05)`, opacity: 1 },
        { transform: `translate(${despXTexto * 0.6}px, ${despYTexto * 0.6}px) scale(1)`, opacity: 0.95 },
        { transform: `translate(${despXTexto}px, ${despYTexto}px) scale(0.95)`, opacity: 0 }
    ], {
        duration: 15000, 
        easing: 'cubic-bezier(0.2, 0.75, 0.4, 1)'
    });

    setTimeout(() => { contenedorTexto.remove(); }, 15000);

    // 2. CORAZONES - MOVIMIENTO DE INERCIA SÚPER SUAVE (8 A 11 SEGUNDOS)
    for (let i = 0; i < 15; i++) {
        let corazon = document.createElement('div');
        corazon.className = 'corazon-volador';
        corazon.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';
        
        corazon.style.left = (centroX - 10) + 'px';
        corazon.style.top = bocaY + 'px';
        
        document.body.appendChild(corazon);

        let despX = (Math.random() * 320 - 160);
        let despY = -(Math.random() * 250 + 450);
        let duracion = Math.random() * 3 + 8; 

        corazon.animate([
            { transform: 'translate(0, 0) scale(0.3) rotate(0deg)', opacity: 1 },
            { transform: `translate(${despX * 0.25}px, ${despY * 0.25}px) scale(1.1) rotate(${despX > 0 ? 15 : -15}deg)`, opacity: 0.95 },
            { transform: `translate(${despX * 0.6}px, ${despY * 0.6}px) scale(1.3) rotate(${despX > 0 ? -10 : 10}deg)`, opacity: 0.75 },
            { transform: `translate(${despX}px, ${despY}px) scale(1.5) rotate(${despX > 0 ? 25 : -25}deg)`, opacity: 0 }
        ], {
            duration: duracion * 1000,
            easing: 'cubic-bezier(0.1, 0.85, 0.45, 1)' 
        });

        setTimeout(() => { corazon.remove(); }, duracion * 1000);
    }
}

// Controlador Multimedia 
function toggleMusica() {
    if (audio.paused) {
        audio.play().catch(err => console.log("Permiso de audio requerido:", err));
        btn.innerHTML = "🎵 Pausar Melodía";
        btn.classList.add('reproduciendo');
    } else {
        audio.pause();
        btn.innerHTML = "✨ Encender la Magia";
        btn.classList.remove('reproduciendo');
    }
}