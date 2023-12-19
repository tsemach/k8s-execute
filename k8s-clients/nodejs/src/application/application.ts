import { Server } from './server'
import { Config } from '../config'

import Logger from '../common/logger'
const logger = Logger.get('application')   

export class Application {
  private static _instance: Application;  
  private _isInit = false

  private constructor() {     
  }

  public static get instance(): Application {
    return Application._instance || (Application._instance = new Application());    
  }
     
  async bootstrap() { 
  }

  start(port?: number) {
    port = (port && port > 0) ? port : Config.server.port
    logger.info('going to listen on:' + port + '!');
    
    Server.instance.listen(port, `aws proxy going is listening on port: ${port} + '!'`)
  }

  async init() {
    if (this._isInit) {
      return 
    }           

    this._isInit = true
  }

  get initStatus() {
    return this._isInit
  }  

}
