// ==========================================
// PLANTILLA #3 - JAVASCRIPT
// Landing Page Clínica Elegante
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MENÚ MÓVIL
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Cambiar icono
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    });
    
    // Cerrar menú al hacer click en enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
    
    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // NAVBAR TRANSPARENTE A SÓLIDO
    // ==========================================
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.remove('bg-slate-900/95');
            navbar.classList.add('bg-slate-900', 'shadow-2xl');
        } else {
            navbar.classList.remove('bg-slate-900', 'shadow-2xl');
            navbar.classList.add('bg-slate-900/95');
        }
    });
    
// ==========================================
// FORMULARIO DE CONTACTO → FORMSUBMIT
// ==========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = this.querySelector('input[name="nombre"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const telefono = this.querySelector('input[name="telefono"]').value;
        const especialidad = this.querySelector('select[name="especialidad"]').value;
        const mensaje = this.querySelector('textarea[name="mensaje"]').value || 'Sin mensaje adicional';
        
        // Validación básica
        if (!nombre || !email || !telefono || !especialidad) {
            mostrarNotificacion('Por favor completa todos los campos obligatorios (*).', 'error');
            return;
        }
        
        // Validación de email
        if (!isValidEmail(email)) {
            mostrarNotificacion('Por favor ingresa un correo electrónico válido.', 'error');
            return;
        }
        
        // Validación de teléfono
        if (!isValidPhone(telefono)) {
            mostrarNotificacion('Por favor ingresa un número de teléfono válido.', 'error');
            return;
        }
        
        // Deshabilitar botón y mostrar loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
        
        // Enviar a FormSubmit usando AJAX
        fetch('https://formsubmit.co/ajax/contacto@clinicasaludtotal.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                telefono: telefono,
                especialidad: especialidad,
                mensaje: mensaje,
                _subject: `Nueva Solicitud de Cita - ${especialidad}`,
                _template: 'table',
                _captcha: 'false'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Limpiar formulario
            contactForm.reset();
            
            // Mostrar modal de confirmación
            mostrarModalExito(nombre, especialidad);
        })
        .catch((error) => {
            console.error('Error:', error);
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Mostrar error
            mostrarNotificacion('Hubo un problema al enviar. Por favor intenta nuevamente o llámanos.', 'error');
        });
    });
}

