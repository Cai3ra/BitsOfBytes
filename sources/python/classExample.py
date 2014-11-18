#An example of a class
class Shape:
	def __init__(self,x,y):
		self.x = x
		self.y = y
	def area(self):
		return self.x * self.y
	def perimeter(self):
		return 2 * self.x + 2 * self.y
	def scaleSize(self,scale):
		self.x = self.x * scale