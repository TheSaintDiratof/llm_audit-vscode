# Audit code with LLMs
### Installation
For now there are packages only for Nix package manager

[llm_audit.pkgs](https://github.com/TheSaintDiratof/llm_audit.pkgs)

Or just plug it locally :^)
### Configuration
There are several parameters that you can manage
```JavaScript
// set prefix
// default is \"There is a piece of code Show me vulnerabilities in this code. Answer like \\\"$line_number $what_kind_of_vulnerability $way_to_fix\\\"\"
llm_audit-vscode.prefix="prefix"
// set model
// default is \"llama2_70b\"
// available models will be soon
llm_audit-vscode.model="model" 
// set addition
// default is none
llm_audit-vscode.addition="addition"
// set role
// default is \"user\"
llm_audit-vscode.role="role"
```
### Usage
There are only one exposed function and it's "llm_audin-vscode.askLLM"

You can bind it

Just select code and call function
