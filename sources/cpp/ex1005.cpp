#include<stdio.h>
#include<stdlib.h>

int main()
{
    float a=0,
          b=0,
          c=0,
          peso1=3.5,
          peso2=7.5;
          
    scanf("%f", &a);
    scanf("%f", &b);
    
    c = ((a * peso1) + (b * peso2)) / (peso1 + peso2);
    
    printf("MEDIA = %.5f\n", c);

    return 0;
}
 
