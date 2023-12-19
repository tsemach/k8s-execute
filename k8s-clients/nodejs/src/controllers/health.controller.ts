import express from 'express';
import { Server } from '../application/server';
import { Controller } from '../types'
import Logger from '../common/logger';
const logger = Logger.get('health')

class UploadController implements Controller {

  constructor() {    
    Server.instance.route('/', this);
  }

  public add(): express.Router {
    let router = express.Router();
                    
    router.get(['/health'], async (req: express.Request, res: express.Response) => {      
      res.json({ status: 'ok'})
    })    

    return router;    
  }

}

export default new UploadController();


