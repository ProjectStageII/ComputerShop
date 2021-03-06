({
    Search: function(component, event, helper) {
        console.log(component.find("searchName").get("v.value"));
        var searchNameCmp = component.get("v.searchName");
        var searchNameFld = component.find("searchName");
        var srcNameValue = searchNameFld.get("v.value");
        
        if (srcNameValue == '' || srcNameValue == null) {
            // display error message if input value is blank or null
            searchNameFld.set("v.errors", [{
                message: "Enter Search Keyword."
            }]);
        }
        else {
            searchNameFld.set("v.errors", null);
            // call helper method
            helper.SearchHelper(component, event);
        }

    },
    clear: function(component, event, helper) {
            var searchNameCmp = component.get("v.searchName");
            var searchNameFld = component.find("searchName");
            var srcNameValue = "";
            searchNameFld.set("v.value", "");
            helper.SearchHelper(component, event);

        },
})