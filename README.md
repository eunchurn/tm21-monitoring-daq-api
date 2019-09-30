[![Build Status](https://travis-ci.org/eunchurn/tm21-monitoring-daq-api.svg?branch=master)](https://travis-ci.org/eunchurn/tm21-monitoring-daq-api)

# TM21 DAQ SocketIO server

- [x] NI DAQ Parser
- [x] Scipy data detrending processing (Docker container)
- [x] Redis handler: Real-time data processing
- [x] Socket.io data emitter

## Installation

`yarn` or `npm i`

## Environment

```env
DAQ_UDP_MULTI_HOST=234.5.6.7
DAQ_UDP_PORT=58432
```
