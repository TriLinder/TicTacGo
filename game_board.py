Empty = 0
X = 1
O = 2

class GameBoardTile:
    def __init__(self, x, y, inital_state) -> None:
        self.x = x
        self.y = y
        self.state = inital_state

    def attempt_to_claim(self, letter) -> None:
        if self.state == Empty:
            self.state = letter

    def __str__(self) -> str:
        return f"| {self.state} @ {(self.x, self.y)} |"

class GameBoard:
    def __init__(self, config) -> None:
        self.board = []
        self.size = config["boardTiles"]
        self.tiles_required_to_win = config["tilesRequiredToWin"]

        self.reset()

    def to_dict(self) -> dict:
        states = []

        for x in range(self.size):
            states.append([])
            for y in range(self.size):
                states[x].append(self.board[x][y].state)

        dict = {"states": states, "size": self.size}
        return dict

    def check_game_state(self) -> dict:
        # Check columns
        for x in range(self.size):
            for y in range(self.size - self.tiles_required_to_win + 1):
                current_tile = self.board[x][y]
                
                if current_tile.state:
                    # Check 'self.tiles_required_to_win' tiles ahead
                    if all([current_tile.state == checked_tile.state for checked_tile in self.board[x][y : y + self.tiles_required_to_win]]):
                        return {"playable": False, "x": x, "y": y, "type": "column", "letter": current_tile.state}
        
        #Check rows
        for y in range(self.size):
            for x in range(self.size - self.tiles_required_to_win + 1):
                current_tile = self.board[x][y]

                if current_tile.state:
                    # Check 'self.tiles_required_to_win' tiles ahead
                    if all([current_tile.state == checked_column[y].state for checked_column in self.board[x : x + self.tiles_required_to_win]]):
                        return {"playable": False, "x": x, "y": y, "type": "row", "letter": current_tile.state}

        #Check diagonals
        for x in range(self.size):
            for y in range(self.size):
                current_tile = self.board[x][y]

                if current_tile.state:
                    if x <= self.size - self.tiles_required_to_win and y <= self.size - self.tiles_required_to_win:
                        left_to_right_diaognal = [self.board[x + n][y + n] for n in range(self.tiles_required_to_win)]
                    else:
                        left_to_right_diaognal = []

                    if x >= self.tiles_required_to_win - 1 and y <= self.size - self.tiles_required_to_win: 
                        right_to_left_diaognal = [self.board[x - n][y + n] for n in range(self.tiles_required_to_win)]
                    else:
                        right_to_left_diaognal = []

                    if left_to_right_diaognal and all([current_tile.state == checked_tile.state for checked_tile in left_to_right_diaognal]):
                        return {"playable": False, "x": x, "y": y, "type": "l2r", "letter": current_tile.state}

                    if right_to_left_diaognal and all([current_tile.state == checked_tile.state for checked_tile in right_to_left_diaognal]):
                        return {"playable": False, "x": x, "y": y, "type": "r2l", "letter": current_tile.state}

        #Check for a tie
        if all([self.board[x][y].state != Empty for x in range(self.size) for y in range(self.size)]):
            return {"playable": False, "type": "tie"}

        return {"playable": True}

    def reset(self) -> None:
        self.board = []

        for x in range(self.size):
            self.board.append([])
            for y in range(self.size):
                self.board[x].append(GameBoardTile(x, y, Empty))

    def attempt_to_claim(self, x, y, letter) -> None:
        if self.check_game_state()["playable"]:
            self.board[x][y].attempt_to_claim(letter)