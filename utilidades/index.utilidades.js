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
// Agregar un nuevo producto
export async function agregarProducto(data) {
  try {
    const response = await fetch(`${FAKESTOREAPI}products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error al agregar producto: ${response.status}`);
    }

    const productoAgregado = await response.json();
    return productoAgregado;
  } catch (error) {
    console.error('Error inesperado al agregar producto:', error.message);
  }
}

// Buscar producto por ID
export async function obtenerProductoPorId(id) {
  try {
    const response = await fetch(`${FAKESTOREAPI}products/${id}`);

    if (response.status === 404) {
      console.log(`Producto con ID ${id} no existe.`);
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const producto = await response.json();
    return producto;
  } catch (error) {
    console.error('Error al obtener producto:', error.message);
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

// Agregar un nuevo producto al archivo local
export async function agregarProductoLocal(data) {
  try {
    const ruta = path.join(__dirname, '../data.json');
    const contenido = await fs.readFile(ruta, 'utf-8');
    const productos = JSON.parse(contenido);

    const arrayProductos = Array.isArray(productos) ? productos : [productos];
    arrayProductos.push(...data);
    console.log('Data del array a agregar al JSON:', arrayProductos);
    await fs.writeFile(ruta, JSON.stringify(arrayProductos, null, 2));
    console.log('Productos agregados al archivo local exitosamente.');
  } catch (err) {
    console.log('Error agregando el producto al archivo local:', err);
  }
}

// Eliminar productos del archivo local por precio
export async function eliminarProductosPorPrecio(precioMaximo) {
  try {
    const ruta = path.join(__dirname, '../data.json');
    const contenido = await fs.readFile(ruta, 'utf-8');
    const productos = JSON.parse(contenido);

    const arrayProductos = Array.isArray(productos) ? productos : [productos];
    const productosFiltrados = arrayProductos.filter(product => product.price <= precioMaximo);

    await fs.writeFile(ruta, JSON.stringify(productosFiltrados, null, 2));
    console.log('Productos eliminados del archivo local exitosamente.');
    console.log('Filtro de productos que no superan el precio maximo: ', productosFiltrados)
  } catch (err) {
    console.log('Error eliminando productos del archivo local:', err);
  }
}