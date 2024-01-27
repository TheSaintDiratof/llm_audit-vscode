{ lib
, fetchFromGitHub
, vscode-utils
, llm_audit }:
vscode-utils.buildVscodeExtension {
  version = "0.0.2";
  name = "llm_audit-vscode";
  src = fetchFromGitHub {
    owner = "TheSaintDiratof";
    repo = "llm_audit-vscode";
    rev = "master";
    hash = "sha256-apPINImUeWRGVSW4fYSS6kl88SauYE+uztMn+BglFxo=";
  };
  vscodeExtPublisher = "Diratof Azdimarlow";
  vscodeExtName = "llm_audit-vscode";
  vscodeExtUniqueId = "DiratofAzdimarlow.llm_audit-vscode";
  nativeBuildInputs = [
    llm_audit
  ];
}
