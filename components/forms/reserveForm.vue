<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { computed, ref, onBeforeMount } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import citasMock from '@/assets/mocks/citasMock.json'
import {DrawerDescription} from "~/components/ui/drawer";

const formSchema = toTypedSchema(z.object({
  Nombre: z.string().min(2, 'Mínimo 2 caracteres').max(50),
  Mail: z.string().email('Email inválido'),
  Telefono: z.string().min(9, 'Mínimo 9 dígitos').max(15, 'Máximo 15 dígitos'),
  FirstTime: z.string().min(1, 'Selecciona una opción'),
  dob: z.string().min(1, 'Selecciona una fecha'),
  hour: z.string().min(1, 'Selecciona una hora'),
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
    FirstTime: '',
    dob: '',
    hour: '',
    mobile: false
  }
})

const API_URL_RESERVAS = "https://fisio-backend-xps-rel1.vercel.app/api/reservas/create"
const API_URL_SPLITS = "https://fisio-backend-xps-rel1.vercel.app/api/reservas/timeframes"

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitSuccess = ref(false)
const availableHours = ref<string[]>([])
const occupiedSlots = ref<Record<string, string[]>>({})
const allDefaultHours = ref<string[]>([])

function normalizeDateFormat(dateStr: string): string {
  if (dateStr.includes('/')) {
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
  return dateStr
}

function checkAvailableHours(selectedDate: string): void {
  const normalizedDate = normalizeDateFormat(selectedDate)
  const occupiedSlotsForDate = occupiedSlots.value[normalizedDate] || []

  if (occupiedSlotsForDate.length > 0) {
    availableHours.value = allDefaultHours.value.filter((_, index) => {
      const slotNumber = (index + 1).toString()
      return !occupiedSlotsForDate.includes(slotNumber)
    })
  } else {
    availableHours.value = [...allDefaultHours.value]
  }
}

const { setFieldValue } = form

onBeforeMount(async () => {
  const defaultDay = citasMock['defaultFree' as keyof typeof citasMock]
  if (defaultDay !== undefined && Array.isArray(defaultDay)) {
    allDefaultHours.value = defaultDay.map((item: any) => item.hora)
    availableHours.value = [...allDefaultHours.value]
  }

  try {
    const response = await fetch(API_URL_SPLITS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const result = await response.json()

    if (result.success && result.data?.slotsPorFecha) {
      const normalizedSlots: Record<string, string[]> = {}

      Object.entries(result.data.slotsPorFecha).forEach(([date, slots]) => {
        const normalizedDate = normalizeDateFormat(date)
        normalizedSlots[normalizedDate] = slots as string[]
      })

      occupiedSlots.value = normalizedSlots
      console.log('Slots ocupados cargados:', occupiedSlots.value)
    }
  } catch (error) {
    console.error('Error al cargar slots ocupados:', error)
  }
})

const onSubmit = form.handleSubmit(
    async (values) => {
      isSubmitting.value = true
      submitError.value = null
      submitSuccess.value = false

      try {
        const hourIndex = allDefaultHours.value.indexOf(values.hour)
        const hourSplit = hourIndex !== -1 ? hourIndex + 1 : 1

        const response = await fetch(API_URL_RESERVAS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.Nombre,
            email: values.Mail,
            phone: values.Telefono,
            firstVisit: values.FirstTime === 'true',
            date: normalizeDateFormat(values.dob),
            hour: values.hour,
            hourSplit: hourSplit,
            gdprTerms: values.mobile || false
          })
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
        }

        const result = await response.json()
        console.log('Cita creada exitosamente:', result)

        submitSuccess.value = true
        form.resetForm()
        availableHours.value = [...allDefaultHours.value]

        setTimeout(() => {
          submitSuccess.value = false
        }, 5000)

      } catch (error) {
        console.error('Error al enviar el formulario:', error)
        submitError.value = error instanceof Error ? error.message : 'Error desconocido al crear la cita'
      } finally {
        isSubmitting.value = false
      }
    }
)
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <!-- Mensajes de estado -->
    <div v-if="submitError" class="fixed top-4 right-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded z-50">
      {{ submitError }}
    </div>

    <div v-if="submitSuccess"
         class="fixed top-4 right-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded z-50">
      ¡Cita agendada exitosamente!
    </div>

    <!-- Layout responsive: vertical en mobile, 4 columnas en desktop -->
    <div class="flex flex-col lg:flex-row lg:gap-5">

      <!-- COLUMNA 1: Mapa - solo desktop -->
      <div class="hidden lg:block lg:w-72 lg:flex-shrink-0">
        <iframe
            class="rounded-2xl w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.464922597554!2d-0.8879449237087595!3d41.667301578585686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914978b561b15%3A0xd345fdb79cedfd31!2sCalle%20Poeta%20Le%C3%B3n%20Felipe%2C%206%2C%2050018%20Zaragoza!5e0!3m2!1ses!2ses!4v1747560515101!5m2!1ses!2ses"
            height="300"
            style="border:0;"
            allowfullscreen="false"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        />
      </div>

      <!-- COLUMNA 2: Datos personales (Nombre, Email, Teléfono, Primera visita) -->
      <div class="flex-1 lg:w-72 space-y-4">
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

        <FormField v-slot="{ componentField }" name="FirstTime">
          <FormItem>
            <FormLabel>¿Es tu primera visita con nosotros? *</FormLabel>
            <FormControl>
              <RadioGroup class="flex justify-start gap-6 pt-2" v-bind="componentField">
                <FormItem class="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel class="!mt-0 font-normal">Sí</FormLabel>
                </FormItem>
                <FormItem class="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel class="!mt-0 font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormDescription class="text-xs">
              Si es su primera visita con nosotros se le realizará una primera sesión de valoración
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- COLUMNA 3: Calendario -->
      <div class="flex-1 lg:w-72 mt-4 lg:mt-0">
        <FormField name="dob">
          <FormItem>
            <Calendar
                calendar-label="Fecha de la cita"
                initial-focus
                :min-value="today(getLocalTimeZone())"
                :max-value="new CalendarDate(2200, 1, 1)"
                @update:model-value="(v) => {
                  if (v) {
                    setFieldValue('dob', v.toString())
                    checkAvailableHours(v.toString())
                  } else {
                    setFieldValue('dob', undefined)
                    availableHours = [...allDefaultHours]
                  }
                }"
                class="w-full"
            />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- COLUMNA 4: Fecha seleccionada, Hora, Términos y Botón -->
      <div class="flex-1 lg:w-72 space-y-4 mt-4 lg:mt-0">
        <FormField v-slot="{ componentField }" name="dob">
          <FormItem>
            <FormLabel>Fecha seleccionada</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Fecha de la cita" v-bind="componentField" readonly />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="hour">
          <FormItem>
            <FormLabel>Hora *</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una hora" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <template v-if="availableHours.length">
                    <SelectItem v-for="hours in availableHours" :key="hours" :value="hours">
                      {{ hours }}
                    </SelectItem>
                  </template>
                  <template v-else>
                    <SelectItem value="noAvail" disabled>
                      No hay horas disponibles
                    </SelectItem>
                  </template>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

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

        <div class="pt-2">
          <Button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-teal-400 to-teal-300 hover:opacity-90 transition-opacity duration-300"
          >
            {{ isSubmitting ? 'Enviando...' : 'Agendar Cita' }}
          </Button>
        </div>
      </div>
    </div>
  </form>
</template>