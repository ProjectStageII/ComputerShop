public with sharing class CS_AccountWarehouseMapController {
//        @auraenabled
//        public static List < String > getAddressFields(Id recsId) { //This method retrieves all the standard
//            //as well as custom address fields available in a particular object
//            List < String > options = new List < String > ();
//            Schema.SObjectType sobjectType = recsId.getSObjectType();
//            String sobjectName = sobjectType.getDescribe().getName();
//            List < String > availableFields = new List < String > ();
//            Map < String, Schema.SObjectField > objectFields = Schema.getGlobalDescribe().get(sobjectName).getDescribe().fields.getMap();
//            availableFields.add('--None--');
//            for (String s: objectFields.keySet()) {
//                Schema.DescribeFieldResult lfieldLabel = objectFields.get(s).getDescribe();
//                system.debug('LABEL::' + lfieldLabel.getLabel());
//                Schema.DisplayType dType = lfieldLabel.getType();
//                string fieldType = String.ValueOf(dType);
//                system.debug('fieldType::' + fieldType);
//                if (fieldType.equalsIgnoreCase('ADDRESS')) //Checks for compound address fields
//                {
//                    availableFields.add(lfieldLabel.getLabel().toUpperCase());
//                } else if (s.containsIgnoreCase('Address') && s.endsWithIgnoreCase('__c')) //Checks for custom field labels that have 'Address' in it
//                {
//                    availableFields.add(lfieldLabel.getLabel().toUpperCase());
//                }
//            }
//            System.debug('availableFields::' + availableFields);
//            return availableFields;
//        }

        @auraenabled
        public static List<String> PopulateLatituteLongitude(List<Account> message) { //This method queries the address from the record
            //and returns the Lattitude and Longitude from the address
            String city;
            String street;
            String state;
            String code;
            String country;
            String addr;
            String chosenValue = 'BillingAddress';
            string selFieldType = 'Address';
            List<String> returnList = new List<String>();
//            String sobjectName = sobjectType.getDescribe().getName();
//            Map < String, Schema.SObjectField > objectFields = Schema.getGlobalDescribe().get(sobjectName).getDescribe().fields.getMap();
//            for (String s: objectFields.keySet()) {
//                Schema.DescribeFieldResult lfieldLabel = objectFields.get(s).getDescribe();
//                Schema.DisplayType dType = lfieldLabel.getType();
//                string fieldType = String.ValueOf(dType);
////                if (lfieldLabel.getLabel().equalsIgnoreCase(opt)) {
////                    chosenValue = 'BillingAddress'; //Get the API name of the value selected from picklist
////                    selFieldType = 'Address';
////                }
//            }
            String whereString = '';
            for(Account sObjRec : message) {
                whereString += 'id = \'' + (String) sObjRec.get('Id') + '\' OR ';
            }

            whereString = whereString.substring(0,whereString.lastIndexOf('OR'));
            System.debug(whereString);
            String buildQuery = 'SELECT id,' + chosenValue + ' from Account where ' + whereString;
            System.debug(buildQuery);
            List<Account> clonedList = database.query(buildQuery);
            System.debug(clonedList);
            for(Account sObjRec : clonedList) {
                System.debug(sObjRec);
                System.debug((String) sObjRec.get('Id'));

                Address compaddr = (Address) sObjRec.BillingAddress;
                street = compaddr.getStreet();
                city = compaddr.getCity();
                state = compaddr.getState();
                code = compaddr.getPostalCode();
                country = compaddr.getCountry();
                addr = street + '+' + city + '+' + state + '+' + code + '+' + country;

                System.debug('Address::' + addr);

                string apiKey = 'AIzaSyBvq2HmumfImNmVUM9w-RLzAkcbsnuIg14'; //Unique alpha numeric key
                //This is the key for server applications.
                String modAddr = addr.replace(' ', ',');
                modAddr = modAddr.replace('-', '+');
                //modAddr = 'Aditya+Enclave,Whitefields,Hitech+City,+Hyderabad';
                String url = 'https://maps.googleapis.com/maps/api/geocode/xml?';
                url += 'address=' + modAddr;

                url += '&key=' + apiKey;
                system.debug(url);
                Http h = new Http();
                HttpRequest req = new HttpRequest();
                req.setHeader('Content-type', 'application/x-www-form-urlencoded');
                req.setHeader('Content-length', '0');
                req.setEndpoint(url);
                req.setMethod('POST');
                String responseBody = '';
                HttpResponse res = h.send(req);
                responseBody = res.getBody();
                System.debug(responseBody);
                ///*Response body will include this… 46.8647086 -96.8262901 */
                string geometryString = '';
                string locationString = '';
                string latitudeValue = '';
                string longitudeValue = '';

                Dom.Document doc = res.getBodyDocument();
                Dom.XMLNode address = doc.getRootElement();
                Dom.XMLNode result = address.getChildElement('result', null);
                Dom.XMLNode geometry = result.getChildElement('geometry', null);
                Dom.XMLNode location = geometry.getChildElement('location', null);
                latitudeValue = location.getChildElement('lat', null).getText();
                longitudeValue = location.getChildElement('lng', null).getText();

                returnList.add(latitudeValue + ';' + longitudeValue);
            }
            return returnList;
        }
    }