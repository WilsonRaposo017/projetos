#include <stdio.h>
#include <math.h>

int main(){
    // VECTORES REPRESENTADOS (n[0,1,2]), (d[0,1,2]), (r[0,1]), q[0,1], tg[0,1] 
    int n[3], d[3], r[2], q[2], tg_pa[2], tg_pg[2];

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

    //VERIFICAR SE É UMA PA OU PG

    //SE FOR PA: r1 = (n2 - n1) e (n3 - n2)
    if (r[0] = n[1] - n[0] && n[2] - n[1]){
        //SE FOR PA: r2 = (d2 - d1) e (d3 - d2)
        if (r[1] = d[1] - d[0] && d[2] - d[1]){
            printf("UMA PA");
            //Calcular a Razao
            r[0] = n[1] - n[0];
            r[1] = d[1] - d[0];
            printf("\nRAZAO 1 = %d \nRAZAO 2 = %d", r[0], r[1]);

        }
             //SE FOR PG: q1 = (n2 / n1) e (n3 / n2)
        } else if (q[0] = n[1] / n[0] && n[2] / n[1]){
            if (q[1] = d[1] / d[0] && d[2] / d[1]){
                printf("UMA PG");
                // Calcular Razao
                q[0] = n[1] / n[0];
                q[1] = d[1] / d[0];
                printf("\nRAZAO 1 = %d \nRAZAO 2 = %d", q[0], q[1]);

        }
    }
    
    return 0;
}