<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import LogIn from '@/components/header/logIn.vue'

const components: { title: string, href: string, description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/components/alert-dialog',
    description:
        'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/components/hover-card',
    description:
        'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/components/progress',
    description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/components/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/components/tabs',
    description:
        'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/components/tooltip',
    description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]
</script>

<template>
  <div class="w-full">
    <!-- Banner Phys10 -->
    <div class="w-full flex justify-center items-center py-2">
      <a href="https://www.phys10.es" target="_blank" rel="noopener noreferrer" aria-label="Phys10">
        <img
            src="https://phys10.es/wp-content/uploads/2025/09/phys10-logo-completo.svg"
            alt="Phys10 logo"
            class="h-[180px] w-auto"
        />
      </a>
    </div>

    <div class="flex justify-between md:mx-4 items-center h-20">
      <!-- Logo - Tamaño ajustado -->
      <div class="flex gap-3 items-center flex-shrink-0 max-h-16 overflow-hidden">
        <img
            src="@/assets/images/pelvixLogo.png"
            class="h-50 w-auto transition-transform duration-300 hover:scale-105"
            alt="PelvixLatorre Logo"
        />
      </div>

      <!-- Navigation Menu -->
      <NavigationMenu>
        <NavigationMenuList>
          <!-- Login Component -->
          <NavigationMenuItem>
            <LogIn />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </div>
</template>

<style scoped>
/* Animaciones personalizadas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efecto glassmorphism en los dropdowns */
.navigation-menu-content {
  animation: fadeInUp 0.3s ease-out;
}

/* Hover effect suave para el logo */
img[alt="PelvixLatorre Logo"]:hover {
  filter: drop-shadow(0 4px 8px rgba(20, 184, 166, 0.2));
}

/* Efecto de elevación para el dropdown de María */
.navigation-menu-content a:hover {
  transform: translateY(-1px);
}
</style>