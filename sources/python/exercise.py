import sys

def sumMaxRange(array):
	totalIndex = len(array)
	sum = max = array[0]	
	
	for index in range(1, len(array)):
		if sum < 0:
			sum = array[index]
		else:
			sum += array[index]
		if sum > max:
			max = sum
	return max


def main(argv):
	arrayExercise = [31, -41, 59, 26, -53, 58, 97, -93, -23, 84]
	sum = sumMaxRange(arrayExercise)
	print(sum)
	
if __name__ == "__main__":
	main(sys.argv)