export default class TerrainObject {
    constructor(terrainID, terrainName, width, height, defaultHaster, customFields, terrainPath) {
        this.terrainID = terrainID;
        this.terrainName = terrainName;
        this.width = width;
        this.height = height;
        this.defaultHaster = defaultHaster;
        this.customFields = customFields;
        this.terrainPath = terrainPath;
    }
}