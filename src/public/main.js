Jlib().load(() => {
  Jlib("#hot").event("click", async () => {
    Jlib("#hot").removeClass("kg-primary");

    const { tag } = Jlib("#hot").getDataSet();

    Jlib("#coffe").removeChildrens();

    const r = await Jlib()
      .remote(`https://api.sampleapis.com/coffee/${tag}`)
      .get();

    r.map((r) => {
      Jlib("#coffe").insertHTML(`<li><b>${r.title}:</b> ${r.description}</li>`);
    });

    Jlib("#hot").disableElement(true);

    Jlib("#iced").disableElement(false);

    Jlib("#clear").disableElement(false);
  });

  Jlib("#iced").event("click", async () => {
    const { tag } = Jlib("#iced").getDataSet();

    Jlib("#coffe").removeChildrens();

    const r = await Jlib()
      .remote(`https://api.sampleapis.com/coffee/${tag}`)
      .get();

    r.map((r) => {
      Jlib("#coffe").insertHTML(`<li><b>${r.title}:</b> ${r.description}</li>`);
    });

    Jlib("#iced").disableElement(true);
    Jlib("#hot").disableElement(false);
    Jlib("#clear").disableElement(false);
  });

  Jlib("#clear").event("click", async () => {
    Jlib("#coffe").removeChildrens();

    Jlib("#iced").disableElement(false);
    Jlib("#hot").disableElement(false);
    Jlib("#clear").disableElement(true);
  });

  Jlib("#boxbtn").event("click", () => {
    Jlib("#box").toggleClass("active");
  });

  Jlib("#fadeIn").event("click", () => {
    Jlib("#box").animate().fadeIn();
  });

  Jlib("#fadeOut").event("click", () => {
    Jlib("#box").animate().fadeOut();
  });

  Jlib("#rotate").event("click", () => {
    Jlib("#box")
      .animate()
      .anime([{ transform: "rotate(360deg)" }]);
  });

  console.log(Jlib("button").getElements());
});
