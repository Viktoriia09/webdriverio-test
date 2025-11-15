class CheckoutCompletePage{

    get checkoutContainer() { return $('.checkout_complete_container'); }
    get completeText() { return $('.complete-header'); }
    get backHomeButton() { return $('#back-to-products'); }

    async getCompleteText() {
        return await this.completeText.getText();
    }
    async verifyCompleteText(text) {
        expect(await this.getCompleteText()).toEqual(text);
    }
    async clickBackHomeButton() {
        await this.backHomeButton.click()
    }
}
export default new CheckoutCompletePage()