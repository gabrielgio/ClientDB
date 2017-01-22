function IndexViewModel() {

    self = this

    this.load = function(){
    }

}

var indexViewModel = new IndexViewModel()

$(document).ready(function () {
    ko.applyBindings(indexViewModel)
    indexViewModel.load()
})