import express from 'express';
import { HttpMethod } from "../http/http-method.type"
import { EPResponseType } from "./endpoint-response.type"

export type EPCallbackType = <T=any>(req: express.Request, res: express.Response) => Promise<T>

export interface EndpointType {
  method: HttpMethod
  paths: string[]
  // callback: <T=any>(req: express.Request, res: express.Response) => Promise<T>
  callback: EPCallbackType
}
