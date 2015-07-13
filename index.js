var EventEmitter = require('events').EventEmitter
var assign       = require('object.assign')
var multicast    = require('multicast-dns')
var uuid         = require('node-uuid')
var deepEqual    = require('deep-equal')

var mdp = function(peergroup, opts) {
    if (!(this instanceof mdp)) return new mdp(peergroup, opts)
    if (!peergroup) throw 'peergroup required'
    this.peergroup = peergroup
    this.opts = assign({
        queryInterval : 5000,
        answers : []
    }, opts)
    this.id = uuid.v4()

    // Prepend ID answer
    this.opts.answers.unshift(
        { name:this.peergroup, type:'TXT', ttl:300, data:this.id }
    )

    this.mdns = multicast()
    this.mdns.on('query', this.onQuery.bind(this))
    this.mdns.on('response', this.onResponse.bind(this))

    this.query()
    this.queryInterval = setInterval(this.query.bind(this), this.opts.queryInterval)
}

mdp.prototype = assign({
    query : function() {
        this.mdns.query({
            questions : [
                {
                    name : this.peergroup,
                    type : 'TXT' 
                }
            ]
        })
    },
    onQuery : function(query) {
        var types = query.questions.map(function(a) { return a.type })
        var names = query.questions.map(function(a) { return a.name })
        if (types.indexOf('TXT') < 0) return
        if (names.indexOf(this.peergroup) < 0) return
        this.mdns.respond({
            answers : this.opts.answers 
        })
    },
    onResponse : function(response) {
        var types = response.answers.map(function(a) { return a.type })
        var names = response.answers.map(function(a) { return a.name })
        var datas = response.answers.map(function(a) { return a.data })
        if (types.indexOf('TXT') < 0) return
        if (names.indexOf(this.peergroup) < 0) return
        if (datas.indexOf(this.id) >= 0) return
        this.emit('peer', response.answers)
    },
    destroy : function() {
        clearInterval(this.queryInterval)
        this.mdns.destroy()
    }
}, EventEmitter.prototype)

module.exports = mdp
