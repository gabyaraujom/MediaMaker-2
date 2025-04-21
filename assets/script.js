// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations for elements that should appear when scrolled into view
  initScrollAnimations();
  
  // Set up the audio player with custom functionality
  setupAudioPlayer();
  
  // Add click tracking to CTAs
  trackCTAClicks();

  
  // Iniciar as notificações de compra
  initPurchaseNotifications();
});

// Function to handle scroll animations
function initScrollAnimations() {
  // Get all elements that should animate on scroll
  const animatedElements = document.querySelectorAll('.benefits-card, .bonus-item, .cta-section');
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add 'animate' class when element is visible
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Element is considered visible when 10% of it is in viewport
    threshold: 0.1
  });
  
  // Observe each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Function to enhance the audio player
function setupAudioPlayer() {
  const audioPlayer = document.getElementById('testimonial-audio');
  if (!audioPlayer) return;
  
  // Add event listeners to track play/pause
  audioPlayer.addEventListener('play', () => {
    console.log('Audio testimonial started playing');
  });
  
  audioPlayer.addEventListener('pause', () => {
    console.log('Audio testimonial paused');
  });
  
  audioPlayer.addEventListener('ended', () => {
    console.log('Audio testimonial completed');
  });
}

// Function to track CTA button clicks
function trackCTAClicks() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      // Remover o e.preventDefault() para permitir que o link funcione normalmente
      console.log(`CTA button ${index + 1} clicked`);
      
      // Apenas registrar o clique, sem interferir no comportamento padrão
      // O link href agora funcionará normalmente
    });
  });
}


// Função para criar e exibir o balão de notificação de compras
function initPurchaseNotifications() {
  // Lista de nomes brasileiros para as notificações
  const nomes = [
    "Ana Silva", "João Oliveira", "Maria Santos", "Pedro Costa", 
    "Juliana Lima", "Carlos Souza", "Fernanda Almeida", "Ricardo Pereira",
    "Camila Rodrigues", "Bruno Ferreira", "Luciana Carvalho", "Marcos Ribeiro",
    "Patrícia Gomes", "Felipe Martins", "Tatiana Barbosa", "Roberto Alves",
    "Cristina Dias", "Lucas Fernandes", "Vanessa Cardoso", "Eduardo Nunes",
    "Amanda Castro", "Daniel Araújo", "Gabriela Correia", "Rodrigo Teixeira",
    "Alessandra Vieira", "Rafael Moreira", "Aline Rocha", "Marcelo Mendes",
    "Renata Cavalcanti", "Gustavo Pinto", "Luiza Nascimento", "Fábio Lopes",
    "Isabela Campos", "Thiago Lima", "Carolina Machado", "Victor Santos",
    "Beatriz Ferreira", "André Oliveira", "Natália Costa", "Leandro Sousa"
  ];
  
  // Função para criar e mostrar a notificação
  function mostrarNotificacao() {
    // Seleciona um nome aleatório da lista
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    
    // Cria o elemento da notificação
    const notificacao = document.createElement('div');
    notificacao.className = 'fixed bottom-4 left-4 bg-white rounded-lg shadow-xl z-50 p-4 flex items-center max-w-xs transition-all duration-500 transform translate-y-20 opacity-0';
    notificacao.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    notificacao.style.borderLeft = '4px solid #6d28d9'; // Cor primária do site
    
    // Conteúdo da notificação
    notificacao.innerHTML = `
      <div class="bg-primary-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-3">
        <i class="fas fa-shopping-cart text-primary-600"></i>
      </div>
      <div class="flex-1">
        <p class="font-bold text-primary-800">${nomeAleatorio}</p>
        <p class="text-sm text-gray-600">acabou de adquirir o Método Media Maker.</p>
      </div>
      <button class="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Fechar">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Adiciona ao body
    document.body.appendChild(notificacao);
    
    // Anima a entrada
    setTimeout(() => {
      notificacao.classList.remove('translate-y-20', 'opacity-0');
      notificacao.classList.add('translate-y-0', 'opacity-100');
    }, 100);
    
    // Adiciona evento de clique no botão fechar
    const fecharBtn = notificacao.querySelector('button');
    fecharBtn.addEventListener('click', () => {
      removerNotificacao(notificacao);
    });
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
      removerNotificacao(notificacao);
    }, 5000);
  }
  
  // Função para remover a notificação com animação
  function removerNotificacao(elemento) {
    elemento.classList.remove('translate-y-0', 'opacity-100');
    elemento.classList.add('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
      if (elemento && elemento.parentNode) {
        elemento.parentNode.removeChild(elemento);
      }
    }, 500); // Tempo da transição
  }
  
  // Função para gerar um intervalo aleatório (entre 10 e 30 segundos)
  function gerarIntervaloAleatorio() {
    // Retorna um valor entre 10000 (10s) e 30000 (30s)
    return Math.floor(Math.random() * 20000) + 10000;
  }
  
  // Função para agendar a próxima notificação
  function agendarProximaNotificacao() {
    const intervalo = gerarIntervaloAleatorio();
    setTimeout(() => {
      mostrarNotificacao();
      agendarProximaNotificacao(); // Agenda recursivamente
    }, intervalo);
  }
  
  // Inicia a primeira notificação após 10 segundos
  setTimeout(() => {
    mostrarNotificacao();
    agendarProximaNotificacao();
  }, 10000);
}

// Create folder structure for assets
function createFolderStructure() {
  // This is just a placeholder function
  // In a real environment, folder creation would be done before deployment
  console.log('Folder structure created');
}

// Function to scroll to CTA when certain triggers are activated
function scrollToCTA() {
  const scrollTriggers = document.querySelectorAll('.scroll-to-cta');
  const ctaSection = document.querySelector('.cta-button');
  
  if (!ctaSection) return;
  
  scrollTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Initialize scroll to CTA functionality
scrollToCTA();

// Add class to animate elements when they come into view
document.addEventListener('scroll', function() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animated');
    }
  });
});