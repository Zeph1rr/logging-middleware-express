# Logging-middleware-express

![npm-version](https://img.shields.io/npm/v/logging-middleware-express?color=green&label=logging-middleware-express&style=plastic)

## Description

This module can be used for setting log request parameters in api with express module usage.

Module returns json string to console and log file with these parameters:

```
Debug level "minimum":
{
    DEBUGLEVEL: Current debug level,
    timestamp: Time of the request,
    method: Request method,
    url: Url of request
}
Debug level "full" or "anonymous":
{
    user: Information about user, generated by auth middleware. Auth middleware has to create property req.user,
    params: List of params of requests,
    remote: Ip of remote user, who called the request. Doesn't generate with "anonimous" debug level.
}
```

## Installation

```
npm i logging-middleware-express
```

## Usage

- Create config file for logger. Example:

```
const loggingMiddleware = require('logging-middleware-express')

const logPath = "/path/to/your/log/directory"
const needConsoleLog = true/false (true by default)
const debugLevel = "full"/"anonymous"/"minimum" ("minimum by default")

module.exports = loggingMiddleware(logPath, debugLevel, needConsoleLog)
```

- Require logger in your index.js file

```
const loggingMiddleware = require('./middleware/logging.middleware')
```

- Add logger as middleware in your app before ErrorHandler

```
app.use(loggingMiddleware)
```

- At the end of your controller functions add your response data in data field

```
response.data = your_response_data
next()
```

- Enjoy your logs!


## Contacts

If you have any questions about this repository, you can contact me by telegram (@Zeph1rr) or by email (grianton535@gmail.com)

This project is licensed under the terms of the MIT license
