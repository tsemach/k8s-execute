import request from 'supertest'
import express from 'express'
import { J } from '../../src/common'
import { Initiator } from '../common/initiator'
import { Server } from '../../src/application'
import { expect } from 'chai'
import Logger from '../../src/common/logger'
import { DynamicController } from '../../src/controllers/dynamic.controller'
import { EPCallbackType, HttpMethod } from '../../src/types'
const logger = Logger.get('health-controller-test')

describe('Test Dynamic Controller API', function() {  

  this.beforeAll(async () => {
    await Initiator.instance.init()
  })

  this.afterAll(() => {    
  })
  
  it('dynamic-controller.test.ts: test call to new api create by dynamic controller', async () => {        
    const dc = new DynamicController()
    let data = 0

    async function a<T=any>(req: express.Request, res: express.Response): Promise<T> {
      // return Promise.resolve(0 as T)
      return 0 as T
    }

    async function b<T=number>(req: express.Request, res: express.Response): Promise<T> {
      // return Promise.resolve(0 as T)
      return 0 as T
    }

    const change: EPCallbackType = async <T=number>(req: express.Request, res: express.Response): Promise<T> => {
      data = 1
      return data as T
    }

    console.log('b:', b(null, null))
    dc.create({
      method: HttpMethod.GET,
      paths: ['/get'],
      callback: change
    })
    // const dc = new DynamicController().create({
    //   method: HttpMethod.GET,
    //   paths: ['get'],
    //   callback: null
    // })

    const reply = await request(Server.instance.app)
      .get('/get')
      .send()    
      .expect(200)        

    logger.info('dynamic controller get api test completed, reply:', J(reply.body)) 
    logger.info('data:', data) 
  })
    
}) 