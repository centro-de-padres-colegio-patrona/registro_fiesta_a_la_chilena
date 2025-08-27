import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Configurar CORS y logging
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))
app.use('*', logger(console.log))

// Cliente Supabase para operaciones admin
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Cliente Supabase para autenticación
const supabaseAuth = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
)

// Función para validar token de usuario
async function validateUser(authHeader: string | undefined) {
  if (!authHeader) return null
  
  const token = authHeader.split(' ')[1]
  if (!token) return null
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return null
    return user
  } catch (error) {
    console.log('Error validating user:', error)
    return null
  }
}

// Horarios predefinidos por curso
const SCHEDULE_MAPPING = {
  'Pre-Kinder': '9:30-Pre-Kinder y Kinder',
  'Kinder': '9:30-Pre-Kinder y Kinder',
  '1° Básico': '12:00-1° y 2° Básicos',
  '2° Básico': '12:00-1° y 2° Básicos', 
  '3° Básico': '10:20-3° y 4° Básicos',
  '4° Básico': '10:20-3° y 4° Básicos',
  '5° Básico': '14:10-5° y 6° Básicos',
  '6° Básico': '14:10-5° y 6° Básicos',
  '7° Básico': '15:20-7° y 8° Básicos',
  '8° Básico': '15:20-7° y 8° Básicos',
  '1° Medio A': '11:10-1° a 3° Medio A',
  '2° Medio A': '11:10-1° a 3° Medio A',
  '3° Medio A': '11:10-1° a 3° Medio A',
  '1° Medio B': '14:30-1° a 3° Medio B',
  '2° Medio B': '14:30-1° a 3° Medio B',
  '3° Medio B': '14:30-1° a 3° Medio B',
  '4° Medio A': '17:00-4° Medio A y 4° Medio B',
  '4° Medio B': '17:00-4° Medio A y 4° Medio B'
}

// Inicializar datos de ejemplo en la base de datos
app.post('/make-server-10e29ee3/init-data', async (c) => {
  try {
    // Datos de ejemplo de apoderados y estudiantes
    const sampleData = {
      'maria.gonzalez@gmail.com': {
        guardianName: 'María González',
        students: [
          { name: 'Sofía González', grade: '3° Básico', rut: '12345678-9' }
        ]
      },
      'carlos.rodriguez@outlook.com': {
        guardianName: 'Carlos Rodríguez', 
        students: [
          { name: 'Mateo Rodríguez', grade: '1° Medio A', rut: '23456789-0' },
          { name: 'Valentina Rodríguez', grade: '5° Básico', rut: '34567890-1' }
        ]
      },
      'ana.silva@yahoo.com': {
        guardianName: 'Ana Silva',
        students: [
          { name: 'Diego Silva', grade: '4° Medio B', rut: '45678901-2' }
        ]
      },
      'juan.morales@gmail.com': {
        guardianName: 'Juan Morales',
        students: [
          { name: 'Camila Morales', grade: 'Kinder', rut: '56789012-3' },
          { name: 'Benjamín Morales', grade: '7° Básico', rut: '67890123-4' }
        ]
      }
    }

    // Guardar en KV store
    for (const [email, data] of Object.entries(sampleData)) {
      await kv.set(`guardian:${email}`, JSON.stringify(data))
    }

    console.log('Sample data initialized successfully')
    return c.json({ success: true, message: 'Datos de ejemplo inicializados' })
  } catch (error) {
    console.log('Error initializing data:', error)
    return c.json({ error: 'Error inicializando datos' }, 500)
  }
})

// Endpoint para obtener información del apoderado por email
app.get('/make-server-10e29ee3/guardian/:email', async (c) => {
  try {
    const email = c.req.param('email')
    const guardianData = await kv.get(`guardian:${email}`)
    
    if (!guardianData) {
      return c.json({ error: 'Apoderado no encontrado' }, 404)
    }

    const data = JSON.parse(guardianData)
    
    // Agregar horarios correspondientes a cada estudiante
    const studentsWithSchedules = data.students.map((student: any) => ({
      ...student,
      schedule: SCHEDULE_MAPPING[student.grade] || 'No asignado'
    }))

    console.log(`Guardian data retrieved for ${email}:`, data.guardianName)
    return c.json({
      ...data,
      students: studentsWithSchedules
    })
  } catch (error) {
    console.log('Error getting guardian data:', error)
    return c.json({ error: 'Error obteniendo datos del apoderado' }, 500)
  }
})

