import pino from 'pino'



export default pino({
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
        level: (label) => {
            return { severity: label.toUpperCase() };
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
})