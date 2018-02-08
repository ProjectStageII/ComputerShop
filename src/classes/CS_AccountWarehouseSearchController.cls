public with sharing class CS_AccountWarehouseSearchController {

    @AuraEnabled
    public static List < account > fetchAccount(String searchCity, String searchCountry) {
        List < Account > returnList = new List < Account > ();
        if(String.isBlank(searchCity) && String.isBlank(searchCountry))
            return returnList;
        searchCity = '%' + searchCity + '%';
        searchCountry = '%' + searchCountry + '%';
        List < Account > lstOfAccount = [select id, Name, Type, Industry, Phone, Fax, BillingAddress, BillingCity from account where BillingCity LIKE :searchCity AND BillingCountry LIKE :searchCountry AND RecordTypeId = '0120N000000Qq4PQAS'];
        System.debug(searchCountry);
        System.debug(searchCity);
        for (Account acc: lstOfAccount) {
            returnList.add(acc);
        }
        return returnList;
    }
}