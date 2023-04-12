describe('DELETE user', () => {
    let randomUser = ""
    let testEmail = ""

    it('should delete a user', () => {
        // Generar un correo electrónico aleatorio
        const emailCharacters = "ABCDFGHIJKLMNOPQRSTUVWXYTZabcdefghijklmnopqrstuvwxyz"
        for (let i = 0; i < 10; i++) {
            randomUser += emailCharacters.charAt(Math.floor(Math.random() * emailCharacters.length));
        }
        testEmail = `${randomUser}@gmail.com`

        // Crear un nuevo usuario
        const newUser = {
            "name": "Nombre de prueba para metodo DELETE v2",
            "email": testEmail,
            "gender": "male",
            "status": "active"
        }
        //Fin de variables ---
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: "Bearer e95b29622fd6f1a95689bf6985b6aa4532d8abe4980ec6ce6a893c7c0d5f2e63"
            },
            body: newUser
        }).then((res) => {
            // Verificar que el usuario se ha creado correctamente
            expect(res.status).to.eq(201)
            //Usamos deep para hacegurarnos que objeto res.body incluya todas las propiedades y valores del objeto newUser
            expect(res.body).to.deep.include(newUser)

            // Eliminar el usuario creado
            const userId = res.body.id
            cy.request({
                method: "DELETE",
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                headers: {
                    Authorization: "Bearer e95b29622fd6f1a95689bf6985b6aa4532d8abe4980ec6ce6a893c7c0d5f2e63"
                }
            }).then((res) => {
                // Verificar que el usuario se ha eliminado correctamente
                expect(res.status).to.equal(204)
            })
        })
    })
})
