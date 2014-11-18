#include<stdio.h>
#include<stdlib.h>

int main()
{
    int seconds = 0;
    scanf("%i", &seconds);
    
    int time[] = {0,0};

    while(seconds > 0)
    {
        if(seconds >= 3600) 
        {
            time[0]++;
            seconds -= 3600;
        }
        else if( seconds >= 60 )
        {
            time[1]++;
            seconds -= 60;
        }
        else
        {
            break;
        }
    }

    printf("%i:%i:%i\n", time[0], time[1], seconds);
    return 0;
}


