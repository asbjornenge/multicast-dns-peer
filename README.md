# multicast-dns-peer

Find peers using [multicast-dns](https://www.npmjs.com/package/multicast-dns).

## Install

```
npm install --save multicast-dns-peer
```

## Use

```js
var mdp = require('multicast-dns-peer')('yolopeers')
mdp.on('peer', function(peer) {
    console.log(peer)
    mdp.destroy()
})
```

The default peer information is not very useful, it only contains the peer id. You'll typically want to add some additional answer records with connection information.

## Options

```js
var mdp = require('multicast-dns-peer')('yolopeers', {
    queryInterval : 2000, // how often to query for peers (default 5000)
    answers : [           // additional peer records 
        { 
            name : 'peer2', 
            type : 'A', 
            ttl  : 300, 
            data : '192.168.1.2' 
        },
        {
            name : 'yolo-service',
            type : 'SRV',
            data : {
                port   : 9999,
                target : 'yolo-service.yolopeers.com'
            }
        }
    ]
})
```

enjoy.
