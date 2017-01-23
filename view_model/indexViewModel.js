DocumentDB = require('../lib/databasedb')

function IndexViewModel() {

    var self = this

    this.loading = ko.observable(false)
    this.loadingMsg = ko.observable('Loading database')
    this.codeOut = ko.observable('{\n\t"hello" : "world"\n}')
    this.links = ko.observableArray()
    this.selectedLink = ko.observable()

    this.document = null

    this.load = function () {
        self.document = new DocumentDB('', '', '')
        self.loading(true)
        self.document.getOrCreate(function (err, database) {
            var querySpec = {
                query: 'select * from master m'
            };
            self.document.queryCollections(querySpec, function (err, obj) {
                self.loading(false)
                self.links.push(obj[0])
                self.selectedLink(obj[0])
            })
        })
    }

    this.runCode = function () {

        //TODO: remove codeInput, all data access should be made throughout databinding
        var querySpec = {
            query: codeInput.getValue(),
        };

        self.document.queryDocument(self.selectedLink()._self, querySpec, function (err, obj) {
            self.loading(false)
            self.codeOut(JSON.stringify(obj, null, 2) || 'empty')
        })

        self.loadingMsg('Running query')
        self.loading(true)

    }

}

var indexViewModel = new IndexViewModel()

$(document).ready(function () {
    ko.applyBindings(indexViewModel)
    indexViewModel.load()
})