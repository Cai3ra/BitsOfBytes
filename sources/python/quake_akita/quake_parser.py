import json


class QuakeParser:
    def __init__(self):
        self.data = []

    def parse():
        games_count = 0
        kills_count = 0
        index = 0
        game = []
        game_index = 0

        print('open file for read')
        file = open('log/quake.log', 'r')

        gamin = dict()

        for line in file:
            temp_kill_index = line.find('Kill:')
            temp_connect_player = line.find('ClientUserinfoChanged:')

            if line.find('InitGame:') > -1:
                game_index += 1
                gamin = dict(game_index=game_index, players=dict(), kills=dict(), total_kills=0)
                game.append(gamin)

            elif temp_connect_player > -1:
                temp_start_index = line.find('n\\') + 2
                temp_player_index = line[temp_connect_player + 22: temp_start_index - 2].strip()

                temp_end_index = line[temp_start_index:].find('\\')
                name = line[temp_start_index: temp_start_index + temp_end_index]

                if temp_player_index not in gamin['players']:
                    gamin['players'][temp_player_index] = dict(name=name.strip(), kills=0)
                else:
                    gamin['players'][temp_player_index]['name'] = name.strip()

            elif temp_kill_index > -1:
                index = temp_kill_index + 5
                temp_kill_start_index = line[index:].find(': ')

                line_splitted = line[index: index + temp_kill_start_index].strip().split(' ')

                if line_splitted[0] in gamin['players']:
                    killer = gamin['players'][line_splitted[0]]['name'].strip()
                else:
                    killer = ''

                if line_splitted[1] in gamin['players']:
                    killed = gamin["players"][line_splitted[1]]['name'].strip()
                else:
                    killed = ''

                if killer != killed:
                    if line.find('<world>') == -1:
                        gamin['players'][line_splitted[0]]['kills'] += 1
                    else:
                        gamin['players'][line_splitted[1]]['kills'] -= 1
                else:
                    gamin['players'][line_splitted[0]]['kills'] -= 1

                kills_count += 1
                gamin['total_kills'] += 1

        print('close file')
        file.close()
        print(len(game))

    if __name__ == '__main__':
        parse()