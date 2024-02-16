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
// available models are
// gpt_35_long, gpt_35_turbo, gpt_35_turbo_16k,
// gpt_35_turbo_16k_0613, gpt_35_turbo_0613, gpt_4,
// gpt_4_0613, gpt_4_32k, gpt_4_32k_0613,
// gpt_4_turbo, llama2_7b, llama2_13b,
// llama2_70b, llama13b_v2_chat, llama7b_v2_chat,
// llama70b_v2_chat, llama_13b, mixtral_8x7b,
// mistral_7b, openchat_35, palm,
// falcon_7b, falcon_40b, claude_instant_v1,
// claude_v1, claude_v2, command_light_nightly,
// command_nightly, gpt_neox_20b, oasst_sft_1_pythia_12b,
// oasst_sft_4_pythia_12b_epoch_35, santacoder, bloom,
// flan_t5_xxl, code_davinci_002, text_ada_001,
// text_babbage_001, text_curie_001, text_davinci_002,
// text_davinci_003, pi
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
