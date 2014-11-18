#include<stdio.h>
#include<stdlib.h>

main(){
    float MEDIA=0,
        A=0,
        B=0,
        C=0;
    
    scanf("%f", &A);
    scanf("%f", &B);
    scanf("%f", &C);

    MEDIA=((A*2)+(B*3)+(C*5))/(2+3+5);    

    printf("MEDIA = %.1f\n", MEDIA);
    //system("pause"); 
}
