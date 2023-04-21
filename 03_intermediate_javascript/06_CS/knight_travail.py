import sys
class KnightTravail:
    def __init__(self):
        self.size = 8 
        self.board = [[i for i in range(8)] for j in range(8)]

    def generate_possible_moves(self, pos):
        # (i+2, j+1), (i+1, j+2), (i-2,j+1), (i-1, j+2), (i-1, j-2), (i-2, j-1), (i+1, j-2) and (i+2, j-1)
        x = [2, 1, -2, -1, -1, -2, 1, 2]
        y = [1, 2,  1,  2, -2, -1,-2,-1]

        return [[pos[0]+x[i], pos[1]+y[i]] for i in range(8) if ((pos[0]+x[i] <= 8) and (pos[0]+x[i] >= 0) and (pos[1] + y[i]) <= 8 and (pos[1] + y[i] >= 0) )]
    
    def save_path(self, keyNode, valueNode, track_map):
        keyNode = f'[{keyNode[0]}, {keyNode[1]}]'
        valueNode = f'[{valueNode[0]}, {valueNode[1]}]'
        if keyNode in track_map:
            print("something wrong")
            sys.exit(1)
       
        track_map[keyNode] = valueNode
    
    def find_path(self, start_pos, end_pos):
        visited = set()
        track_map = dict()
        # print("track map: ", track_map, end = ", ")
        queue = [start_pos]

        while len(queue) != 0:
            pos = queue.pop(0)
            # print(f'\ncurrent possition: {pos}')
            if pos == end_pos:
                print("found it")
                self.print_path(f'[{start_pos[0]}, {start_pos[1]}]', f'[{end_pos[0]}, {end_pos[1]}]', track_map)
                return
            for next_pos in self.generate_possible_moves(pos):
                if f'[{next_pos[0]}, {next_pos[1]}]' not in visited:
                    track_map[f'[{next_pos[0]}, {next_pos[1]}]'] = f'[{pos[0]}, {pos[1]}]'
                    queue.append(next_pos)
                    visited.add(f'[{next_pos[0]}, {next_pos[1]}]')
            
    def print_path(self, start_pos, end_pos, track_map):
        current_pos = end_pos
        print(f'Path: {current_pos}', end = ", ")
        while current_pos!=start_pos:
            current_pos = track_map[current_pos]
            print(current_pos, end = ", ")
        print()

if __name__== "__main__":
    board = KnightTravail();
    # print("board ",board.board)
    # # print("possible moves: ",board.generate_possible_moves([0,0]))
    # print("possible moves: ",board.generate_possible_moves([3, 3]))
    board.find_path([3,3], [0,0])
    board.find_path([3,3], [4,3])