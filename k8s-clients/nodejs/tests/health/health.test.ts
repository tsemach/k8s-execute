import request from 'supertest'
import { J } from '../../src/common'
import { Initiator } from '../common/initiator'
import { Server } from '../../src/application'
import { expect } from 'chai'
import Logger from '../../src/common/logger'
const logger = Logger.get('health-controller-test')

describe('Test Health API', function() {  

  this.beforeAll(async () => {
    await Initiator.instance.init()
  })

  this.afterAll(() => {    
  })
  
  it('application.test.ts: test send health api to test firing health event', async () => {        

    const reply = await request(Server.instance.app)
      .get('/health')
      .send()    
      .expect(200)        

    logger.info('health api test completed, reply:', J(reply.body))  
  })
    
}) 