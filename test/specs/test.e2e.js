import loginPage from "../page/login.page.js";
import mainPage from "../page/main.page.js";
import cartPage from "../page/cart.page.js";
import checkoutPage from "../page/checkout.page.js";
import overViewPage from "../page/overview.page.js";
import checkoutCompletePage from "../page/сheckoutComplete.page.js";

describe('Task for QA5', () => {

    it('ID 1 - Valid Login', async () => {

        await loginPage.openLoginPage();
        await loginPage.fillCredentials('standard_user', 'secret_sauce');
        await loginPage.clickLoginButton();

        await expect(mainPage.inventoryContainer).toBeDisplayed();
        await expect(mainPage.shoppingCart).toBeDisplayed();
        await expect(mainPage.productList).toBeDisplayed();

    })

    it('ID - 2 - Login with invalid password', async () => {
        
        await loginPage.openLoginPage();
        await loginPage.fillCredentials('standard_user', '123');
        await loginPage.clickLoginButton();
        await loginPage.checkErrorMessages('Epic sadface: Username and password do not match any user in this service');
    })

    it('ID - 3 - Login with invalid login', async () => {

        await loginPage.openLoginPage();
        await loginPage.fillCredentials('stanDard_user', 'secret_sauce');
        await loginPage.clickLoginButton();
        await loginPage.checkErrorMessages('Epic sadface: Username and password do not match any user in this service');
    })

    it('ID - 4 - Logout', async () => {
        
        await loginPage.login('standard_user', 'secret_sauce');
        mainPage.clickBurgerMenu();
        await expect(mainPage.menuList).toBeDisplayed();
        await expect(await mainPage.getMenuItemsCount()).toEqual(4);
        await mainPage.clickLogoutButton();
        await expect(loginPage.loginWrapperPage).toBeDisplayed()
        await expect(loginPage.userNameLogin).toHaveValue('')
        await expect(loginPage.passwordLogin).toHaveValue('')

    })

    it('ID - 5 - Saving the card after logout ', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await mainPage.clickAddToCartButton();
        await mainPage.verifyNumberProduct(1);
        const text = await mainPage.checkRemoveText.getText();
        console.log('text=', text);
        await expect(mainPage.checkRemoveText).toHaveText('Remove');
        
        mainPage.clickBurgerMenu();
        await expect(mainPage.menuList).toBeDisplayed();
        await expect(await mainPage.getMenuItemsCount()).toEqual(4);
        await mainPage.clickLogoutButton();
        await expect(loginPage.loginWrapperPage).toBeDisplayed()
        await expect(loginPage.userNameLogin).toHaveValue('')
        await expect(loginPage.passwordLogin).toHaveValue('')

        await loginPage.login('standard_user', 'secret_sauce');
        await expect(mainPage.inventoryContainer).toBeDisplayed();
        await mainPage.verifyNumberProduct(1);

        await expect(mainPage.checkRemoveText).toHaveText('Remove');
        await mainPage.clickCartButton();
        await expect(cartPage.cartContentsContainer).toBeDisplayed();
        await cartPage.verifyProduct(mainProductName, mainProductPrice);

    })
    it('ID-6 - ', async () => {
        
        await loginPage.login('standard_user', 'secret_sauce');
        await mainPage.clickFilterButton();
       
        await mainPage.selectSortOption('za');
        await mainPage.verifyPriceSorting('za');
        await mainPage.selectSortOption('az');
        await mainPage.verifyPriceSorting('az');
        
        await mainPage.selectSortOption('lohi');
        await mainPage.verifyPriceSorting('lohi');
        await mainPage.selectSortOption('hilo');
        await mainPage.verifyPriceSorting('hilo');
    })

    it('ID-7 - Footer Links', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(mainPage.inventoryContainer.toBeDisplayed());

        await mainPage.openLinkAndCheck(mainPage.socialTwitter, 'x.com/saucelabs');
        await mainPage.openLinkAndCheck(mainPage.socialFacebook,'https://www.facebook.com/saucelabs');
        await mainPage.openLinkAndCheck(mainPage.socialLinkedin, 'https://www.linkedin.com/company/sauce-labs/');

    })

    it('ID-8 - Valid Checkout', async () => {

        await loginPage.login('standard_user','secret_sauce');

        const mainProductName = await mainPage.getProductName();
        const mainProductPrice = await mainPage.getProductPrice();
        await mainPage.clickAddToCartButton();
        await mainPage.verifyNumberProduct(1);

        await mainPage.clickCartButton();
        await cartPage.verifyNumberProduct(1);
        await cartPage.verifyProduct(mainProductName, mainProductPrice);

        await cartPage.clickCheckoutButton();
        await expect(checkoutPage.checkoutInfoWrapper).toBeDisplayed();

        await checkoutPage.setFirstName('Viktoriia');
        await checkoutPage.verifyFirstName('Viktoriia');
        
        await checkoutPage.setLastName('Pechenkina');
        await checkoutPage.verifyLastName('Pechenkina');

        await checkoutPage.setPassword('12345asdfg');
        await checkoutPage.verifyPassword('12345asdfg');
        
        await checkoutPage.clickContinueButton();
        await expect(overViewPage.checkoutSummaryContainer).toBeDisplayed();
        await expect(overViewPage.itemName).toBeDisplayed();
        await overViewPage.getProductName;
        await overViewPage.getProductPrice;
        await overViewPage.verifyProduct(mainProductName, mainProductPrice);
        
        await overViewPage.clickFinishButton();     
        await expect(checkoutCompletePage.checkoutContainer).toBeDisplayed();
        await checkoutCompletePage.getCompleteText();
        await checkoutCompletePage.verifyCompleteText('Thank you for your order!');
       
        await checkoutCompletePage.clickBackHomeButton();
        await expect(await mainPage.inventoryContainer).toBeDisplayed();

    })

    it('ID-9 - Checkout without products', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(mainPage.inventoryContainer.toBeDisplayed());

        await mainPage.clickCartButton();
        await expect(cartPage.cartContentsContainer).toBeDisplayed();
        await expect(await cartPage.getCartItemCount()).toBe(0);
        
        await cartPage.clickCheckoutButton();
        await expect(cartPage.cartContentsContainer).toBeDisplayed();

    })
})