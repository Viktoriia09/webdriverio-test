class MainPage{

    get productName() { return $('.inventory_item_name'); }
    get productPrice() { return $('.inventory_item_price'); }
    get removeCartButton() { return $('#remove-sauce-labs-backpack'); }
    get addToCart() { return $('#add-to-cart-sauce-labs-backpack'); }
    get shoppingCarBadge() { return $('.shopping_cart_badge'); }
    get shoppingCartContainer() { return $('#shopping_cart_container'); }
    get inventoryContainer() { return $('#inventory_container'); }
    get shoppingCart() { return $('#shopping_cart_container'); }
    get productList() { return $('.inventory_list'); }
    get burgerMenu() { return $('#react-burger-menu-btn'); }
    get menuList() { return $('.bm-item-list'); }
    get menuItems() { return $$('.bm-item-list a'); }
    get logout() { return $('#logout_sidebar_link'); }
    get productNames() { return $$('.inventory_item_name'); }
    get productPrices() { return $$('div.inventory_item_price'); }
    get sortSelect() { return $('.product_sort_container');}
    get filterButton() { return $('.product_sort_container'); }
    get socialTwitter() { return $('.social_twitter'); }
    get socialFacebook() { return $('.social_facebook'); }
    get socialLinkedin() { return $('.social_linkedin'); }

    async getProductName() {
        return await this.productName.getText();
    }
    async getProductPrice() {
        return await this.productPrice.getText();
    }
    async getNumberOfProduct() {
        return await this.shoppingCarBadge.getText();
    }
    async getMenuItemsCount() {
        const items = await this.menuItems;
        return items.length;
    }    

    async clickAddToCartButton(){
        return await this.addToCart.click();
    }
    async clickRemoveCartButton() {
        return await this.removeCartButton.click();
    }
    async clickCartButton() {
        await this.shoppingCartContainer.click();
    }
    async clickBurgerMenu() {
        await this.burgerMenu.click();
    }
    async clickLogoutButton() {
        await this.logout.click()
    }
    async clickFilterButton() {
        await this.filterButton.click();
    }
    async clickSocialTwitterButton() {
        await this.socialTwitter.click();
    }
    async clickSocialFacebookButton() {
        await this.socialFacebook.click();
    }
    async clickSocialLinkedinButton() {
        await this.socialLinkedin.click();
    }

    async verifyNumberProduct(number) {
        const actual = await this.getNumberOfProduct();
        expect(actual).toEqual(String(number));
    }
    
    async selectSortOption(optionValue) {
        await this.sortSelect.selectByAttribute('value', optionValue);
    const selected = await this.sortSelect.getValue();
    expect(selected).toBe(optionValue);
    }

    async verifyNameSorting(optionValue) {
        const elements = await Promise.all(this.productNames);
        const firstName = await elements[0].getText();
        const lastName  = await elements[elements.length - 1].getText();

        if (optionValue === 'az') {
            expect(firstName <= lastName).toBe(true);
        } else if (optionValue === 'za') {
            expect(firstName >= lastName).toBe(true);
        }
    }

    async verifyPriceSorting(optionValue) {
        const elements = await this.productPrices;
        const firstPrice = parseFloat((await elements[0].getText()).replace('$',''));
        const lastPrice  = parseFloat((await elements[elements.length-1].getText()).replace('$',''));

        if (optionValue === 'lohi') {
            expect(firstPrice).toBeLessThanOrEqual(lastPrice);
        } else if (optionValue === 'hilo') {
            expect(firstPrice).toBeGreaterThanOrEqual(lastPrice);
        }
    }

    async openLinkAndCheck(element, expectedUrlPart) {
        
        await element.click();
      
        const windows = await browser.getWindowHandles();
        await browser.switchToWindow(windows[1]);
        const currentUrl = await browser.getUrl();
        
        expect(currentUrl).toContain(expectedUrlPart);
        await browser.closeWindow();
        await browser.switchToWindow(windows[0]);
    }
       
}
export default new MainPage()
