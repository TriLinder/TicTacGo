export const Empty = 0;
export const X = 1;
export const O = 2;

export class GameBoardTile {
    public state: number;
    
    constructor(initalState: number) {
        this.setState(initalState);
    }

    public setState(state: number) {
        if (state == Empty || state == X || state == O) {
            this.state = state;
        }
        else {
            this.state = Empty;
        }
    }
}