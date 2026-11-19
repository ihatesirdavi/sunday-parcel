"use strict";
const {parseReceipt}=require("./src/receipt.cjs");
const COMMAND="sundayParcel.inspectReceipt";
function activateWithHost(vscode){
 return vscode.commands.registerCommand(COMMAND,async()=>{
  const doc=vscode.window.activeTextEditor?.document;
  if(!doc || doc.languageId!=="json"){return vscode.window.showWarningMessage("Sunday Parcel: open a local JSON receipt first.");}
  const result=parseReceipt(doc.getText());
  if(!result.ok){return vscode.window.showWarningMessage("Sunday Parcel: "+result.reason);}
  return vscode.window.showInformationMessage(result.message);
 });
}
function activate(context){
 const vscode=require("vscode");
 context.subscriptions.push(activateWithHost(vscode));
}
function deactivate(){}
module.exports={activate,deactivate,activateWithHost,COMMAND};
