export class ConfigManager {
    public config = {};

    async load() {
        let object = await fetch("/config");
        this.config = await object.json();
    }
}