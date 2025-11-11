export default class OverviewPage{

    get checkoutSummaryContainer() {
        return $('#checkout_summary_container');    
    }
    get itemName() {
        return $('.inventory_item_name');
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
    get finishButton() {
        return $('button#finish');
    }
    async clickFinishButton() {
        await this.finishButton.click();
    }
    
}