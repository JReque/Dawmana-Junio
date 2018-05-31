<?php

$cartelesSysmanas = array(
    "I" => array("foto" => "images/sysmanas/Isysmana.jpg", "nombre" => "I Sysmana"),
    "II" => array("foto" => "images/sysmanas/IIsysmana.jpg", "nombre" => "II Sysmana"),
    "III" => array("foto" => "images/sysmanas/IIIsysmana.jpg", "nombre" => "III Sysmana"),
    "IV" => array("foto" => "images/sysmanas/IVsysmana.jpg", "nombre" => "IV Sysmana"),
    "V" => array("foto" => "images/sysmanas/Vsysmana.jpg", "nombre" => "V Sysmana"),
    "VI" => array("foto" => "images/sysmanas/VIsysmana.jpg", "nombre" => "VI Sysmana"),
    "VII" => array("foto" => "images/sysmanas/VIIsysmana.jpg", "nombre" => "VII Sysmana"),
    "VIII" => array("foto" => "images/sysmanas/VIIIsysmana.jpg", "nombre" => "VIII Sysmana"),
    "IX" => array("foto" => "images/sysmanas/IXsysmana.jpg", "nombre" => "IX Sysmana"),
    "X" => array("foto" => "images/sysmanas/Xsysmana.jpg", "nombre" => "X Sysmana")
);

$miJSON = json_encode($cartelesSysmanas);
file_put_contents('sysmanas.json', $miJSON);