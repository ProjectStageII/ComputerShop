/**
 * Created by Mateusz on 07.02.2018.
 */
({
    doInit: function(component) {
        if(location.hash) {
            component.set("v.showDetails", true);
       }
    }
})