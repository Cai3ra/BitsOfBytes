#include<stdio.h>
#include<stdlib.h>

static int const V_CAR_A = 60;
static int const V_CAR_B = 90;

int main()
{
	int distance = 0;
	int diffDistance = V_CAR_B - V_CAR_A;

    scanf("%i", &distance);
    
    int diffTime = (60 * distance) / diffDistance;
	printf("%i minutos\n", diffTime);

    //system("pause");
	return 0;
}

