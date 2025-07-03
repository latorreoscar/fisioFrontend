<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { toDate } from 'reka-ui/date'
import { computed, h, ref } from 'vue'
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

// ✅ Schema corregido con todos los campos del formulario
const formSchema = toTypedSchema(z.object({
  Nombre: z.string().min(2, 'Mínimo 2 caracteres').max(50),
  Mail: z.string().email('Email inválido'),
  FirstTime: z.string().min(1, 'Selecciona una opción'),
  dob: z.string().min(1, 'Selecciona una fecha'),
  hour: z.string().min(1, 'Selecciona una hora'),
  mobile: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  })
}))

// ✅ Solo una instancia de useForm
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    Nombre: '',
    Mail: '',
    FirstTime: '',
    dob: '',
    hour: '',
    mobile: false
  }
})

// ✅ URL corregida con protocolo
const API_URL_RESERVAS = "http://localhost:8080/api/reservas"
const API_URL_SPLITS = "http://localhost:8080/api/reservas/getAllSplits"

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitSuccess = ref(false)
let currentDay;

// ✅ onSubmit con manejo de errores de validación
const onSubmit = form.handleSubmit(
  // Success callback - se ejecuta si la validación pasa
  async (values) => {
    isSubmitting.value = true
    submitError.value = null
    submitSuccess.value = false

    try {
      const response = await fetch(API_URL_RESERVAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.Nombre,
          email: values.Mail,
          firstVisit: values.FirstTime === 'true',
          date: values.dob,
          hour: values.hour,
          gdprTerms: values.mobile || false
        })
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Cita creada exitosamente:', result)

      submitSuccess.value = true
      form.resetForm()

    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      submitError.value = error instanceof Error ? error.message : 'Error desconocido'
    } finally {
      isSubmitting.value = false
      currentDay = undefined;

    }
  },

)

const { setFieldValue } = form
const { value: doc } = useField("dob")

const availableHours = ref<string[]>([])

function checkAvailableHours(v: string): void {
  console.log("checking", v)
  if(contains(notAvailableHours, "date", v)){
    for(let i = 0; i <notAvailableHours.length; i++){
      if(notAvailableHours[i].date === v){
        let split = notAvailableHours[i].split;
        delete availableHours.value[split];
      }
    }
    console.log(availableHours.value)
  }else{
    availableHours.value = []
    const defaultDay = citasMock['defaultFree' as keyof typeof citasMock]
    if (defaultDay !== undefined) {
      for (let i = 0; i < defaultDay.length; i++) {
        availableHours.value.push(defaultDay[i].hora)
      }
    }
  }
}


function contains(arr, key, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) return true;
  }
  return false;
}

let notAvailableHours = [];

onBeforeMount(async () =>{

  availableHours.value = []
  const defaultDay = citasMock['defaultFree' as keyof typeof citasMock]
  if (defaultDay !== undefined) {
    for (let i = 0; i < defaultDay.length; i++) {
      availableHours.value.push(defaultDay[i].hora)
    }
  }

  try{
    const response = await fetch(API_URL_SPLITS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    notAvailableHours = response;
  }catch(error){
    console.error('Error al recoger el formulario:', error)
  }
})

</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-1 gap-3">
    <!-- Mensajes de estado -->
    <div v-if="submitError" class="fixed top-4 right-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded z-50">
      {{ submitError }}
    </div>

    <div v-if="submitSuccess"
      class="fixed top-4 right-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded z-50">
      ¡Cita agendada exitosamente!
    </div>

    <div class="w-82">
      <FormField v-slot="{ componentField }" name="Nombre">
        <FormItem class="p-4">
          <FormLabel>Nombre y Apellidos *</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Nombre y Apellidos" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="Mail">
        <FormItem class="pr-4 pl-4 pb-4">
          <FormLabel>Correo electrónico *</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Correo electrónico" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="FirstTime">
        <FormItem class="pr-4 pl-4 pb-4">
          <FormLabel>¿Es tu primera visita con nosotros? *</FormLabel>
          <FormControl>
            <RadioGroup class="flex justify-start p-4" v-bind="componentField">
              <FormItem class="flex flex-1 gap-3.5">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel>Sí</FormLabel>
              </FormItem>
              <FormItem class="flex flex-1 gap-3.5">
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel>No</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormDescription>
            Si es su primera visita con nosotros se le realizará una primera sesión de valoración
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="w-82 pl-4 pr-4 pb-4">
      <FormField name="dob">
        <FormItem>
          <FormLabel>Selecciona la fecha *</FormLabel>
          <Calendar calendar-label="Fecha de la cita" initial-focus :min-value="today(getLocalTimeZone())"
            :max-value="new CalendarDate(2200, 1, 1)" @update:model-value="(v) => {
              if (v) {
                setFieldValue('dob', v.toString())
                checkAvailableHours(v.toString())
              } else {
                setFieldValue('dob', undefined)
              }
            }" @click.prevent />
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="w-82">
      <FormField v-slot="{ componentField }" name="dob">
        <FormItem class="p-4">
          <FormLabel>Fecha seleccionada</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Fecha de la cita" v-bind="componentField" readonly />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="hour">
        <FormItem class="pl-4 pr-4 pb-4">
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
        <FormItem class="pl-4 pb-4">
          <div class="items-top flex gap-x-2">
            <Checkbox id="terms1" :checked="value" @click="() => handleChange(!value)" />
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
      <div class="p-4 space-y-2">
        <Button type="submit" :disabled="isSubmitting" class="w-full">
          {{ isSubmitting ? 'Enviando...' : 'Agendar Cita' }}
        </Button>
      </div>
    </div>
  </form>
</template>
