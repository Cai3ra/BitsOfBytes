#include<stdio.h>
#include<stdlib.h>

static const double average = 12;
int main()
{
	int hour = 0;
	int velocity =0;
	
	scanf("%i%i", &hour, &velocity);
	
	double totalSpent = (hour * velocity) / average;
	
	printf("%.3lf", totalSpent);
	
	return 0;
}
