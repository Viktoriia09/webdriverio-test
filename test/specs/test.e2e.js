/// <reference types="@wdio/globals/types" />
/// <reference types="@wdio/mocha-framework" />

describe('My Login application', () => {
    it('Task for QA5 ', async () => {
        //-----Login-----
        browser.url('https://www.saucedemo.com/inventory.html');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        browser.pause(4000);

        //-----Step 1. Add to cart-----
        console.log('//-----Step 1. Add to cart-----');
        const productName_step1 = await $('.inventory_item_name').getText();
        const productPrice_step1 = await $('.inventory_item_price').getText();
        console.log('productName_step1 = ', productName_step1);
        console.log('productPrice_step1 = ', productPrice_step1);

        await $('#add-to-cart-sauce-labs-backpack').click();
        const cartNumber = await $('.shopping_cart_badge').getText();
        console.log('cartNumber is:', cartNumber);
        await expect($('.shopping_cart_badge')).toHaveText('1');
        
        //-----Step 2. Click on the "Cart" button-----
        console.log('-----Step 2. Click on the "Cart" button-----');
        await $('#shopping_cart_container').click()
        await expect($('.shopping_cart_badge')).toHaveText('1');

        const productName_cartPage = await $('.inventory_item_name').getText();
        const productPrice_cartPage = await $('.inventory_item_price').getText();
        console.log('productName_cartPage =', productName_cartPage);
        console.log('productPrice_cartPage =', productPrice_cartPage);
        await expect(productName_cartPage).toEqual(productName_step1);
        await expect(productPrice_cartPage).toEqual(productPrice_step1);
        
        //-----Step 3. Click on the "Checkout" button-----
        console.log('-----Step 3. Click on the "Checkout" button-----');
        await $('#checkout').click();
        await expect($('.checkout_info_wrapper')).toBeDisplayed();
        /*const form = await $('.checkout_info_wrapper');
        await form.waitForDisplayed({ timeout: 500 });
        await expect(form).toBeDisplayed(); */

        //-----Step 4. Fill the "First Name" field with valid data-----
        console.log('-----Step 4. Fill the "First Name" field with valid data-----');
        const firstName = await $('[name="firstName"]');
        await firstName.setValue('Viktoriia');
        //await expect(firstName).toHaveValue('Viktoriia');
        const typedFirstName = await firstName.getValue();
        console.log('typedFirstName :', typedFirstName);
        expect(typedFirstName).toEqual('Viktoriia');

        //-----Step 5. Fill the "Second Name" field with valid data-----
        console.log('-----Step 5. Fill the "Second Name" field with valid data-----');
        const lastName = await $('#last-name');
        await lastName.setValue('Pechenkina');

        const typedLastName = await lastName.getValue();
        console.log('lastname:', typedLastName);
        if (typedLastName !== 'Pechenkina') {
            throw new Error(`Expected "Pechenkina", but got "${typedLastName}" `)
        }

        //-----Step 6. Fill the "Postal Code" field with valid data-----
        console.log('-----Step 6. Fill the "Postal Code" field with valid data-----');
        const postalCode = await $('#postal-code');
        await postalCode.setValue('12345');
        //await expect(postalCode).toHaveValue('12345');
        const typet_PostCode = await postalCode.getValue();
        console.log('typet_PostCode:', typet_PostCode);
        expect(typet_PostCode).toEqual('12345');
 
        //-----Step 7. Click on the "Continue" button-----
        console.log('-----Step 7. Click on the "Continue" button-----');
        await $('input#continue').click();
        await expect($('#checkout_summary_container')).toBeDisplayed();
        await expect($('.inventory_item_name')).toBeDisplayed();

        const productName_overviewPage = await $('.inventory_item_name').getText();
        const productPrice_overviewPage = await $('.inventory_item_price').getText();

        console.log('productName_overviewPage', productName_overviewPage);
        console.log('productPrice_overviewPage', productPrice_overviewPage);
        await expect(productName_overviewPage).toEqual(productName_step1);
        await expect(productPrice_overviewPage).toEqual(productPrice_step1);

        //-----Step 8. Click on the "Finish" button----- 
        console.log('-----Step 8. Click on the "Finish" button----- ');
        await $('button#finish').click();
        browser.pause(8000);
        await expect($('.checkout_complete_container')).toBeDisplayed();
        const headerText = await $('.complete-header').getText();
        console.log('Header text:', headerText);
        expect(headerText).toEqual('Thank you for your order!');

        //-----Step 9. Click on the "Back Home" button-----
        console.log('-----Step 9. Click on the "Back Home" button-----');
        await $('#back-to-products').click();
        await expect($('#inventory_container')).toBeDisplayed();

    })
})

