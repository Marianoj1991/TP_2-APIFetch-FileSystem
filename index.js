import { GETALLPRODUCTS, GETPRODUCTBYID, WRITEJSONFILE } from "./utilidades/index.utilidades.js";


console.log('------------PUNTO 1------------');
const ALLPRODUCTS = await GETALLPRODUCTS()
// console.log(ALLPRODUCTS);

console.log('------------PUNTO 2------------');
const PRODUCT = await GETPRODUCTBYID(3)
// console.log(PRODUCT);

console.log('------------PUNTO 3------------');
await WRITEJSONFILE(PRODUCT)