// Endpoint para procesar pago
app.post('/make-server-10e29ee3/process-payment', async (c) => {
  try {
    const user = await validateUser(c.req.header('Authorization'))
    if (!user) {
      return c.json({ error: 'No autorizado' }, 401)
    }

    const paymentData = await c.req.json()
    const { email, students, quantity, total, selectedSchedules } = paymentData

    // Simular procesamiento de pago
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Guardar información del pago
    const paymentRecord = {
      paymentId,
      email,
      students,
      quantity,
      total,
      selectedSchedules,
      timestamp: new Date().toISOString(),
      status: 'completed'
    }

    await kv.set(`payment:${paymentId}`, JSON.stringify(paymentRecord))
    
    console.log(`Payment processed successfully for ${email}: ${paymentId}`)
    
    // En un entorno real, aquí integrarías con la pasarela de pagos
    // Por ejemplo: WebPay Plus, Flow, Mercado Pago, etc.
    
    return c.json({
      success: true,
      paymentId,
      qrData: {
        paymentId,
        guardianEmail: email,
        students: students.map((s: any) => ({
          name: s.name,
          grade: s.grade,
          schedule: s.schedule
        })),
        quantity,
        total,
        eventDate: '2025-09-06',
        venue: 'Alicahue #7370, La Florida',
        timestamp: paymentRecord.timestamp
      },
      // URL para integración con pasarela de pagos
      paymentIntegrationNote: `
        Para integrar con una pasarela de pagos real, reemplaza esta lógica con:
        
        1. WebPay Plus (Transbank):
           - POST a https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions
           - Headers: { "Tbk-Api-Key-Id": "tu-api-key", "Tbk-Api-Key-Secret": "tu-secret" }
           - Body: { "buy_order": "${paymentId}", "session_id": "${user.id}", "amount": ${total}, "return_url": "tu-url-retorno" }
        
        2. Flow:
           - POST a https://www.flow.cl/api/payment/create
           - Parameters: { "apiKey": "tu-api-key", "amount": ${total}, "currency": "CLP", "subject": "Fiesta a la Chilena" }
        
        3. Mercado Pago:
           - POST a https://api.mercadopago.com/checkout/preferences
           - Headers: { "Authorization": "Bearer tu-access-token" }
           - Body: { "items": [{ "title": "Entrada Fiesta Chilena", "quantity": ${quantity}, "unit_price": ${total/quantity} }] }
      `
    })
  } catch (error) {
    console.log('Error processing payment:', error)
    return c.json({ error: 'Error procesando el pago' }, 500)
  }
})

// Endpoint para obtener información del QR
app.get('/make-server-10e29ee3/qr/:paymentId', async (c) => {
  try {
    const paymentId = c.req.param('paymentId')
    const paymentData = await kv.get(`payment:${paymentId}`)
    
    if (!paymentData) {
      return c.json({ error: 'Pago no encontrado' }, 404)
    }

    const data = JSON.parse(paymentData)
    console.log(`QR data retrieved for payment ${paymentId}`)
    
    return c.json(data)
  } catch (error) {
    console.log('Error getting QR data:', error)
    return c.json({ error: 'Error obteniendo datos del QR' }, 500)
  }
})

// Endpoint para registrar usuario
app.post('/make-server-10e29ee3/register', async (c) => {
  try {
    const { email, password, name } = await c.req.json()
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true // Auto-confirmar email para desarrollo
    })
    
    if (error) {
      console.log('Error creating user:', error)
      return c.json({ error: error.message }, 400)
    }
    
    console.log(`User registered successfully: ${email}`)
    return c.json({ success: true, user: data.user })
  } catch (error) {
    console.log('Error in register endpoint:', error)
    return c.json({ error: 'Error registrando usuario' }, 500)
  }
})

// Health check
app.get('/make-server-10e29ee3/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Inicializar datos al arrancar el servidor
console.log('Initializing server with sample data...')

Deno.serve(app.fetch)