#include<stdio.h>
#include<stdlib.h>
#include<math.h>

int main()
{	
	int X = 0,
		Y = 0;
	
	double kml = 0;	
	
	scanf("%i%i", &X, &Y);
	kml = ((double)X/(double)Y);
	
	printf("%.3lf km/l\n" , kml);
	//system("pause");
	return 0;
}
za