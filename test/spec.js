var assert = require('assert')
var mdp    = require('../index')

it('can find peers', function(done) {
    var p1 = mdp('testpeers')
    p1.on('peer', function(peer) {
        assert(peer[0].data == p2.id)
        p1.destroy()
        p2.destroy()
        done()
    })
    var p2 = mdp('testpeers')
})

it('will answer with passed answers', function(done) {
    var answer = { name:'testpeers2', type:'A', ttl:5, data:'192.168.1.2'}
    var p1 = mdp('testpeers2')
    p1.on('peer', function(peer) {
        assert(peer.length == 2)
        assert(peer[0].data == p2.id)
        delete peer[1].class
        assert.deepEqual(peer[1], answer) 
        p1.destroy()
        p2.destroy()
        done()
    })
    var p2 = mdp('testpeers2', {
        answers : [answer] 
    })
})
