import { TicTacGo } from "./main";

export class MapboxManager {
    private ticTacGo: TicTacGo;

    public mapboxgl: any;
    public map: any;
    
    public gameBoardBounds: any;

    public geolocateControl: any;

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
                zoom: 15
        });

        this.geolocateControl = new this.mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },

                trackUserLocation: true,
                showUserHeading: true
            });

        this.map.addControl(this.geolocateControl);

        // Caulculate geographic bounds for the game board
        // See https://docs.mapbox.com/mapbox-gl-js/api/geography/
        const ll = new this.mapboxgl.LngLat(...this.ticTacGo.configManager.config["boardPosition"]);
        this.gameBoardBounds = ll.toBounds(this.ticTacGo.configManager.config["boardMeters"] / 2);

        this.map.on("load", function() {
            this.map.addSource("gameBoardCanvasSource", {
                type: "canvas",
                canvas: "game_board_canvas",
                coordinates: [
                                this.gameBoardBounds.getNorthWest().toArray(), 
                                this.gameBoardBounds.getNorthEast().toArray(), 
                                this.gameBoardBounds.getSouthEast().toArray(), 
                                this.gameBoardBounds.getSouthWest().toArray()
                            ],
                animate: true
            })

            this.map.addLayer({
                id: "gameBoardLayer",
                type: "raster",
                source: "gameBoardCanvasSource"
            });

            this.geolocateControl.trigger();

        }.bind(this));
    }
}