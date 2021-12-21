import winston from 'winston';

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            const ts = info.timestamp.slice(0, 19).replace('T', ' ');
            const msg = info.message;
            return `${ts} — ${msg}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ level: 'info', filename: './logs/logs.log', maxFiles: 2, maxsize: 5242880 }),
        new winston.transports.File({ level: 'error', filename: './logs/errors.log', maxFiles: 2, maxsize: 5242880 }),
    ]
})