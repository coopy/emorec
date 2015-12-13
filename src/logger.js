import Bunyan from 'bunyan';

import config from 'config';

const logger = Bunyan.createLogger({ name: 'emorec', level: config.get('log.level') });
export default logger;
