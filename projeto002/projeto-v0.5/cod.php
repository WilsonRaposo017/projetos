<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado do Calculo</title>
    <link rel="stylesheet" href="Proficional.css">
    <style>
        h1 {
            text-align: center;
            font-size: 1.9rem;
            /*color: #37474f;*/
            margin-bottom: 5px;
        }

        p {
            text-align: center ;
            font-size: 0.95rem;
            /*color: #607d8b;*/
            margin-bottom: 25px;
        }
        a {
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Resultado da Sucessão: </h1>
            <p>Todos os Direitos Reservados a Wilson Raposo Mbala</p>
            <hr>
        </header>

        <?php 
        # RECEBER OS VALORES DOS NUMERADORES DO FORMULÁRIO
            $n1 = $_REQUEST["n1"] ?? 0;
            $n2 = $_REQUEST["n2"] ?? 0;
            $n3 = $_REQUEST["n3"] ?? 0;

        # RECEBER OS VALORES DOS NUMERADORES DO FORMULÁRIO
            $d1 = $_REQUEST["d1"] ?? 0;
            $d2 = $_REQUEST["d2"] ?? 0;
            $d3 = $_REQUEST["d3"] ?? 0;

        # CALCULAR A RAZÃO
            $r1 = $n2 - $n1;
            $r2 = $d2 - $d1;

            echo "<h1>SUCESSÃO DIGITADA:<hr>    $n1 ; $n2 ; $n3<br>$d1 ; $d2 ; $d3<br></h1>";

        # VERIFICAR SE É PA
            if ($r1 == $n3 - $n2 && $r2 == $d3 - $d2) {
                echo "<p>É UMA PROGRESSÃO ARITIMÉTICA:<br>A RAZÃO DOS NUMERADORES É: $r1<br>A RAZÃO DOS DENOMINADORES É: $r2</p>";

            # VERIFICAR A MONOTONIA
                if ($r1 == 0){
                    printf("<p>A <strong>MONOTONIA</strong> DOS <abbr title='Numeradores'><strong>NUM</strong></abbr> DA SUCESSÃO É <strong>CONSTANTE R = 0</strong></p>");
                } else if ($r1 > 0){
                    printf("<p>A <strong>MONOTONIA</strong> DOS <abbr title='Numeradores'><strong>NUM</strong></abbr> DA SUCESSÃO É CRESCENTE R > 0</p>");
                } else {
                    printf("<p>A <strong>MONOTONIA</strong> DOS <abbr title='Numeradores'><strong>NUM</strong></abbr> DA SUCESSÃO É <strong>DECRESCENTE R < 0</strong></p>");
                }

                if ($r2 == 0){
                    printf("<p>A <strong>MONOTONIA</strong> DOS <abbr title='Denominadores'><strong>DENO</strong></abbr> DA SUCESSÃO É <strong>CONSTANTE R = 0</strong></p>");
                } else if ($r2 > 0){
                    printf("<p>A <strong>MONOTONIA</strong> DOS <abbr title='Denominadores'><strong>DENO</strong></abbr> DA SUCESSÃO É <strong>CRESCENTE R > 0</strong></p>");
                } else {
                    printf("<p>A <strong>MONOTONIA</strong> DOS <abbr title='Denominadores'><strong>DENO</strong></abbr> DA SUCESSÃO É <strong>DECRESCENTE R < 0</strong></p>");
                }

        // CALCULAR O TERMO GERAL DA PA
            $x = 0;
            $tg_pa1 = $n1 + ($x - 1) * $r1;
            $tg_pa2 = $d1 + ($x - 1) * $r2;
            
        // MOSTRAR O TERMO GERAL DA SUCESSÃO
            printf("<h1><hr>O TERMO GERAL DESTA SUCESSÃO É:<br></h1>");
            if ($tg_pa1 >= 0){
                printf("<h1>$r1". "n". "+$tg_pa1</h1>");
            } else {
                printf("<h1>$r1". "n". "$tg_pa1</h1>");
            } 
            
            if ($tg_pa2 >= 0){
                printf("<h1>$r2". "n". "+$tg_pa2</h1>");
            } else {
                printf("<h1>$r2". "n". "$tg_pa2</h1>");
            }

            } else {
                echo "<h1><hr>NÃO É UMA PROGRESSÃO ARITIMÉTICA<hr></h1>";
            }
        ?>

        <a href="index.html" class="btn-submit">Voltar</a>
        
    </div>
</body>
</html>