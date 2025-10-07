<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {type HTMLAttributes, ref} from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {cn} from "~/lib/utils";

// Schema actualizado solo con los campos necesarios
const formSchema = toTypedSchema(z.object({
  Nombre: z.string().min(2, 'Mínimo 2 caracteres').max(50),
  Mail: z.string().email('Email inválido'),
  Telefono: z.string().min(9, 'Mínimo 9 dígitos').max(15, 'Máximo 15 dígitos'),
  Descripcion: z.string().min(10, 'Mínimo 10 caracteres').max(500, 'Máximo 500 caracteres'),
  mobile: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  })
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    Nombre: '',
    Mail: '',
    Telefono: '',
    Descripcion: '',
    mobile: false
  }
})

const API_URL_DUDAS = "https://fisio-backend-xps-rel1.vercel.app/api/contact/newRequest"

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitSuccess = ref(false)

const onSubmit = form.handleSubmit(
    async (values) => {
      isSubmitting.value = true
      submitError.value = null
      submitSuccess.value = false

      try {
        const response = await fetch(API_URL_DUDAS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.Nombre,
            email: values.Mail,
            phone: values.Telefono,
            message: values.Descripcion,
            gdprTerms: values.mobile || false
          })
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
        }

        const result = await response.json()
        console.log('Mensaje enviado exitosamente:', result)

        submitSuccess.value = true
        form.resetForm()

        setTimeout(() => {
          submitSuccess.value = false
        }, 5000)

      } catch (error) {
        console.error('Error al enviar el formulario:', error)
        submitError.value = error instanceof Error ? error.message : 'Error desconocido al enviar mensaje'
      } finally {
        isSubmitting.value = false
      }
    }
)
const props = defineProps<{
  class?: HTMLAttributes["class"]
  defaultValue?: string | number
  modelValue?: string | number
}>()
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full max-w-2xl mx-auto">
    <!-- Mensajes de estado -->
    <div v-if="submitError" class="fixed top-4 right-4 p-4 text-red-400 bg-red-100 border border-red-300 rounded z-50">
      {{ submitError }}
    </div>

    <div v-if="submitSuccess"
         class="fixed top-4 right-4 p-4 text-green-400 bg-green-100 border border-green-300 rounded z-50">
      ¡Mensaje enviado exitosamente!
    </div>

    <!-- Layout centrado y responsive -->
    <div class="space-y-6">
      <!-- Datos personales -->
      <div class="space-y-4">
        <FormField v-slot="{ componentField }" name="Nombre">
          <FormItem>
            <FormLabel>Nombre y Apellidos *</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Nombre y Apellidos" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="Mail">
          <FormItem>
            <FormLabel>Correo electrónico *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Correo electrónico" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="Telefono">
          <FormItem>
            <FormLabel>Teléfono *</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="Número de teléfono" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Mensaje -->
      <FormField v-slot="{ componentField }" name="Descripcion">
        <FormItem>
          <FormLabel>Detalles</FormLabel>
          <FormControl>
            <Textarea
                placeholder="Cuéntanos tus dudas o preguntas..."
                class="min-h-[180px] resize-y"
                :class="cn('flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Términos y condiciones -->
      <FormField v-slot="{ value, handleChange }" name="mobile">
        <FormItem>
          <div class="flex items-start gap-3">
            <Checkbox id="terms1" :checked="value" @click="() => handleChange(!value)" class="mt-1" />
            <div class="grid gap-1.5 leading-none">
              <label for="terms1"
                     class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Acepto los términos y condiciones *
              </label>
              <p class="text-xs text-muted-foreground">
                Aceptas nuestros Términos de Servicio y Política de Privacidad.
              </p>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Botón de envío -->
      <div class="pt-2">
        <Button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-teal-400 to-teal-300 hover:opacity-90 transition-opacity duration-300"
        >
          {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
        </Button>
      </div>
    </div>
  </form>
</template>