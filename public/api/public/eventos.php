<?php

$read = new \Conn\Read();
$read->exeRead("eventos", "ORDER BY data");
$data['data'] = $read->getResult();