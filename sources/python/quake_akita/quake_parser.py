from game_info import GameInfo
from kill_info import KillInfo

class QuakeParser: 
	def __init__ ( self ):
		self.data = [ ]
		
	def parse ( ):
		games_count = 0
		kills_count = 0
		index = 0
		game = [ ]
		game_index = 0
		
		print ( 'open file for read' )
		file = open ( 'log/quake.log', 'r' )
		
		gameInfo = GameInfo ( )
		
		for line in file:
			tempKillIndex = line.find ( 'Kill:' )
			tempConnectPlayer = line.find ( 'ClientUserinfoChanged:' )
			
			if ( line.find ( 'InitGame:' ) > -1 ):
				game_index += 1
				gameInfo = GameInfo ( game_index , dict ( )  , dict ( ) , 0 )
				game.append ( gameInfo )
			
			elif ( tempConnectPlayer  > -1 ):
				tempStartIndex = line.find ( 'n\\' ) + 2
				tempPlayerIndex = line[tempConnectPlayer+22 : tempStartIndex - 2].strip ( )
				
				tempEndIndex = line [ tempStartIndex : ] .find ( '\\' )
				name = line[tempStartIndex: tempStartIndex + tempEndIndex]
				
				if ( tempPlayerIndex not in gameInfo.players ):
					gameInfo.players[tempPlayerIndex] = KillInfo ( name.strip ( ) , 0 )
				else: 
					gameInfo.players[tempPlayerIndex].name = name.strip ( )
			
			elif ( tempKillIndex > -1 ):
				index = tempKillIndex + 5
				tempKillStartIndex = line [ index: ].find ( ': ' )
				
				lineSplitted = line [ index: index + tempKillStartIndex].strip ( ).split ( ' ' )
				
				killer = gameInfo.players [ lineSplitted[ 0 ] ].name.strip ( ) if lineSplitted[ 0 ] in gameInfo.players else ''
				killed = gameInfo.players [ lineSplitted[ 1 ] ].name.strip ( ) if lineSplitted[ 1 ] in gameInfo.players else ''
				
				if ( killer != killed ):	
					if ( line.find ( '<world>' ) == -1 ):				
						gameInfo.players [ lineSplitted[ 0 ] ].kills += 1
					else:
						gameInfo.players [ lineSplitted[ 1 ] ].kills -= 1
				else:
					gameInfo.players [ lineSplitted[ 0 ] ].kills -= 1
					
				kills_count += 1
				gameInfo.total_kills += 1
			
		print ( 'close file' )
		file.close ( )
		print( len ( game ) )
		
		for item in game:
			print ( item.game_index )
			
			for player in item.players:
				print ( item.players[player].name, item.players[player].kills )
			print ( item.total_kills )
			print ( '---------------------------------------' )
			
	if __name__ == '__main__':
		parse ()
		
# estudar map