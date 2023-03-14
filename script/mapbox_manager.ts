import { TicTacGo } from "./main";

export class MapboxManager {
    private ticTacGo: TicTacGo;

    public mapboxgl: any;
    public map: any;

    constructor(ticTacGo: TicTacGo, mapboxgl: any) {
        this.ticTacGo = ticTacGo;
        this.mapboxgl = mapboxgl;

        this.initialize();
    }

    private initialize() {
        this.mapboxgl.accessToken = this.ticTacGo.configManager.config["mapboxToken"];
        
        this.map = new this.mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: this.ticTacGo.configManager.config["boardPosition"],
                zoom: 9
        });

        this.map.on("load", function() {
            this.map.addSource("gameBoardCanvasSource", {
                type: "canvas",
                canvas: "game_board_canvas",
                coordinates: [
                            [91.4461, 21.5006],
                            [100.3541, 21.5006],
                            [100.3541, 13.9706],
                            [91.4461, 13.9706]
                        ],
                animate: true
            })

            this.map.addLayer({
                id: "gameBoardLayer",
                type: "raster",
                source: "gameBoardCanvasSource"
            });

        }.bind(this));
    }
}