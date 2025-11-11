import LoginPage from "../page/login.page.js";
import MainPage from "../page/main.page.js";
import CartPage from "../page/cart.page.js";
import CheckoutPage from "../page/checkout.page.js";
import OverviewPage from "../page/overview.page.js";
import CheckoutCompletePage from "../page/сheckoutComplete.page.js";
const loginPage = new LoginPage();
const mainPage = new MainPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const overViewPage = new OverviewPage();
const checkoutCompletePage = new CheckoutCompletePage();
//const loginPage = require('../page/login.page.js');
//const mainPage = require('../page/main.page.js');

describe('My Login application', () => {
    it('Task for QA5 ', async () => {

        //-----Login-----
        console.log('-----Login-----');
        browser.url('https://www.saucedemo.com');
        await loginPage.setUserNameLogin('standard_user');
        await loginPage.setPasswordLogin('secret_sauce');
        await loginPage.clickLoginButton();
        
        //-----Step 1. Add to cart-----
        console.log('//-----Step 1. Add to cart-----');
        const mainProductName = await mainPage.getProductName();
        const mainProductPrice = await mainPage.getProductPrice();
        console.log('mainProductName', mainProductName);
        console.log('mainProductPrice', mainProductPrice);
        await mainPage.clickAddToCartButton();
        mainPage.verifyNumberProduct(1);
        
        //-----Step 2. Click on the "Cart" button-----
        console.log('-----Step 2. Click on the "Cart" button-----');
        await mainPage.clickOnCart();
        cartPage.verifyNumberProduct(1);
        cartPage.verifyProduct(mainProductName, mainProductPrice);

        //-----Step 3. Click on the "Checkout" button-----
        console.log('-----Step 3. Click on the "Checkout" button-----');
        cartPage.clickCheckoutButton();
        await expect(checkoutPage.checkoutInfoWrapper).toBeDisplayed();

        //-----Step 4. Fill the "First Name" field with valid data-----
        console.log('-----Step 4. Fill the "First Name" field with valid data-----');
        await checkoutPage.setFirstName('Viktoriia');
        await checkoutPage.verifyFirstName('Viktoriia');
        
        //-----Step 5. Fill the "Second Name" field with valid data-----
        console.log('-----Step 5. Fill the "Second Name" field with valid data-----');
        await checkoutPage.setLastName('Pechenkina');
        await checkoutPage.verifyLastName('Pechenkina');

        //-----Step 6. Fill the "Postal Code" field with valid data-----
        console.log('-----Step 6. Fill the "Postal Code" field with valid data-----');
        await checkoutPage.setPassword('12345asdfg');
        await checkoutPage.verifyPassword('12345asdfg');
        
        //-----Step 7. Click on the "Continue" button-----
        console.log('-----Step 7. Click on the "Continue" button-----');
        await checkoutPage.clickContinueButton();
        await expect(overViewPage.checkoutSummaryContainer).toBeDisplayed();
        await expect(overViewPage.itemName).toBeDisplayed();

        await overViewPage.getProductName;
        await overViewPage.getProductPrice;
        await overViewPage.verifyProduct(mainProductName, mainProductPrice);
        
        //-----Step 8. Click on the "Finish" button----- 
        console.log('-----Step 8. Click on the "Finish" button----- ');
        await overViewPage.clickFinishButton();     
        await expect(checkoutCompletePage.checkoutContainer).toBeDisplayed();
        await checkoutCompletePage.getCompleteText();
        await checkoutCompletePage.verifyCompleteText('Thank you for your order!');
       
        //-----Step 9. Click on the "Back Home" button-----
        console.log('-----Step 9. Click on the "Back Home" button-----');   
        await checkoutCompletePage.clickBackHomeButton();
        await expect(await mainPage.inventoryContainer).toBeDisplayed();

    })
})