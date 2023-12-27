export type constructorFN<T=any> = new () => T

export class Registry {
  private static _instance: Registry
  private endpoints = new Map<string, constructorFN>()

  private constructor() {    
  }

  public static get instance() {
    return this._instance || (this._instance = new Registry())
  }
  
  add(_name: string, _class: constructorFN) {
    this.endpoints.set(_name, new _class())
  }

  get<T>(_name: string): T {
    return this.endpoints.get(_name) as T
  }

}