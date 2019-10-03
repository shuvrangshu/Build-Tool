var os = require('os');
var pty = require('node-pty');
var Terminal = require('xterm').Terminal;
var FitAddon = require('xterm-addon-fit').FitAddon;

// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
//document.getElementById('logmsg').append(process.env);
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env
});
var btnStart= document.getElementById('btnStart')
btnStart.addEventListener("click",function(){
  ptyProcess.write("node run-process.js\r");
});
// Initialize xterm.js and attach it to the DOM
const xterm = new Terminal();
const fitAddon = new FitAddon();
xterm.loadAddon(fitAddon);
xterm.open(document.getElementById('xterm'));
fitAddon.fit();

// Setup communication between xterm.js and node-pty
xterm.onData(data => ptyProcess.write(data));
ptyProcess.on('data', function (data) {
  xterm.write(data);
});
const RESUME = '\x11';
//ptyProcess.write("node run-process.js\r")
//process.env["node run-process.js\r"]
function OnStart_Click(){
  ptyProcess.write("node run-process.js\r");
}
