import express from 'express';
import { HttpMethod } from "../http/http-method.type"
import { EPResponseType } from "./endpoint-response.type"

export interface EndpointType {
  method: HttpMethod
  paths: string[]
  callback: (req: express.Request, res: express.Response) => Promise<void>
}
