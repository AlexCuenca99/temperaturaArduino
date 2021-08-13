const Http = require('http');
const Express = require('express');

const App = Express();
const servidor = Http.createServer(App);
const io = require('socket.io')(servidor);

App.use(Express.static(__dirname + '/public'));

servidor.listen(3000, function(){
    console.log('El servidor se ha inicializado en el puerto', 3000);
});

//CONEXION DE TIPO SERIAL (SERIAL CONNECTION)
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

const puerto = new SerialPort('COM4', {
    baudRate: 9600
});

const parser = puerto.pipe(new Readline({ delimiter: '\r\n' }));

//Funcion para mostrar una conexion exitosa con el servidor
parser.on('open', function(){
    console.log('La conexion ha sido establecida');
});

//Funcion que extrae los datos que se estan capturando desde el
//sensor de arduino
parser.on('data', function(data){
    
    let temperatura = parseInt(data);
    //console.log(temperatura);

    io.emit('temperatura', data)
});

//Funcion que muestra un error en caso de desconexion
//de Arduino y/o servidor
puerto.on('error', function(error){
    console.log(error);
});

