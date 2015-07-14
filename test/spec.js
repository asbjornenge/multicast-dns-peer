var assert = require('assert')
var mdp    = require('../index')

it('can find peers', function(done) {
    var p1 = mdp('testpeers')
    var peers = []
    p1.on('peer', function(peer) {
        assert([p2.id, p3.id].indexOf(peer[0].data) >= 0)
        peers.push(peer)
        if (peer[0].data == p2.id) p2.destroy()
        if (peer[0].data == p3.id) p3.destroy()
        if (peers.length < 2) return
        p1.destroy()
        done()
    })
    var p2 = mdp('testpeers')
    var p3 = mdp('testpeers')
})

it('will answer with passed answers', function(done) {
    var answers = [
        { 
            name:'p2', 
            type:'A', 
            ttl:60,
            data:'192.168.1.2'
        },
        { 
            name: 'yolo-service',
            type: 'SRV',
            ttl:60,
            data: {
                port : 9999,
                target : 'p2-service.yolopeers.local'
            }
        }
    ] 
    var p1 = mdp('testpeers2')
    p1.on('peer', function(peer) {
        assert(peer.length == 3)
        assert(peer[0].data == p2.id)
        var names = peer.map(function(a) { return a.name })
        assert(names.indexOf(answers[1].name) > 0)
        assert(names.indexOf(answers[2].name) > 0)
        p1.destroy()
        p2.destroy()
        done()
    })
    var p2 = mdp('testpeers2', {
        answers : answers
    })
})
