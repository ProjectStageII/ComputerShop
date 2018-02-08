/**
 * Created by Mateusz on 07.02.2018.
 */
({
    getImages: function(component, event) {
                var action = component.get("c.getAllImages");
                //console.log(event.currentTarget.id);
                action.setParams({
                    'id': location.hash.substr(1)
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var storeResponse = response.getReturnValue();
                        component.set("v.images", storeResponse);
                        // if storeResponse size is 0 ,display no record found message on screen.
                    }
                    console.log(storeResponse);

                });
                $A.enqueueAction(action);

            },
})