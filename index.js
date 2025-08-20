import { GETALLPRODUCTS, GETPRODUCTBYID, WRITEJSONFILE, UPDATEPRODUCTBYID, DELETEPRODUCTBYID, agregarProducto,
  obtenerProductoPorId, } from "./utilidades/index.utilidades.js";


console.log('------------PUNTO 1------------');
const ALLPRODUCTS = await GETALLPRODUCTS()
// console.log(ALLPRODUCTS);

console.log('------------PUNTO 2------------');
const PRODUCT = await GETPRODUCTBYID(3)
// console.log(PRODUCT);

console.log('------------PUNTO 3------------');
await WRITEJSONFILE(PRODUCT)

console.log('------------PUNTO 4------------');

const nuevoProducto = {
  title: 'Producto nuevo agregado para el TP',
  price: 299.99,
  description: 'Este producto fue agregado por Macarena',
  image: 'imagen.jpg',
  category: 'programacion III'
};

const productoAgregado = await agregarProducto(nuevoProducto);
if (productoAgregado) {
  console.log('Producto agregado:', productoAgregado);
}

console.log('------------PUNTO 5------------');

const idBuscado = 9;
const productoEncontrado = await obtenerProductoPorId(idBuscado);
if (productoEncontrado) {
  console.log('Producto encontrado:', productoEncontrado);
}

console.log('------------PUNTO 6------------');

try {
    await DELETEPRODUCTBYID(4)
    //console.log('Producto eliminado');
} catch (error) {
    console.error('Error al eliminar el producto:', error.message);
}

console.log('------------PUNTO 7------------');

const productoModificado = await UPDATEPRODUCTBYID(5, {
  title: "Producto actualizado",
  price: 500,
  description: "Este es un producto modificado de prueba",
  image: "imagen.jpg",
  category: "electronics"
});

//console.log('Producto modificado:', productoModificado);