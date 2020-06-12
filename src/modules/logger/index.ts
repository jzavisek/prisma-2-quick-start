import pino from 'pino'

const log = pino({
  // eslint-disable-next-line no-process-env
  level: process.env.LOG_LEVEL || 'info',
  name: 'cms',
  prettyPrint: true,
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
})

export {
  log
}
