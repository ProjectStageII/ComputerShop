/**
 * Created by Mateusz on 07.02.2018.
 */
({
    doInit: function(component) {
        var action = component.get("c.getProductById");
        console.log(location.hash.substr(1));
        action.setParams({
            'id': location.hash.substr(1)
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.prod", storeResponse);
            }
            console.log(storeResponse);


        });
        $A.enqueueAction(action);

    }
})