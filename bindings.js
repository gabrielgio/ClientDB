//http://stackoverflow.com/questions/13375612/how-to-integrate-codemirror-into-knockoutjs

ko.bindingHandlers.codemirror = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        var options = allBindings().codeOptions || {};
        options.value = ko.unwrap(valueAccessor());
        var editor = CodeMirror.fromTextArea(element, options);

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

ko.bindingHandlers.modal = {
    init: function (element, valueAccessor) {
        $(element).modal({
            show: false
        });

        var value = valueAccessor();
        if (typeof value === 'function') {
            $(element).on('hide.bs.modal', function() {
                value(false);
            });
        }
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).modal("destroy");
        });

    },
    update: function (element, valueAccessor) {
        var value = valueAccessor();
        if (ko.utils.unwrapObservable(value)) {
            $(element).modal('show');
        } else {
            $(element).modal('hide');
        }
    }
}