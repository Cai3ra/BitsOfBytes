import sys

"""
teste de tipos de estruturas...
"""

def dataTypes():
	varA = 1
	varB = 'A'
	varC = 'ABCDEF'
	varD = [1,2,3,4]
	varE = ['A', 'B', 'C']
	varF = ['Lcs', 'Tst', 'Abc']
	varG = '12345'
	#----------------
	print(varA)
	print(varB)
	print(varC)
	print(varD)
	print(varE)
	print(varF)
	#----------------
	print(type(varA))
	print(type(varB))
	print(type(varC))
	print(type(varD))
	print(type(varE))
	print(type(varF))
	#----------------
	print(len(varB))
	print(len(varC))
	print(len(varD))
	print(len(varE))
	print(len(varF))
	#----------------
	print(list())
	print(max(varD))
	#----------------
	print(str(varA))
	print(int(varG))
#--------------------
	
def calc():
	calcA = ((4 * (2 * 3)) * 10)
	print(calcA)
	print(-calcA)
	print(23/5) 
	print(23%5)
	print(20%5) 
	print(6/8) 
	print(6%8)
	print("hi")
	print('hi')
	print(type('dog')) 
	print(type('7'))
	print(type(7))
	print(10 * 'teste-')
	print(7+2)
	print('7' + '2')
	print('mmmmo: %s' % 'abcd')
	print(range(3))
	print(4**3)	
#-------------

def logic():
	for count in [1,2,3,4]:
		print(count)
		print(count * 'loop')
	
	for color in ['red', 'green', 'blue']:	
		print(color)
	
	for i in range(10):
		print(i)
		if(not i%2):
			print('par')
		else:
			print('inpar')
	
def sum(a, b):
	return a + b

def main(args):
	dataTypes()
	calc()
	print(sum(1, 2))
	logic()
	
if __name__ == "__main__":
    main(sys.argv)