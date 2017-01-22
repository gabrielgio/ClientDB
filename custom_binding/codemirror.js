//http://stackoverflow.com/questions/13375612/how-to-integrate-codemirror-into-knockoutjs

ko.bindingHandlers.codemirror = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        var options = viewModel.options || {};
        options.value = ko.unwrap(valueAccessor());
        var editor = CodeMirror(element, options);

        editor.on('change', function(cm) {
            var value = valueAccessor();
            value(cm.getValue());
        });

        element.editor = editor;
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var observedValue = ko.unwrap(valueAccessor());
        if (element.editor) {
            element.editor.setValue(observedValue);
            element.editor.refresh();
        }
    }
};