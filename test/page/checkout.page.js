 class CheckoutPage{

    get checkoutInfoWrapper() { return $('.checkout_info_container'); }
    get firstName() { return $('[name="firstName"]'); }
    get lastName() { return $('#last-name'); }
    get password() { return $('#postal-code'); }    
    get continueButton() { return $('input#continue'); }
     
    async setFirstName(firstName) {
        await this.firstName.addValue(firstName);
    }
    async setLastName(lastName) {
        return await this.lastName.addValue(lastName);
    }
    async setPassword(password) {
        return await this.password.addValue(password);
    } 
    async getFirstName() {
        return await this.firstName.getValue();
    }
    async getLastName() {
        return await this.lastName.getValue();
    }
    async getPassword() {
        return await this.password.getValue();
    } 
    async verifyFirstName(name) {
        expect(await this.getFirstName()).toEqual(name);
    }
    async verifyLastName(name) {
        expect(await this.getLastName()).toEqual(name);
    }
    async verifyPassword(symbols) {
        expect(await this.getPassword()).toEqual(symbols);
    }
    async clickContinueButton() {
        await this.continueButton.click();
    }
}
export default new CheckoutPage()