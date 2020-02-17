//dijkstra solve graph starting at s
function solve(graph, s) {
    let solutions = {};
    solutions[s] = [];
    solutions[s].dist = 0;

    while(true) {
        let parent = null;
        let nearest = null;
        let dist = Infinity;

        //for each existing solution
        for(let n in solutions) {
            if(!solutions[n])
                continue;
            let ndist = solutions[n].dist;
            let adj = graph[n];
            //for each of its adjacent nodes...
            for(let a in adj) {
                //without a solution already...
                if(solutions[a])
                    continue;
                //choose nearest node with lowest *total* cost
                let d = adj[a] + ndist;
                if(d < dist) {
                    //reference parent
                    parent = solutions[n];
                    nearest = a;
                    dist = d;
                }
            }
        }

        //no more solutions
        if(dist === Infinity)
            break;

        //extend parent's solution path
        solutions[nearest] = parent.concat(nearest);
        //extend parent's cost
        solutions[nearest].dist = dist;
    }


    //Remove as as rotas da solução final,
    //retira a distancia e retira o destino da rota
    let solutionsPoint = {};
    for(let s in solutions) {
        if(!solutions[s] || /^A/.test(s))
            continue;
        solutionsPoint[s] = solutions[s];
        delete solutionsPoint[s].dist;
        solutionsPoint[s].pop();
    }

    return solutionsPoint;
}

function getRequest(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response)
            } else {
                reject(Error(req.statusText))
            }
        };
        req.onerror = function () {
            reject(Error("Network Error"))
        };
        req.send()
    })
}

function getJSON(url) {
    return getRequest(url).then(JSON.parse).catch(function (err) {
        console.log("Sem Conexão! Url " + url + " não recuperada!");
        throw err
    });
}

function createRotas(rotas) {
    $.ajax({
        type: "POST",
        url: 'public/assets/rotas/saveRotas.php',
        data: {rotas: rotas},
        success: function (data) {
            console.log(data);
        }, fail: function () {
            console.log("Erro na Conexão");
        }, dataType: "json"
    })
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