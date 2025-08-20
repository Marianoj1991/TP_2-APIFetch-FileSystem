import { GETALLPRODUCTS, GETPRODUCTBYID, WRITEJSONFILE, UPDATEPRODUCTBYID, DELETEPRODUCTBYID } from "./utilidades/index.utilidades.js";


console.log('------------PUNTO 1------------');
const ALLPRODUCTS = await GETALLPRODUCTS()
// console.log(ALLPRODUCTS);

console.log('------------PUNTO 2------------');
const PRODUCT = await GETPRODUCTBYID(3)
// console.log(PRODUCT);

console.log('------------PUNTO 3------------');
await WRITEJSONFILE(PRODUCT)

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