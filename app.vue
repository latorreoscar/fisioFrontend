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
    <footer class="bg-white border-t border-gray-200 py-6 px-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center h-18">
        <div class="text-sm text-gray-600">
          © 2024 PelvixLatorre
        </div>
        <a
            href="https://github.com/latorreoscar"
            target="_blank"
            rel="nofollow"
            class="text-gray-400 hover:text-teal-600 transition-colors duration-300 hover:scale-110 transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github"
               viewBox="0 0 16 16">
            <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
        </a>
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