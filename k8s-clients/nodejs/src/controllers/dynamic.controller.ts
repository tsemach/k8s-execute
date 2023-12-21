import express from 'express';
import { Server } from '../application/server';
import { Controller, EndpointType } from '../types'
import Logger from '../common/logger';
const logger = Logger.get('health')

export class DynamicController implements Controller {

  constructor() {    
    // Server.instance.route('/', this);
  }

  create(endpoint: EndpointType) {
    Server.instance.route('/', this, endpoint);
    return this
  }

  public add(app: express.Application, opaque: EndpointType): express.Router {
    let router = express.Router();
                    
    router.get(opaque.paths, async (req: express.Request, res: express.Response) => {
      res.json({ method: 'get'})
    })    

    return router;    
  }

}

// export default new HealthController();






// import express from 'express';
// import { Server } from '../application/server';
// import { Controller, EndpointType, HttpMethod } from '../types'
// import Logger from '../common/logger';
// const logger = Logger.get('health')

// export class DynamicController implements Controller {

//   constructor() {    
//   }
  
//   create(endpoint: EndpointType) {
//     Server.instance.route('/', this, endpoint);
//     return this
//   }

//   public add(app?: express.Application, opaque?: EndpointType): express.Router {
//     let router = express.Router();
                
//     router.get(opaque.paths, async (req: express.Request, res: express.Response) => {      
//       // await opaque.callback(req, res)

//       return res.json({ status: 'ok' })
//     })    

//     return router;    
//   }

//   private getRoutMethod(router: express.Router, method: HttpMethod) {    
//     switch (method) {
//       case HttpMethod.GET: return router.get
//     }    
//   }
// }





