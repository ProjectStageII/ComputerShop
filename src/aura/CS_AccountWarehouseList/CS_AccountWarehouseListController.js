/* aeHandlerController.js */
({

    handleApplicationEvent : function(component, event, helper) {
        var message = event.getParam("searchCityEvent");
        //if(event.getSource().get(""))
        //console.log(event.getSource().get("v.name"));
        var hideTable = component.find("resultTable");

        // set the handler attributes based on event data
        //component.set("v.messageFromEvent", message);
        component.set("v.searchResult", message);
        console.log("czy ukryc " + component.get("v.searchResult").length);
        if(component.get("v.searchResult").length != 0)
                $A.util.removeClass(hideTable.getElement(), 'invisible');
        else
                $A.util.addClass(hideTable.getElement(), 'invisible');
    },

    fireListEvent : function(component, event, helper) {
        var i;
        var resultArr = [];
        var updateEvent = $A.get("e.c:CS_AccountWarehouseListMapEvent");
        var storeAcc = component.get("v.searchResult");
        console.log(storeAcc);
            console.log(event.currentTarget.id);
            for(i = 0; i < storeAcc.length; i++) {
                console.log(storeAcc[i]["Id"]);
                if(storeAcc[i]["Id"] == event.currentTarget.id) {
                    resultArr.push(storeAcc[i]);
                    break;
                }
            }
            var stringId = resultArr[0]["Id"];
            console.log("nowy tescik 33 " + component.find("warehouseRow"));
            var warehouseRow = component.find("warehouseRow");
            //$A.util.removeClass(event.currentTarget.siblings, 'highlighted');
            for(var j = 0; j < warehouseRow.length; j++) {
                console.log("tescik 343 " + warehouseRow[j]);
                 $A.util.removeClass(warehouseRow[j].getElement(), 'highlighted');
            }
            $A.util.addClass(event.currentTarget, 'highlighted');
            console.log(resultArr);
            updateEvent.setParams({ "searchSingle": resultArr });
            updateEvent.fire();

    },

    closeList :  function(component, event, helper) {
        var updateEvent = $A.get("e.c:CS_AccountWarehouseSearchListEvent");
                                            updateEvent.setParams({ "searchCityEvent": component.get("v.searchResult") });
                                            updateEvent.fire();
                                            console.log(updateEvent.getParam("searchCityEvent"));

        var hideTable = component.find("resultTable");
        $A.util.addClass(hideTable.getElement(), 'invisible');
    }
})