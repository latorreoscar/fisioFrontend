<template>
  <div class="min-h-screen bg-white relative overflow-hidden">
    <!-- Updated floating organic shapes to use teal colors -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-100 to-teal-200 organic-shape float-animation opacity-40"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-150 to-teal-250 blob-shape float-animation opacity-30" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-teal-50 to-teal-150 morph-animation opacity-25"></div>
      <div class="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-teal-200 to-teal-300 organic-shape float-animation opacity-35" style="animation-delay: 4s;"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative py-16 px-4 min-h-[80vh] flex items-center">
      <div class="max-w-7xl mx-auto w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <div class="space-y-8 relative z-10">
            <div class="space-y-6">
              <div class="inline-block">
                <span class="text-sm font-medium text-teal-600 bg-teal-50 px-4 py-2 rounded-full border border-teal-100">
                  Especialistas en tu bienestar
                </span>
              </div>

              <h1 class="text-4xl lg:text-5xl font-bold leading-tight">
                <span class="text-gray-800">Tu</span>
                <span class="bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent block">Recuperación</span>
                <span class="text-gray-800">Comienza</span>
                <span class="text-teal-300 block font-outline">Aquí</span>
              </h1>

              <p class="text-lg text-gray-600 leading-relaxed max-w-lg">
                Sabemos que detrás de cada consulta hay una persona.
                Por eso unimos las técnicas mas avanzadas con la cercanía que mereces.
                <strong class="text-teal-500">Tu bienestar merece algo extraordinario.</strong>

              </p>
            </div>

              <div class="flex flex-col sm:flex-row gap-6">
              <button
                  @click="isReserveDrawerOpen = true"
                  class="group bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-6 sm:px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 pulse-glow relative overflow-hidden min-w-[200px] sm:min-w-[220px]"
              >
                <span class="relative z-10">Reservar Mi Cita</span>
                <div class="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <DrawerMain
                  v-model:isOpen="isReserveDrawerOpen"
                  :showTrigger="false"
                  title="Agendar Cita"
                  description="Completa el formulario para reservar tu cita"
              >
                <ReserveForm />
              </DrawerMain>

              <button
                  @click="isDudasDrawerOpen = true"
                  class="text-teal-500 hover:text-teal-600 px-6 sm:px-8 py-4 font-bold text-sm sm:text-base transition-all duration-300 border-2 border-teal-200 hover:border-teal-400 rounded-full hover:bg-teal-50 min-w-[200px] sm:min-w-[220px]">
                ¿Dudas en tu recuperación?
              </button>

              <DrawerMain
                  v-model:isOpen="isDudasDrawerOpen"
                  :showTrigger="false"
                  title="Cuéntanos tu caso..."
                  description="Nos pondremos en contacto contigo para concretar un plan adaptado a tu situación."
              >
                <ContactForm />
              </DrawerMain>
            </div>
          </div>

          <!-- Updated image section to use teal colors -->
          <div class="relative z-10">
            <div class="relative">
              <div class="absolute -inset-4 rounded-3xl blur-lg opacity-20 morph-animation"></div>
              <div class="relative rounded-3xl shadow-lg">
                <img
                    src="../assets/images/fisio-pelvico-egr.jpg"
                    alt="Sesión de fisioterapia"
                    class="w-full h-[500px] object-cover rounded-2xl"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Updated carousel section to use teal colors -->
    <section class="py-20 px-4 relative">
      <div class="absolute inset-0 bg-gradient-to-br from-teal-25 to-teal-50 opacity-60"></div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex justify-center mb-12">
          <div class="flex gap-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-teal-100">
            <button
                v-for="(slide, index) in slides"
                :key="index"
                @click="currentSlide = index"
                :class="[
                'px-6 py-3 rounded-full font-bold transition-all duration-300 text-sm',
                currentSlide === index
                  ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg transform scale-105'
                  : 'text-teal-500 hover:bg-teal-50'
              ]"
            >
              {{ slide.title }}
            </button>
          </div>
        </div>

        <div class="relative px-8">
          <div class="overflow-hidden rounded-3xl min-h-[600px]">
            <div
                class="flex transition-transform duration-700 ease-out min-h-[600px]"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <!-- Services Slide -->
              <div class="w-full flex-shrink-0 px-8 py-8">
                <div class="text-center mb-12">
                  <h2 class="text-4xl font-bold bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent mb-6">Servicios Especializados</h2>
                  <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                    Tratamientos personalizados con técnicas avanzadas para tu bienestar integral.
                  </p>
                </div>

                <!-- Increased max-width and gap for better card spacing -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div class="group relative">
                    <div class="absolute -inset-1 bg-gradient-to-r from-teal-200 to-teal-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    <div class="relative bg-white p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-50 h-[320px] sm:h-[340px] flex flex-col">
                      <div class="w-6 h-6 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mb-6 morph-animation border border-teal-100">
                        <div class="w-3 h-3 sm:w-8 sm:h-8 bg-teal-300 rounded-lg"></div>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Suelo Pélvico</h3>
                      <p class="text-gray-600 leading-relaxed flex-grow text-sm sm:text-base">
                        Técnicas especializadas para el fortalecimiento y rehabilitación del suelo pélvico con máxima profesionalidad.
                      </p>
                    </div>
                  </div>

                  <div class="group relative">
                    <div class="absolute -inset-1 bg-gradient-to-r from-teal-200 to-teal-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    <div class="relative bg-white p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-50 h-[320px] sm:h-[340px] flex flex-col">
                      <div class="w-6 h-6 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-150 to-teal-250 rounded-2xl flex items-center justify-center mb-6 float-animation border border-teal-100">
                        <div class="w-3 h-3 sm:w-8 sm:h-8 bg-teal-400 rounded-lg"></div>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Rehabilitación</h3>
                      <p class="text-gray-600 leading-relaxed flex-grow text-sm sm:text-base">
                        Programas de recuperación personalizados que restauran la funcionalidad y mejoran tu calidad de vida.
                      </p>
                    </div>
                  </div>

                  <div class="group relative">
                    <div class="absolute -inset-1 bg-gradient-to-r from-teal-200 to-teal-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    <div class="relative bg-white p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-50 h-[320px] sm:h-[340px] flex flex-col">
                      <div class="w-6 h-6 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl flex items-center justify-center mb-6 pulse-glow border border-teal-100">
                        <div class="w-3 h-3 sm:w-8 sm:h-8 bg-teal-500 rounded-lg"></div>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Prevención</h3>
                      <p class="text-gray-600 leading-relaxed flex-grow text-sm sm:text-base">
                        Estrategias preventivas que mantienen tu cuerpo saludable y previenen futuras lesiones.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Experience Slide -->
              <div class="w-full flex-shrink-0 px-8 py-8">
                <div class="text-center mb-12">
                  <h2 class="text-4xl font-bold bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent mb-6">Nuestra Experiencia</h2>
                  <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                    Profesionalidad, innovación y resultados que transforman vidas.
                  </p>
                </div>


