import {Request, Response} from 'express';

import knex from '../database/connection';

//request params, apenas para rotas
//request body, apenas para criação e edição

class PointsController {

    async index(request: Request, response: Response){
        // cidade, uf, items (Query Params, por que sempre que vai pegar filtrado usar o Query)
        return null;
    }

   async show(request: Request, response: Response){
    //    const id = request.params.id; mesma coisa
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();
    // validação pra saber se existe o ponto
    if (!point) {
        return response.status(400).json({message: 'Point no found.'});
    }

    //  Mesma coisa
    //  SELECT * FROM items
    //      JOIN point_items ON items.id = point_items.items_id
    //   WHERE point_items.point_id = {id}
    //fazendo um join com a tabela
    const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');


    return response.json({point, items});
   }
   
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();
    
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        //retorna os ids dos registros que foram inseridos
        const insertedIds = await trx('points').insert(point)
        const point_id = insertedIds[0];
    
        //relacionamento com a tabela de itens
        const pointItems = items.map((item_id: number) =>{
            return {
                item_id,
                point_id,
            };
        })
    
        await trx('point_items').insert(pointItems);
    
        return response.json({ 
            id: point_id,
            ... point,
        });
    }
}

export default PointsController;