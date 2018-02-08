/**
 * Created by Mateusz on 07.02.2018.
 */
({

        doInit: function(component) {
            var action = component.get("c.fetchFavoriteProduct");
            console.log(location.hash.substr(1));
            action.setParams({
                'searchName': ''
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    component.set("v.searchResult", storeResponse);
                }
                console.log(storeResponse);


            });
            $A.enqueueAction(action);

        }

})