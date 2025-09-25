<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  NavigationMenuContent,
  type NavigationMenuContentEmits,
  type NavigationMenuContentProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<NavigationMenuContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<NavigationMenuContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NavigationMenuContent
      data-slot="navigation-menu-content"
      v-bind="forwarded"
      :class="cn(
      `data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto`,
      `group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200`,
      'min-w-[520px]', // Añadir ancho mínimo aquí
      props.class,
    )"
  >
    <slot />
  </NavigationMenuContent>
</template>

<style>
/* Forzar el ancho mínimo del viewport desde el principio */
[data-radix-navigation-menu-viewport] {
  min-width: 520px !important;
  width: max-content !important;
}

/* Asegurar que el contenido mantenga su tamaño */
[data-slot="navigation-menu-content"] {
  min-width: 520px !important;
  width: max-content !important;
}

/* Prevenir el colapso durante la primera animación */
[data-state="open"][data-radix-navigation-menu-content] {
  min-width: 520px !important;
  width: max-content !important;
}

/* Forzar el contenedor del contenido */
[data-radix-popper-content-wrapper] {
  min-width: 520px !important;
}
</style>