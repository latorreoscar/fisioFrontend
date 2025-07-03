<template>
  <div class="relative flex flex-1 w-full justify-between overflow-scroll">
    <!-- Fondo con blur -->
    <div class="absolute inset-0 bg-cover bg-center filter blur-xs z-0"
      :style="{ backgroundImage: `url('${bgImage}')` }"></div>

    <!-- Contenido por encima -->
    <div class="relative z-10 w-full flex h-auto">
      <div class="flex flex-1 justify-center items-center p-8 h-120">
        <div class="flex p-4 bg-gray-100/80 rounded-2xl gap-3 items-center">
          <div>
            <h2
              class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-light tracking-tight transition-colors first:mt-0 text-[#20ADAF]">
              Reserva tu cita ahora
            </h2>
            <div class="flex flex-1 justify-center pt-4">
              <DrawerButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bgImage from '@/assets/images/fisio-pelvico-egr.jpg'
import DrawerButton from '@/components/drawer/drawerButton.vue'
import Conocenos from '@/components/home/conocenos.vue'
export default {
  data() {
    return {
      bgImage
    };
  }
}
</script>

<style></style>
