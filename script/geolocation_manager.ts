export class GeolocationManager {
    public longitude: number;
    public latitude: number;

    constructor() {
        navigator.geolocation.watchPosition(this.positionUpdate.bind(this), function() {alert("Failed to locate your position!")});
    }

    private positionUpdate(position: GeolocationPosition) {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
    }
}