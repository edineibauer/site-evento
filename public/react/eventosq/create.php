<?php

use Conn\Read;
use Conn\Update;
use Helpers\Check;
use Helpers\Helper;

$read->exeRead("eventos", "WHERE id != :id", "id={$dados['id']}");
if ($read->getResult()) {
    $findBloco = !1;
    $findSala = !1;
    $findSetor = !1;

    $read = new Read();
    foreach ($read->getResult() as $value) {
        if (!$findBloco && Check::name($value['bloco']) === Check::name($dados['bloco'])) {
            $dados['bloco'] = $value['bloco'];

            if($findSala && $findSetor)
                break;

            $findBloco = !0;
        }

        if (!$findSala && Check::name($value['sala']) === Check::name($dados['sala'])) {
            $dados['sala'] = $value['sala'];

            if($findSetor && $findBloco)
                break;

            $findSala = !0;
        }

        if (!$findSetor && Check::name($value['setor']) === Check::name($dados['setor'])) {
            $dados['setor'] = $value['setor'];

            if($findSala && $findBloco)
                break;

            $findSetor = !0;
        }
    }

    $up = new Update();
    $up->exeUpdate("eventos", $dados, "WHERE id =:id", "id={$dados['id']}");
}

Helper::postRequest(HOME . "app/destinoCreate", $dados);