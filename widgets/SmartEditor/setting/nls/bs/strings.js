define({
  "layersPage": {
    "allLayers": "Svi slojevi",
    "title": "Odaberite predložak za izradu značajki",
    "generalSettings": "Opće postavke",
    "layerSettings": "Postavke sloja",
    "presetValueText": "Definiraj prethodno postavljene vrijednosti",
    "geocoderSettingsText": "Postavke Geokodera",
    "editDescription": "Navedite tekst za prikaz za ploču uređivanja",
    "editDescriptionTip": "Ovaj se tekst prikazuje iznad birača predložaka, ostavite prazno ako ne želite da bude teksta.",
    "promptOnSave": "Upit za spremanje nespremljenih uređivanja kad je obrazac zatvoren ili prebačen na sljedeći zapis.",
    "promptOnSaveTip": "Prikažite upit kad korisnik klikne za zatvaranje ili navigira do sljedećeg zapisa koji se može uređivati dok trenutačni geoobjekt ima nespremljena uređivanja.",
    "promptOnDelete": "Potrebna je potvrda prilikom brisanja zapisa.",
    "promptOnDeleteTip": "Prikazivanje upita za potvrdu radnje kada korisnik klikne za brisanje.",
    "removeOnSave": "Uklonite geoobjekt iz odabira za spremanje.",
    "removeOnSaveTip": "Opcija za uklanjanje geoobjekta iz skupa za odabir kad se zapis spremi.  Ako je to jedini odabrani zapis, ploča se prebacuje natrag na stranicu predloška.",
    "useFilterEditor": "Upotrijebi filtar predloška geoobjekta",
    "useFilterEditorTip": "Opcija za upotrebu birača predloška filtra koja pruža mogućnost prikaza predloška jednog sloja ili pretraživanja predložaka po nazivu.",
    "displayShapeSelector": "Prikaži opcije crtanja",
    "displayShapeSelectorTip": "Opcija za prikaz popisa valjanih opcija crtanja za odabrani predložak.",
    "displayPresetTop": "Prikaži prethodno postavljenu vrijednost na vrhu",
    "displayPresetTopTip": "Opcija za prikaz popisa prethodno postavljenih vrijednosti iznad odabirača predložaka.",
    "listenToGroupFilter": "Primijenite vrijednosti filtra iz widgeta grupnog filtra u predefinirana polja",
    "listenToGroupFilterTip": "Kada se primijeni filtar u widgetu grupnog filtra, primijenite vrijednost u odgovarajuće polje u popisu s predefiniranim vrijednostima.",
    "keepTemplateActive": "Ostavite aktivnim odabrani predložak",
    "keepTemplateActiveTip": "Kada se prikaže birač predloška, a prethodno je odabran predložak, ponovno ga odaberite.",
    "geometryEditDefault": "Omogući uređivanje geometrije po zadanim postavkama",
    "autoSaveEdits": "Automatski sprema uređivanje",
    "enableAttributeUpdates": "Prikaži gumb za ažuriranje radnji atributa kada je aktivna geometrija uređivanja",
    "layerSettingsTable": {
      "allowDelete": "Omogući brisanje",
      "allowDeleteTip": "Opcija za omogućavanje korisniku brisanje geoobjekta; onemogućeno ako sloj ne podržava brisanje",
      "edit": "Može se uređivati",
      "editTip": "Opcija za uključivanje sloja u widget",
      "label": "Sloj",
      "labelTip": "Naziv sloja kako je definirano na karti",
      "update": "Onemogući uređivanje geometrije",
      "updateTip": "Opcija za onemogućivanje mogućnosti pomicanja geometrije jednom kad se postavi ili pomicanja geometrije na postojeći geoobjekt",
      "allowUpdateOnly": "Ažuriraj samo",
      "allowUpdateOnlyTip": "Opcija za omogućivanje izmjena samo postojećih geoobjekata, omogućeno po zadanim postavkama i onemogućeno ako sloj ne podržava stvaranje novih geoobjekata",
      "fieldsTip": "Izmijenite polja za uređivanje i definirajte pametne atribute",
      "actionsTip": "Opcija za uređivanje polja ili pristup povezanim slojevima/tablicama",
      "description": "Opis",
      "descriptionTip": "Opcija za unos teksta da se prikazuje na vrhu stranice atributa.",
      "relationTip": "Prikaži povezane slojeve i tablice"
    },
    "editFieldError": "Izmjena polja i pametni atributi nisu dostupni za slojeve koji se ne mogu uređivati",
    "noConfigedLayersError": "Za Pametni uređivač potreban je jedan ili više slojeva koji se mogu uređivati"
  },
  "editDescriptionPage": {
    "title": "Definirajte tekst pregleda atributa za <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Konfigurirajte polja za <b>${layername}</b>",
    "copyActionTip": "Radnje atributa",
    "description": "Upotrijebite gumb za uređivanje radnji da biste aktivirali pametne atribute na sloju. Pametni atributi mogu zahtijevati, sakriti ili onemogućiti polje na temelju vrijednosti u drugim poljima. Upotrijebite gumb za kopiranje radnji kako biste aktivirali i definirali izvor vrijednosti polja presijecanjem, adresom, koordinatama te ih prethodno postavili.",
    "fieldsNotes": "* je obavezno polje. Ako odznačite prikaz za ovo polje i predložak uređivanja ne ispuni vrijednost tog polja, nećete moći spremiti novi zapis.",
    "smartAttachmentText": "Konfiguriraj radnju pametnih privitaka",
    "smartAttachmentPopupTitle": "Konfigurirajte pametne privitka za <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Prikaži",
      "displayTip": "Utvrdite je li polje nevidljivo",
      "edit": "Može se uređivati",
      "editTip": "Provjerite postoji li polje u obliku atributa",
      "fieldName": "Naziv",
      "fieldNameTip": "Naziv polja definirano je u bazi podataka",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Naziv polja definirano na karti",
      "canPresetValue": "Zadano",
      "canPresetValueTip": "Opcija za prikazivanje polja u popisu prethodno postavljenih polja i omogućivanje korisniku postavljanje vrijednosti prije uređivanja",
      "actions": "Radnje",
      "actionsTip": "Promijenite redoslijed polja ili postavite pametne atribute"
    },
    "smartAttSupport": "Pametni atributi nisu podržani u potrebnim poljima baze podataka"
  },
  "actionPage": {
    "title": "Konfigurirajte radnje atributa za <b>${fieldname}</b>",
    "description": "Radnje su uvijek isključene osim ako ne odredite kriterije po kojima će se aktivirati.  Radnje se obrađuju po redu i samo će se jedna radnja aktivirati po polju.  Upotrijebite gumb za uređivanje kriterija kako biste definirali kriterije.",
    "actionsSettingsTable": {
      "rule": "Radnja",
      "ruleTip": "Radnja izvršena kad su zadovoljeni kriteriji",
      "expression": "Izraz",
      "expressionTip": "Dobiveni izraz u SQL formatu od definiranih kriterija",
      "actions": "Kriteriji",
      "actionsTip": "Promijenite redoslijed pravila i definirajte kriterije kad će se aktivirati"
    },
    "copyAction": {
      "description": "Izvori vrijednosti polja obrađuju se po redu ako su aktivirani dok se ne aktiviraju važeći kriteriji ili se popis ne dovrši. Upotrijebite gumb za uređivanje kriterija da biste definirali kriterije.",
      "intersection": "Raskrižje",
      "coordinates": "Koordinate",
      "address": "Adresa",
      "preset": "Zadano",
      "actionText": "Radnje",
      "criteriaText": "Kriteriji",
      "enableText": "Omogućeno"
    },
    "actions": {
      "hide": "Sakrij",
      "required": "Potrebno",
      "disabled": "Onemogućeno"
    }
  },
  "filterPage": {
    "submitHidden": "Želite predati podatke o atributu za ovo polje čak i kad je skriveno?",
    "title": "Konfiguriraj izraz za pravilo ${action}",
    "filterBuilder": "Postavite radnju za polje kad zapis odgovara ${any_or_all} sljedećim izrazima",
    "noFilterTip": "Pomoću alata u nastavku definirajte izjavu za situaciju kad je radnja aktivna."
  },
  "geocoderPage": {
    "setGeocoderURL": "Postavi URL geokodera",
    "hintMsg": "Napomena: mijenjate uslugu geokodera, svakako ažurirajte kartiranja polja geokodera koja ste konfigurirali.",
    "invalidUrlTip": "URL ${URL} nije valjan ili dostupan."
  },
  "addressPage": {
    "popupTitle": "Adresa",
    "checkboxLabel": "Preuzmi vrijednost s Geokodera",
    "selectFieldTitle": "Atribut:",
    "geocoderHint": "Da biste promijenili geokoder, idite na gumb „Postavke Geokodera” u općim postavkama"
  },
  "coordinatesPage": {
    "popupTitle": "Koordinate",
    "checkboxLabel": "Preuzmi koordinate",
    "coordinatesSelectTitle": "Koordinatni sustav:",
    "coordinatesAttributeTitle": "Atribut:",
    "mapSpatialReference": "Prostorna referenca karte",
    "latlong": "Geografska dužina/širina"
  },
  "presetPage": {
    "popupTitle": "Zadano",
    "checkboxLabel": "Polje će se prethodno postaviti",
    "presetValueLabel": "Trenutačna prethodno postavljena vrijednost iznosi:",
    "changePresetValueHint": "Da biste promijenili ovu prethodno postavljenu vrijednost, idite na gumb „Definiraj prethodno postavljene vrijednosti” u općim postavkama"
  },
  "intersectionPage": {
    "checkboxLabel": "Preuzmi vrijednost s polja sloja presijecanja",
    "layerText": "Slojevi",
    "fieldText": "Polja",
    "actionsText": "Radnje",
    "addLayerLinkText": "Dodaj sloj"
  },
  "presetAll": {
    "popupTitle": "Definiraj zadane prethodno postavljene vrijednosti",
    "deleteTitle": "Izbriši prethodno postavljenu vrijednost",
    "hintMsg": "Ovdje su navedeni svi jedinstveni prethodno postavljeni nazivi polja. Uklanjanje prethodno postavljenog polja onemogućit će odgovarajuće polje kao prethodno postavljeno iz svih slojeva/tablica."
  }
});