import * as express from 'express';

export interface Controller {
  add(express?: express.Application, opaque?: any): express.Handler;
}
