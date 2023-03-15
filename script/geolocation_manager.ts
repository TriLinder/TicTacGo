import { TicTacGo } from "./main";

export class GeolocationManager {
    private ticTacGo: TicTacGo;
    
    public longitude: number;
    public latitude: number;
    public LngLat: any;

    constructor(ticTacGo: TicTacGo) {
        this.ticTacGo = ticTacGo;

        navigator.geolocation.watchPosition(this.positionUpdate.bind(this), function() {alert("Failed to locate your position!")});
    }

    private positionUpdate(position: GeolocationPosition) {
        const mapboxgl = this.ticTacGo.mapboxManager.mapboxgl;
        
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;

        this.LngLat = new mapboxgl.LngLat(this.longitude, this.latitude);
    }
}