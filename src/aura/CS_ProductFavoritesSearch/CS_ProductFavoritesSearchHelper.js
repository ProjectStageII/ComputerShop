/**
 * Created by Mateusz on 07.02.2018.
 */
({
    SearchHelper: function(component, event) {
        var action = component.get("c.fetchProduct");
        action.setParams({
            'searchName': component.get("v.searchName")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                if (storeResponse.length == 0 && component.get("v.searchName") != "") {
                    component.set("v.Message", true);
                } else {
                    component.set("v.Message", false);
                }
                component.set("v.numberOfRecord", storeResponse.length);
                component.set("v.searchResult", storeResponse);
            }

            var updateEvent = $A.get("e.c:CS_ProductSearchEvent");
            updateEvent.setParams({
                "searchProductEvent": storeResponse
            });
            updateEvent.fire();
            console.log(updateEvent.getParam("searchProductEvent"));

        });
        $A.enqueueAction(action);

    },
})