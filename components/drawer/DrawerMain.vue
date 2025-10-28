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
import ReserveForm from '~/components/forms/reserveForm.vue'
import {Slot} from "reka-ui";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  showTrigger: {
    type: Boolean,
    default: true
  },
  triggerText: {
    type: String,
    default: 'Abrir'
  },
  triggerVariant: {
    type: String,
    default: 'outline'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
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
        {{ triggerText }}
      </Button>
    </DrawerTrigger>

    <DrawerContent class="max-h-[95vh] lg:max-h-[90vh]">
      <div class="mx-auto w-full max-w-7xl h-full flex flex-col overflow-hidden">
        <!-- Header fijo -->
        <div class="relative flex-shrink-0 px-4 lg:px-6 pt-4 pb-3 border-b">
          <h2 class="text-xl lg:text-2xl font-semibold">{{title}}</h2>
          <p class="text-sm text-muted-foreground mt-1">
            {{description}}
          </p>
          <!-- Close control for the Drawer -->
          <DrawerClose as-child>
            <button
              type="button"
              class="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </DrawerClose>
        </div>

        <!-- Contenido con scroll -->
        <div class="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
          <slot />
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>