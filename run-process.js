// @ts-check
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

async function tryRunProcess(
  /** @type {ProcessingInstruction.Json} */ sample
) {
    console.log('\x1b[33m%s\x1b[0m', `Path ==> ${sample.path} Cmd ==> ${sample.cmd}`)
    child_process.execSync(sample.cmd, {
        cwd: sample.path,
        stdio: 'inherit'
    });
}
const processJsonPath = path.join(__dirname + '/processList.json');
const processJson = JSON.parse(fs.readFileSync(processJsonPath).toString());

for (const sample of processJson) {
    console.log('\x1b[36m%s\x1b[0m', `=== Running task on ${sample.processName} ===`);
    for (const precessSample of sample.processDetails) {
        tryRunProcess(precessSample)
    }
}