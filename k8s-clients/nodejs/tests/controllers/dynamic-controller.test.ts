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
    let data: any        
        
    type EPCallbackType = (req: express.Request, res: express.Response) => Promise<{ status: number, data: any }>    
    const change: EPCallbackType = async (req: express.Request, res: express.Response) => {      
      data = { change: "called"}      
      return { status: 200, data: { change: "called"} }
    }
    
    const dc = new DynamicController().create({
      method: HttpMethod.GET,
      paths: ['/get'],
      callback: change
    })    

    const reply = await request(Server.instance.app)
      .get('/get')
      .send()    
      .expect(200)

    logger.info('dynamic controller get api test completed, reply:', reply.text, typeof reply.text) 
    logger.info('data:', data) 
  })
    
}) 