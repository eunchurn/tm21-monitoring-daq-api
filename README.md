# TM21 DAQ SocketIO server

- [x] NI DAQ Parser
- [x] Scipy data detrending processing (Docker container)
- [x] Redis handler: Real-time data processing
- [x] Socket.io data emitter

## Installation

`yarn` or `npm i`

## Environment

```env
REDIS_SERVER_HOST=localhost
REDIS_SERVER_PORT=6379
REDIS_SERVER_PASSWORD=password
REDIS_DATA_DIR=/data
REDIS_LOCAL_DATA_DIR=/home/ext_hdd/data/redis
```
