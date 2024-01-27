"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
//const { spawn } = require('node:child_process');
class Settings {
    constructor() {
        this.prefix = false;
        this.addition = false;
        this.role = false;
        this.model = false;
    }
}
var settings = new Settings;
function getSel() {
    const editor = vscode.window.activeTextEditor;
    const selection = editor?.selection;
    if (selection && !selection.isEmpty) {
        const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
        const highlighted = editor.document.getText(selectionRange);
        return highlighted;
    }
    return "";
}
function activate(context) {
    const provider = new GPTISViewProvider(context.extensionUri);
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('gpt_is-vscode.intro')) {
            // Get the extension's configuration                                                                                                                                   
            const config = vscode.workspace.getConfiguration('gpt_is-vscode');
            settings.prefix = config.get('prefix') || false;
            // add the new token to the provider                                                                                                                                   
        }
        if (event.affectsConfiguration('gpt_is-vscode.model')) {
            const config = vscode.workspace.getConfiguration('gpt_is_vscode');
            settings.model = config.get('model') || false;
        }
        if (event.affectsConfiguration('gpt_is-vscode.addition')) {
            const config = vscode.workspace.getConfiguration('gpt_is-vscode');
            settings.addition = config.get('addition') || false;
        }
        if (event.affectsConfiguration('gpt_is-vscode.role')) {
            const config = vscode.workspace.getConfiguration('gpt_is-vscode');
            settings.role = config.get('role') || false;
        }
    });
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(GPTISViewProvider.viewType, provider));
    context.subscriptions.push(vscode.commands.registerCommand('gpt_is-vscode.askGPT', () => {
        let code = getSel();
        provider.askGPT(code);
    }));
}
exports.activate = activate;
class GPTISViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }
    async askGPT(code) {
        // focus gpt activity from activity bar
        if (!this._view) {
            await vscode.commands.executeCommand('gpt_is-vscode.responseView.focus');
        }
        else {
            this._view?.show?.(true);
        }
        let response = '';
        let isError = false;
        var gpt_is = (0, child_process_1.spawn)('python3', ['-m', 'gpt_is']);
        gpt_is.stdin.write(code);
        gpt_is.stdout.on('data', (data) => {
            response += data;
        });
        gpt_is.stderr.on('data', (data) => {
            response += data;
            isError = true;
        });
        gpt_is.stdin.end();
        // Show the view and send a message to the webview with the response
        if (this._view) {
            this._view.show?.(true);
            this._view.webview.postMessage({ type: 'showResponse', response: "Getting response...", error: isError });
        }
        gpt_is.on('exit', (code) => {
            //console.log(`child process exited with code ${code}`);
            response = response.replace("/\n/g", "\<br\>");
            if (this._view) {
                this._view.show?.(true);
                this._view.webview.postMessage({ type: 'showResponse', response: response, error: isError });
            }
        });
    }
    _getHtmlForWebview(webview) {
        // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
        // Do the same for the stylesheet.
        //const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
        //const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
        //const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));
        // Use a nonce to only allow a specific script to be run.
        const nonce = getNonce();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<!--
				<link href="\${styleResetUri}" rel="stylesheet">
				<link href="\${styleVSCodeUri}" rel="stylesheet">
				<link href="\${styleMainUri}" rel="stylesheet">
				-->

				<title>Cat Colors</title>
			</head>
			<body>
				<pre id="response" class="response" style="white-space: pre-line;">Hello there, it's LLM audit extension</pre>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
    }
}
GPTISViewProvider.viewType = 'gpt_is-vscode.responseView';
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
//# sourceMappingURL=extension.js.map