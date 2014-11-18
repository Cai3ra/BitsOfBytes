#include<stdio.h>
#include<stdlib.h>

int main()
{
	int money=0;
	int counter[] = {0,0,0,0,0,0,0};
	
	scanf("%i", &money);
	int copyMoney = money;
	
	while(money > 0)
	{
		int index=-1;
		if(money >= 100)
		{
			index=0;
			money-=100;
		}
		else if(money >= 50)
		{
			index=1;
			money-=50;
		}
		else if(money >= 20)
		{
			index=2;
			money-=20;
		}
		else if(money >= 10)
		{
			index=3;
			money-=10;
		}
		else if(money >= 5)
		{
			index=4;
			money-=5;
		}
        else if(money >= 2)
		{
			index=5;
			money-=2;
		}
		else
		{
			index=6;
			money-=1;
		}
		
		counter[index]++;
	}
	
	printf("%i\n", copyMoney);
	printf("%i nota(s) de R$ 100,00\n", counter[0]);
	printf("%i nota(s) de R$ 50,00\n", counter[1]);
	printf("%i nota(s) de R$ 20,00\n", counter[2]);
	printf("%i nota(s) de R$ 10,00\n", counter[3]);
	printf("%i nota(s) de R$ 5,00\n", counter[4]);
	printf("%i nota(s) de R$ 2,00\n", counter[5]);
	printf("%i nota(s) de R$ 1,00\n", counter[6]);
	return 0;
}
