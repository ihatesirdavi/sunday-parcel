"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const {activateWithHost,COMMAND}=require("../extension.cjs");
const receipt=JSON.stringify({schema:"sunday-parcel-receipt-v0",cid:"PROJECT-001",source_sha:"b".repeat(40),status_claim:"native-tested",secret:"KEEP_PRIVATE"});
function host(document){
 let command;const warnings=[],information=[];
 const vscode={commands:{registerCommand:(id,action)=>{command={id,action};return {dispose(){}};}},
  window:{activeTextEditor:document?{document}:null,showWarningMessage:async m=>warnings.push(m),showInformationMessage:async m=>information.push(m)}};
 return {vscode,warnings,information,get command(){return command;}};
}
test("registers the intended command",()=>{
 const h=host(null);const d=activateWithHost(h.vscode);
 assert.equal(h.command.id,COMMAND);assert.equal(typeof d.dispose,"function");
});
test("no active editor warns without execution",async()=>{
 const h=host(null);activateWithHost(h.vscode);await h.command.action();
 assert.equal(h.information.length,0);assert.equal(h.warnings.length,1);
});
test("non-JSON editor is rejected",async()=>{
 const h=host({languageId:"plaintext",getText:()=>receipt});activateWithHost(h.vscode);await h.command.action();
 assert.equal(h.information.length,0);assert.equal(h.warnings.length,1);
});
test("only bounded unverified fields are shown",async()=>{
 const h=host({languageId:"json",getText:()=>receipt});activateWithHost(h.vscode);await h.command.action();
 assert.equal(h.information.length,1);assert.match(h.information[0],/unverified local claim/);
 assert.doesNotMatch(h.information[0],/KEEP_PRIVATE/);
});
test("malformed JSON returns warning",async()=>{
 const h=host({languageId:"json",getText:()=>"{bad"});activateWithHost(h.vscode);await h.command.action();
 assert.equal(h.warnings.length,1);assert.equal(h.information.length,0);
});
