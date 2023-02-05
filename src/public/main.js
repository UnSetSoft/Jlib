_k().load(() => {
       _k('#hot').event('click', async () => {
            
            _k("#hot").removeClass("kg-primary")

            const { tag } = _k('#hot').getDataSet()

            _k('#coffe').removeChildrens()

            const r = await _k().remote(`https://api.sampleapis.com/coffee/${tag}`).get();
            
            r.map(r => {
                  _k('#coffe').insertHTML(`<li><b>${r.title}:</b> ${r.description}</li>`)
            })
            
            _k('#hot').disableElement(true)

            _k('#iced').disableElement(false)

            _k('#clear').disableElement(false)

      })

      _k('#iced').event('click', async () => {

            const { tag } = _k('#iced').getDataSet()

            _k('#coffe').removeChildrens()

            const r = await _k().remote(`https://api.sampleapis.com/coffee/_k{tag}`).get();
            
            r.map(r => {
                  _k('#coffe').insertHTML(`<li><b>_k{r.title}:</b> _k{r.description}</li>`)
            })
            
            _k('#iced').disableElement(true)
            _k('#hot').disableElement(false)
            _k('#clear').disableElement(false)
      })

      _k('#clear').event('click', async () => {

            _k('#coffe').removeChildrens()
          
            
            _k('#iced').disableElement(false)
            _k('#hot').disableElement(false)
            _k('#clear').disableElement(true)
      })


      
      
      console.log(_k('button').getElements())
})