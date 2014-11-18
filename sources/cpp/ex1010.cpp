#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int main()
{
    char input [2][20];
    int count [2] = {0,0};
    float value [2]= {0,0};
    
    int num_rows = sizeof(input) / sizeof(input[0]);
    int indexer [2] = { 0, 0 };
    float total = 0;

    for(int i = 0; i< num_rows; i++)
        fgets(input[i], 20, stdin);   
    
    for(int i = 0; i < num_rows; i++)
    {
        char * str = strtok(input[i], " ");
        int loop_indexer = 0;

        while(str != NULL)
        {             
            if(loop_indexer == 1)
            {  
                count[indexer[0]] = atoi(str);              
                indexer[0]++;
            } 
            else if(loop_indexer == 2)
            {
                value[indexer[1]] = atof(str);
                indexer[1]++;
            }
            
            loop_indexer++;
            str = strtok(NULL, " ");
        }
        free(&str);
        str = NULL;
    }
   
    for(int i = 0; i< num_rows; i++)
        total += (count[i] * value[i]);

    printf("VALOR A PAGAR: R$ %.2f\n", total);

    memset(indexer, 0, sizeof(indexer));
    memset(input, 0, sizeof(input));
    memset(count, 0, sizeof(count));    
    memset(value, 0, sizeof(value));

    system("pause");
    return 0;
}
