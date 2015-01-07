# sombrero-test

# Install

```bash
$ npm install sombrero-test -g
```

# Usage:

```bash
$ sombrero-test <options> <URL>
```

Options:

* `--nostandby`: don't standby
* `--db=</path/to/db>` : database path
* `--port=<port>` : sombrero port
* `--gossip-port=<port>` : sombrero gossip port
* `--join=<URL>` : URL of node to join

## Examples:

### Start a leader that later joins some nodes to the cluster

```bash
$ sombrero-test sombrero-test tcp+msgpack://localhost:7000 --nostandby --join=tcp+msgpack://localhost:7001 --join=tcp+msgpack://localhost:8001
```

### Start a node with custom ports 7001-7003

```bash
$ sombrero-test tcp+msgpack://localhost:7001 --port=7002 --gossip-port=7003
```

### Start a node with custom ports 8001-8003

```bash
$ sombrero-test tcp+msgpack://localhost:8001 --port=8002 --gossip-port=8003
```




# License

ISC