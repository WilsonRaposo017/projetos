//Enunciado: Desenvolva um programa em linguagem C que trabalhe com Progressões Aritméticas (PA) de 3 termo em forma de fração
//O Programa deve:
//1- Solicitar ao Usuário 3 termos consecutivos de uma sequência, dos numeradores e dos denominadores;
//2- Verificar se os 3 termos (dos numeradores e dos numeradores) formam uma Progressões Aritmética, comparando as diferenças entre os termos.
//3- Se forem PA, o programa deverá calcular a razão da progressão; Determinar a fórmula do termo geral da PA; Permitir ao usuário calcular qualquer termo n da sequência; Informar se a monotonia da sequência; Calcular a Soma dos n primeiros termos utilizando a fórmula da soma;

// CÓDIGO DE: WILSON RAPOSO MBALA, TODOS OS DIREITOS RESERVADOS.
// ALUNO Nº: 20250269.

// PROJETO DE PROGRAMAÇÃO E MATEMÁTICA.
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main(){
    // VECTORES REPRESENTADOS (n[0,1,2]), (d[0,1,2]), (r[0,1]), tg[0,1] 
    int n[3], d[3], r[2], tg_pa[2],  x = 0, p[2], op;
    float sn[2];

    system("clear");

    //SOLICITAR AO USUARIO OS VALORES DOS NUMERADORES
    printf("DIGITE OS VALORES DOS NÚMERADORES\n");
    for (int i = 0; i < 3; i++){
        printf("Insira o Númerador[%d]: ", i+1);
        scanf("%d", &n[i]);
    }

    //SOLICITAR AO USUARIO OS VALORES DOS DENOMINADORES
    printf("DIGITE OS VALORES DOS DENOMINADORES\n");
    for (int i = 0; i < 3; i++){
        printf("Insira o Denominador[%d]: ", i+1);
        scanf("%d", &d[i]);
    }
    
    printf("!================================================================!");

    // MOSTRAR A SUCESSÃO
    printf("\n=>SUCESSÃO:\n %d ; %d ; %d\n %d ; %d ; %d\n", n[0], n[1], n[2], d[0], d[1], d[2]);
    printf("!================================================================!");

        //CALCULAR RAZÃO
            r[0] = n[1] - n[0];
            r[1] = d[1] - d[0];

        //VERIFICAR SE É UMA PA
        //SE FOR PA: r1 = (n2 - n1) e (n3 - n2)
        //SE FOR PA: r2 = (d2 - d1) e (d3 - d2)
    if ((r[0] == n[1] - n[0] && r[0] == n[2] - n[1]) && (r[1] == d[1] - d[0] && r[1] == d[2] - d[1])){
            //É UMA PA
            printf("\n=>É UMA PROGRESSÃO ARITIMÉTICA: \n =>A RAZÃO DOS NUMERADORES É: %d\n =>A RAZÃO DOS DENOMINADORES É: %d", r[0], r[1]);

            //VERIFICAR A MONOTONIA
                if (r[0] == 0){
                    printf("\n!================================================================!\n");
                    printf("A MONOTONIA DOS NUMERADORES DA SUCESSÃO É CONSTANTE R = 0");
                } else if (r[0] > 0){
                    printf("\n!================================================================!\n");
                    printf("A MONOTONIA DOS NUMERADORES DA SUCESSÃO É CRESCENTE R > 0");
                } else {
                    printf("\n!================================================================!\n");
                    printf("A MONOTONIA DOS NUMERADORES DA SUCESSÃO É DECRESCENTE R < 0");
                }

                if (r[1] == 0){
                    printf("\nA MONOTONIA DOS DENOMINADORES DA SUCESSÃO É CONSTANTE R = 0");
                } else if (r[1] > 0){
                    printf("\nA MONOTONIA DOS DENOMINADORES DA SUCESSÃO É CRESCENTE R > 0");
                } else {
                    printf("\nA MONOTONIA DOS DENOMINADORES DA SUCESSÃO É DECRESCENTE R < 0");
                }
            
            
            // CALCULAR O TERMO GERAL DA PA
            tg_pa[0] = n[0] + (x - 1) * r[0];
            tg_pa[1] = d[0] + (x - 1) * r[1];
            
            // MOSTRAR O TERMO GERAL DA SUCESSÃO
            printf("\n!================================================================!");
            printf("\n=>O TERMO GERAL DESTA SUCESSÃO É: \n");
            if (tg_pa[0] >= 0){
                printf("\n======> %dn+%d <======\n", r[0], tg_pa[0]);
            } else {
                printf("\n======> %dn%d <======\n", r[0], tg_pa[0]);
            } 
            
            if (tg_pa[1] >= 0){
                printf("======> %dn+%d <======\n", r[1], tg_pa[1]);
            } else {
                printf("======> %dn%d <======\n", r[1], tg_pa[1]);
            }
            
            do {
                printf("!================================================================!");
                printf("\nDESEJA CALCULAR: \n 1 - VALOR DE \"n\" POSSIÇÃO DESTA SUCESSÃO. \n 2 - SOMA DOS \"n\" TERMOS DA SUCESSÃO. \n 3 - SAIR.\nEscolha uma Opção: ");
                scanf("%d", &op);

                switch (op){
                    // 1 - VALOR DE "n" POSIÇÃO DESTA SUCESSÃO.
                    case 1:
                        printf("\n\nDIGITE A POSIÇÃO DO TERMO QUE QUERES ENCONTRAR: ");
                        scanf("%d", &x);

                        p[0] = n[0] + (x - 1) * r[0];
                        p[1] = d[0] + (x - 1) * r[1];
                        printf("\n!================================================================!");
                        printf("\nO VALOR DA POSIÇÃO a%d =(%d/%d)\n ===> %d <===\n ===> %d <===\n", x, p[0], p[1], p[0], p[1]);
                    break;

                    case 2:
                    // 2 - VALOR DA SOMA DOS "n" PRIMEIROS TERMO DESTA SUCESSÃO.
                        printf("\nDIGITE OS n PRIMEIROS TERMOS DESTA SUCESSÃO QUE QUERES SOMAR: ");
                        scanf("%d", &x);

                        p[0] = n[0] + (x - 1) * r[0];
                        p[1] = d[0] + (x - 1) * r[1];

                        // FORMULA sn = ((a1 + an) / 2) * n
                        sn[0] = ((n[0] + p[0]) / 2.0) * x;
                        sn[1] = ((d[0] + p[1]) / 2.0) * x;

                        printf("\n!================================================================!");
                        printf("\nA SOMA DOS %d PRIMEIROS TERMO = (%.2f/%.2f)\n ===> %.2f <===\n ===> %.2f <===", x, sn[0], sn[1], sn[0], sn[1]);
                    break;

                    case 3:
                        printf("\n\nPROGRAMA ENCERRADO, OBRIGADO POR USAR!!!");
                        printf("\n!================================================================!");
                        return 0;
                    break;

                    default:
                        system("clear");
                        printf("\n!================================================================!");
                        printf("\nOPÇÃO INDISPONIVEL, TENTA NOVAMENTE!");
                    break;
                }
            } while (op != 3);
            
    } else {
        //NÃO É UMA PA
        printf("\n!================================================================!");
        printf("\nNÃO É UMA PROGRESSÃO ARITIMÉTICA\n!!!INSIRA NOVAMENTE OS DADOS POR FAVOR!!!\n");
        return 0;
    }
    
    return 0;
}