describe('Check weather information', () => {
    it('Get weather information for cities', () => {
        var cities = ["Los Angeles", "New York", "Miami", "Chicago", "Seattle"];
        cities.forEach((city) => {
            cy.request({
                method: 'GET',
                url: "http://api.weatherstack.com/current?access_key=ab97abc5b6bc903ff2008ca5c1ab2bf9&query=" + city,
            }).then((res)=>{
                const name_city = res.body.location.name;
                cy.request({
                    method: 'GET',
                    url: "http://api.weatherstack.com/current?access_key=ab97abc5b6bc903ff2008ca5c1ab2bf9&query=" + name_city,
                }).then((res)=>{
                    expect(res.status).to.eq(200);
                    expect(res.body.location).to.have.property('name', name_city);
                })
            })
        })
    });
});