#include <stdio.h>
#include <stdlib.h>

int main(){
	// system("chcp 65001");
	// system("cls");
	// system("color b");
	// system("title SUCESSÃO");
	// system("mode con: cols=70 lines=30");
	
	
	int Na[3], Da[3], Rn, Rd, Tgn, Tgd;
	
	printf("Insira 3 Númeradores: \n");
	for (int i = 0; i < 3; i++){
		scanf("%d", &Na[i]);
	}
	
	printf("Insira 3 Denominadores: \n");
	for (int i = 0; i < 3; i++){
		scanf("%d", &Da[i]);
	}
	
	Rn = Na[1] - Na[0];
	Rd = Da[1] - Da[0];
	
	Tgn = Na[0] + (-1*Rn);
	Tgd = Da[0] + (-1*Rd);
	
	if(Rn > 0){	
		printf("O Termo Geral dos Numeradores é: %dn + %d\n", Rn, Tgn);
	} else {
		printf("O Termo Geral dos Numeradores é: %dn - %d\n", Rn, Tgn);
	
	}
	if(Rd > 0){	
		printf("O Termo Geral dos Denominadores é: %dn + %d\n", Rd, Tgd);
	} else {
		printf("O Termo Geral dos Denominadores é: %dn - %d\n", Rd, Tgd);
	}
	
	system("pause");
	return 0;
	
}