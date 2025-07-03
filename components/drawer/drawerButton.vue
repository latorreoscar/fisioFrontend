<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import ReserveForm from '@/components/reservaForm/reserveForm.vue'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline" class="cursor-pointer">
        Reserva
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full h-92 flex flex-1 p-4 gap-5">
        <div id="map" class="p-4">
          <DrawerDescription>
            Calle Poeta León Felipe, 6, 50018 Zaragoza
          </DrawerDescription>
          <iframe class="rounded-2xl pt-2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.464922597554!2d-0.8879449237087595!3d41.667301578585686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914978b561b15%3A0xd345fdb79cedfd31!2sCalle%20Poeta%20Le%C3%B3n%20Felipe%2C%206%2C%2050018%20Zaragoza!5e0!3m2!1ses!2ses!4v1747560515101!5m2!1ses!2ses"
            width="300" height="250" style="border:0;" allowfullscreen="false" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="w-full flex-col justify-start pl-4 pr-4 pb-2 pt-1">
          <ReserveForm />
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>
