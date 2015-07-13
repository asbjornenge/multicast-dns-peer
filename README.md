# multicast-dns-peer

Find peers using [multicast-dns]().

## Install

```
npm install --save multicast-dns-peer
```

## Use

```
var mdp = require('multicast-dns-peer')
mdp.on('peer', function(peer) {
    console.log(peer)
    mdp.stop()
})
mdp({
    peers : 'yolo'
})
```

enjoy
