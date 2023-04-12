describe('Multiple actions',()=>{
    beforeEach(() => {
        cy.visit('https://testautomationpractice.blogspot.com/')
      })
    it('Should open a new tab',()=>{
        //En este caso elimnimos el atributo target, ya que originalmente esta en blanck, por lo que abriria otra pagina
        //Cypress no pude manejar multiples tabs, por esta razon eliminamos el atributo
        cy.get('#Wikipedia1_wikipedia-search-input').click().type('cars')
        cy.get('.wikipedia-search-button').click()
        cy.get('#Wikipedia1_wikipedia-search-results > :nth-child(1) > a').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'https://en.wikipedia.org/wiki/Car')
        cy.go('back');
        //cy.get('#Wikipedia1_wikipedia-search-results > :nth-child(1) > a').should('have.attr','target','_blank').then((newtab)=>{
         //   if (newtab){
            //    cy.get('#Wikipedia1_wikipedia-search-results > :nth-child(1) > a').click()
            //    cy.closeTab() 
            // }
        //})
    })
    it('Should popup alert after click',()=>{
        cy.get('button').contains('Click Me').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.contains('Press a button!')
          })
        cy.get('#demo').contains('You pressed OK!')
    })

    it('Date picker',()=>{
        cy.get('#datepicker').click()
        cy.get('.ui-datepicker-next > .ui-icon').click()
        cy.get(':nth-child(2) > :nth-child(3) > .ui-state-default').click()

    })
    
    it('Select Menu',()=>{

        cy.log("------Speeds-----")
        cy.get('#speed').select('Slower')
        cy.get('#speed').select('Slow')
        cy.get('#speed').select('Medium')
        cy.get('#speed').select('Fast')
        cy.get('#speed').select('Faster')

        cy.log("------Files-----")
        cy.get('#files').select('TXT file')
        cy.get('#files').select('PDF file')
        cy.get('#files').select('DOC file')
        cy.get('#files').select('Other file')

        cy.log("------Numbers-----")
        cy.get('#number').select('1')
        cy.get('#number').select('2')
        cy.get('#number').select('3')
        cy.get('#number').select('4')
        cy.get('#number').select('5')

        cy.log("------Products-----")
        cy.get('#products').select('Google')
        cy.get('#products').select('Yahoo')
        cy.get('#products').select('Iphone')
        cy.get('#products').select('Bing')

        cy.log("------Animals-----")
        cy.get('#animals').select('Cat')
        cy.get('#animals').select('Baby Cat')
        cy.get('#animals').select('Big Baby Cat')
        cy.get('#animals').select('Avatar')
    })
    it('Text Labels',()=>{
        const labels = ["Message_12",
            "Message-123",
            "Message $ 1234",
            "Message **** 12345",
            "Message &&&123456",
            "Message#### 1234567"]
            labels.forEach(function (value) {
                cy.get('#Text1 > .widget-content')
                  .children()
                  .should('contain', value)
            })
    })
    it('XPATH',()=>{
        cy.xpath("//empid[text()='101']")
        cy.xpath("//empid[text()='101']/following-sibling::name[contains(text(),'David')]")
        cy.xpath("//empid[text()='101']/following-sibling::designation[contains(text(),'Senior Engineer')]")
        cy.xpath("//empid[text()='101']/following-sibling::email[contains(text(),'david@myemail.com')]")

        cy.xpath("//empid[text()='102']")
        cy.xpath("//empid[text()='102']/following-sibling::name[contains(text(),'John')]")
        cy.xpath("//empid[text()='102']/following-sibling::designation[contains(text(),'DBA Engineer')]")
        cy.xpath("//empid[text()='102']/following-sibling::email[contains(text(),'john@email.com')]")

        cy.xpath("//empid[text()='103']")
        cy.xpath("//empid[text()='103']/following-sibling::name[contains(text(),'Marry')]")
        cy.xpath("//empid[text()='103']/following-sibling::designation[contains(text(),'Application Developer')]")
        cy.xpath("//empid[text()='103']/following-sibling::email[contains(text(),'marry@email.com')]")
    })

    it('iFrame form',()=>{
        //Al ser un iframe usamos cy.enter y getBody, especificons de cypres-iframe
        //El form alcanzo su capacidad maxima por lo que no nos permite subir mas archivos
        cy.enter('#frame-one1434677811').then(getBody => {
            getBody().find('#RESULT_TextField-1').should('be.visible').click().type('Juan')
            getBody().find('#RESULT_TextField-2').should('be.visible').click().type('Lopez')
            getBody().find('#RESULT_TextField-3').should('be.visible').click().type('123456789')
            getBody().find('#RESULT_TextField-4').should('be.visible').click().type('Mexico')
            getBody().find('#RESULT_TextField-5').should('be.visible').click().type('Ensenada')
            getBody().find('#RESULT_TextField-6').should('be.visible').click().type('juan@email.com')
            getBody().find('#RESULT_RadioButton-7_0').first().check({force: true})
            getBody().find('[type="checkbox"]').check({force:true})
            getBody().find('[type="checkbox"]').uncheck({force:true})
            getBody().find('.drop_down').select('Morning')
            getBody().find('.file_upload').selectFile('testFile.txt')
            getBody().find('#FSsubmit').should('be.visible')
  
        })
    })

    it('Double click',()=>{
        let fild1
        cy.get('#HTML10 > .widget-content > button').dblclick()
        cy.get('input[value="Hello World!"]').invoke('val').then(textFild1 =>{
            fild1 = textFild1
            return fild1
        })
        cy.get('input[value="Hello World!"]').invoke('val').then(textFild2 =>{
            expect(textFild2).to.equal(fild1)
        })


    })
    it('Drag and Drop',()=>{
        cy.get('#draggable').drag('#droppable',{force:true})
        cy.get('#droppable > p').should('have.text','Dropped!')
    })

    it('Slide',()=>{
        cy.get('.ui-slider-handle').invoke('attr','style','left: 50%;')

    })

    it('Resizable',()=>{
       
        cy.get('#resizable').realMouseDown({ position: "right" }).realMouseMove(100,250).realMouseUp()//50,300


    })

    it('Get element from HTML table',()=>{
        cy.get('table[name="BookTable"]').contains('td','Javascript')
        cy.get('table[name=BookTable] > tbody > tr:nth-child(4) > td:nth-child(4)').contains('300')
    })
    /*
    it('QR code/Barcode ',()=>{
        //Utilizamos @zxing/library @zxing/browser
        //y se implemento un custom command , para leer los qr y barcodes
        cy.log('======Barcode 1=====')
        cy.get('[src="https://3.bp.blogspot.com/-xaeByLfXiFk/XCxZ33hrgKI/AAAAAAAAPPI/5d4O-mf27lEQKtSiiBjx3UgtxSV0yJUpwCLcBGAs/s1600/barcode.gif"]')
        .readCode().should('have.property', 'text', 'ABC-abc-123');
        cy.log('======Barcode 2=====')
        cy.get('[src="https://4.bp.blogspot.com/-_Bz0eHUicUY/XCxnkToPvQI/AAAAAAAAPPU/055m3a6VabUzUlwlzwwipQA-MImBuxq_wCLcBGAs/s1600/barcode2.gif"]')
        .readCode().should('have.property', 'text', 'Hi this is Pavan');
        cy.log('======Qr code=====')
        cy.get('#HTML4 > .widget-content > img').readCode().should('have.property', 'text', 'Welcome to Selenium');
    });
    */
});
        

