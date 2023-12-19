import Logger from './common/logger'
import { Application } from './application'
import { J } from './common/json-pretty-print';
const logger = Logger.get('main')

import './middlewares';
import './controllers';

export default async function main(port = -1, with_start = false) { 
  logger.info("ENV:", process.env)
  try {    
    await Application.instance.bootstrap()
    await Application.instance.init()    
    logger.info('application init:')

    if ( with_start ) {
      Application.instance.start(port)       
    }       
  }
  catch (e) {
    logger.error("ERROR: unable to initialize application context (nest), e:", e.stack)
  }
}
