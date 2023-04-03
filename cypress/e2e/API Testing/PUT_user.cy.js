describe('Updating user information', () => {
    let randomUser = ""
    let testEmail = ""
    it('POST method for create user',()=>{
        //Email random
        const emailCharacters = "ABCDFGHIJKLMNOPQRSTUVWXYTZabcdefghijklmnopqrstuvwxyz"
        for (let i = 0; i < 10; i++) {
            randomUser += emailCharacters.charAt(Math.floor(Math.random() * emailCharacters.length));
        }
        testEmail = `${randomUser}@gmail.com`
        
        //Crear nuevo usuario
        // Crear un nuevo usuario
        const newUser = {
            "name": "Nombre de pruebaaa",
            "email": testEmail,
            "gender": "male",
            "status": "active"
        }

        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization : "Bearer e95b29622fd6f1a95689bf6985b6aa4532d8abe4980ec6ce6a893c7c0d5f2e63"
            },
            body: newUser

        }).then((res)=>{
            //201 Significa que los datos fueron creados
            expect(res.status).to.eq(201)
            //Usamos deep para hacegurarnos que objeto res.body incluya todas las propiedades y valores del objeto newUser
            expect(res.body).to.deep.include(newUser)
        }).then((res)=>{
            cy.log("---------------------Update with PUT method---------------------")
            const userId = res.body.id
            cy.log("User id: " + userId)
            const updatedUser = {
                "name": "Nombre de prueba actualizado",
                "email": "corre@actualizado1313",
                "gender": "male",
                "status": "active"
            }
            cy.request({
                method: "PUT",
                url: "https://gorest.co.in/public/v2/users/"+userId,
                headers: {
                    Authorization : "Bearer e95b29622fd6f1a95689bf6985b6aa4532d8abe4980ec6ce6a893c7c0d5f2e63"
                },
                body:  updatedUser
                    

            }).then((res)=>{
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('id',userId)
                expect(res.body).to.deep.include(updatedUser)
            })
        })
    });
});