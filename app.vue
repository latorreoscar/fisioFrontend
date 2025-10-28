<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header fijo con efecto glassmorphism -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div class="mx-auto px-4">
        <Header />
      </div>
    </header>

    <!-- Espaciador invisible para compensar el header fijo -->
    <div class="h-20"></div>

    <!-- Main content -->
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-br from-teal-50 to-teal-100 border-t border-teal-200 py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">

          <!-- Columna 1: Logo -->
          <div class="flex justify-center lg:justify-start">
            
            <img
            src="@/assets/images/pelvixLogo.png"
            class="h-50 w-auto transition-transform duration-300 hover:scale-105"
            alt="PelvixLatorre Logo"
        />


          </div>

          <!-- Columna 2: Contacto -->
          <div class="space-y-3">
            <h3 class="font-bold text-teal-800 text-lg mb-4">Contacto</h3>
            <div class="space-y-2 text-sm text-gray-700">
              <p>
                <a href="mailto:info@pelvixlatorre.es" class="hover:text-teal-600 transition-colors duration-300">
                 email: info@pelvixlatorre.es
                </a>
              </p>
              <p>
                <a href="tel:+34692445742" class="hover:text-teal-600 transition-colors duration-300">
                  Tfn: +34 692 445 742
                </a>
              </p>
              <div class="flex justify-center lg:justify-start mt-3">
                <a 
                  href="https://instagram.com/mlatorrefisiosp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-teal-600 hover:text-teal-800 transition-colors duration-300 transform hover:scale-110"
                >
                  <svg fill="#000000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-271 273 256 256" xml:space="preserve" stroke="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                      <path d="M-64.5,273h-157c-27.3,0-49.5,22.2-49.5,49.5v52.3v104.8c0,27.3,22.2,49.5,49.5,49.5h157c27.3,0,49.5-22.2,49.5-49.5V374.7 v-52.3C-15.1,295.2-37.3,273-64.5,273z M-50.3,302.5h5.7v5.6v37.8l-43.3,0.1l-0.1-43.4L-50.3,302.5z M-179.6,374.7 c8.2-11.3,21.5-18.8,36.5-18.8s28.3,7.4,36.5,18.8c5.4,7.4,8.5,16.5,8.5,26.3c0,24.8-20.2,45.1-45.1,45.1s-44.9-20.3-44.9-45.1 C-188.1,391.2-184.9,382.1-179.6,374.7z M-40,479.5C-40,493-51,504-64.5,504h-157c-13.5,0-24.5-11-24.5-24.5V374.7h38.2 c-3.3,8.1-5.2,17-5.2,26.3c0,38.6,31.4,70,70,70c38.6,0,70-31.4,70-70c0-9.3-1.9-18.2-5.2-26.3H-40V479.5z">
                      </path>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Columna 3: Dirección -->
          <div class="space-y-3">
            <h3 class="font-bold text-teal-800 text-lg mb-4">Dirección</h3>
            <div class="text-sm text-gray-700">
              <p>C/ Poeta León Felipe, 6</p>
              <p>Local derecha</p>
              <p>50018 Zaragoza</p>
            </div>
          </div>

          <!-- Columna 4: Legal -->
          <div class="space-y-3">
            <h3 class="font-bold text-teal-800 text-lg mb-4">Legal</h3>
            <div class="space-y-2 text-sm">
              <p>
                <a href="/cookies" class="text-gray-700 hover:text-teal-600 transition-colors duration-300">
                  Política de Cookies
                </a>
              </p>
              <p>
                <a href="/terminos" class="text-gray-700 hover:text-teal-600 transition-colors duration-300">
                  Términos de Servicio
                </a>
              </p>
              <p>
                <a href="/privacidad" class="text-gray-700 hover:text-teal-600 transition-colors duration-300">
                  Protección de Datos
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Línea separadora y copyright -->
        <div class="border-t border-teal-200 mt-8 pt-6 text-center">
          <p class="text-sm text-gray-600">
            © 2025 Pelvix - María Latorre. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>


  </div>
</template>

<script>
import Header from './components/header/header.vue';
</script>

<style scoped>
/* Efecto suave de aparición del header al hacer scroll */
@supports (backdrop-filter: blur(16px)) {
  header {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}

/* Fallback para navegadores que no soportan backdrop-filter */
@supports not (backdrop-filter: blur(16px)) {
  header {
    background-color: rgba(255, 255, 255, 0.98);
  }
}
</style>