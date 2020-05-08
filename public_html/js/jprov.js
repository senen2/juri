/**
 * @author botpi
 */

function inicioProv()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	idtexto = 1;
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();
	LeeProvP(prepara);
	//refrescar();
}

function prepara(datos)
{
	usuario = datos;
	//$('#usuario').html('Bienvenido(a) ' + usuario.nombre);
	$('#nombre').val(usuario.nombre);
	$('#campos').val(usuario.campos);
	dibujaCuadroProductos()
}

function verArchivo()
{
	var input = document.getElementById("uploadfile");
	var file = input.files[0];
	var cad = file.name.split('.');
	if (cad[1].toLowerCase() == 'csv') {		
		var a = encabezado.split(',');	
		$('#email').val(a[0].replace("'", "").replace("'", ""));
		$('#clave').val(a[1].replace("'", "").replace("'", ""));
		$('#subir').attr('action', 'http://142.93.52.198:8087/uploadfile');
		$("#enviar").show();
		$("#enviar").focus();
	}
	else
		$("#enviar").hide();
}

function upload()
{
  	$("#endupload").attr("onload",'enduploadf();');
  	$("#busy").show();
}

function enduploadf()
{
	$("#busy").hide();
	window.location.assign("prov.html");//reload();
}

function dibujaCuadroProductos()
{
	var titulos = [];
	var userLang = navigator.language || navigator.userLanguage; 
	if (userLang.indexOf("es") >= 0) {
       	titulos.push({"titulo":"Codigo", "ancho":120, "alinea":"left", "campo":"codigo"});
	    titulos.push({"titulo":"Nombre", "ancho":300, "alinea":"left", "campo":"nombre"});
	    titulos.push({"titulo":"Unidad", "ancho":80, "alinea":"left", "campo":"unidad"});
	    titulos.push({"titulo":"Precio", "ancho":100, "alinea":"right", "campo":"precio"});
	    titulos.push({"titulo":"IVA", "ancho":100, "alinea":"right", "campo":"iva"});
	    titulos.push({"titulo":"Existencia", "ancho":100, "alinea":"right", "campo":"existencia"});
	}
	else {
       	titulos.push({"titulo":"Code", "ancho":120, "alinea":"left", "campo":"codigo"});
	    titulos.push({"titulo":"Name", "ancho":300, "alinea":"left", "campo":"nombre"});
	    titulos.push({"titulo":"Unity", "ancho":80, "alinea":"left", "campo":"unidad"});
	    titulos.push({"titulo":"Price", "ancho":100, "alinea":"right", "campo":"precio"});
	    titulos.push({"titulo":"Tax", "ancho":100, "alinea":"right", "campo":"iva"});
	    titulos.push({"titulo":"stock", "ancho":100, "alinea":"right", "campo":"existencia"});
	}
    	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = usuario.productos;
	datos["totales"] = [];
	
	dibujaTabla(datos, "productos", "productos", "");
}

function updatefield(campo)
{
	CambiaCampoP(campo);
}