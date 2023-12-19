import { Application } from "../../src/application";
import '../../src/main'

export class Initiator {
  public static _instance: Initiator;
  private isInit = false

  private constructor() {    
  }

  public static get instance() {
    return Initiator._instance || (Initiator._instance = new Initiator())
  }

  async init() {            
    if (this.isInit) {
      return
    }

    await Application.instance.bootstrap()
    await Application.instance.init()
    this.isInit = true
  }     

  getIsInit() {    
    return this.isInit
  }
}