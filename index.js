const fs = require("fs")
const format = require("node.date-time");
const path = require('path');

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

        const today = new Date().format("yyyy-MM-dd")
        const now = new Date().format("yyyy-MM-dd HH:mm:SS.ms")
        const log = {
            DEBUGLEVEL: debugLevel,
            timestamp: now,
            method: req.method,
            url: req.originalUrl
        }
        if (debugLevel !== "minimum") {
            if (req.user) {
                log.user = req.user.id
            }
            if (req.params) {
                log.params = req.params
            }
        }
        if (debugLevel !== "anonymous") {
            log.remote = remoteIP
        }
        const data = JSON.stringify(log)
        if (needConsoleLog) {
            console.log(data)
        }
        fs.appendFile(path.join(logPath, `log-${today}.txt`), data + '\n', err => {
            if (err) throw err
        })
        next()
    }
}

module.exports = loggingMiddleware
