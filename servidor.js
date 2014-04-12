// IMPORTA LIBRERIAS
var express = require("express");
var nunjucks = require("nunjucks");

//CREANDO EL SERVIDOR WEB
var app = express();

// ------ CONFIGURACION DE EXPRESS -----
//localhost:8000/css/principal.css
//PRIMER ARGUMENTO ES UN NOMBRE LOGICO
//SEGUNDO ARGUMENTO ES LA CARPETA REAL
//static PERMITE ACCESSO, PERO DEBO DE CONOCER LA RUTA COMPLETA DEL ARCHIVO
app.use("/css", express.static(__dirname + "/css"));
//con directory nos permite navegar en esa carpeta (VER ARHIVOS!!)
app.use("/css", express.directory(__dirname + "/css"));

app.use("/imagenes", express.static(__dirname + "/imagenes"));
app.use("/videos", express.static(__dirname + "/videos"));
app.use("/javascript", express.static(__dirname + "/javascript"));

//HABILITA RECIBIR PARAMETROS POST 
app.use(express.urlencoded());

/*-------- CONFIGURACION DEL SISTEMA DE TEMPLATES --------------*/
//faltaba el __dirname para que corra bien
nunjucks.configure(__dirname + "/vistas",{
	express:app
});

//lenvanta el servidor en el puerto 8000
app.listen(8000);

app.get("/", function(request, response){
	
	var propiedades = {
		configuracion:{
			saludo:"Desarrollo Ágil como un gato dinamico"
		}
	};
	
	response.render("index.html",propiedades);	
	
});

app.get("/contacto", function(request, response){
	response.render("contacto.html");
});

app.get("/blog", function(request, response){
	
	//Simulamos que hicimos una consulta a una base 
	
	var postEncontrados = [{
		titulo:"post 1",
		descripcion:" descripcion del post 1 (breve)"
	},{
		titulo:"post 2",
		descripcion:" descripcion del post 2 (breve)"
	}];
	
	// simulamos que la base no tiene articulos
	//postEncontrados = [];
		
	response.render("blog.html",{
		posts:postEncontrados
	});	
	
});

app.post("/suscribir", function(request, response){
	
	//request = TIENE TODO LO QUE ENVIA EL USUARIO
	//response = ES LO QUE LE PINTAMOS AL USUARIO
	
	//body tiene todos los paremetros del formulario
	//que se envian por un HTTP-POST
	console.log("email del usuario:" + request.body.email);
	
	response.send("email del usuario:" + request.body.email);
		
});

app.post("/contactar", function(request, response){
	
	response.send("email:" + request.body.email
	         + ", nombre:" + request.body.nombre
	         + ", url:" + request.body.url
	         + ", edad:" + request.body.edad
	         + ", comentario:" + request.body.comentario);
	         
});



console.log("arrancando servidor");