<!-- Added proper max-width and margin for experience section -->
<div class="grid lg:grid-cols-1 gap-12 items-center max-w-4xl mx-auto">
                  <div class="space-y-8">
                    <div class="flex items-start gap-6">
                      <div class="w-6 h-6 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center flex-shrink-0 float-animation border border-teal-100">
                        <div class="w-3 h-3 sm:w-6 sm:h-6 bg-teal-400 rounded-full"></div>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Tratamiento Personalizado</h3>
                        <p class="text-gray-600">El tratamiento y las sesiones del mismo se desarrollan tras una valoración inicial y pueden variar para ajustarse a tus necesidades y objetivos de recuperación.</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-6">
                      <div class="w-6 h-6 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-150 to-teal-250 rounded-full flex items-center justify-center flex-shrink-0 float-animation border border-teal-100" style="animation-delay: 1s;">
                        <div class="w-3 h-3 sm:w-6 sm:h-6 bg-teal-500 rounded-full"></div>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Técnicas Avanzadas</h3>
                        <p class="text-gray-600">Implementamos técnicas avanzadas y basadas en la evidencia para optimizar cada proceso de tu recuperación.</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-6">
                      <div class="w-6 h-6 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full flex items-center justify-center flex-shrink-0 float-animation border border-teal-100" style="animation-delay: 2s;">
                        <div class="w-3 h-3 sm:w-6 sm:h-6 bg-teal-600 rounded-full"></div>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Resultados Comprobados</h3>
                        <p class="text-gray-600">Nuestros pacientes experimentan mejoras significativas y duraderas en su bienestar.</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

              <!-- CTA Slide -->
              <div class="w-full flex-shrink-0 px-8 py-8">
                <div class="text-center max-w-4xl mx-auto">
                  <div class="mb-12">
                    <h2 class="text-4xl font-bold mb-8">
                      <span class="bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent">¿Listo para</span>
                      <span class="text-teal-300 block font-outline">Comenzar?</span>
                    </h2>
                    <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                      Tu bienestar está a un paso de distancia.
                      <strong class="text-teal-500">Únete a nuestra comunidad de pacientes satisfechos.</strong>
                    </p>
                  </div>

                  <div class="relative inline-block">
                    <div class="absolute -inset-4 bg-gradient-to-r from-teal-200 to-teal-300 rounded-full blur-lg opacity-30 pulse-glow"></div>
                    <button
                        @click="isReserveDrawerOpen = true"
                        class="relative bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-6 sm:px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-110 shadow-2xl min-w-[200px] sm:min-w-[220px]"
                    >
                      Reservar Mi Cita Ahora
                    </button>
                  </div>


                  <p class="text-gray-500 mt-8 text-base">
                    Especialistas en tratamientos de fisioterapia personalizada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Drawer de Reserva de Cita - Tu componente existente -->
    <DrawerMain
        v-model:isOpen="isBookingDrawerOpen"
        :showTrigger="false"
        title="Reservar Cita"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DrawerMain from '~/components/drawer/DrawerMain.vue'
import ReserveForm from '~/components/forms/reserveForm.vue'
import ContactForm from "~/components/forms/contactForm.vue";

const currentSlide = ref(0)
const slides = ref([
  { title: 'Servicios' },
  { title: 'Experiencia' },
  { title: 'Comenzar' }
])

const isReserveDrawerOpen = ref(false)
const isDudasDrawerOpen = ref(false)
const isBookingDrawerOpen = ref(false)

// Funciones del carousel
let autoSlideInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 12000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

// Función para abrir el drawer de reserva
const openBooking = () => {
  isBookingDrawerOpen.value = true
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
/* Tus estilos CSS existentes aquí */
.organic-shape {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}

.blob-shape {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

@keyframes float-animation {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes morph-animation {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: rotate(0deg);
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: rotate(10deg);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px rgba(20, 184, 166, 0.5);
    transform: scale(1.02);
  }
}

.float-animation {
  animation: float-animation 6s ease-in-out infinite;
}

.morph-animation {
  animation: morph-animation 8s ease-in-out infinite;
}

.pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

.font-outline {
  -webkit-text-stroke: 1px rgba(20, 184, 166, 0.3);
  text-shadow: 2px 2px 0px rgba(20, 184, 166, 0.1);
}
</style>