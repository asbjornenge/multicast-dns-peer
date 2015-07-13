var assert = require('assert')
var mdp    = require('../index')

it('can find peers', function(done) {
    var p1 = mdp('testpeers')
    p1.on('peer', function(peer) {
        assert(peer = p2)
        done()
    })
    var p2 = mdp('testpeers')
})
