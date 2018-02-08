({
    SearchHelper: function(component, event) {
        var action = component.get("c.fetchProduct");
        console.log(component.get("v.searchName"));
        action.setParams({
            'searchName': component.get("v.searchName")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // if storeResponse size is 0 ,display no record found message on screen.
                console.log("testtest " + storeResponse.length + "   " + event.currentTarget);
                if (storeResponse.length == 0 && component.get("v.searchName") != "") {
                    component.set("v.Message", true);
                    console.log("ustaw true");
                } else {
                    component.set("v.Message", false);
                    console.log("ustaw false");
                }
                    var results = storeResponse;
                    for(var i = 0; i < results.length; i++) {
                        if(results[i].rating == 0) {
                            for(var j = 0; j < 5; j++) {
                                results[i].stars.push("star-icon")
                            }
                        }
                        else if(results[i].rating <= 1.25) {
                            results[i].stars.push("star-icon full");
                            for(var j = 0; j < 4; j++) {
                                results[i].stars.push("star-icon");
                            }
                        }
                        else if(results[i].rating <= 1.75) {
                            results[i].stars.push("star-icon full");
                            results[i].stars.push("star-icon half");
                            results[i].stars.push("star-icon");
                            results[i].stars.push("star-icon");
                            results[i].stars.push("star-icon");
                        }
                        else if(results[i].rating <= 2.25) {
                            results[i].stars.push("star-icon full");
                            results[i].stars.push("star-icon full");
                            results[i].stars.push("star-icon");
                            results[i].stars.push("star-icon");
                            results[i].stars.push("star-icon");
                        }
                        else if(results[i].rating <= 2.75) {
                            results[i].stars.push("star-icon full");
                            results[i].stars.push("star-icon full");
                            results[i].stars.push("star-icon half");
                            results[i].stars.push("star-icon");
                            results[i].stars.push("star-icon");
                        }
                        else if(results[i].rating <= 3.25) {
                            for(var j = 0; j < 3; j++) {
                                results[i].stars.push("star-icon full");
                            }
                            results[i].stars.push("star-icon");
                            results[i].stars.push("star-icon");
                        }
                        else if(results[i].rating <= 3.75) {
                            for(var j = 0; j < 3; j++) {
                                results[i].stars.push("star-icon full");
                            }
                            results[i].stars.push("star-icon half");
                            results[i].stars.push("star-icon");
                        }
                        else if(results[i].rating <= 4.25) {
                            for(var j = 0; j < 4; j++) {
                                results[i].stars.push("star-icon full");
                            }
                            results[i].stars.push("star-icon full");
                        }
                        else if(results[i].rating <= 4.75) {
                            for(var j = 0; j < 4; j++) {
                                results[i].stars.push("star-icon full");
                            }
                            results[i].stars.push("star-icon half");
                        }
                        else {
                            for(var j = 0; j < 5; j++) {
                                results[i].stars.push("star-icon full");
                            }
                        }


                    }
                    storeResponse = results

                     var updateEvent = $A.get("e.c:CS_ProductSearchEvent");
                    updateEvent.setParams({ "searchProductEvent": storeResponse });
                    updateEvent.fire();
                    console.log(updateEvent.getParam("searchProductEvent"));

                console.log("test eventu0000: " + JSON.stringify(storeResponse[0]));
                // set numberOfRecord attribute value with length of return value from server
                component.set("v.numberOfRecord", storeResponse.length);
                // set searchResult list with return value from server.
                component.set("v.searchResult", storeResponse);
            }


        });
        $A.enqueueAction(action);

    },
})