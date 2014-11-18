#include<stdio.h>
#include<stdlib.h>
#include<math.h>

int main()
{
    int x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0;

    double 
        distance = 0;

    scanf("%i%i", &x1, &y1);
    scanf("%i%i", &x2, &y2);

    distance = sqrt( pow(x2-x1, 2) + pow(y2-y1, 2) );    
    printf("%.4lf\n", distance);
    //system("pause");

    return 0;
}
