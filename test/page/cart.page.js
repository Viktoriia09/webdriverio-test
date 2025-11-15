class CartPage{
    
    get shoppingCartBadge() { return $('.shopping_cart_badge'); }
    get productName() { return $('.inventory_item_name');}
    get productPrice() { return $('.inventory_item_price'); }  
    get checkOut() { return $('#checkout');}    
    get cartItems() { return $$('#cart_contents_container.cart_list.cart_item');}
    get cartContentsContainer() { return $('#cart_contents_container'); }    
    
    async getNumberOfProduct() {
        return await this.shoppingCartBadge.getText();
    }
    async getProductName() {
        return await this.productName.getText();
    }
    async getProductPrice() {
        return await this.productPrice.getText();
    }
    async getCartItemCount() {
        const items = await this.cartItems;
        return items.length;
    }
    async verifyNumberProduct(number) {
        const actual = await this.getNumberOfProduct();
        expect(actual).toEqual(String(number));
    }
    async verifyProduct(name, price) {
        expect(await this.getProductName()).toEqual(name);
        expect(await this.getProductPrice()).toEqual(price);
    }
    async clickCheckoutButton() {
        return await this.checkOut.click(); 
    }
    
}
export default new CartPage()