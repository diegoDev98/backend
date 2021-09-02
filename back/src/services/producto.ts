import path from 'path';
import { IItem } from '../common/interfaces';
import { isUrl } from '../utils/strings';
import {knex} from 'knex';
import { options } from '../options/mariaDB';


const db = knex(options);
export class Productos {
  async getProductos(): Promise<IItem[]> {

    try {
     const productos= await db.from('products').select('*');
     console.log(productos);
  
     return productos;
      
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
          
  }

  async getProducto(id: number): Promise<IItem[]> {
    try {
      const producto = db.from('products').where('id','=',id);
      return producto;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

   saveProducto(producto: IItem):Promise<IItem>{
    try {
      db('products').insert(producto)
    .then(()=> console.log('table created'));
    

      if (isNaN(producto.price) || !isUrl(producto.url)) {
        throw new Error(
          'Verifica los datos, el precio debe ser un número y la url debe ser válida'
        );
      }
      return new Promise(function (resolve) {
        resolve(producto);
      });
      
    } catch (e:any) {
        throw { error: e, message: 'No se pudo guardar el producto' };
      } 
    }
  

  updateProducto(id: number, producto: IItem): void {
    try {
      if(producto.name !== ''){
        db('products').where({id:id}).update({name:producto.name}).then(
          ()=> {
            console.log('Updated Name'); 
          }
        );
      }
      if(!isNaN(producto.price) && producto.price > 0){
        db('products').where({id:id}).update({price:producto.price}).then(
          ()=> {
            console.log('Updated Price'); 
          }
        );
      }
      if(producto.url !== ''){
        db('products').where({id:id}).update({url:producto.url}).then(
          ()=> {
            console.log('Updated URL'); 
          }
        );
      }
      
     

      
     
    } catch (e) {
      if (e.code) {
        throw {
          error: e,
          message: 'No se pudo actualizar el producto',
        };
      } else {
        throw Error(e.message);
      }
    }
  }

deleteProducto(id: number): void{
     db('products').where({id:id}).del()
     .then(()=>{console.log('deleted');})
     .catch((err)=>{
       console.log(err);
       
     });
    }


 }

