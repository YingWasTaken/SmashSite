window.onload = function () {

    // Cargar los personajes desde el archivo JSON
    $.ajax({
        type: "GET",
        url: "personajes.json",
        dataType: "json",
        success: function (data) {


            // Al cargar los personajes, generamos las cartas DINAMICAMENTE. 
            let personajes = data.personajes;
            personajes.forEach(function (personaje) {
                let cardHTML = `
                    <div class="card cardAnimate" data-primeraaparicion="${personaje.primeraaparicion}" id="${personaje.nombre}">
                        <img src="${personaje.imagen}" alt="${personaje.nombre}">
                        <h3>${personaje.nombre}</h3>
                    </div>
                `;
                $(".contenedor").append(cardHTML); // la fuscamos dentro del contenedor de cartas.
            });


            // DEJAR MARCADO en el NAV la opción elegida
            $("nav a").click(function () {
                let juego = $(this).text().trim();

                $(".card").removeClass('apagado');
                $(".card").removeClass('primeraAparicion');
                $(".card").removeClass('cardAnimate'); //así solo funciona el hover cuando TODAVÍA no has clickado en ninguna sección


                $("a").removeClass("active"); //se lo quitamos a todos
                $(this).addClass("active"); //se lo ponemos al elegido


                // una vez clickado, hacer las transiciones
                $(".card").each(function () {
                    let primeraAparicion = $(this).data("primeraaparicion");
                    if (primeraAparicion === juego) { // AQUÍ LAS TRANSIS
                        $(this).show();
                        $(this).addClass('primeraAparicion');
                    } else {
                        $(this).addClass('apagado');
                    }
                });
            });

            // ABRIR VIDEOS AL CLICKAR
            $(".card").click(function () {
                // para que solo se puedan clickar si están activados.
                if ($(this).hasClass("primeraAparicion")) {
                let personajeId = $(this).attr("id");
                let personaje = personajes.find(p => p.nombre === personajeId);
                if (personaje) {
                    // animación vid
                    $("#video-container").fadeIn();
                    $("#video-player").attr("src", personaje.video);
                }
                } 
            });

            // Cerrar vid
            $("#close-video").click(function () {
                $("#video-container").fadeOut();
                $("#video-player").attr("src", ""); // limpiar vid
            });




        }
    });

};
