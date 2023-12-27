import express from 'express';
import { Server } from '../application/server';
import { Controller, EndpointType } from '../types'
import Logger from '../common/logger';
import { J } from '../common';
const logger = Logger.get('dynamic-controller')

export class DynamicController implements Controller {

  constructor() {    
  }

  create(endpoint: EndpointType) {
    Server.instance.route('/', this, endpoint);
    return this
  }

  public add(app: express.Application, opaque: EndpointType): express.Router {
    let router = express.Router();
                        
    router[opaque.method.toString()](opaque.paths, async (req: express.Request, res: express.Response) => {
      const response = await opaque.callback(req, res)
      res.status(200).json(response)      
    })    
    return router;    
  }

  howAmI() {
    return this.constructor.name
  }
}

