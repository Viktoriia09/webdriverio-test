export default class MainPage{

    get productName() {
        return $('.inventory_item_name');   
    }
    async getProductName() {
        return await this.productName.getText();
    }

    get productPrice() {
        return $('.inventory_item_price'); 
    }
    async getProductPrice() {
        return await this.productPrice.getText();
    }

    get addToCart() {
        return $('#add-to-cart-sauce-labs-backpack');
    }
    async clickAddToCartButton(){
        return await this.addToCart.click();
    }

    get shoppingCarBadge() {
        return $('.shopping_cart_badge');
    }
    async getNumberOfProduct() {
        return await this.shoppingCarBadge.getText();
    }

     async verifyNumberProduct(number) {
        expect(await this.getNumberOfProduct).toEqual(number);
    }

     get shoppingCartContainer() {
        return $('#shopping_cart_container');
    }

    async clickOnCart() {
        await this.shoppingCartContainer.click();
    }
    get inventoryContainer() {
        return $('#inventory_container');
    }
    

}
//module.exports = new MainPage()
