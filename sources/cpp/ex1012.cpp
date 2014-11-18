#include<stdio.h>
#include<stdlib.h>
#include<math.h>

#define pi 3.14159

int main()
{
	double A = 0, 
		B = 0, 
		C = 0;
	
	double triangle = 0,
		trapezium = 0,
		circle = 0,
		square = 0,
		rectangle = 0;
		
	scanf("%lf%lf%lf", &A, &B, &C);	
	
	triangle = A*C/2;
	circle = pi * pow(C,2);
	trapezium = (A+B)*C/2;
	square = B * B;
	rectangle = A * B;

	
	printf("TRIANGULO: %.3lf\n", triangle);
	printf("CIRCULO: %.3lf\n", circle);
	printf("TRAPEZIO: %.3lf\n", trapezium);
	printf("QUADRADO: %.3lf\n", square);
	printf("RETANGULO: %.3lf\n", rectangle);
	
	system("pause");
	return 0;
}
