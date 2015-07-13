# multicast-dns-peer

Find peers using [multicast-dns]().

## Install

```
npm install --save multicast-dns-peer
```

## Use

```
var mdp = require('multicast-dns-peer')('yolopeers')
mdp.on('peer', function(peer) {
    console.log(peer) // <= some other yolopeer
    mdp.destroy()
})
```

enjoy.
