public with sharing class CS_ProductSearchController {

    @AuraEnabled
    public static List <ProductWrapper> fetchProduct(String searchName) {
        List <ProductWrapper> returnList = new List <ProductWrapper> ();
        if(String.isBlank(searchName))
            return returnList;
        searchName = '%' + searchName + '%';
        List <Product2> lstOfProduct = [select id, Name from Product2 where name LIKE :searchName];
        for (Product2 prod: lstOfProduct) {
            ProductWrapper tempProd = new ProductWrapper();
            tempProd.prod = prod;
            tempProd.photo = getImagesByProduct(prod.id);
            tempProd.isFav = isFavByProduct(prod.id);
            tempProd.rating = getRating(prod.id);
            tempProd.price = getPrice(prod.id);
            returnList.add(tempProd);
        }
        System.debug(returnList);
        return returnList;
    }

//    @AuraEnabled
//    public static List <ProductPhotos__c> fetchProductWithPhoto(String searchName) {
//        List <ProductPhotos__c> returnList = new List <Product2> ();
//        if(String.isBlank(searchName))
//            return returnList;
//        searchName = '%' + searchName + '%';
//        List <Product2> lstOfProduct = [select id, Name from Product2 where name LIKE :searchName];
//        for (Product2 prod: lstOfProduct) {
//            returnList.add(prod);
//        }
//        return returnList;

    @AuraEnabled
    public static Product2 getProductById(String id) {
        Product2 returnProd  = [select id, Name from Product2 where id = :id];
        return returnProd;
    }

    @AuraEnabled
    public static String getImagesByProduct(String id) {
        String returnImg;
        List<ProductPhotos__c> tempLst = [select Photo__c from ProductPhotos__c where Product__c = :id];
        if(tempLst.size() == 0)
            returnImg = PageReference.forResource('Logo').getUrl();
        else {
            returnImg = 'https://computershopapp-dev-ed--c.eu8.content.force.com' + tempLst[0].Photo__c.substringBetween('src="/externaluser', '">').replace('&amp;', '&');
            if (returnImg.contains('alt')) {
                returnImg = returnImg.substring(0, returnImg.lastIndexOf('" alt'));
            }
        }
        return returnImg;
    }

    @AuraEnabled
    public static boolean isFavByProduct(String id) {
        boolean isFav = false;
        String userId = UserInfo.getUserId();
        List<FavoriteProduct__c> favLst = new List<FavoriteProduct__c>();
        favLst = [select id from FavoriteProduct__c where Product__c = :id AND User__c = :userId];
        if(favLst.isEmpty())
            isFav = false;
        else {
            isFav = true;
        }
        return isFav;
    }

    @AuraEnabled
    public static double getRating(String id) {
        double returnRat = 0.0;
        integer i = 0;
        List<Review__c> ratLst = [select rating__c from Review__c where Product__c = :id];
        if(ratLst.isEmpty())
            returnRat = 0.0;
        else {
            for(Review__c rev : ratLst) {
                returnRat += rev.Rating__c;
                i++;
            }
            returnRat = returnRat/(double)i;
        }
        return returnRat;
    }

    @AuraEnabled
    public static decimal getPrice(String id) {
        decimal returnPrice = 0.0;
        integer i = 0;
        String pricebookId = [select id from Pricebook2 where isActive = true AND name <> 'Standard'].get(0).Id;
        returnPrice = [select UnitPrice from PricebookEntry where pricebook2id = :pricebookId AND product2id = :id].get(0).UnitPrice;
        return returnPrice;
    }

    @AuraEnabled
    public static List<String> getAllImages(String id) {
        List<String> returnImg = new List<String>();
        String tempImg;
        List<ProductPhotos__c> tempLst = [select Photo__c from ProductPhotos__c where Product__c = :id];
        for(ProductPhotos__c prod : tempLst) {
            tempImg = 'https://computershopapp-dev-ed--c.eu8.content.force.com' + prod.Photo__c.substringBetween('src="/externaluser', '">').replace('&amp;', '&');
            if(tempImg.contains('alt')) {
                tempImg = tempImg.substring(0, tempImg.lastIndexOf('" alt'));
            }
            returnImg.add(tempImg);
            //.substringBetween('src="', '">')
        }
        return returnImg;
    }

    @AuraEnabled
    public static void addToFavorites(String id) {
        String userId = UserInfo.getUserId();
        List<FavoriteProduct__c> existCheck = new List<FavoriteProduct__c>();
        existCheck = [select id from FavoriteProduct__c where Product__c = :id AND User__c = :userId];
        if(!existCheck.isEmpty())
            return;
        FavoriteProduct__c newFav = new FavoriteProduct__c();
        newFav.User__c = userId;
        newFav.Product__c = id;
        upsert newFav;
    }

    @AuraEnabled
    public static FavoriteProduct__c removeFromFavorites(String id) {
        String userId = UserInfo.getUserId();
        FavoriteProduct__c newFav = [select id from FavoriteProduct__c where Product__c = :id AND User__c = :userId].get(0);
        delete newFav;
        return newFav;
    }

    @AuraEnabled
    public static List <FavoriteProduct__c> fetchFavoriteProduct(String searchName) {
        List <FavoriteProduct__c> returnList = new List <FavoriteProduct__c> ();
        searchName = '%' + searchName + '%';
        String userId = UserInfo.getUserId();
        List <FavoriteProduct__c> lstOfProduct = [select User__c, Product__c from FavoriteProduct__c where Product__r.name LIKE :searchName AND User__c = :userId];
        for (FavoriteProduct__c prod: lstOfProduct) {
            returnList.add(prod);
        }
        System.debug(returnList);
        return returnList;
    }

    public class ProductWrapper {
        @AuraEnabled public Product2 prod { get; set; }
        @AuraEnabled public String photo { get; set; }
        @AuraEnabled public boolean isFav { get; set; }
        @AuraEnabled public double rating { get; set; }
        @AuraEnabled public List<String> stars { get; set; }
        @AuraEnabled public decimal price { get; set; }

        public ProductWrapper() {
            prod = new Product2();
            photo = '';
            isFav = false;
            rating = 0.0;
            stars = new List<String>();
            price = 0.0;
        }
    }

}

