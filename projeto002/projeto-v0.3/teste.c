#include <stdio.h>
#include <math.h>

int main(){
    int quadrado, n;

    printf("Insira Um numero: ");
    scanf("%d", &n);

    quadrado = pow(n, 2);

    printf("O quadrado de %d é %d", n, quadrado);

    return 0;
}