var EventEmitter = require('events').EventEmitter
var assign       = require('object.assign')
var multicast    = require('multicast-dns')

var mdp = function(peergroup, opts) {
    if (!(this instanceof mdp)) return new mdp(peergroup, opts)
    if (!peergroup) throw 'peergroup required'
    this.peergroup = peergroup
    this.opts = assign({
        queryInterval : 1000,
        recordType    : 'A'
    }, opts)

    this.mdns = multicast()
    this.mdns.on('response', function(resp) {
        console.log('got a response packet:', resp)
    })
    this.mdns.on('query', function(query) {
        console.log('got a query packet:', query)
    })

    this.query()
    setInterval(this.query.bind(this), this.opts.queryInterval)
}

mdp.prototype = assign({
    query : function() {
        this.mdns.query({
            questions : [
                {
                    name : this.peergroup,
                    type : this.opts.recordType 
                }
            ]
        })
    },
    stop : function() {
        this.mdns.destroy()
    }
}, EventEmitter.prototype)

module.exports = mdp
