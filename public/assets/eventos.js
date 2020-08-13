var eventos = [];
var tpl = {};

async function showDestaques() {
    $("#destaque").html("");

    let mes = $("#filter > select").val();
    let espera = 0;
    for(let e of eventos) {
        if(e.destaque === "1" && (typeof mes === "undefined" || moment(e.data_de_inicio).format("M") === mes)) {
            setTimeout(function () {
                $("#destaque").append(Mustache.render(tpl.card_read_more, e));
                showScroolHover("destaque");
            }, espera);
            espera += 50;
        }
    }
}

async function showEventos() {
    showDestaques();

    $("#home").html("");
    let mes = $("#filter > select").val();

    let espera = 0;
    for(let e of eventos) {
        if(e.destaque === "0" && (typeof mes === "undefined" || moment(e.data_de_inicio).format("M") === mes)) {
            setTimeout(function () {
                $("#home").append(Mustache.render(tpl.card_read_more, e));
                showScroolHover("home");
            }, espera);
            espera += 50;
        }
    }
}

function showFiltros() {
    $("#filter > select").html("");
    for(let i = -1; i < 12; i++) {
        let next = moment().add(i, 'M');
        $("#filter > select").append("<option value='" + next.format("M") + "'" + (next.month() === moment().month() ? " selected='selected'" : "") + ">" + next.format("MMMM") + " / " + next.format("YY") + "</option>")
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1)
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder
    }
}

/**
 * Ordena array pelo parâmetro order passado
 *
 * @param data
 * @param order
 * @returns {[]}
 */
function orderBy(data, order) {
    let classificacao = [];
    $.each(data, function (i, d) {
        classificacao.push(d)
    });
    classificacao.sort(dynamicSort(order)).reverse();
    $.each(classificacao, function (i, c) {
        classificacao[i].position = i + 1
    });
    return classificacao
}

function openCard(id) {
    $("#evento-content").html("");
    db.exeRead("eventos", parseInt(id)).then(evento => {
        evento.data = moment(evento.data_de_inicio).format("ll");

        evento.have_hora_de_termino = !isEmpty(evento.hora_de_termino);
        evento.have_data_de_termino = !isEmpty(evento.data_de_termino);

        evento.data_de_inicio = moment(evento.data_de_inicio).format("ll");
        evento.data_de_termino = moment(evento.data_de_termino).format("ll");

        $("#evento-content").htmlTemplate("card_post", Object.assign({home: HOME, vendor: VENDOR}, evento)).then(() => {
            $("#evento").addClass("active");
        });
    });
}

function closeCard() {
    $("#evento").removeClass("active animate-top");
}

async function readEventos() {
    let readEventos = orderBy((await db.exeRead("eventos")).data, "data_de_inicio").reverse();
    for(let e of readEventos) {
        if(e.ativo === "1" && ((isEmpty(e.data_de_termino) && moment(e.data_de_inicio).add(7, 'days').format("YYYY-MM") >= moment().format("YYYY-MM")) || moment(e.data_de_termino) > moment())) {
            e.imagem = (!isEmpty(e.imagem) ? e.imagem[0].url : HOME + "public/assets/img/default.png");
            e.data = moment(e.data_de_inicio).format('L') + (e.data_de_termino ? " a " + moment(e.data_de_termino).format('L') : "");
            e.home = HOME;
            e.vendor = VENDOR;
            eventos.push(e);
        }
    }
}

function showScroolHover(target) {
    let left = $("#" + target + "-parent").scrollLeft();
    $("#" + target + " > .card-parent").each(function (i, e) {
        let myLeftPosition = 350 * i;
        if(myLeftPosition > left && left + 700 > myLeftPosition) {
            let scale = (myLeftPosition - left);
            scale = scale > 350 ? 350 - (scale - 350) : scale;
            scale = parseInt(((scale * 100 / 350) * 18) / 100);
            $(e).css("transform", "scale(1." + (scale < 10 ? "0" : "") + scale + ")");
        } else {
            $(e).css("transform", "scale(1)");
        }
    });
}

var last = 0;
var lastDestaque = 0;
$(async function () {
    tpl = await getTemplates();
    await readEventos();
    showFiltros();
    showEventos();

    $("#destaque-parent").on("scroll", function () {
        showScroolHover("destaque");
    });

    $("#home-parent").on("scroll", function () {
        showScroolHover("home");
    });

    $("#app").off("click", ".card-visitors").on("click", ".card-visitors", function () {
        openCard($(this).attr("rel"));
    }).off("change", "#filter > select").on("change", "#filter > select", function () {
        showEventos();
    });
});