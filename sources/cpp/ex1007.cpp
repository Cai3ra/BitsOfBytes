#include<stdio.h>
#include<stdlib.h>

main(){
    int A=0,
          B=0,
          C=0,
          D=0,
          DIFERENCA=0;
    
    scanf("%i", &A);
    scanf("%i", &B);
    scanf("%i", &C);
    scanf("%i", &D);

    DIFERENCA = (A * B - C * D);

    printf("DIFERENCA = %i\n", DIFERENCA);
    //system("pause"); 
}
