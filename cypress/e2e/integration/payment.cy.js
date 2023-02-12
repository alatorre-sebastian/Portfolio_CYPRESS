describe('Shipping Page',()=>{
    beforeEach(() => {
        cy.visit("/");
        cy.fixture("index").then((index)=>{ 
            cy.get(index.emailBox).type("admin@admin.com");
            cy.get(index.passBox).type("admin123");
            cy.get(index.submitBtn).click();
        })
          
      
      });
    it('Should let user proceed to payment HAPPY PATH',()=>{
        cy.fixture("shipping").then((shipping)=>{ 
            cy.get(shipping.phoneNumber).click().type("555-55-55");
            cy.get(shipping.street).click().type("Fake street avenue");
            cy.get(shipping.city).click().type("Ensenada");
            cy.get(shipping.country).select("Mexico");
            cy.get(shipping.submitOrderBtn).click();
            cy.get(shipping.successOrderMessage).contains("Congrats!")
        }); 
    });

    it('Should not let user submir order with wrong form parameters',()=>{
        cy.fixture("shipping").then((shipping)=>{ 
            cy.get(shipping.phoneNumber).click().type("@.$%^^&*()testing");
            cy.get(shipping.street).click().type("Fake street avenue");
            cy.get(shipping.city).click().type("!@!@#$%^&*..testing");
            cy.get(shipping.country).select("Mexico");
            cy.get(shipping.submitOrderBtn).should("be.disabled");
        });
    });

    it.only('Should charge you the right price',()=>{ 
        let price1
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.addCart1).click();
            cy.get('.cart-total-price').invoke("text").then((price) => {
                price1 = price
                return price1
            })  
            cy.get(shopping.payBtn).click();
        }); 
        cy.fixture("shipping").then((shipping)=>{ 
            cy.get(shipping.phoneNumber).click().type("555-55-55");
            cy.get(shipping.street).click().type("Fake street avenue");
            cy.get(shipping.city).click().type("Ensenada");
            cy.get(shipping.country).select("Mexico");
            cy.get(shipping.submitOrderBtn).click();
            cy.get(shipping.successOrderMessage).contains("Congrats!")
            //cy.get(shipping.finalPrice).invoke("text").should("eq",price1)
            cy.get(shipping.finalPrice).invoke("text").then((message) => {   
               expect(message).to.eq(price1)
            })
        }); 
    });
});