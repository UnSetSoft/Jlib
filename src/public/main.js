_r().load(() => {
  _r("#hot").event("click", async () => {
    _r("#hot").removeClass("kg-primary");

    const { tag } = _r("#hot").getDataSet();

    _r("#coffe").removeChildrens();

    const r = await _r()
      .remote(`https://api.sampleapis.com/coffee/${tag}`)
      .get();

    r.map((r) => {
      _r("#coffe").insertHTML(`<li><b>${r.title}:</b> ${r.description}</li>`);
    });

    _r("#hot").disableElement(true);

    _r("#iced").disableElement(false);

    _r("#clear").disableElement(false);
  });

  _r("#iced").event("click", async () => {
    const { tag } = _r("#iced").getDataSet();

    _r("#coffe").removeChildrens();

    const r = await _r()
      .remote(`https://api.sampleapis.com/coffee/_r{tag}`)
      .get();

    r.map((r) => {
      _r("#coffe").insertHTML(`<li><b>_r{r.title}:</b> _r{r.description}</li>`);
    });

    _r("#iced").disableElement(true);
    _r("#hot").disableElement(false);
    _r("#clear").disableElement(false);
  });

  _r("#clear").event("click", async () => {
    _r("#coffe").removeChildrens();

    _r("#iced").disableElement(false);
    _r("#hot").disableElement(false);
    _r("#clear").disableElement(true);
  });

  _r("#boxbtn").event("click", () => {
    _r("#box").toggleClass("active");
  });

  _r("#fadeIn").event("click", () => {
    _r("#box").animate().fadeIn();
  });

  _r("#fadeOut").event("click", () => {
    _r("#box").animate().fadeOut();
  });

  _r("#rotate").event("click", () => {
    _r("#box")
      .animate()
      .anime([{ transform: "rotate(360deg)" }]);
  });

  let [counter, setCounter] = _r().useStore(0);

  _r("#count").insertTXT(`${counter}`);

  _r("#increment").event("click", () => {
    counter++;
    setCounter(counter);
    _r("#count").insertTXT(`${counter}`);
  });

  console.log(_r("button").getElements());
});
