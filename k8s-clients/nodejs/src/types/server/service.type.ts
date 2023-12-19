import * as express from 'express';

export interface Service {
  add(express?: express.Application): express.Handler;
}
