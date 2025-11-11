export default class CheckoutPage{

    get checkoutInfoWrapper() {
        return $('.checkout_info_wrapper');
    }

    get firstName() {
        return $('[name="firstName"]');
    }

    async setFirstName(firstName) {
        await this.firstName.addValue(firstName);
    }
  
    async getFirstName() {
        return await this.firstName.getValue();
    }

    async verifyFirstName(name) {
        expect(await this.getFirstName()).toEqual(name);
    }
    //---------LAST NAME -----------------
    get lastName() {
        return $('#last-name');
    }
    async setLastName(lastName) {
        return await this.lastName.addValue(lastName);
    }
    async getLastName() {
        return await this.lastName.getValue();
    }
    async verifyLastName(name) {
        expect(await this.getLastName()).toEqual(name);
    }
    //-------PASSWORD--------------------
    get password() {
        return $('#postal-code');
    }
    async setPassword(password) {
        return await this.password.addValue(password);
    }
    async getPassword() {
        return await this.password.getValue();
    }
    async verifyPassword(symbols) {
        expect(await this.getPassword()).toEqual(symbols);
    }

    get continueButton() {
        return $('input#continue');
    }
    async clickContinueButton() {
        await this.continueButton.click();
    }
}