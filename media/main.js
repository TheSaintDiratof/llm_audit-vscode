//@no-ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.


(function () {
    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        //const vscode = acquireVsCodeApi();

        //vscode.setState({ pidor });
        const message = event.data; // The json data that the extension sent
        switch (message.type) {
            case 'showResponse':
                {
                    if(message.isError) {
                        setError();
                    }
                    else {
                        unsetError();
                    }
                    showResponse(message.response);
                    
                    break;
                }
        }
    });

    function showResponse(response) {
        let p = document.getElementById('response');
        response = response.replace("/\\n/g", "\<br\>");
        p.innerHTML = response;
    }

    function setError() {
        let p = document.getElementById('response');
        p.style.color = "red";
		p.style.wordBreak= "break-word";
    }
    function unsetError() {
        let p = document.getElementById('response');
        p.style.color = "white";
		p.style.wordBreak = "break-word";
    }
}());


