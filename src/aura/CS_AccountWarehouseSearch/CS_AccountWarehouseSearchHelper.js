({
    SearchHelper: function(component, event) {
        var action = component.get("c.fetchAccount");
        console.log(component.get("v.searchCity"));
        action.setParams({
            'searchCity': component.get("v.searchCity"),
            'searchCountry': component.get("v.searchCountry")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // if storeResponse size is 0 ,display no record found message on screen.
                console.log("testtest " + storeResponse.length + "   " + event.currentTarget);
                if (storeResponse.length == 0 && component.get("v.searchCity") != "" && component.get("v.searchCountry") != "") {
                    component.set("v.Message", true);
                    console.log("ustaw true");
                } else {
                    component.set("v.Message", false);
                    console.log("ustaw false");
                }
                // set numberOfRecord attribute value with length of return value from server
                component.set("v.numberOfRecord", storeResponse.length);
                // set searchResult list with return value from server.
                component.set("v.searchResult", storeResponse);
            }

            var updateEvent = $A.get("e.c:CS_AccountWarehouseSearchListEvent");
                                    updateEvent.setParams({ "searchCityEvent": storeResponse });
                                    updateEvent.fire();
                                    console.log(updateEvent.getParam("searchCityEvent"));

        });
        $A.enqueueAction(action);

    },
})