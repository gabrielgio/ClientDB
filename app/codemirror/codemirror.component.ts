import {Component, AfterContentInit} from '@angular/core'

declare var $
declare var CodeMirror

@Component({
    selector: 'codemirror',
    templateUrl: './app/codemirror/codemirror.component.html'
})
export class CodemirrorComponent extends AfterContentInit {
    ngAfterContentInit(): void {

        var codeInput = CodeMirror.fromTextArea(document.getElementById('textInputCode'), {
            lineNumbers: true,
            lineWrapping: true,
            mode: "text/x-sql"
        });

        codeInput.setValue('select * from main')

        var codeOutput = CodeMirror.fromTextArea(document.getElementById('textOutputCode'), {
            lineNumbers: true,
            lineWrapping: true,
            mode: "application/json"
        });

        codeOutput.setValue('{\n\t"hello" : "world"\n}')
    }
}