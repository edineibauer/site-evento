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
                        e.data = moment(e.data + " " + e.hora).format("lll");
                        $("#home").append(Mustache.render(tpl.card_read_more, e));
                    }, wait);
                }
                wait += 50;
            });

            setTimeout(function () {
                $("#logohome").html(Mustache.render(tpl.logo_home, {}));
            },500);
        }
    });
}

$(function () {
    showEventos();
});