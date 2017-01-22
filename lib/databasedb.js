var docDBUtils = require('./docdbUtils')
var DocumentDBClient = require('documentdb').DocumentClient;


function DatabaseDB (host, authkey, databaseId) {
    this.host = host
    this.authkey = authkey
    this.databaseId = databaseId
    this.client = new DocumentDBClient(host, {
        masterKey: authkey
    });
}


DatabaseDB.prototype = {

    getOrCreate : function (callback) {
        var self = this;

        docDBUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, database) {
            self.database = database
            if(err)
                callback(err, null)
            else {
                callback(null, database)
            }
        })
    },

    queryCollections : function(querySpec, callback){
        var self = this;
        docDBUtils.queryCollections(self.client, self.database._self,  querySpec, callback)

    }
}

module.exports = DatabaseDB;