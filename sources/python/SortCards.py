import sys
import math

def executeMultipleSorts(times, cards):
	for index in range(times):
		cards = sortCards(cards)

def sortCards(cards):
	middleCard = math.floor(len(cards) / 2)
	tempArray = []
	firstCard = 0
	index = 0
	
	while(middleCard < len(cards)):
		tempArray.append(cards[firstCard])
		tempArray.append(cards[middleCard])
		
		middleCard += 1
		firstCard += 1
	
	print(tempArray)
	return tempArray
 
def main(args):
	cards = range(1, 55)
	print(list(cards))
	executeMultipleSorts(52, cards)
	
if __name__ == "__main__":
    main(sys.argv)