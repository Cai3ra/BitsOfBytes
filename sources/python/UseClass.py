import sys
import classExample

def main(args):
	t = classExample.Shape(1,2)
	print('teste1: %i' % t.area())
	print('teste2: %i' % t.perimeter())
	print('%s %s %s' % ('1','2','3') )
	
if __name__ == "__main__":
    main(sys.argv)