import json

class QuakeLogParser:
    def __init__(self):
        self.INIT_GAME = 'InitGame:'
        self.CLIENT_CONNECT = 'ClientConnect:'
        self.CLIENT_DISCONNECT = 'ClientDisconnect:'
        self.INFO_CHANGED = 'ClientUserinfoChanged:'
        self.ITEM = 'Item:'
        self.KILL = 'Kill:'
        self.count = 0
        self.data = []      

    def init_game_parse(self, line):
        index = line.find(self.INIT_GAME)
        self.count += 1
        return dict(id=self.count, players=[], kills=0)
                          
    def client_connect_parse(self, line):
        index = line.find(self.CLIENT_CONNECT)
        start_index = index + len(self.CLIENT_CONNECT)
        end_index = line[start_index:].find('\n') + start_index
        return line[start_index:end_index].strip()
    
    def client_disconnect_parse(self, line):
        index = line.find(self.CLIENT_DISCONNECT)
        start_index = index + len(self.CLIENT_DISCONNECT)
        end_index = line[start_index:].find('\n') + start_index
        return line[start_index:end_index].strip()
        
    def info_changed_parse(self, line):
        index = line.find(self.INFO_CHANGED)

        start_index_id = index + len(self.INFO_CHANGED)
        end_index_id = line[start_index_id:].find('n\\') + start_index_id
        player_id = line[start_index_id:end_index_id].strip()
        
        start_index_name = end_index_id + len('n\\')
        end_index_name = line[start_index_name:].find('\\') + start_index_name
        player_name = line[start_index_name:end_index_name].strip()
        return dict(id=player_id, name=player_name)

    def item_parse(self, line):
        index = line.find(self.ITEM)
        
        start_index_id = index + len(self.ITEM) + 1
        end_index_id = line[start_index_id:].find(' ') + start_index_id
        player_id = line[start_index_id:end_index_id].strip()

        start_index_item = end_index_id
        end_index_item = line[start_index_item:].find('\n') + start_index_item
        item = line[start_index_item:end_index_item].strip()
        return dict(id=player_id, item=item)
        
    def kill_parse(self, line):
        index = line.find(self.KILL)
        start_index_kill = index + len(self.KILL) + 1
        end_index_kill = line[start_index_kill:].find(':') + start_index_kill

        kills_and_items = line[start_index_kill:end_index_kill]
        lines_splitted = kills_and_items.split(' ')
        return dict(killer=lines_splitted[0], killed=lines_splitted[1])
        
    def parse(self, filename):
        quake_log = open(filename, 'r')

        game_reference = {}
        for line in quake_log:            
            if line.find(self.INIT_GAME) > -1:
                game_reference = self.init_game_parse(line)
                self.data.append(game_reference)

            elif line.find(self.CLIENT_CONNECT) > -1:
                player_id = self.client_connect_parse(line)
                game_reference['players'].append(dict(id=player_id, name='', kills=0, items=[]))

            elif line.find(self.CLIENT_DISCONNECT) > -1:
                player_id = self.client_disconnect_parse(line)
                players = game_reference['players']
                players = [item for item in players if item['id'] != player_id]
                game_reference['players'] = players
                
            elif line.find(self.INFO_CHANGED) > -1:
                info_changed = self.info_changed_parse(line)
                for player in game_reference['players']:
                    if player['id'] == info_changed['id']:
                        player['name'] = info_changed['name']
                        break

            elif line.find(self.ITEM) > -1:
                item_found = self.item_parse(line)
                for player in game_reference['players']:
                    if player['id'] == item_found['id']:
                        player['items'].append(item_found['item'])
                        break
                
            elif line.find(self.KILL) > -1:
                kill_info = self.kill_parse(line)
                id_to_find = 0
                increment_score = False
                
                if kill_info['killer'] == '1022' or kill_info['killer'] == kill_info['killed']:
                    id_to_find = kill_info['killed']
                else:
                    increment_score = True
                    
                for player in game_reference['players']:
                    if player['id'] == id_to_find:
                        if increment_score:
                            player['kills'] += 1
                        else:
                            player['kills'] -= 1
                        break
                    
                game_reference['kills'] += 1

        quake_log.close()
        return self.data
        
        
if __name__ == '__main__':
    print('init')
    quake_log_parser = QuakeLogParser()
    result_parsed = quake_log_parser.parse("log/quake.log")
    dump = open('log/output2.log', 'w')
    dump.write(json.dumps(result_parsed, sort_keys=True, indent=4))
    dump.close()
    print('end')
