import pino from 'pino'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileTransport = pino.transport({
    target: 'pino/file',
    options: { destination: `${__dirname}/app.log` },
  });

export default pino({
    level: process.env.PINO_LOG_LEVEL || 'trace',
    formatters: {
        level: (label) => {
            return { severity: label.toUpperCase() };
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
},
fileTransport
)