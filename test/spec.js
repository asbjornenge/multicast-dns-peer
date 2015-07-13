var assert = require('assert')
var mdp    = require('../index')

it('can find peers', function(done) {
    var p1 = mdp('testpeers')
    p1.on('peer', function(peer) {
        console.log('got peer', peer)
        assert(peer = p2)
        p1.destroy()
        p2.destroy()
        done()
    })
    var p2 = mdp('testpeers')
})
