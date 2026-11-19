"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const {parseReceipt}=require("../src/receipt.cjs");
const hash="b".repeat(40);
const valid=(x={})=>JSON.stringify({schema:"sunday-parcel-receipt-v0",cid:"PROJECT-001",source_sha:hash,status_claim:"source-only",...x});
test("local JSON preview stays explicitly unverified",()=>{
 const x=parseReceipt(valid());
 assert.equal(x.ok,true);assert.equal(x.cid,"PROJECT-001");
 assert.equal(x.sourceSha,hash);assert.match(x.message,/unverified/i);
});
test("rejects invalid JSON",()=>assert.equal(parseReceipt("{broken").ok,false));
test("rejects non-object and missing schema",()=>{
 assert.equal(parseReceipt("[]").ok,false);
 assert.equal(parseReceipt(JSON.stringify({cid:"PROJECT-001"})).ok,false);
});
test("rejects command-shaped CID",()=>assert.equal(parseReceipt(valid({cid:"PROJECT-001\nSECRET"})).ok,false));
test("rejects abbreviated SHA",()=>assert.equal(parseReceipt(valid({source_sha:"1234"})).ok,false));
test("rejects unsupported status and oversized data",()=>{
 assert.equal(parseReceipt(valid({status_claim:"production-ready"})).ok,false);
 assert.equal(parseReceipt(" ".repeat(132000)).ok,false);
});
test("extra fields cannot leak to the summary",()=>{
 const x=parseReceipt(valid({secret:"SECRET_NEVER_DISPLAY"}));
 assert.equal(x.ok,true);assert.doesNotMatch(JSON.stringify(x),/SECRET_NEVER_DISPLAY/);
});