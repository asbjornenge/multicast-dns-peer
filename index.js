var EventEmitter = require('events').EventEmitter
var assign       = require('object.assign')
var multicast    = require('multicast-dns')

var mdp = function(peergroup, opts) {
    if (!(this instanceof mdp)) return new mdp(peergroup, opts)
    if (!peergroup) throw 'peergroup required'
    this.peergroup = peergroup
    this.opts = assign({
        queryInterval : 1000,
        answers : [
            { name:this.peergroup, type:'TXT', ttl:300, data:'no peer data' }
        ]
    }, opts)

    this.mdns = multicast()
    this.mdns.on('query', this.onQuery.bind(this))
    this.mdns.on('response', this.onResponse.bind(this))

    this.query()
    setInterval(this.query.bind(this), this.opts.queryInterval)
}

mdp.prototype = assign({
    query : function() {
        // TODO: Make the questions array based on this.opts.answers
        this.mdns.query({
            questions : [
                {
                    name : this.peergroup,
                    type : this.opts.recordType 
                }
            ]
        })
    },
    onQuery : function(query) {
        query.questions.forEach(function(q) {
            if (q.name !== this.options.name) return
            this.mdns.respond({
                answers : this.opts.answers 
            })
        }.bind(this))
    },
    onResponse : function(response) {
        console.log(response)
        this.emit('peer', response)
//        resonse.answers.forEach(function(a) {
//            if (a.type != 'TXT' || a.name != this.options.name) return
//            this.emit('peer', JSON.parse(a.data))
//        }.bind(this))
    },
    stop : function() {
        this.mdns.destroy()
    }
}, EventEmitter.prototype)

module.exports = mdp
