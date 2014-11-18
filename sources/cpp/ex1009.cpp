#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
 
int main()
{
    const double pctComission = 0.15;
    double salary = 0,
        sold = 0,
        total = 0;
  
    char name [20];
     
    fgets(name, 20, stdin);
    scanf("%lf%lf", &salary, &sold);

    total = (salary + (sold * pctComission));

    printf("TOTAL = R$ %.2lf\n", total); 
    return 0;
}
