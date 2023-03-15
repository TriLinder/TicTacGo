Empty = 0
X = 1
O = 2

class GameBoardTile:
    def __init__(self, inital_state) -> None:
        self.state = inital_state

    def attempt_to_claim(self, letter) -> None:
        if self.state == Empty:
            self.state = letter

class GameBoard:
    def __init__(self, size: int) -> None:
        self.board = []
        self.size = size

        self.reset()

    def to_dict(self) -> dict:
        states = []

        for x in range(self.size):
            states.append([])
            for y in range(self.size):
                states[x].append(self.board[x][y].state)

        dict = {"states": states, "size": self.size}
        return dict

    def reset(self) -> None:
        self.board = []

        for x in range(self.size):
            self.board.append([])
            for y in range(self.size):
                self.board[x].append(GameBoardTile(Empty))

    def attempt_to_claim(self, x, y, letter) -> None:
        self.board[x][y].attempt_to_claim(letter)