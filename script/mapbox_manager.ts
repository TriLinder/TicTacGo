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
                container: 'map', // container ID
                // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: [-74.5, 40], // starting position [lng, lat]
                zoom: 9 // starting zoom
        });
    }
}