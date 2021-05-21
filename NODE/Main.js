// Importamos el módulo http
const http = require('http');
// Importamos el módulo queristring
const querystring = require('querystring');

////// Definimos la base de datos
// Importamos el cliente de MongoDB
const MongoClient = require('mongodb').MongoClient;
// Especificamos la URL de conexión por defecto al servidor local
const url_mongo = 'mongodb://localhost:27017';
// Nombre de la base de datos a la que conectarse
const dbName = 'nodejs-mongoDB';
// Creamos una instancia del cliente de MongoDB
const client = new MongoClient(url_mongo, {
    useNewUrlParser: true
});

//definimos el puerto para el servidor node.js
const port = 3000;

//////Creamos el servidor
const server = http.createServer((req, res) => {
    /////////////////// Datos recibidos
    // Petición (servicio): Leemos el request
    const { headers, method, url} = req;
    // console.log('headers: ', headers); // si necesitamos recuperar algun header
    var body='';

    console.log('method: ', method);
    console.log('url: ', url);


    req.on('error', (err) => {
        console.error(err);
    }).on('data', (data) => {
        body+=data;
    }).on('end', () => {
        /////////////////// Procesado de los datos recibidos 
        let opciones_query = querystring.parse(body); //parsea las variables del body        
        console.log(opciones_query); //comprobaciones por consola de los datos recibidos

        /////////////////// Resultado de la petición: Almacenado y listado de datos
        if (method == "POST") { //Para peticiones tipo POST, como se pide en la práctica (postman y Query String)
            client.connect().then(async () => { // conectamos el cliente a la DB
                console.log("Conectado con éxito al servidor");
                const db = client.db(dbName);
                // Obtener la referencia a la colección
                const collection = db.collection('usuarios');

                /////////////////// Inserción de datos en mongoDB
                // Llamar a la función para insertar
                const insertarResult = await collection.insertOne(opciones_query);
                console.log("Resultado de la inserción: ", insertarResult.result);

                // Llamar a la función para recuperar
                const findResult = await collection.find({}).toArray();

                // Código de estado HTTP que se devuelve / resultado
                res.statusCode = 201;
                // Encabezados de la respuesta, texto plano
                res.setHeader('Content-Type', 'text/html');

                // Contenido de la respuesta
                if(opciones_query["name"] && opciones_query["phone"]){ //validación       
		        res.write('<h1>Servicio Tipo POST</h1>');
		        res.write('<h2>Hemos recibido y guardado el siguiente nombre: ' +
		            opciones_query["name"]);
		        res.write('</br> con el siguiente tlf: ' +
		            opciones_query["phone"]+ '</h2>');

		        res.write('<h1>Listado de Usuarios</h1>');
		        for (let i = 0; i < findResult.length; i++) {
		            res.write('<li>' + 'Nombre: ' + findResult[i]["name"] + ' | Teléfono: ' + findResult[i]["phone"] + '</li>');
		        }
                }
                else{
                	res.write('ERROR: No se han pasado los datos de nombre y teléfono correctamente');
                }

                res.end();

            }).catch((error) => {
                res.statusCode = 400;
                console.log("Se produjo algún error en las operaciones con la base de datos: " + error);
                client.close();
            });

        } else if (method == "GET") { //Para peticiones tipo GET, desde el navegador
            client.connect().then(async () => { // conectamos el cliente a la DB
                console.log("Conectado con éxito al servidor");
                const db = client.db(dbName);
                // Obtener la referencia a la colección
                const collection = db.collection('usuarios');

                // Llamar a la función para recuperar
                const findResult = await collection.find({}).toArray();

                // Código de estado HTTP que se devuelve / resultado
                res.statusCode = 201;
                // Encabezados de la respuesta, texto plano
                res.setHeader('Content-Type', 'text/html');

                // Contenido de la respuesta
                res.write('<h1>Servicio Tipo GET</h1>');
                res.write('<h2>Por seguridad, para insertar usuarios utilice una petici&oacute;n tipo POST (postman)</h2>');

                res.write('<h1>Listado de Usuarios</h1>');
                for (let i = 0; i < findResult.length; i++) {
                    res.write('<li>' + 'Nombre: ' + findResult[i]["name"] + ' | Teléfono: ' + findResult[i]["phone"] + '</li>');
                }

                res.end();

            }).catch((error) => {
                res.statusCode = 400;
                console.log("Se produjo algún error en las operaciones con la base de datos: " + error);
                client.close();
            });
        } else {};

    });
})

// Ejecutar el servicio para que permanezca a la espera de peticiones
server.listen(port, () => {
    console.log('Servidor ejecutándose...');
    console.log('Abrir en un navegador http://localhost:3000')
});
