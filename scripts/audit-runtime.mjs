import {spawnSync} from "node:child_process";
function run(args){const r=spawnSync("npm",args,{encoding:"utf8"});return {code:r.status??1,stdout:r.stdout||"",stderr:r.stderr||""};}
function collect(node,set){for(const [name,dep] of Object.entries(node?.dependencies||{})){set.add(name);collect(dep,set);}}
const treeRun=run(["ls","--omit=dev","--all","--json"]);
let tree={};try{tree=JSON.parse(treeRun.stdout||"{}");}catch{console.error("Could not parse npm runtime tree.");process.exit(1);}
const runtime=new Set();collect(tree,runtime);
const auditRun=run(["audit","--json"]);
let audit={};try{audit=JSON.parse(auditRun.stdout||"{}");}catch{console.error("Could not parse npm audit output.");process.exit(1);}
const levels=new Set(["high","critical"]);
const failures=Object.entries(audit.vulnerabilities||{}).filter(([name,v])=>runtime.has(name)&&levels.has(v.severity));
if(failures.length){console.error("High/critical runtime dependency vulnerabilities detected:");for(const [name,v] of failures)console.error(`- ${name}: ${v.severity}`);process.exit(1);}
console.log("No high or critical vulnerabilities found in the production dependency tree.");
