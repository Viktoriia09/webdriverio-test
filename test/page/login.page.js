export default class LoginPage{

    get userNameLogin() {
        return $('#user-name');   
    }
    async setUserNameLogin(value_userName) {
        await this.userNameLogin.addValue(value_userName);
    }

    get passwordLogin() {
        return $('#password');
    }
    async setPasswordLogin(value_password) {
        await this.passwordLogin.addValue(value_password);
    }

    get loginButton() {
        return $('#login-button');
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }

}
//module.exports = new LoginPage()