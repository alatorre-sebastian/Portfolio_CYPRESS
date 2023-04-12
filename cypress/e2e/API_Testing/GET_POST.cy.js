
describe("API user test",()=>{
    let randomUser = ""
    let testEmail = ""
    it ('GET method',()=>{
        
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization : "Bearer e95b29622fd6f1a95689bf6985b6aa4532d8abe4980ec6ce6a893c7c0d5f2e63"

            }
        }).then((res)=>{
            expect(res.status).to.eq(200)//es correcta la coneccion
            expect(res.body).to.have.length(10) //largo del body (contiene 10 usuarios en este caso)
            expect(res.body[0]).to.have.property("name","Test name awesome") //el usuario en poscicion 0, lleva por nombre este 
        })

    })

    it('POST method',()=>{
        //Email random
        var pattern = "ABCDFGHIJKLMNOPQRSTUVWXYTZabcdefghijklmnopqrstuvwxyz"
        for (var i =0; i<10 ; i++)
        randomUser+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomUser + "@gmail.com"
        //
        
        let datosJson = require('../../fixtures/API.json') //creamos la variable datosJson para extrar la informacion de nuestro fixtures/ API.json
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization : "Bearer e95b29622fd6f1a95689bf6985b6aa4532d8abe4980ec6ce6a893c7c0d5f2e63"
            },
            body: {
                "name" : datosJson.name,
                "gender" : datosJson.gender,
                "email" : testEmail,
                "status" : datosJson.status
            }

        }).then((res)=>{
            expect(res.status).to.eq(201)//201 Significa que los datos fueron creados
            expect(res.body).to.have.property('name', datosJson.name)
            expect(res.body).to.have.property('email',testEmail)
            expect(res.body).to.have.property('gender',datosJson.gender)
            expect(res.body).to.have.property('status', datosJson.status)

        //Verify with get method
        }).then((res)=>{
            cy.log("---------------------Verify with get method---------------------")
            const userId = res.body.id
            cy.log("User id: " + userId)

            cy.request({
                method: "GET",
                url: "https://gorest.co.in/public/v2/users/"+userId,
                headers: {
                    Authorization : "Bearer e95b29622fd6f1a95689bf6985b6aa4532d8abe4980ec6ce6a893c7c0d5f2e63"
                }

            }).then((res)=>{
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('id',userId)
                expect(res.body).to.have.property('name', datosJson.name)
                expect(res.body).to.have.property('email',testEmail)
                expect(res.body).to.have.property('gender',datosJson.gender)


            })
        })


    })

}) 