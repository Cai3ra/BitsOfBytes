#include<stdio.h>
#include<stdlib.h>
#include<math.h>

int main()
{
	int A = 0,
		B = 0,
		C = 0;
	
	scanf("%i%i%i", &A, &B, &C);
	
	int greater = (A+B+abs(A-B))/2;	
	greater = (greater+C+abs(greater-C))/2;	
	
	printf("%i eh o maior\n", greater);	
	
	//system("pause");
	return 0;
}
