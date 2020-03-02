/**
 * Pontos de origem da rota
 */
const pontos = ["P60", "P61", "P69", "P27", "P46", "P53"];
const firstDirectionPonto = {"P60": "L", "P61": "N", "P69": "L", "P27": "L", "P46": "O", "P53": "O"};
const rotas = {caminhos: []};

let promesas = [];
promesas.push(getJSON("public/assets/rotas/unescMapName.json"));
promesas.push(getJSON("public/assets/rotas/unescMapRoutes.json"));
promesas.push(getJSON("public/assets/rotas/unescMapDistancia.json"));
promesas.push(getJSON("public/assets/rotas/unescMapDirection.json"));

const firstDescricaoOrientacao = {"LEFT": "Siga pela esquerda", "RIGHT": "Siga pela direita", "DOWN": "Retorne", "UP": "Siga em frente"};
const descricaoOrientacao = {"LEFT": "Vire à esquerda", "RIGHT": "Vire à direita"};
const iconDirection = {
    "N": {"S": "DOWN", "L": "RIGHT", "O": "LEFT", "N": "UP"},
    "L": {"S": "RIGHT", "L": "UP", "O": "DOWN", "N": "LEFT"},
    "S": {"S": "UP", "L": "LEFT", "O": "RIGHT", "N": "DOWN"},
    "O": {"S": "LEFT", "L": "DOWN", "O": "UP", "N": "RIGHT"}
};

Promise.all(promesas).then(r => {
    let names = r[0];
    let routes = r[1];
    let distancias = r[2];
    let directions = r[3];

    /**
     * Para cada ponto, obtém as rotas
     */
    for (let i in routes) {
        let ponto = i;

        /**
         * Não constrói rotas a partir de arestas, nem a partir de estacionamentos
         */
        if(ponto.indexOf('P') === -1 || names[ponto] === "Estacionamento")
            continue;

        let totem = {
            descricao: names[ponto],
            id: ponto,
            destinos: []
        };

        //obtem todas as rotas a partir do ponto de inicio
        let solutions = solve(routes, ponto);

        /**
         * Para cada Destino a partir deste ponto
         */
        for (let idDestino in solutions) {

            /**
             * Não constrói rotas a para estacionamentos e nem para totens
             */
            if(ponto === idDestino || names[idDestino] === "Estacionamento" || ["P3", "P7", "P14"].indexOf(idDestino) > -1)
                continue;

            let destino = {
                "descricao": names[idDestino],
                "orientacoes": [],
                "rotas": [],
                "id": idDestino,
                "dist": 0
            };

            let lastPonto = ponto;
            // let direction = firstDirectionPonto[lastPonto];
            let direction = "N";
            let orientacao = {};

            /**
             * Para cada rota no destino
             */
            for (let e in solutions[idDestino]) {
                let idRota = solutions[idDestino][e];
                // let nextDirection = directions[lastPonto][idRota];
                let nextDirection = "N";

                lastPonto = idRota;

                /**
                 * Caminho mudou de direção, adiciona orientação
                 */
                if(direction !== nextDirection) {

                    if(Object.entries(orientacao).length > 0) {
                        orientacao.distancia = orientacao.distancia + "m";
                        destino.orientacoes.push(orientacao);
                    }

                    let icon = iconDirection[direction][nextDirection];
                    orientacao = {
                        "descricao": (destino.orientacoes.length === 0 ? firstDescricaoOrientacao[icon] : descricaoOrientacao[icon]),
                        "distancia": 0,
                        "icone": icon
                    };

                    direction = nextDirection;
                }

                /**
                 * Soma valores de distancia nas Arestas
                 */
                if(idRota.startsWith("A")) {
                    destino.dist += distancias[idRota];

                    if(Object.entries(orientacao).length > 0)
                        orientacao.distancia += distancias[idRota];

                    destino.rotas.push({
                        id: idRota,
                        distancia: distancias[idRota] + "m"
                    });
                }
            }

            orientacao.distancia = orientacao.distancia + "m";
            destino.orientacoes.push(orientacao);
            totem.destinos.push(destino);

            totem.destinos = orderBy(totem.destinos, "descricao").reverse();
        }

        rotas.caminhos.push(totem);
    }

    //imprime em tela
    console.log(rotas);
    createRotas(rotas);

});