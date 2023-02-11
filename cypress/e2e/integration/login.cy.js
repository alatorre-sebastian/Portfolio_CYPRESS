describe('Login with default user',()=>{
    it('should fill login form and redirect to homepage',()=>{
        cy.visit("/");

        //Dentro de la carpeta fixtures iran todos los IU que usaremos
        //Esto es una buena practica ya que cuando el proyecto es muy grande es mas facil hacer un cambio,
        //si los programadores hacen un cambio en las etiquetas, es mas practico ir a nuestro archivo index.json
        //y cambiar la etiqueta, de otro modo si usamos la misma etiqueta cy.get('#email') por ejemplo
        // al haber un cambio seria mucho mas trabajo cambiar todo

        //En este caso estamos diciendo que vaya a la carpeta fixture, archivo index
        //y que me traiga index.emailbox, en este caso es ('#email')
        
        //Este codigo funcionaria perfectamente con cy.get('#email').type("....")
        //pero lo hacemos de este modo para generar una buena practica
        cy.fixture("index").then((index)=>{ 
            cy.get(index.emailBox).type("admin@admin.com");
            cy.get(index.passBox).type("admin123");
            cy.get(index.submitBtn).click();
        }) 
    })

});

describe('Login without default user',()=>{
    it('should not let you login',()=>{
        cy.visit("/");
        cy.fixture("index").then((index)=>{ 
            cy.get(index.emailBox).type("thisIsATest@gmail.com");
            cy.get(index.passBox).type("testing123123");
            cy.get(index.submitBtn).click();
            cy.get(index.badCred).contains("Bad credentials! Please try again! Make sure that you've registered.")

        }) 
    })

});


