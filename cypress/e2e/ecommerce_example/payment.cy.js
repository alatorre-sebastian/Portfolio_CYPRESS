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
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.addCart1).click();
            cy.get(shopping.payBtn).click();
        }); 
        cy.shippingForm('555555','Fake Avenue','Ensenada','Mexico')//Esta funcion se encuentra en cypress>support>commands.js
    });

    it('Should not let user submit order with wrong form parameters',()=>{
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.addCart1).click();
            cy.get(shopping.payBtn).click();
        });
        cy.shippingForm('@.$%^^&*()testing','Fake street avenue','!@!@#$%^&*..testing','Mexico') //Esta funcion se encuentra en cypress>support>commands.js
        cy.fixture("shipping").then((shipping)=>{ 
            cy.get(shipping.submitOrderBtn).should("be.disabled");
        });
    });

    it('Should charge you the right price',()=>{ 
        let price1
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.addCart1).click();
            cy.get(shopping.initialPrice).invoke("text").then((price) => {
                price1 = price
                return price1
            })  
            cy.get(shopping.payBtn).click();
        });
        cy.shippingForm('555555','Fake Avenue','Ensenada','Mexico')//Esta funcion se encuentra en cypress>support>commands.js
        //cy.get(shipping.finalPrice).trim().should("have.text",' '+price1+ ' ')
        cy.fixture("shipping").then((shipping)=>{ 
            cy.get(shipping.finalPrice).invoke('text').then((message) => {   
                expect(message.trim()).to.equal(price1)
            })
        });
    })
});