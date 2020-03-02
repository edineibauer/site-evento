function showEventos() {
    let tpl = getTemplates();
    let eventos = db.exeRead("eventos");
    $("#home").html("");
    Promise.all([eventos, tpl]).then(ev => {
        if (!isEmpty(ev[0])) {
            eventos = ev[0].data;
            tpl = ev[1];
            let wait = 0;
			
			if(isEmpty(tpl)) {
				showEventos();
			} else {

                eventos = orderBy(eventos, "data_de_inicio").reverse();

				$.each(eventos, function (i, e) {
					if(e.ativo) {
						e.imagem = JSON.parse(e.imagem);
						setTimeout(function () {
							e.imagem = (!isEmpty(e.imagem) ? e.imagem[0].url : HOME + "public/assets/img/default.png");
							e.data = moment(e.data_de_inicio).format('L') + (e.data_de_termino ? " a " + moment(e.data_de_termino).format('L') : "");
							e.home = HOME;
							e.vendor = VENDOR;
							$("#home").append(Mustache.render(tpl.card_read_more, e));
							$(".card-parent:eq(1)").addClass("active");
						}, wait);
					}
					wait += 50;
				});
			}
        }
    });
}

function openCard(id) {
    $("#evento-content").html("");
    db.exeRead("eventos", parseInt(id)).then(evento => {
        evento.data = moment(evento.data_de_inicio).format("ll");

        evento.have_hora_de_termino = !isEmpty(evento.hora_de_termino);
        evento.have_data_de_termino = !isEmpty(evento.data_de_termino);

        evento.data_de_inicio = moment(evento.data_de_inicio).format("ll");
        evento.data_de_termino = moment(evento.data_de_termino).format("ll");

        evento = orderBy(evento, "data_de_inicio");

        $("#evento-content").htmlTemplate("card_post", Object.assign({home: HOME, vendor: VENDOR}, evento)).then(() => {
            $("#evento").addClass("active");
        });
    });
}

function closeCard() {
    $("#evento").removeClass("active animate-top");
}

var last = 0;
$(function () {
    showEventos();

    $("#home-parent").on("scroll", function () {
        let active = Math.round(($(this).scrollLeft() + 350) / 350);
        if(active !== last) {
            last = active;
            $(".card-parent").removeClass("active");
            $(".card-parent:eq(" + active + ")").addClass("active");
        }
    });

    $("#app").off("click", ".card-visitors").on("click", ".card-visitors", function () {
        openCard($(this).attr("rel"));
    });
});