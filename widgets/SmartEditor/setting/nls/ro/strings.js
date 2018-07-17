define({
  "layersPage": {
    "allLayers": "Toate straturile tematice",
    "title": "Selectaţi un şablon pentru a crea obiecte spaţiale",
    "generalSettings": "Setări generale",
    "layerSettings": "Setări strat tematic",
    "presetValueText": "Definiți valorile prestabilite",
    "geocoderSettingsText": "Setările Geocodificatorului",
    "editDescription": "Introduceţi textul de afişat pe panoul de editare",
    "editDescriptionTip": "Acest text este afişat deasupra selectorului de şablon; dacă nu doriţi afişarea unui text, lăsaţi câmpul necompletat.",
    "promptOnSave": "Se afişează un mesaj pentru salvarea modificărilor nesalvate la închiderea formularului sau comutarea la următoarea înregistrare.",
    "promptOnSaveTip": "Se afişează un mesaj atunci când utilizatorul face clic pe închidere sau navighează la următoarea înregistrare editabilă, dacă obiectul spaţial curent are modificări nesalvate.",
    "promptOnDelete": "Se solicită confirmare la ştergerea unei înregistrări.",
    "promptOnDeleteTip": "Se afişează un mesaj când utilizatorul face clic pe Ştergere pentru confirmarea acţiunii.",
    "removeOnSave": "Eliminaţi obiectul spaţial din selecţie în momentul salvării.",
    "removeOnSaveTip": "Opţiune de eliminare a obiectului din setul selectat la salvarea înregistrării. Dacă acesta este singura înregistrare selectată, panoul este comutat înapoi la pagina şablonului.",
    "useFilterEditor": "Utilizaţi filtrul de şabloane de obiecte spaţiale",
    "useFilterEditorTip": "Opţiune de utilizare a selectorului de şabloane de filtrare, care permite vizualizarea unui şablon de obiecte spaţiale sau căutarea şabloanelor după nume.",
    "displayShapeSelector": "Afișare opțiuni desenare",
    "displayShapeSelectorTip": "Opțiune pentru afișarea unei liste cu opțiuni de desenare valabile pentru șablonul selectat.",
    "displayPresetTop": "Afișare listă valori presetate în partea superioară",
    "displayPresetTopTip": "Opțiune pentru afișarea listei cu valori presetate deasupra selectorului de șabloane.",
    "listenToGroupFilter": "Aplicaţi valorile filtrului din widgetul Filtru grupuri la câmpurile Presetate",
    "listenToGroupFilterTip": "Dacă este aplicat un filtru în widgetul Filtru grupuri, aplicaţi valoarea la un câmp corespunzător din lista de valori presetate.",
    "keepTemplateActive": "Menţineţi activ şablonul selectat",
    "keepTemplateActiveTip": "Atunci când este afişat selectorul de şabloane, dacă un şablon a fost selectat în prealabil, îl selectaţi din nou.",
    "geometryEditDefault": "Activare editare geometrie implicită",
    "autoSaveEdits": "Salvează automat editarea",
    "enableAttributeUpdates": "Arată butonul de actualizare al Acțiunilor Atribut când editarea geometriei este activă",
    "layerSettingsTable": {
      "allowDelete": "Se permite ştergerea",
      "allowDeleteTip": "Opţiune care permite utilizatorului să şteargă un obiect spaţial; este dezactivată dacă stratul tematic nu permite ştergerea",
      "edit": "Editabil",
      "editTip": "Opţiune de includere a stratului tematic în widget",
      "label": "Strat tematic",
      "labelTip": "Numele stratului tematic definit pe hartă",
      "update": "Dezactivare editare geometrie",
      "updateTip": "Opţiune de dezactivare a funcţiei de mutare a geometriei după plasarea acesteia sau de mutare a geometriei unui obiect spaţial existent",
      "allowUpdateOnly": "Numai actualizare",
      "allowUpdateOnlyTip": "Opţiune care permite numai modificarea obiectelor spaţiale existente; este bifată în mod implicit şi dezactivată dacă stratul tematic nu permite crearea de noi obiecte spaţiale",
      "fieldsTip": "Modificaţi câmpurile de editat şi definiţi atribute inteligente",
      "actionsTip": "Opțiune de editare a câmpurilor sau de a accesa straturile tematice/tabelele corelate",
      "description": "Descriere",
      "descriptionTip": "Opţiune pentru introducerea textului de afişare în partea de sus a paginii de atribute.",
      "relationTip": "Vizualizați straturile tematice și tabelele corelate"
    },
    "editFieldError": "Modificările câmpurilor şi atributele inteligente nu sunt disponibile pentru straturile tematice care nu sunt editabile",
    "noConfigedLayersError": "Editorul inteligent necesită unul sau mai multe straturi tematice editabile"
  },
  "editDescriptionPage": {
    "title": "Definiţi textul prezentării generale a atributelor pentru <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Configuraţi câmpuri pentru <b>${layername}</b>",
    "copyActionTip": "Acțiuni Atribut",
    "description": "Utilizați butonul de editare a Acțiunilor pentru a activa Atributele Inteligente pe un strat tematic. Atributele Inteligente pot solicita, ascunde sau dezactiva un câmp bazat pe valori în alte câmpuri. Utilizați butonul de copiere a Acțiunilor pentru a activa și defini sursa valorii câmpului după intersecție, adresă, coordonate și prestabilire.",
    "fieldsNotes": "* este un câmp obligatoriu. Dacă debifaţi opţiunea Afişare pentru acest câmp, iar şablonul de editare nu populează valoarea câmpului respectiv, nu veţi putea salva o înregistrare nouă.",
    "smartAttachmentText": "Configurați acțiunea Anexelor inteligente",
    "smartAttachmentPopupTitle": "Configurați anexele inteligente pentru <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Afişare",
      "displayTip": "Determinaţi dacă acest câmp nu va fi vizibil.",
      "edit": "Editabil",
      "editTip": "Bifaţi pentru activare dacă acest câmp este prezent în formularul de atribute",
      "fieldName": "Nume",
      "fieldNameTip": "Numele câmpului definit în baza de date",
      "fieldAlias": "Pseudonim",
      "fieldAliasTip": "Numele câmpului definit pe hartă",
      "canPresetValue": "Presetat",
      "canPresetValueTip": "Opţiune de afişare a câmpului în lista de câmpuri presetate, care permite utilizatorului să seteze valoarea înainte de editare",
      "actions": "Acţiuni",
      "actionsTip": "Schimbaţi ordinea câmpurilor sau configuraţi atribute inteligente"
    },
    "smartAttSupport": "Atributele inteligente nu sunt acceptate pentru câmpurile obligatorii din baza de date"
  },
  "actionPage": {
    "title": "Configurați Acțiunile Atribut pentru <b>${fieldname}</b>",
    "description": "Acţiunile sunt întotdeauna dezactivate dacă nu specificaţi criteriile care le vor declanşa. Acţiunile sunt procesate în ordine şi o singură acţiune este declanşată pentru fiecare câmp. Utilizaţi butonul Editare criterii pentru a defini criteriile.",
    "actionsSettingsTable": {
      "rule": "Acţiune",
      "ruleTip": "Acţiune efectuată la îndeplinirea criteriilor",
      "expression": "Expresie",
      "expressionTip": "Expresia rezultată în format SQL pe baza criteriilor definite",
      "actions": "Criterii",
      "actionsTip": "Schimbaţi ordinea regulii şi definiţi criteriile în momentul declanşării acestora"
    },
    "copyAction": {
      "description": "Sursele valorilor de câmp sunt prelucrate în ordine dacă sunt activate până la declanșarea unui criteriu valabil sau finalizarea listei. Utilizați butonul de Editare a Criteriilor pentru a defini criteriile.",
      "intersection": "Intersecţie",
      "coordinates": "Coordonate",
      "address": "Adresă",
      "preset": "Presetat",
      "actionText": "Acţiuni",
      "criteriaText": "Criterii",
      "enableText": "Activat"
    },
    "actions": {
      "hide": "Ascundere",
      "required": "Obligatoriu",
      "disabled": "Dezactivat"
    }
  },
  "filterPage": {
    "submitHidden": "Trimiteţi datele atributelor pentru acest câmp chiar şi atunci când este ascuns?",
    "title": "Configuraţi expresia pentru regula ${action}",
    "filterBuilder": "Setaţi acţiunea câmpului când înregistrarea corespunde ${any_or_all} dintre următoarele expresii",
    "noFilterTip": "Utilizând instrumentele de mai jos, definii afirmaţia pentru situaţia în care acţiunea este activă."
  },
  "geocoderPage": {
    "setGeocoderURL": "Setare URL geocodificator",
    "hintMsg": "Notă: Schimbați serviciul de geo-codificare, asigurați-vă că ați actualizat orice asocieri de câmp de geo-codificare pe care le-ați configurat.",
    "invalidUrlTip": "Adresa URL ${URL} este nevalidă sau inaccesibilă."
  },
  "addressPage": {
    "popupTitle": "Adresă",
    "checkboxLabel": "Obțineți valoare de la Geocodificator",
    "selectFieldTitle": "Atribut:",
    "geocoderHint": "Pentru a schimba geocodificatorul, mergeți la butonul 'Setările Geocodificatorului' în setările generale"
  },
  "coordinatesPage": {
    "popupTitle": "Coordonate",
    "checkboxLabel": "Obțineți coordonate",
    "coordinatesSelectTitle": "Sistem de coordonate:",
    "coordinatesAttributeTitle": "Atribut:",
    "mapSpatialReference": "Referinţă spaţială de hartă",
    "latlong": "Latitudine/Longitudine"
  },
  "presetPage": {
    "popupTitle": "Presetat",
    "checkboxLabel": "Câmpul va fi presetat",
    "presetValueLabel": "Valoarea presetată actuală este:",
    "changePresetValueHint": "Pentru modificarea acestei valori prestabilite, mergeți la butonul 'Definiți Valorile Prestabilite' la setările generale"
  },
  "intersectionPage": {
    "checkboxLabel": "Obțineți valoarea din câmpul stratului de intersecție",
    "layerText": "Straturi tematice",
    "fieldText": "Câmpuri",
    "actionsText": "Acţiuni",
    "addLayerLinkText": "Adăugare strat tematic"
  },
  "presetAll": {
    "popupTitle": "Definiți valorile implicite prestabilite",
    "deleteTitle": "Ştergere valori prestabilite",
    "hintMsg": "Toate denumirile unice prestabilite ale câmpurilor sunt menționate aici. Eliminarea câmpului prestabilit va dezactiva câmpul respectiv ca fiind prestabilit din toate straturile tematice/tabele."
  }
});