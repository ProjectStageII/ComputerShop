({
    doInit: function(component, event, helper) {
        var lat;
        var lng;

//        var recId = component.get("v.recordId");
//        console.log(recId);
//
//        var action = component.get("c.getAddressFields");
//        action.setParams({
//            "recsId": recId
//        });
//        action.setCallback(this, function(res) {
//
//            var state = res.getState();
//            if (state === "SUCCESS") {
//                console.log(state);
//                var str = res.getReturnValue();
//                component.set('v.availvals', str);
//            }
//        });
//        $A.enqueueAction(action);
    },

     handleApplicationEvent : function(component, event, helper) {
            var message = event.getParam("searchCityEvent");
            console.log(message);
            if(message.length != 0) {
                console.log(message);
                console.log(message[0]);
                console.log(message[0]["Id"]);
                // set the handler attributes based on event data
                //component.set("v.messageFromEvent", message);
                var lat;
                var lng;
                var recId = message[0]["Id"];
                console.log(recId);
                var map = null;
                var leafl;
                document.getElementById('mapnew').innerHTML = "";
                document.getElementById('mapnew').innerHTML = "<div style=\"height: 300px\" class=\"map\" id=\"map\"></div>";

                //var selected = component.find("getsel").get("v.value");
                var action = component.get("c.PopulateLatituteLongitude");
                action.setParams({
                    "message" : message
                });
                action.setCallback(this, function(res) {
                    var state = res.getState();
                    if (state === "SUCCESS") {
                        console.log(state);
                        map = new L.map('map', {
                            zoomControl: true
                        });
                        var strArr = res.getReturnValue();
                        console.log(strArr);
                        var tileLatLowest = 180;
                        var tileLngLowest = 180;
                        var tileLatHighest = -180;
                        var tileLngHighest = -180;
                        for(var i = 0; i < strArr.length; i++) {
                            var arr = strArr[i].split(";");
                            lat = parseFloat(arr[0]);
                            lng = parseFloat(arr[1]);
                            if(lat < tileLatLowest)
                                tileLatLowest = lat;
                            if(lng < tileLngLowest)
                                tileLngLowest = lng;
                            if(lat > tileLatHighest)
                                tileLatHighest = lat;
                            if(lng > tileLngHighest)
                                tileLngHighest = lng;
                        }
                        var corner1 = L.latLng(tileLatLowest, tileLngLowest);
                        var corner2 = L.latLng(tileLatHighest, tileLngHighest);
                        var bounds = L.latLngBounds(corner1, corner2);
                        map.fitBounds(bounds);
                        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                            attribution: 'Tiles © Esri'
                        }).addTo(map);
                        for(var i = 0; i < strArr.length; i++) {
                            var arr = strArr[i].split(";");
                            lat = parseFloat(arr[0]);
                            lng = parseFloat(arr[1]);
                            console.log(L.marker([lat, lng]));
                                // Add marker
                                L.marker([lat, lng]).bindPopup(i).addTo(map);
                                map.invalidateSize();
                                console.log(map);

                        }


                    }
                });
                $A.enqueueAction(action);
            }
            else {
                console.log("jestem wesolym elsem");
                document.getElementById('mapnew').innerHTML = "";
            }
        },

        handleApplicationEventSingle : function(component, event, helper) {
                var message = event.getParam("searchSingle");
                console.log(message);
                // set the handler attributes based on event data
                //component.set("v.messageFromEvent", message);
                //component.set("v.searchResult", message)
                var lat;
                var lng;
                var recId = message[0]["Id"];
                console.log(recId);
                var map = null;
                var leafl;
                document.getElementById('mapnew').innerHTML = "";
                document.getElementById('mapnew').innerHTML = "<div style=\"height: 300px\" class=\"map\" id=\"map\"></div>";

                //var selected = component.find("getsel").get("v.value");
                var action = component.get("c.PopulateLatituteLongitude");
                action.setParams({
                    "message" : message
                });
                action.setCallback(this, function(res) {
                    var state = res.getState();
                    if (state === "SUCCESS") {
                        console.log(state);
                        map = new L.map('map', {
                            zoomControl: true
                        });
                        var strArr = res.getReturnValue();
                        console.log(strArr);

                        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                            attribution: 'Tiles © Esri'
                        }).addTo(map);
                        for(var i = 0; i < strArr.length; i++) {
                            var arr = strArr[i].split(";");
                            lat = parseFloat(arr[0]);
                            lng = parseFloat(arr[1]);
                            map.setView(new L.LatLng(lat, lng), 16);
                            console.log(L.marker([lat, lng]));
                                // Add marker
                                L.marker([lat, lng]).bindPopup(i).addTo(map);
                                map.invalidateSize();
                                console.log(map);

                        }


                    }
                });
                $A.enqueueAction(action);
            },
})