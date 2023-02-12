
describe('Shopping Cart Page',()=>{
    beforeEach(() => {
        cy.visit("/");
        cy.fixture("index").then((index)=>{ 
            cy.get(index.emailBox).type("admin@admin.com");
            cy.get(index.passBox).type("admin123");
            cy.get(index.submitBtn).click();
        }) 
      
      });
    it('Should add, remove, be visible',()=>{
        //Agregar al carrito
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.addCart1).click();
            cy.get(shopping.addCart2).click();
            cy.get(shopping.addCart3).click();
            cy.get(shopping.addCart4).click();
            cy.get(shopping.addCart5).click();
        })
        //Visibles en el carrito
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.cartItem1).should('be.visible');
            cy.get(shopping.cartItem2).should('be.visible');
            cy.get(shopping.cartItem3).should('be.visible');
            cy.get(shopping.cartItem4).should('be.visible');
            cy.get(shopping.cartItem5).should('be.visible');
        })
        //Agregar cantidad
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.qty1).clear().type('10').trigger('change');
            cy.get(shopping.qty2).clear().type('10').trigger('change');
            cy.get(shopping.qty3).clear().type('10').trigger('change');
            cy.get(shopping.qty4).clear().type('10').trigger('change');
            cy.get(shopping.qty5).clear().type('10').trigger('change');
        })
        //Borrar elementos
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.removeBtn1).click();
            cy.get(shopping.removeBtn1).click();
            cy.get(shopping.removeBtn2).click();
        })
    });
});

describe('Shipping Page',()=>{
    beforeEach(() => {
        cy.visit("/");
        cy.fixture("index").then((index)=>{ 
            cy.get(index.emailBox).type("admin@admin.com");
            cy.get(index.passBox).type("admin123");
            cy.get(index.submitBtn).click();
        }) 
      
      });
    it('Should let you proceed to payment HAPPY PATH',()=>{
        cy.fixture("shopping").then((shopping)=>{ 
            cy.get(shopping.addCart1).click();
            cy.get(shopping.payBtn).click();
        });  

        cy.fixture("shipping").then((shipping)=>{ 
            cy.get(shipping.phoneNumber).click().type("555-55-55");
            cy.get(shipping.street).click().type("Fake street avenue");
            cy.get(shipping.city).click().type("Ensenada");
            cy.get(shipping.country).select("Mexico");
        }); 

    });
});