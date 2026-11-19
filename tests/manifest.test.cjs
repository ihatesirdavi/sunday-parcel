"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const pkg=JSON.parse(fs.readFileSync(path.join(__dirname,"..","package.json"),"utf8"));
const {COMMAND}=require("../extension.cjs");
test("the manifest exposes only the intended command",()=>{
 assert.equal(pkg.name,"sunday-parcel");
 assert.equal(pkg.contributes.commands.length,1);
 assert.equal(pkg.contributes.commands[0].command,COMMAND);
 assert.ok(pkg.activationEvents.includes("onCommand:"+COMMAND));
});
test("no runtime dependencies or fictitious shipped extension",()=>{
 assert.equal(pkg.private,true);
 assert.equal(Object.keys(pkg.dependencies??{}).length,0);
 assert.equal(pkg.main,"./extension.cjs");
});
