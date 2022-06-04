const logger = require('./log')

const loggingMiddleware = (logPath, debugLevel = "minimum", needConsoleLog = true) => {
    /**
     * debug levels:
     * anonymous - not logging client ip
     * full - log everything
     * minimum - log only http info
     */
    const availableDebugLevel = ["anonymous", "full", "minimum"]
    if (!availableDebugLevel.includes(debugLevel)) {
        throw new Error("Not available debug level values\nSearch available values in documentation")
    }

    return (req, res, next) => {
        const remoteIP = req.ip.split(":").pop()
        const log = {
            DEBUGLEVEL: debugLevel,
            method: req.method,
            url: req.originalUrl
        }
        if (debugLevel !== "minimum") {
            if (req.user) {
                log.user = req.user.id
            }
            if (Object.keys(req.params).length) {
                log.params = req.params
            }
        }
        if (debugLevel !== "anonymous") {
            log.remote = remoteIP
        }
        const response = res.data
        logger(logPath, log, needConsoleLog)
        logger(logPath, response, needConsoleLog)
        return res.json(res.data)
    }
}

module.exports = loggingMiddleware
