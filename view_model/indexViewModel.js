DocumentDB = require('../lib/databasedb')

function IndexViewModel() {

    var self = this

    this.loading = ko.observable(false)
    this.loadingMsg = ko.observable('Loading database')
    this.codeOut = ko.observable('{\n\t"hello" : "world"\n}')

    this.document = null

    this.load = function(){
        self.document = new DocumentDB('', '', '')
        self.loading(true)
        self.document.getOrCreate(function (err, database) {
            self.loading(false)
        })
    }
    
    this.runCode = function () {

        //TODO: remove codeInput, all data access should be made throughout databinding
        var querySpec = {
            query: codeInput.getValue(),
        };
        self.loadingMsg('Running query')
        self.loading(true)
        self.document.queryCollections(querySpec, function (err, obj) {
            self.loading(false)
            self.codeOut(JSON.stringify(obj, null, 2) || 'empty')
        })
    }

}

var indexViewModel = new IndexViewModel()

$(document).ready(function () {
    ko.applyBindings(indexViewModel)
    indexViewModel.load()
})