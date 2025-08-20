import { promises as fs } from 'fs'
import { FAKESTOREAPI } from '../constantes/constantes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Recuperar la información de todos los productos (GET).
export async function GETALLPRODUCTS() {
  const resp = await fetch(`${FAKESTOREAPI}products`)

  const data = await resp.json()

  return data
}

// Recuperar la información de un número limitado de productos (GET).
export async function GETPRODUCTBYID(id) {
  const resp = await fetch(`${FAKESTOREAPI}products/${id}`)

  return resp.json()
}

// Persistir los datos de la consulta anterior en un archivo local JSON

export async function WRITEJSONFILE(data) {
  try {
    await fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(data, null, 2))
  } catch (err) {
    console.log('Error guardando la informacion')
    console.log(err)
  }
}

// Eliminar un producto
export async function DELETEPRODUCTBYID(id) {
  const resp = await fetch(`${FAKESTOREAPI}products/${id}`, {
    method: 'DELETE'
  })
}

// Modificar los datos de un producto
export async function UPDATEPRODUCTBYID(id, data) {
  const resp = await fetch(`${FAKESTOREAPI}products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return resp.json()
}