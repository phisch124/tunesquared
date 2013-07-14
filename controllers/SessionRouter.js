var Framework = require('../framework');

var Party = require('../models/Party');

module.exports = Framework.Router({
    
    'api/session': function(req, res){
        if(req.session.partyId){
            
            Party.model.findOne({_id: req.session.partyId}, function(err, mod){
                
                res.send({
                    party: mod
                });
            
            });
        } else {
            res.send({
                party: null
            });
        }
	},

    'api/joinPartyByName/:name': function(req, res){
        var name = req.param('name');
        console.log(name);
        
        Party.model.findOne({name: name}, function(err, mod){
            
            res.setHeader('Content-Type', 'application/json');
            if(err){
                res.send('{"error": "'+err+'"}');
            } else if(mod === null){
                res.send(JSON.stringify({error: "Cannot find party "+name}));
            } else {
                
                req.session.partyId = mod._id;
                
                req.session.save(function(){
                    res.send(mod);
                });
            }
        });
    },
    
    'api/leaveParty': function(req, res){
    
        req.session.partyId = null;
        
        req.session.save(function(){
            res.end();
        });
    }
});