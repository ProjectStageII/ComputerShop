({
    Search: function(component, event, helper) {
        console.log(component.find("searchCity").get("v.value"));
        var searchCityCmp = component.get("v.searchCity");
        var searchCityFld = component.find("searchCity");
        var srcCityValue = searchCityFld.get("v.value");
        var searchCountryFld = component.find("searchCountry");
        var srcCountryValue = searchCountryFld.get("v.value");

        if (srcCityValue == '' || srcCityValue == null) {
            // display error message if input value is blank or null
            searchCityFld.set("v.errors", [{
                message: "Enter Search Keyword."
            }]);
        }
        else if (srcCountryValue == '' || srcCountryValue == null) {
            searchCountryFld.set("v.errors", [{
                message: "Enter Search Keyword."
            }]);
        }
        else {
            searchCityFld.set("v.errors", null);
            searchCountryFld.set("v.errors", null);
            // call helper method
            helper.SearchHelper(component, event);
        }

    },
    clear: function(component, event, helper) {
            console.log(component.find("searchCity").get("v.value"));
            var searchCityCmp = component.get("v.searchCity");
            var searchCityFld = component.find("searchCity");
            var srcCityValue = "";
            searchCityFld.set("v.value", "");
            var searchCountryFld = component.find("searchCountry");
            var srcCountryValue = "";
            searchCountryFld.set("v.value", "");

            helper.SearchHelper(component, event);

        },
//    handleUpdateWarehouses: function(component, event, helper) {
//            var updatedExp = event.getParam("searchCity");
//            console.log('event' + updatedExp)
//            //helper.updateExpense(component, updatedExp);
//        }
})