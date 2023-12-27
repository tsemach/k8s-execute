import request from 'supertest'
import express from 'express'
import { J } from '../../src/common'
import { Initiator } from '../common/initiator'
import { Server } from '../../src/application'
import { DynamicController } from '../../src/controllers/dynamic.controller'
import { Registry } from '../../src/registry/registry'
import { expect } from 'chai'
import Logger from '../../src/common/logger'
import { EPCallbackType, HttpMethod } from '../../src/types'

const logger = Logger.get('health-controller-test')

describe('Register Facotry API', function() {  

  this.beforeAll(async () => {    
    await Initiator.instance.init()
  })

  this.afterAll(() => {    
  })
  
  it('registry.test.ts: test reistry to create dynamic controller', async () => {
    Registry.instance.add('servcice-a:flow:start', DynamicController)

    const endpoint = Registry.instance.get<DynamicController>('servcice-a:flow:start')
    logger.info('endpoint.howAmI():', endpoint.howAmI())

    let data: any        
    const change: EPCallbackType = async (req: express.Request, res: express.Response) => {      
      data = { change: "called"}      
      return { status: 200, data: { change: "called"} as any }
    }
    
    endpoint.create({
      method: HttpMethod.GET,
      paths: ['/service-a/get'],
      callback: change
    })    

    const reply = await request(Server.instance.app)
      .get('/service-a/get')
      .send()    
      .expect(200)

    logger.info('dynamic controller get api test completed, reply:', reply.text, typeof reply.text) 

  })
    
}) 