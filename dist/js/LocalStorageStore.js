"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalStorageStore = function () {
    function LocalStorageStore(storeName, storeData) {
        _classCallCheck(this, LocalStorageStore);

        this.storeName = storeName;
        localStorage.setItem(storeName, JSON.stringify(storeData));
    }

    // saves json to localstorage


    _createClass(LocalStorageStore, [{
        key: "updateStore",
        value: function updateStore(itemName, storeData) {
            localStorage.setItem(itemName, JSON.stringify(storeData));
        }
    }, {
        key: "addRecipeToStore",
        value: function addRecipeToStore(recipe) {
            var currentData = this.getCurrentStoreData();
            console.log("CUrrent data before: ", currentData);
            console.log("Adding recipe: ", recipe);
            currentData.push(recipe);
            console.log("Data after new one: ", currentData);
            this.updateStore(this.storeName, currentData);
        }
    }, {
        key: "updateRecipeInStore",
        value: function updateRecipeInStore(index, recipe) {
            var currentData = this.getCurrentStoreData();
            currentData[index] = recipe;
            this.updateStore(this.storeName, currentData);
        }
    }, {
        key: "removeItemFromStore",
        value: function removeItemFromStore(index) {
            var currentData = this.getCurrentStoreData();
            currentData.splice(index, 1);
            this.updateStore(this.storeName, currentData);
        }
    }, {
        key: "getCurrentStoreData",
        value: function getCurrentStoreData() {
            var currentData = localStorage.getItem(this.storeName);
            if (currentData) return jQuery.parseJSON(currentData);
            return [];
        }
    }]);

    return LocalStorageStore;
}();