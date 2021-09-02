import express, { Request, Response } from 'express';
import { IItem } from '../common/interfaces';
import { Productos } from '../services/producto';

const routes = express.Router();

const {
  getProductos,
  getProducto,
  saveProducto,
  updateProducto,
  deleteProducto,
} = new Productos();

routes.get(
  '/productos/listar',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const productos = await getProductos();
      if (productos.length !== 0) res.json({ data: productos });
      else throw new Error('No hay productos');
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message });
    }
  }
);

routes.get(
  '/productos/listar/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {

      const producto = await getProducto(parseInt(req.params.id));
      if (producto) res.json({ data: producto });
      else throw new Error('Producto no encontrado');
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message });
    }
  }
);

routes.post(
  '/productos/guardar',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const producto = req.body;
      saveProducto(producto);
      res.json({ data: producto });
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message });
    }
  }
);

routes.put(
  '/productos/actualizar/:id',
  async (req: Request, res: Response): Promise<void> => {
    
    try {
      updateProducto(parseInt(req.params.id), req.body);
      res.send('Updated');
    } catch (e) {
      res.status(404).json({ error: e.error, message: e.message });
    }
  }
);

routes.delete(
  '/productos/borrar/:id',
   (req: Request, res: Response): void => {
     const id = parseInt(req.params.id);
     getProducto(id).then((data)=> {
       if(data.length>0){ 
        deleteProducto(id);
        res.send('deleted');
       }
       else {
         res.send('Item doesnt exist');
       }
     });
     
     
   }
);

export default routes;
