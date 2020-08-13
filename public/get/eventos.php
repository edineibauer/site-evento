<?php

$read = new \Conn\Read();
$read->exeRead("eventos", "WHERE ativo = 1 ORDER BY data_de_inicio");
$data['data'] = $read->getResult();