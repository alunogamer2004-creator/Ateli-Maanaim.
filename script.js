// Funções globais do site

// Abrir WhatsApp
function abrirWhatsApp(numero, mensagem = '') {
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Inicializar ano no footer
document.addEventListener('DOMContentLoaded', () => {
    const anoElement = document.getElementById('ano-atual');
    if (anoElement) {
        anoElement.textContent = new Date().getFullYear();
    }
});

// Menu mobile (simples)
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        nav.classList.toggle('mobile-open');
    }
}
