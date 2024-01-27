{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  packages = with pkgs; let 
    g4f = pkgs.python3Packages.callPackage ./g4f-nix/default.nix {};
    llm_audit = pkgs.python3Packages.callPackage ./llm_audit/default.nix {g4f = g4f;};
    llm_audit-vscode = callPackage ./default.nix {llm_audit = llm_audit;};
  in [
    python3Full git
    (vscode-with-extensions.override{vscodeExtensions = [ llm_audit-vscode ];})
    nodejs
    typescript
  ];
}
