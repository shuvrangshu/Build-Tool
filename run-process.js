// @ts-check
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

async function tryRunProcess(
  /** @type {ProcessingInstruction.Json} */ sample
) {
    console.log(`Path ==> ${sample.path} `)
    console.log(`Cmd ==> ${sample.cmd} `)
    child_process.execSync(sample.cmd, {
        cwd: sample.path,
        stdio: 'inherit'
    });
}
const processJsonPath = path.join(__dirname + '/processList.json');
const processJson = JSON.parse(fs.readFileSync(processJsonPath).toString());

for (const sample of processJson) {
    console.log(`=== Running task on ${sample.taskName} ===`);
    for (const precessSample of sample.processDetails) {
        tryRunProcess(precessSample)
    }
}