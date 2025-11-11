export default class CartPage{
    
    get shoppingCartBadge() {
        return $('.shopping_cart_badge');
    }
    async getNumberOfProduct() {
        return await this.shoppingCartBadge.getText();
    }

    async verifyNumberProduct(number) {
        expect(await this.getNumberOfProduct).toEqual(number);
    }

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

    async verifyProduct(name, price) {
        expect(await this.getProductName()).toEqual(name);
        expect(await this.getProductPrice()).toEqual(price);
    }

    get checkOut() {
        return $('#checkout');
    }
    async clickCheckoutButton() {
        return await this.checkOut.click(); 
    }

}