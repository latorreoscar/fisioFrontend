<script setup lang="ts">
import { ref, watch } from 'vue'
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

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  showTrigger: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:isOpen'])

const isDrawerOpen = ref(props.isOpen)

watch(() => props.isOpen, (newValue) => {
  isDrawerOpen.value = newValue
})

watch(isDrawerOpen, (newValue) => {
  emit('update:isOpen', newValue)
})
</script>

<template>
  <Drawer v-model:open="isDrawerOpen">
    <DrawerTrigger v-if="showTrigger" as-child>
      <Button variant="outline" class="cursor-pointer">
        Reserva
      </Button>
    </DrawerTrigger>

    <DrawerContent class="max-h-[95vh] lg:max-h-[90vh]">
      <div class="mx-auto w-full max-w-7xl h-full flex flex-col overflow-hidden">
        <!-- Header fijo -->
        <div class="flex-shrink-0 px-4 lg:px-6 pt-4 pb-3 border-b">
          <h2 class="text-xl lg:text-2xl font-semibold">Agendar Cita</h2>
          <p class="text-sm text-muted-foreground mt-1">
            Completa el formulario para reservar tu cita
          </p>
        </div>

        <!-- Contenido con scroll -->
        <div class="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
          <ReserveForm />
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>