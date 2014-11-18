#include<stdio.h>
#include<stdlib.h>

int main()
{
    const float pi = 3.14159;
    float A = 0;
    float R = 0;

    scanf("%f", &R);    
    A = pi * (R * R);
    
    printf("A=%.4f\n", A);
    return A;
}
