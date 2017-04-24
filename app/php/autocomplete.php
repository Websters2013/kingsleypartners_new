<?php

$val = $_GET['value'];

    $json_data = '[
    {
        "caption": "Bruxelles"
    },
    {
        "caption" : "Jette"
    },
    {
        "caption" : "Anderlecht"
    },
    {
        "caption" : "Bruxelles-Ville"
    },
    {
        "caption" : "Saint-Gilles"
    },
    {
        "caption" : "Waterloo"
    },
    {
        "caption" : "Woluwe-Saint-Pierre"
    },
    {
        "caption" : "Ganshoren"
    },
    {
        "caption" : "Forest"
    },
    {
        "caption" : "Evere"
    },
    {
        "caption" : "Auderghem"
    }
    ]';


$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);
echo $json_data;
exit;
?>
