// añadimos  las noticias del arcicho JSON
function cargarNoticias() {
    $.ajax({
        url: './data/noticias.json',
        type: 'GET',
        success: function(data){
            let objeto_json = data;
            let contenido = '<div class= "containerNoticias">';

            for (let i = 0; i < objeto_json.noticias.length; i++){
                contenido += `
                <div class="noticia-card">
                    <h3 class="noticia-titulo">${objeto_json.noticias[i].titulo}</h3>
                    <div class="noticia-fecha">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icono-noticias fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    ${objeto_json.noticias[i].fecha}
                    </div>
                    <p class="noticia-descripcion">${objeto_json.noticias[i].descripcion}</p>
                </div>`;                
            }
            contenido += '</div>';
            $("#textoNoticias").html(contenido);
        },
        error: function(xhr, status){
            alert("Error al cargar el archivo JSON")
        }

    })
}

$(document).ready(function(){
    cargarNoticias()
});

