<?php

$rotas = json_encode(filter_input(INPUT_POST, 'rotas', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

$f = fopen("totem.json", "w+");
fwrite($f, $rotas);
fclose($f);