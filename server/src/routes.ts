import express from 'express';

const routes = express.Router();


// request - serve para obter dados da nossa requisição
routes.get('/', (request, response) => {
  
    return response.json({message: 'Hellow World'});
})


export default routes; 