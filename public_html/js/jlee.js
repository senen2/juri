/**
 * @author botpi
 */

function inicioLee()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	idtexto = 1;
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();
	LeeDocsJ(dibDocs);
}

function dibDocs(datos)
{
	llenaSelector(datos, "docs");
}

function docSel()
{
	iddoc = $('#docs').val();
	if (iddoc)
		LeeDocJ(iddoc, dibTexto);
}

function dibTexto(datos)
{
	if (datos) {
		gtexto = datos[0];
		var userLang = navigator.language || navigator.userLanguage; 

		$("#texto").val(gtexto.texto);
	}
}
