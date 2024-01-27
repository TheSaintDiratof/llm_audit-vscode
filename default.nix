{ lib
, fetchFromGitHub
, vscode-utils
, llm_audit }:
let
  inherit (vscode-utils) buildVscodeExtension;
in
  buildVscodeExtension {
    name = "llm_audit-vscode";
    src = fetchFromGitHub {
      owner = "TheSaintDiratof";
      repo = "llm_audit-vscode";
      rev = "master";
      hash = "";
    };
    vscodeExtPublisher = "";
    vscodeExtName = "llm_audit-vscode";
    vscodeExtUniqueId = "";
    nativeBuildInputs = [
      llm_audit
    ];
  }