// ==========================================
// MODAL DE ÉXITO
// ==========================================
function mostrarModalExito(nombre, especialidad) {
    const modal = document.createElement('div');
    modal.id = 'modal-confirmacion';
    modal.innerHTML = `
        <div id="modal-background" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(5px); animation: fadeIn 0.3s ease;">
            <div id="modal-content" style="background: white; padding: 40px 20px; border-radius: 24px; max-width: 500px; width: calc(100% - 40px); text-align: center; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3); animation: slideUp 0.4s ease;">
                
                <!-- Icono de éxito -->
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);">
                    <i class="fas fa-check" style="font-size: 40px; color: white;"></i>
                </div>
                
                <!-- Título -->
                <h2 style="font-size: clamp(24px, 5vw, 36px); color: #1e293b; margin-bottom: 16px; font-family: 'Playfair Display', serif; font-weight: 700;">
                    ¡Solicitud Enviada!
                </h2>
                
                <!-- Mensaje -->
                <p style="color: #64748b; font-size: clamp(14px, 3vw, 18px); margin-bottom: 20px; line-height: 1.7; padding: 0 10px;">
                    Gracias <strong style="color: #1e293b;">${nombre}</strong>, hemos recibido tu solicitud para <strong style="color: #d4af37;">${especialidad}</strong>.
                </p>
                
                <p style="color: #64748b; font-size: clamp(13px, 2.5vw, 16px); margin-bottom: 24px; padding: 0 10px;">
                    Te contactaremos pronto por correo electrónico o teléfono.
                </p>
                
                <!-- Información adicional -->
                <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                    <p style="color: #475569; font-size: clamp(12px, 2.5vw, 15px); margin: 0;">
                        <i class="fas fa-info-circle" style="color: #d4af37; margin-right: 8px;"></i>
                        Revisa tu bandeja de entrada
                    </p>
                </div>
                
                <!-- Botón cerrar -->
                <button id="btn-cerrar-modal"
                        class="gradient-gold"
                        style="border: none; color: #1e293b; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: clamp(14px, 3vw, 16px); cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4); width: 100%; max-width: 300px;">
                    <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                    Entendido
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar evento al botón "Entendido"
    const btnCerrar = document.getElementById('btn-cerrar-modal');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', cerrarModal);
        
        // Hover effects
        btnCerrar.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.5)';
        });
        
        btnCerrar.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.4)';
        });
    }
    
    // Cerrar con tecla ESC
    const handleEscKey = function(e) {
        if (e.key === 'Escape') {
            cerrarModal();
            document.removeEventListener('keydown', handleEscKey);
        }
    };
    document.addEventListener('keydown', handleEscKey);
    
    // Cerrar al hacer clic fuera del modal
    const modalBackground = document.getElementById('modal-background');
    if (modalBackground) {
        modalBackground.addEventListener('click', function(e) {
            if (e.target.id === 'modal-background') {
                cerrarModal();
            }
        });
    }
}

// ==========================================
// CERRAR MODAL
// ==========================================
function cerrarModal() {
    const modal = document.getElementById('modal-confirmacion');
    if (modal) {
        const modalContent = document.getElementById('modal-content');
        
        // Animar salida
        if (modalContent) {
            modalContent.style.animation = 'slideDown 0.3s ease';
        }
        modal.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ==========================================
// FUNCIÓN PARA MOSTRAR NOTIFICACIONES
// ==========================================
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notification = document.createElement('div');
    
    const estilos = tipo === 'success' 
        ? 'background: linear-gradient(135deg, #10b981, #059669);' 
        : 'background: linear-gradient(135deg, #ef4444, #dc2626);';
    
    const icono = tipo === 'success' 
        ? '<i class="fas fa-check-circle" style="font-size: 18px;"></i>' 
        : '<i class="fas fa-exclamation-circle" style="font-size: 18px;"></i>';
    
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; left: 20px; right: 20px; ${estilos} color: white; padding: 16px 20px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); z-index: 10000; font-weight: 600; max-width: 400px; margin-left: auto; display: flex; align-items: center; gap: 10px; animation: slideInFromTop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);">
            ${icono}
            <span style="flex: 1; font-size: 14px; line-height: 1.4;">${mensaje}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutToTop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// ==========================================
// AGREGAR ANIMACIONES CSS
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(50px);
            opacity: 0;
        }
    }
    
    @keyframes slideInFromTop {
        from {
            transform: translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutToTop {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


    
    // ==========================================
    // ANIMACIÓN DE CARDS AL HACER SCROLL
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(40px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar cards de servicios
    const serviceCards = document.querySelectorAll('.card-hover');
    serviceCards.forEach(card => observer.observe(card));
    
    // Observar galería
    const galleryItems = document.querySelectorAll('#galeria .group');
    galleryItems.forEach(item => observer.observe(item));
    
    // ==========================================
    // CONTADORES ANIMADOS (STATS)
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16);
        const text = element.textContent;
        const suffix = text.replace(/[0-9]/g, '');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.text-4xl');
                
                stats.forEach(stat => {
                    const text = stat.textContent;
                    const num = parseInt(text.replace(/\D/g, ''));
                    
                    if (!isNaN(num) && !stat.dataset.animated) {
                        stat.dataset.animated = 'true';
                        animateCounter(stat, num, 2500);
                    }
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.bg-slate-900.py-8');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ==========================================
    // ANIMACIÓN WHATSAPP BUTTON
    // ==========================================
    const whatsappBtn = document.querySelector('a[href^="https://wa.me"]');
    
    if (whatsappBtn) {
        // Pulse animación cada 5 segundos
        setInterval(() => {
            whatsappBtn.style.animation = 'pulse 1s';
            setTimeout(() => {
                whatsappBtn.style.animation = '';
            }, 1000);
        }, 5000);
    }
    
    // ==========================================
    // PARALLAX EFFECT EN HERO
    // ==========================================
    const heroSection = document.querySelector('.hero-image');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.backgroundPositionY = parallax + 'px';
        });
    }
    
    // ==========================================
    // HOVER EFFECT EN IMÁGENES DE GALERÍA
    // ==========================================
    const galleryImages = document.querySelectorAll('#galeria img');
    
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ==========================================
    // HOVER EFFECT EN FOTOS DEL EQUIPO
    // ==========================================
    const teamImages = document.querySelectorAll('#equipo img');
    
    teamImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ==========================================
    // VALIDACIÓN DE EMAIL
    // ==========================================
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ==========================================
    // VALIDACIÓN DE TELÉFONO
    // ==========================================
    function isValidPhone(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 8;
    }
    
    // Validación en tiempo real de email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('border-red-500');
                this.classList.remove('border-yellow-500');
            } else if (this.value) {
                this.classList.remove('border-red-500');
                this.classList.add('border-yellow-500');
            }
        });
        
        input.addEventListener('focus', function() {
            this.classList.remove('border-red-500');
        });
    });
    
    // Validación en tiempo real de teléfono
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                this.classList.add('border-red-500');
                this.classList.remove('border-yellow-500');
            } else if (this.value) {
                this.classList.remove('border-red-500');
                this.classList.add('border-yellow-500');
            }
        });
        
        input.addEventListener('focus', function() {
            this.classList.remove('border-red-500');
        });
    });
    
    // ==========================================
    // LAZY LOADING PARA IMÁGENES (DESACTIVADO)
    // ==========================================
    // Esta función causaba que las imágenes desaparecieran al hacer scroll
    // Si quieres activarla, descomenta el código a continuación:
    
    /*
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    */
    
    // ==========================================
    // SCROLL TO TOP BUTTON (OPCIONAL)
    // ==========================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'fixed bottom-24 right-6 w-12 h-12 gradient-gold rounded-full text-slate-900 shadow-2xl hover:shadow-3xl transition opacity-0 pointer-events-none z-40';
    scrollTopBtn.style.transition = 'opacity 0.3s, transform 0.3s';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    console.log('✅ Plantilla #3 Elegante - JavaScript cargado correctamente');
    console.log('🎨 Tema: Dorado/Slate con imágenes reales');
});