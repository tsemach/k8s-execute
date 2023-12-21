import request from 'supertest'
import { J } from '../../src/common'
import { Initiator } from '../common/initiator'
import { Server } from '../../src/application'
import { expect } from 'chai'
import Logger from '../../src/common/logger'
import { DynamicController } from '../../src/controllers/dynamic.controller'
import { HttpMethod } from '../../src/types'
const logger = Logger.get('health-controller-test')

describe('Test Dynamic Controller API', function() {  

  this.beforeAll(async () => {
    await Initiator.instance.init()
  })

  this.afterAll(() => {    
  })
  
  it('dynamic-controller.test.ts: test call to new api create by dynamic controller', async () => {        
    new DynamicController()
    // const dc = new DynamicController().create({
    //   method: HttpMethod.GET,
    //   paths: ['get'],
    //   callback: null
    // })

    const reply = await request(Server.instance.app)
      .get('/get')
      .send()    
      .expect(200)        

    logger.info('health api test completed, reply:', J(reply.body))  
  })
    
}) 