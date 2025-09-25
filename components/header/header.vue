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
  <div class="flex justify-between w-full">
    <div class="flex gap-3 pl-5 items-center flex-shrink-0 max-h-16 overflow-hidden">
      <img src="@/assets/images/pelvix_logo.png" class="h-36 w-auto" />
    </div>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Conócenos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-3 p-4 w-[520px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-2">
                <NavigationMenuLink as-child>
                  <a
                      class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                  >
                    <img src="@/assets/images/LogoMaria_trasparent.png" class="h-40 w-40 mx-auto">
                    <div class="mt-4 text-lg font-medium">
                      Maria Latorre
                    </div>
                    <p class="text-sm leading-tight text-muted-foreground">
                      Fisioterapia especializada en suelo pélvico
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <li>
                <NavigationMenuLink as-child>
                  <a
                      href=""
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div class="text-sm font-medium leading-none whitespace-nowrap">¿Qué es el suelo pélvico?</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <li>
                <NavigationMenuLink as-child>
                  <a
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div class="text-sm font-medium leading-none whitespace-nowrap">¿Cómo Trabajamos?</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      How to install dependencies and structure your app.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <!--        <NavigationMenuItem>-->
        <!--          <NavigationMenuTrigger>Patologías & Tratamientos</NavigationMenuTrigger>-->
        <!--          <NavigationMenuContent>-->
        <!--            <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">-->
        <!--              <li v-for="component in components" :key="component.title">-->
        <!--                <NavigationMenuLink as-child>-->
        <!--                  <a :href="component.href"-->
        <!--                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">-->
        <!--                    <div class="text-sm font-medium leading-none">{{ component.title }}</div>-->
        <!--                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">-->
        <!--                      {{ component.description }}-->
        <!--                    </p>-->
        <!--                  </a>-->
        <!--                </NavigationMenuLink>-->
        <!--              </li>-->
        <!--            </ul>-->
        <!--          </NavigationMenuContent>-->
        <!--        </NavigationMenuItem>-->

        <NavigationMenuItem>
          <NavigationMenuLink href="" :class="navigationMenuTriggerStyle()">
            Contacto
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <LogIn />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>