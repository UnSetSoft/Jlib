

$().load(() => {
      $("#hot").addClass("kg-primary")
      $('#hot').event('click', async () => {

            $("#hot").removeClass("kg-primary").addClass("pkg-primary")

            const { tag } = $('#hot').getDataSet()

            $('#coffe').removeChildrens()

            const r = await $().remote(`https://api.sampleapis.com/coffee/${tag}`).get();
            
            r.map(r => {
                  $('#coffe').insertHTML(`<li><b>${r.title}:</b> ${r.description}</li>`)
            })
            
            $('#hot').disableElement(true)

            $('#iced').disableElement(false)

            $('#clear').disableElement(false)

      })

      $('#iced').event('click', async () => {

            const { tag } = $('#iced').getDataSet()

            $('#coffe').removeChildrens()

            const r = await $().remote(`https://api.sampleapis.com/coffee/${tag}`).get();
            
            r.map(r => {
                  $('#coffe').insertHTML(`<li><b>${r.title}:</b> ${r.description}</li>`)
            })
            
            $('#iced').disableElement(true)
            $('#hot').disableElement(false)
            $('#clear').disableElement(false)
      })

      $('#clear').event('click', async () => {

            $('#coffe').removeChildrens()
          
            
            $('#iced').disableElement(false)
            $('#hot').disableElement(false)
            $('#clear').disableElement(true)
      })


      
      
      console.log($('button').getElements())
})