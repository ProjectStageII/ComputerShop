/**
 * Created by Mateusz on 05.02.2018.
 */
({
    byIdHelper: function(component, event) {
        var action = component.get("c.getProductById");
        action.setParams({
            'id': event.getSource().get("v.value")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
            }
            var updateEvent = $A.get("e.c:CS_ProductAddToCart");
            updateEvent.setParams({
                "productToAdd": storeResponse
            });
            updateEvent.fire();
            console.log(updateEvent.getParam("productToAdd"));
        });
        $A.enqueueAction(action);

    },

    byIdFavHelper: function(component, event) {
        var action = component.get("c.addToFavorites");
        var tempId = event.getSource().get("v.value");
        action.setParams({
            "id": tempId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                var tempArr = component.get("v.searchResult");
                for (var i = 0; i < tempArr.length; i++) {
                    console.log(tempArr[i]);
                    if (tempArr[i].prod.Id == tempId) {
                        tempArr[i].isFav = true;
                        break;
                    }
                }
                component.set("v.searchResult", tempArr);
            }
        });
        $A.enqueueAction(action);
    },

    byIdRemFavHelper: function(component, event) {
        var action = component.get("c.removeFromFavorites");
        var tempId = event.getSource().get("v.value");
        action.setParams({
            "id": tempId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                var tempArr = component.get("v.searchResult");
                for (var i = 0; i < tempArr.length; i++) {
                    console.log(tempArr[i]);
                    if (tempArr[i].prod.Id == tempId) {
                        tempArr[i].isFav = false;
                        break;
                    }
                }
                component.set("v.searchResult", tempArr);
            }
        });
        $A.enqueueAction(action);
    },

})