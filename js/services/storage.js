/**
 * FarmPal — LocalStorage Persistence Service
 */
const Storage = {
    KEYS: { FARMS: 'farmpal_farms', FIELDS: 'farmpal_fields', SETTINGS: 'farmpal_settings' },

    _get(key) {
        try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
    },
    _set(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    },

    // Farms
    getFarms() { return this._get(this.KEYS.FARMS) || []; },
    saveFarms(farms) { this._set(this.KEYS.FARMS, farms); },
    addFarm(farm) {
        const farms = this.getFarms();
        farm.id = farm.id || Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        farm.createdAt = farm.createdAt || new Date().toISOString();
        farms.push(farm);
        this.saveFarms(farms);
        return farm;
    },
    updateFarm(id, updates) {
        const farms = this.getFarms();
        const idx = farms.findIndex(f => f.id === id);
        if (idx !== -1) { farms[idx] = { ...farms[idx], ...updates }; this.saveFarms(farms); }
        return farms[idx] || null;
    },
    deleteFarm(id) {
        this.saveFarms(this.getFarms().filter(f => f.id !== id));
        this.saveFields(this.getFields().filter(f => f.farmId !== id));
    },

    // Fields
    getFields() { return this._get(this.KEYS.FIELDS) || []; },
    getFieldsByFarm(farmId) { return this.getFields().filter(f => f.farmId === farmId); },
    saveFields(fields) { this._set(this.KEYS.FIELDS, fields); },
    addField(field) {
        const fields = this.getFields();
        field.id = field.id || Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        field.createdAt = field.createdAt || new Date().toISOString();
        field.status = field.status || 'active';
        fields.push(field);
        this.saveFields(fields);
        return field;
    },
    updateField(id, updates) {
        const fields = this.getFields();
        const idx = fields.findIndex(f => f.id === id);
        if (idx !== -1) { fields[idx] = { ...fields[idx], ...updates }; this.saveFields(fields); }
        return fields[idx] || null;
    },
    deleteField(id) {
        this.saveFields(this.getFields().filter(f => f.id !== id));
    },

    // Settings
    getSettings() {
        return this._get(this.KEYS.SETTINGS) || { language: 'en', tempUnit: 'celsius', notifications: true };
    },
    saveSettings(settings) { this._set(this.KEYS.SETTINGS, settings); },

    // Demo Data Seeder
    seedDemoData() {
        if (this.getFarms().length > 0) return;
        const farm = this.addFarm({
            name: 'Green Valley Farm', location: 'Abuja, Nigeria',
            lat: 9.0579, lon: 7.4951, sizeHa: 3.5, soilType: 'loamy'
        });
        const now = new Date();
        const d45ago = new Date(now); d45ago.setDate(d45ago.getDate() - 45);
        const d20ago = new Date(now); d20ago.setDate(d20ago.getDate() - 20);
        this.addField({
            farmId: farm.id, name: 'North Plot', cropType: 'maize',
            variety: 'Medium (120d)', plantingDate: d45ago.toISOString().split('T')[0],
            sizeHa: 2.0, soilPH: 6.2, notes: 'Planted with hybrid seeds'
        });
        this.addField({
            farmId: farm.id, name: 'South Plot', cropType: 'beans',
            variety: 'Bush (60d)', plantingDate: d20ago.toISOString().split('T')[0],
            sizeHa: 1.5, soilPH: 6.5, notes: 'Intercropped area'
        });
    }
};
