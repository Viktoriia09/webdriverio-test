export default class CheckoutCompletePage{

    get checkoutContainer() {
        return $('.checkout_complete_container');
    }
    get completeText() {
        return $('.complete-header');
    }
    async getCompleteText() {
        return await this.completeText.getText();
    }
    async verifyCompleteText(text) {
        expect(await this.getCompleteText()).toEqual(text);
    }
    get backHomeButton() {
        return $('#back-to-products');
    }
    async clickBackHomeButton() {
        await this.backHomeButton.click()
    }
}