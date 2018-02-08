({
    doInit: function(component, event, helper) {
        var speed=component.get("v.interval");
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
                helper.getImages(component, event);
            }
            console.log(storeResponse);


        });
        $A.enqueueAction(action);

    },

     Previous : function(component, event, helper) {
        $('#carousel-example-generic').carousel('prev');
    },
    Next : function(component, event, helper) {
        $('#carousel-example-generic').carousel('next');
        $('#carousel-example-generic').carousel(200);

    },

})