 class OverviewPage{

    get checkoutSummaryContainer() { return $('#checkout_summary_container'); }
    get itemName() { return $('.inventory_item_name'); }
    get productName() { return $('.inventory_item_name'); }
    get productPrice() { return $('.inventory_item_price'); } 
    get finishButton() { return $('button#finish'); }
     
    async getProductName() {
        return await this.productName.getText();
    }
    async getProductPrice() {
        return await this.productPrice.getText();
    }
    async verifyProduct(name, price) {
        expect(await this.getProductName()).toEqual(name);
        expect(await this.getProductPrice()).toEqual(price);
    }
    async clickFinishButton() {
        await this.finishButton.click();
    } 
}
export default new OverviewPage()