import { DynamicModule, INestApplicationContext, Type } from '@nestjs/common'
import { Config } from '../config'

export class Nest {
  private static _instance: Nest
  private _nest: INestApplicationContext

  private constructor() {    
  }

  public static get instance(): Nest {    
    return Nest._instance || (this._instance = new Nest())
  }

  set nest(_nest: INestApplicationContext) {
    this._nest = _nest
  }

  get nest() {
    return this._nest
  }
  
  // Nest.instance.nest.select(ApphModule).get(SomeProvider, { strict: true })
  get<T=any>(module: DynamicModule | Type<T>, searvice: string | symbol | Function | Type<T>, options = { strict: true })  {
    return this._nest.select(module).get(searvice, options) as T
  }  

}