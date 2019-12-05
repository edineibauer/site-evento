function showEventos() {
    let tpl = getTemplates();
    let eventos = db.exeRead("eventos");
    $("#home").html("");
    Promise.all([eventos, tpl]).then(ev => {
        if (!isEmpty(ev[0])) {
            eventos = ev[0];
            tpl = ev[1];
            let wait = 0;

            $.each(eventos, function (i, e) {
                if(e.ativo) {
                    setTimeout(function () {
                        e.imagem = (!isEmpty(e.imagem) ? e.imagem[0].urls[300] : HOME + "public/assets/img/default.png");
                        e.data = moment(e.data_de_inicio).format("ll");
                        e.home = HOME;
                        e.vendor = VENDOR;
                        $("#home").append(Mustache.render(tpl.card_read_more, e));
                    }, wait);
                }
                wait += 50;
            });

            setTimeout(function () {
                $("#logohome").html(Mustache.render(tpl.logo_home, {home: HOME, vendor: VENDOR}));
            },500);
        }
    });
}

function openCard(id) {
    $("#evento-content").html("");
    db.exeRead("eventos", parseInt(id)).then(evento => {
        $("#evento-content").htmlTemplate("card_post", Object.assign({home: HOME, vendor: VENDOR}, evento)).then(() => {
            $("#evento").addClass("active");
        });
        console.log(evento);
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

    setTimeout(function () {
        $(".card-parent:eq(1)").addClass("active");
    }, 300);

    $("#app").off("click", ".card-visitors").on("click", ".card-visitors", function () {
        openCard($(this).attr("rel"));
    });
});