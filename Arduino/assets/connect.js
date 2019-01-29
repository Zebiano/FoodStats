// Requires
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const parser = new Readline();

// Variables
const comPort = "COM12";
const baudRate = 9600;

// new SerialPort Object
var serialPort = new SerialPort(comPort, {
    baudRate: baudRate
}, function () {
    console.log("Using Port " + comPort + " and at " + baudRate + " Baud.")
});

// Make text eligible with a parser
serialPort.pipe(parser);

// Export
module.exports = {
    serialPort: serialPort,
    parser: parser
}