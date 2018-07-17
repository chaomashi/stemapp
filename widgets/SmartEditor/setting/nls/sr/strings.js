define({
  "layersPage": {
    "allLayers": "Svi slojevi",
    "title": "Izaberite šablon da biste kreirali geoobjekte",
    "generalSettings": "Opšte postavke",
    "layerSettings": "Postavke sloja",
    "presetValueText": "Definiši unapred podešene vrednosti",
    "geocoderSettingsText": "Postavke geokodera",
    "editDescription": "Obezbedi tekst prikaza za panel za uređivanje",
    "editDescriptionTip": "Ovaj tekst je prikazan iznad birača šablona, ostavite prazno ukoliko ne želite tekst.",
    "promptOnSave": "Postavi upit za čuvanje nesačuvanih izmena kada se obrazac zatvori ili prebaci na sledeći zapis.",
    "promptOnSaveTip": "Prikaži upit kada korisnik klikne na „zatvori“ ili ode na sledeći zapis koji može da se izmene, kada trenutni geoobjekat ima nesačuvane izmene.",
    "promptOnDelete": "Zahtevaj potvrdu prilikom brisanja zapisa.",
    "promptOnDeleteTip": "Prikaži upit kada korisnik klikne na brisanje da bi potvrdio radnju.",
    "removeOnSave": "Ukloni geoobjekat iz izbora prilikom čuvanja.",
    "removeOnSaveTip": "Opcija za uklanjanje geoobjekta iz skupa izbora kada je zapis sačuvan. Ako je to jedini izabran zapis, panel se prebacuje nazad na stranicu šablona.",
    "useFilterEditor": "Koristi filter šablona geoobjekta",
    "useFilterEditorTip": "Opcija za korišćenje birača za šablon filtera koji omogućava prikazivanje šablona za jedan sloj ili pretragu po nazivu.",
    "displayShapeSelector": "Prikaži opcije za crtanje",
    "displayShapeSelectorTip": "Opcija za prikaz liste važećih opcija za crtanje za izabrani šablon.",
    "displayPresetTop": "Prikaži listu unapred postavljenih vrednosti na vrhu",
    "displayPresetTopTip": "Opcija za prikaz liste unapred postavljenih vrednosti iznad birača šablona.",
    "listenToGroupFilter": "Primeni vrednosti filtera iz vidžeta Grupni filter na unapred podešena polja",
    "listenToGroupFilterTip": "Kada primenite filter u vidžetu Grupni filter, primenite vrednost na odgovarajuće polje u listi sa Unapred podešenom vrednosti.",
    "keepTemplateActive": "Održi izabrani šablon aktivnim",
    "keepTemplateActiveTip": "Kada je prikazan birač šablona, ponovo izaberite šablon ako je bio prethodno izabran.",
    "geometryEditDefault": "Podrazumevano omogući uređivanje geometrije",
    "autoSaveEdits": "Automatski čuva izmene",
    "enableAttributeUpdates": "Prikaži dugme za ažuriranje radnji atributa kada je aktivno uređivanje geometrije",
    "layerSettingsTable": {
      "allowDelete": "Dozvoli brisanje",
      "allowDeleteTip": "Opcija da se korisniku dozvoli da obriše geoobjekat; onemogućena je ako sloj ne podržava brisanje",
      "edit": "Može da se izmeni",
      "editTip": "Opcija da se sloj uključi u vidžet",
      "label": "Sloj",
      "labelTip": "Ime sloja kako je definisano na mapi",
      "update": "Onemogući izmene geometrije",
      "updateTip": "Opcija za onemogućavanje mogućnosti pomeranja geometrije kada je jednom postavljena ili pomeranja geometrije na postojećem geoobjektu",
      "allowUpdateOnly": "Samo ažuriraj",
      "allowUpdateOnlyTip": "Opcija da se dozvoli izmena postojećih geoobjekata, automatski potvrđena i onemogućena ako sloj ne podržava kreiranje novih geoobjekata",
      "fieldsTip": "Izmeni polja koja treba izmeniti i definiši pametne atribute",
      "actionsTip": "Opcija za uređivanje polja ili pristup povezanim slojevima/tabelama",
      "description": "Opis",
      "descriptionTip": "Opcija za unos teksta koji želite da prikažete na vrhu stranice atributa.",
      "relationTip": "Prikaži povezane slojeve i tabele"
    },
    "editFieldError": "Izmene polja i pametni atributi nisu dostupni slojevima koji ne mogu da se izmene",
    "noConfigedLayersError": "Smart Editor zahteva jedan ili više izmenjivih slojeva"
  },
  "editDescriptionPage": {
    "title": "Definišite tekst za pregled atributa za <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Konfigurišite polja za <b>${layername}</b>",
    "copyActionTip": "Radnje atributa",
    "description": "Koristite dugme za menjanje radnje za aktiviranje pametnih atributa na sloju. Pametni atributi mogu da zahtevaju, sakriju ili onemoguće polje na osnovu vrednosti u drugim poljima. Upotrebite dugme za kopiranje radnje da aktivirate i definišete izvor vrednosti polja prema preseku, adresi, koordinatama i predefinisanom podešavanju.",
    "fieldsNotes": "* je obavezno polje. Ukoliko poništite izbor „Prikaz“ za ovo polje i šablon za menjanje ne popuni to vrednost polja, nećete moći da sačuvate novi zapis.",
    "smartAttachmentText": "Konfigurišite radnju pametnih priloga",
    "smartAttachmentPopupTitle": "Konfigurišite pametne priloge za <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Prikaz",
      "displayTip": "Utvrdi da li polje nije vidljivo",
      "edit": "Može da se izmeni",
      "editTip": "Proveri da li je polje prisutno u obrascu atributa",
      "fieldName": "Naziv",
      "fieldNameTip": "Ime polja definisano u bazi podataka",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Ime polja definisano u mapi",
      "canPresetValue": "Predefinisano podešavanje",
      "canPresetValueTip": "Opcija za prikazivanje polja u listi unapred podešenih polja i za omogućavanje korisniku da podesi vrednost pre menjanja",
      "actions": "Radnje",
      "actionsTip": "Promeni redosled polja ili postavi pametne atribute"
    },
    "smartAttSupport": "Pametni atributi nisu podržani u obaveznim poljima baze podataka"
  },
  "actionPage": {
    "title": "Konfigurišite radnje atributa za <b>${fieldname}</b>",
    "description": "Radnje su uvek isključene, osim ukoliko navedete kriterijum po kom će se aktivirati. Radnje se izvršavaju redom i samo jedna radnja će biti aktivirana po polju. Koristite dugme za izmenu kriterijuma da biste definisali kriterijum.",
    "actionsSettingsTable": {
      "rule": "Radnja",
      "ruleTip": "Radnja izvršena kada je kriterijum zadovoljen",
      "expression": "Izraz",
      "expressionTip": "Rezultujući izraz u SQL formatu od definisanog kriterijuma",
      "actions": "Kriterijum",
      "actionsTip": "Promeni redosled pravila i definiši kriterijum kada je aktivirano"
    },
    "copyAction": {
      "description": "Izvor vrednosti polja se obrađuje redom, ako je aktiviran, do aktiviranja važećeg kriterijuma ili završetka liste. Koristite dugme za izmenu kriterijuma da biste definisali kriterijum.",
      "intersection": "Raskrsnica",
      "coordinates": "Koordinate",
      "address": "Adresa",
      "preset": "Predefinisano podešavanje",
      "actionText": "Radnje",
      "criteriaText": "Kriterijum",
      "enableText": "Omogućeno"
    },
    "actions": {
      "hide": "Sakrij",
      "required": "Obavezno",
      "disabled": "Onemogućeno"
    }
  },
  "filterPage": {
    "submitHidden": "Želite li da prosledite podatke o atributima za ovo polje čak i kada je sakriveno?",
    "title": "Konfiguriši izraz za ${action} pravilo",
    "filterBuilder": "Podesi radnju na polju kada se zapis poklapa ${any_or_all} od sledećih izraza",
    "noFilterTip": "Pomoću alata ispod, definišite izjavu za slučaj kada je radnja aktivna."
  },
  "geocoderPage": {
    "setGeocoderURL": "Postavi URL adresu geokôdera",
    "hintMsg": "Napomena: Menjate servis geokodera, proverite da li ste ažurirali sva mapiranja polja geokodera koja ste konfigurisali.",
    "invalidUrlTip": "URL adresa ${URL} nije validna ili nije dostupna."
  },
  "addressPage": {
    "popupTitle": "Adresa",
    "checkboxLabel": "Pribavi vrednost od geokodera",
    "selectFieldTitle": "Atribut:",
    "geocoderHint": "Za promenu geokodera idite na dugme 'Postavke geokodera' u opštim postavkama"
  },
  "coordinatesPage": {
    "popupTitle": "Koordinate",
    "checkboxLabel": "Pribavi koordinate",
    "coordinatesSelectTitle": "Koordinatni sistem:",
    "coordinatesAttributeTitle": "Atribut:",
    "mapSpatialReference": "Prostorna referenca mape",
    "latlong": "Geografska širina/dužina"
  },
  "presetPage": {
    "popupTitle": "Predefinisano podešavanje",
    "checkboxLabel": "Polje će biti unapred podešeno",
    "presetValueLabel": "Trenutna unapred podešena vrednost je:",
    "changePresetValueHint": "Da biste promenili ovu unapred podešenu vrednost idite na dugme 'Definiši unapred podešene vrednosti' u opštim postavkama"
  },
  "intersectionPage": {
    "checkboxLabel": "Pribavi vrednost polja sloja preseka",
    "layerText": "Slojevi",
    "fieldText": "Polja",
    "actionsText": "Radnje",
    "addLayerLinkText": "Dodaj sloj"
  },
  "presetAll": {
    "popupTitle": "Definiši unapred podešene vrednosti",
    "deleteTitle": "Izbriši unapred podešenu vrednost",
    "hintMsg": "Sva jedinstvena imena unapred podešenih polja su navedena ovde. Uklanjanje unapred podešenog polja će onemogućiti odgovarajuće polje kao unapred podešeno iz svih slojeva/tabela."
  }
});