class LoginPage{

    get userNameLogin() {return $('#user-name');}
    get passwordLogin() {return $('#password');}
    get loginButton() {return $('#login-button');}
    get errorMessage() { return $('[data-test="error"]'); }
    get loginWrapperPage() {return $('.login_wrapper-inner');}
    
    async openLoginPage() { await browser.url('https://www.saucedemo.com'); }
  
    async setUserNameLogin(valueUserName) {
        await this.userNameLogin.setValue(valueUserName);
    }
    async setPasswordLogin(valuePassword) {
        await this.passwordLogin.setValue(valuePassword);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
    async getErrorIconForField() {
        return await $$('svg[data-icon="times-circle"]');
    }
    async getborderColor(fieldID) {
        return await $(`#${fieldID}`).getCSSProperty('border-bottom-color');
    }

    async login(username, password) {
        await this.openLoginPage();
        await this.setUserNameLogin(username);
        await this.setPasswordLogin(password);
        await this.clickLoginButton();
    }

    async fillCredentials(username, password) {
        await this.userNameLogin.setValue(username);
        await expect(this.userNameLogin).toHaveValue(username);

        await this.passwordLogin.setValue(password);
        await expect(this.passwordLogin).toHaveValue(password);
        await expect(this.passwordLogin).toHaveAttribute('type', 'password');
    }
    
    async checkErrorMessages(expectedMessage) {
        
        const loginErrorIcon = await this.getErrorIconForField();
        await expect(loginErrorIcon[0]).toBeDisplayed();
        await expect(loginErrorIcon[1]).toBeDisplayed();
    
        const borderColorUserField = await this.getborderColor('user-name');
        expect(borderColorUserField.value).toBe('rgba(226,35,26,1)');
       
        const borderColorPassword = await this.getborderColor('password');
        expect(borderColorPassword.value).toBe('rgba(226,35,26,1)');

        if (expectedMessage) {
            await expect(this.errorMessage).toHaveText(expectedMessage);
        }
    }

}
export default new LoginPage()