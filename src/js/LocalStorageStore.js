class LocalStorageStore {
    constructor(storeName, storeData) {
        this.storeName = storeName;
        localStorage.setItem(storeName, JSON.stringify(storeData));
    }

    // saves json to localstorage
    updateStore(itemName, storeData) {
        localStorage.setItem(itemName, JSON.stringify(storeData));
    }

    addRecipeToStore(recipe) {
        let currentData = this.getCurrentStoreData();
        console.log("CUrrent data before: ", currentData);
        console.log("Adding recipe: ", recipe);
        currentData.push(recipe);
        console.log("Data after new one: ", currentData);
        this.updateStore(this.storeName, currentData);
    }

    updateRecipeInStore(index, recipe) {
        let currentData = this.getCurrentStoreData();
        currentData[index] = recipe;
        this.updateStore(this.storeName, currentData);
    }

    removeItemFromStore(index) {
        let currentData = this.getCurrentStoreData();
        currentData.splice(index, 1);
        this.updateStore(this.storeName, currentData);
    }

    getCurrentStoreData() {
        let currentData = localStorage.getItem(this.storeName);
        if(currentData) return jQuery.parseJSON(currentData);
        return [];
    }
}