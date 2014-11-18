#include<stdio.h>
#include<stdlib.h>
#include<math.h>

#define pi 3.14159
int main()
{
    float radius = 0;
    float volume = 0;

    scanf("%f", &radius);
    volume = ((4.0/3.0) * pi * pow(radius, 3));

    printf("VOLUME = %.3f\n", volume);
    system("pause");
    return 0;
}
