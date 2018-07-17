define({
  "layersPage": {
    "allLayers": "Vsi sloji",
    "title": "Izberite predlogo za ustvarjanje geoobjektov",
    "generalSettings": "Splošne nastavitve",
    "layerSettings": "Nastavitve sloja",
    "presetValueText": "Določi prednastavljene vrednosti",
    "geocoderSettingsText": "Nastavitve geokodirnika",
    "editDescription": "Navedi prikazano besedilo za ploščo urejanja",
    "editDescriptionTip": "To besedilo je prikazano nad izbirnikom predlog. Če ne želite prikaza, polje pustite prazno.",
    "promptOnSave": "Poziv k shranjevanju neshranjenih urejanj ob zapiranju obrazca ali preklapljanja na naslednji zapis.",
    "promptOnSaveTip": "Prikaži poziv, ko uporabnik klikne zapri ali se premakne na naslednji uredljiv zapis, trenutni geoobjekt pa ima neshranjeno urejanje.",
    "promptOnDelete": "Pri brisanju zapisa zahtevaj potrditev.",
    "promptOnDeleteTip": "Prikaži poziv za potrditev dejanja, ko uporabnik klikne izbriši.",
    "removeOnSave": "Pri shranjevanju odstrani geoobjekt iz izbire.",
    "removeOnSaveTip": "Možnost, da odstranite geoobjekt iz nabora izbire, ko je zapis shranjen. Če obstaja samo izbrani zapis, se bo plošča preklopila nazaj na stran predlog.",
    "useFilterEditor": "Uporabite filter predlog geoobjektov",
    "useFilterEditorTip": "Možnost uporabe filtra izbirnika predlog, ki ponuja možnost ogleda predloge enega sloja ali iskanje predlog po imenu.",
    "displayShapeSelector": "Pokaži možnosti risanja",
    "displayShapeSelectorTip": "Možnost, ki pokaže seznam veljavnih možnosti risanja za izbrano predlogo.",
    "displayPresetTop": "Prikaži na vrhu seznam prednastavljenih vrednosti",
    "displayPresetTopTip": "Možnost, ki pokaže seznam prednastavljenih vrednosti nad izbirnikom predloge.",
    "listenToGroupFilter": "V prednastavljenih poljih uporabi filtrirane vrednosti iz pripomočka skupinskega filtra",
    "listenToGroupFilterTip": "Ko je filter uporabljen v pripomočku skupinskega filtra, uporabite vrednost na ustreznem polju na seznamu prednastavljenih vrednosti.",
    "keepTemplateActive": "Ohrani izbrano predlogo aktivno",
    "keepTemplateActiveTip": "Ko je prikazan izbirnik predloge in če je bila predloga že izbrana, jo ponovno izberite.",
    "geometryEditDefault": "Privzeto omogočite urejanje geometrije.",
    "autoSaveEdits": "Samodejno shrani spremembe",
    "enableAttributeUpdates": "Prikaži gumb za posodobitev Dejanj atributov, ko je aktivno urejanje geometrije",
    "layerSettingsTable": {
      "allowDelete": "Brisanje",
      "allowDeleteTip": "Privzeta je možnost, ki uporabnikom dovoljuje brisanje geoobjektov. V primeru, da sloj ne podpira brisanja, je onemogočena.",
      "edit": "Uredljiv",
      "editTip": "Možnost, da se v pripomoček vključi sloj",
      "label": "Sloj",
      "labelTip": "Ime sloja, kot je določeno na karti",
      "update": "Onemogoči urejanje",
      "updateTip": "Možnost, da se onemogoči sposobnost premikanja že postavljene geometrije ali premikanje geometrije na obstoječem geoobjektu",
      "allowUpdateOnly": "Posodobi",
      "allowUpdateOnlyTip": "Privzeta je možnost, ki dovoljuje spremembe le na obstoječih geoobjektih. V primeru, da sloj ne podpira ustvarjanja novih geoobjektov, je onemogočena.",
      "fieldsTip": "Spremenite polja, da jih bo mogoče urejati, in določite pametne atribute",
      "actionsTip": "Možnost za urejanje polj ali dostopanje do relacijskih slojev/tabel",
      "description": "Opis",
      "descriptionTip": "Možnost vnosa besedila za prikaz na vrhu strani z atributi.",
      "relationTip": "Ogled relacijskih slojev in tabel"
    },
    "editFieldError": "Spremembe polja in pametni atributi niso na voljo za neuredljive sloje.",
    "noConfigedLayersError": "Pametni urejevalnik zahteva enega ali več uredljivih slojev"
  },
  "editDescriptionPage": {
    "title": "Določite besedilo pregleda atributov za <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Konfigurirajte polja za <b>${layername}</b>",
    "copyActionTip": "Dejanja atributov",
    "description": "Uporabite gumb Urejanje dejanj, da aktivirate pametne atribute na sloju. Pametni atributi lahko zahtevajo, skrijejo ali onemogočijo polje glede na vrednost v drugih poljih. Uporabite gumb Kopiranje dejanj, da aktivirate in določite vir vrednosti polja po preseku, polju, koordinatah in prednastavitvi.",
    "fieldsNotes": "* je obvezno polje. Če odkljukate Prikaži za to polje, se vrednost tega polja v predlogi za urejanje ne izpolni. Novega zapisa tako ne boste mogli shraniti.",
    "smartAttachmentText": "Konfiguriraj dejanje pametnih prilog",
    "smartAttachmentPopupTitle": "Konfigurirajte pametne priloge za <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Prikaz",
      "displayTip": "Določite, če polje ni vidno",
      "edit": "Uredljiv",
      "editTip": "Preverite, ali je polje prisotno v obrazcu z atributi",
      "fieldName": "Ime",
      "fieldNameTip": "Ime polja, kot je določeno v zbirki podatkov",
      "fieldAlias": "Vzdevek",
      "fieldAliasTip": "Ime polja, kot je določeno na karti",
      "canPresetValue": "Prednastavi",
      "canPresetValueTip": "Možnost, da prikažete polje na seznamu predhodno nastavljenih polj in dovolite uporabnikom, da pred urejanjem nastavijo vrednost.",
      "actions": "Dejanja",
      "actionsTip": "Spremenite vrsti red polj ali nastavite pametne atribute"
    },
    "smartAttSupport": "Pametni atributi niso podprti v zahtevanih poljih zbirke podatkov"
  },
  "actionPage": {
    "title": "Konfigurirajte dejanja atributov za <b>${fieldname}</b>",
    "description": "Dejanja so vedno izklopljena, razen če navedete kriterije, ki jih bodo sprožila. Dejanja se obdelujejo po vrstnem redu in za vsako polje bo sproženo eno dejanje. Uporabite gumb Urejanje kriterijev, da jih določite.",
    "actionsSettingsTable": {
      "rule": "Dejanje",
      "ruleTip": "Izvedeno dejanje, ko je kriterij izpolnjen",
      "expression": "Izraz",
      "expressionTip": "Nastali izraz v obliki zapisa SQL iz določenih kriterijev.",
      "actions": "Kriterij",
      "actionsTip": "Spremeni vrstni red pravil in določi sprožitvene kriterije"
    },
    "copyAction": {
      "description": "Vir vrednosti polja je obdelan, če bi bil aktiviran, dokler veljavni kriteriji ne bi bili sproženi ali obdelan celoten seznam. Uporabite gumb Urejanje kriterijev, da določite kriterije.",
      "intersection": "Presek",
      "coordinates": "Koordinate",
      "address": "Naslov",
      "preset": "Prednastavljeno",
      "actionText": "Dejanja",
      "criteriaText": "Kriterij",
      "enableText": "Omogočeno"
    },
    "actions": {
      "hide": "Skrij",
      "required": "Zahtevano",
      "disabled": "Onemogočeno"
    }
  },
  "filterPage": {
    "submitHidden": "Pošljem podatke o atributih za to polje tudi ko je skrito?",
    "title": "Konfiguriraj izraz za pravilo ${action}",
    "filterBuilder": "Nastavi dejanje za polje, ko se zapisi ujemajo z ${any_or_all} naslednjimi izrazi",
    "noFilterTip": "Uporabite spodnja orodja, določite izjave, kdaj je dejanje aktivno."
  },
  "geocoderPage": {
    "setGeocoderURL": "Nastavi URL geokodirnika",
    "hintMsg": "Opomba: Spreminjate storitev geokodirnika, zagotovite, da boste posodobili katere koli preslikave polja geokodirnika, ki ste jih konfigurirali.",
    "invalidUrlTip": "URL ${URL} je neveljaven ali nedostopen."
  },
  "addressPage": {
    "popupTitle": "Naslov",
    "checkboxLabel": "Pridobi vrednosti iz geokodirnika",
    "selectFieldTitle": "Atribut:",
    "geocoderHint": "Za spremembo geokodirnika pojdite na gumb »Nastavitve geokodirnika« v splošnih nastavitvah"
  },
  "coordinatesPage": {
    "popupTitle": "Koordinate",
    "checkboxLabel": "Pridobi koordinate",
    "coordinatesSelectTitle": "Koordinatni sistem:",
    "coordinatesAttributeTitle": "Atribut:",
    "mapSpatialReference": "Določi koordinatni sistem",
    "latlong": "Geografska širina/geografska dolžina"
  },
  "presetPage": {
    "popupTitle": "Prednastavljeno",
    "checkboxLabel": "Polje bo prednastavljeno",
    "presetValueLabel": "Trenutna prednastavljena vrednost je:",
    "changePresetValueHint": "Če želite spremeniti to prednastavljeno vrednost, pojdite na gumb »Določi prednastavljene vrednosti« v splošnih nastavitvah"
  },
  "intersectionPage": {
    "checkboxLabel": "Pridobi vrednosti iz polja presečnega sloja",
    "layerText": "Sloji",
    "fieldText": "Polja",
    "actionsText": "Dejanja",
    "addLayerLinkText": "Dodaj sloj"
  },
  "presetAll": {
    "popupTitle": "Določi privzete prednastavljene vrednosti",
    "deleteTitle": "Izbriši prednastavljeno vrednost",
    "hintMsg": "Vsa enolična prednastavljena imena polj so navedena tukaj. Odstranitev prednastavljenega polja bo onemogočila zadevno polje, kot je bilo prednastavljeno iz vseh slojev/tabel."
  }
});