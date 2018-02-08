/* aeHandlerController.js */
({

    handleApplicationEvent: function(component, event, helper) {
        var message = event.getParam("searchProductEvent");
        var hideTable = component.find("resultTable");
        component.set("v.searchResult", message);
        if (component.get("v.searchResult").length != 0)
            $A.util.removeClass(hideTable.getElement(), 'invisible');
        else
            $A.util.addClass(hideTable.getElement(), 'invisible');
    },

    addToCart: function(component, event, helper) {
        var id_str = event.currentTarget.id;
        console.log(id_str);
        helper.byIdHelper(component, event);
    },

    addToFavs: function(component, event, helper) {
        var id_str = event.currentTarget.id;
        console.log(id_str);
        helper.byIdFavHelper(component, event);
    },

    remFromFavs: function(component, event, helper) {
        var id_str = event.currentTarget.id;
        console.log(id_str);
        helper.byIdRemFavHelper(component, event);
    },

    redirectToDetails: function(component, event, helper) {
        var id_str = event.currentTarget.id;
        console.log(id_str);
        window.location = 'https://compshopcommunity-developer-edition.eu8.force.com/externaluser/s/detail/id#' + id_str;
        $A.get('e.force:refreshView').fire();
    },

})