"use strict";
const MAX_INPUT_BYTES=128*1024;
const ALLOWED_STATUS=new Set(["source-only","native-tested","installed","operational"]);
function fail(reason){return {ok:false,reason};}
function parseReceipt(input){
 if(typeof input!=="string" || Buffer.byteLength(input,"utf8")>MAX_INPUT_BYTES){return fail("Receipt must be JSON of at most 128 KiB.");}
 let data;
 try{data=JSON.parse(input);}catch{return fail("Invalid JSON; no source was accessed.");}
 if(!data || typeof data!=="object" || Array.isArray(data)){return fail("Receipt must be a JSON object.");}
 if(data.schema!=="sunday-parcel-receipt-v0"){return fail("Unrecognized receipt schema.");}
 const cid=data.cid;
 if(typeof cid!=="string" || cid.length>80 || !/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+){1,7}$/.test(cid)){return fail("Invalid CID.");}
 const sha=data.source_sha;
 if(typeof sha!=="string" || !/^[a-f0-9]{40}$/i.test(sha)){return fail("Invalid source SHA.");}
 const grade=data.status_claim;
 if(!ALLOWED_STATUS.has(grade)){return fail("Unsupported status claim.");}
 const safeSha=sha.toLowerCase();
 return {ok:true,cid,sourceSha:safeSha,statusClaim:grade,
  message:"Sunday Parcel: unverified local claim | "+cid+" | "+safeSha.slice(0,12)+" | "+grade+
  ". Neither original source nor installed behavior was checked."};
}
module.exports={parseReceipt,MAX_INPUT_BYTES};
