define({
  "layersPage": {
    "allLayers": "Kõik kihid",
    "title": "Valige objektide loomiseks mall",
    "generalSettings": "Üldseaded",
    "layerSettings": "Kihi seaded",
    "presetValueText": "Määratle eelseatud väärtused",
    "geocoderSettingsText": "Geokodeerija seaded",
    "editDescription": "Sisestage redigeerimispaneelil kuvatav tekst",
    "editDescriptionTip": "See tekst kuvatakse mallivalija kohal. Kui te ei soovi teksti kuvada, jätke tühjaks.",
    "promptOnSave": "Viip salvestamata muudatuste salvestamiseks, kui vorm suletakse või valitakse järgmine kirje.",
    "promptOnSaveTip": "Kui kasutaja klõpsab sulgemisnuppu või liigub järgmisele redigeeritavale kirjele ja praegusel objektil on salvestamata muudatusi, kuvatakse see viip.",
    "promptOnDelete": "Kirje kustutamisel nõutakse kinnitust.",
    "promptOnDeleteTip": "Kui kasutaja klõpsab toimingu kinnitamiseks kustutamisnuppu, kuvatakse see viip.",
    "removeOnSave": "Salvestamisel eemaldatakse objekt valikust.",
    "removeOnSaveTip": "Valik objekti eemaldamiseks valitud komplektist, kui kirjet salvestatakse. Kui see on ainus valitud kirje, lülitub paneel tagasi mallilehele.",
    "useFilterEditor": "Kasuta objekti malli filtrit",
    "useFilterEditorTip": "Valik filtrimalli valija kasutamiseks, mille abil saab vaadata ühe kihi malle või otsida malle nime järgi.",
    "displayShapeSelector": "Näita joonistamisvalikuid",
    "displayShapeSelectorTip": "Valik sobivate joonistamisvalikute loendi kuvamiseks valitud malli jaoks.",
    "displayPresetTop": "Kuva eelseadistatud väärtuse loend alguses",
    "displayPresetTopTip": "Valik kuvada eelseadistatud väärtuse loend mallivalitsa peal.",
    "listenToGroupFilter": "Grupeerimise filtri vidina filtriväärtuste rakendamine eelseatud väljadele",
    "listenToGroupFilterTip": "Kui filter on rakendatud rühmafiltri vidinas, rakendage väärtus vastavale väljale eelseatud väärtuste loendis.",
    "keepTemplateActive": "Valitud malli hoidmine aktiivsena",
    "keepTemplateActiveTip": "Kui mall oli eelnevalt valitud, valige see mallivalija kuvamise korral uuesti.",
    "geometryEditDefault": "Luba vaikimisi geomeetriline redigeerimine",
    "autoSaveEdits": "Salvestab muudatuse automaatselt",
    "enableAttributeUpdates": "Kuva atribuuditoimingute värskendamise nupp, kui geomeetria muutmine on aktiivne",
    "layerSettingsTable": {
      "allowDelete": "Luba kustutamine",
      "allowDeleteTip": "Valik, mis lubab kasutajal objekti kustutada. Kui kiht ei toeta kustutamist, on see valik keelatud.",
      "edit": "Muudetav",
      "editTip": "Valik kihi kaasamiseks vidinasse",
      "label": "Kiht",
      "labelTip": "Kihi nimi kaardil määratletud kujul",
      "update": "Keela geomeetria muutmine",
      "updateTip": "Valik geomeetria teisaldamise keelamiseks pärast selle paigutamist või olemasolevale objektile",
      "allowUpdateOnly": "Ainult uuenda",
      "allowUpdateOnlyTip": "Valik ainult olemasolevate objektide muutmiseks. Seda kontrollitakse vaikimisi ja see on välja lülitatud, kui kiht ei toeta uute objektide loomist.",
      "fieldsTip": "Saate muuta redigeeritavaid välju ja määratleda nutikad atribuudid",
      "actionsTip": "Valik väljade muutmiseks või seotud kihtidele/tabelitele juurdepääsuks",
      "description": "Kirjeldus",
      "descriptionTip": "Võimalus sisestada atribuudilehe ülaosas kuvatav tekst.",
      "relationTip": "Kuva seotud kihid ja tabelid"
    },
    "editFieldError": "Mittemuudetavate kihtide korral ei saa välju muuta ja nutikad atribuudid pole saadaval",
    "noConfigedLayersError": "Smart Editor nõuab mitut muudetavat kihti"
  },
  "editDescriptionPage": {
    "title": "Määratle kihi <b>${layername}</b> atribuutide ülevaate tekst "
  },
  "fieldsPage": {
    "title": "Konfigureeri kihi <b>${layername}</b> väljad",
    "copyActionTip": "Atribuuditoimingud",
    "description": "Kihil nutikate atribuutide aktiveerimiseks kasutage toimingute muutmise nuppu. Nutikad atribuudid oskavad teiste väljade väärtustest lähtuvalt välju nõuda, peita või keelata. Väljaväärtuse allika aktiveerimiseks ja määratlemiseks ristumiskoha (ristmiku), aadressi, koordinaatide ja eelseade alusel kasutage toimingute kopeerimise nuppu.",
    "fieldsNotes": "* on nõutav väli. Kui tühistate selle välja puhul märkeruudu Kuva valiku ja redigeerimismall ei täida seda välja väärtusega, ei saa te uut kirjet salvestada.",
    "smartAttachmentText": "Nutikate manuste konfigureerimise toiming",
    "smartAttachmentPopupTitle": "Konfigureeri kihi <b>${layername}</b> nutikad manused",
    "fieldsSettingsTable": {
      "display": "Kuva",
      "displayTip": "Määrake, kas väli on nähtav või mitte",
      "edit": "Muudetav",
      "editTip": "Kontrollige, kas väli on atribuudi vormil olemas",
      "fieldName": "Nimi",
      "fieldNameTip": "Välja nimi, mis on andmebaasis määratletud",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Välja nimi, mis on kaardil määratletud",
      "canPresetValue": "Eelseatud",
      "canPresetValueTip": "Valik välja kuvamiseks eelseatud väljade loendis ja selleks, et lubada kasutajal määrata väärtuse enne muutmist",
      "actions": "Toimingud",
      "actionsTip": "Saate muuta väljade järjestust või seadistada nutikad atribuudid"
    },
    "smartAttSupport": "Nõutavad andmebaasi väljad ei toeta nutikaid atribuute"
  },
  "actionPage": {
    "title": "Konfigureeri välja <b>${fieldname}</b> atribuuditoimingud",
    "description": "Need toimingud on alati välja lülitatud, välja arvatud juhul, kui määratlete kriteeriumid, mille korral need sisse lülituvad. Toiminguid töödeldakse ettenähtud järjestuses ja iga välja kohta lülitatakse sisse ainult üks toiming. Kriteeriumide määratlemiseks kasutage nuppu Kriteeriumide muutmine.",
    "actionsSettingsTable": {
      "rule": "Tegevus",
      "ruleTip": "Kriteeriumidele vastavuse korral tehtav toiming",
      "expression": "Väljend",
      "expressionTip": "Määratletud kriteeriumide alusel saadav avaldis SQL-vormingus",
      "actions": "Kriteeriumid",
      "actionsTip": "Saate muuta reegli järjestust ja määratleda selle sisselülitumise kriteeriumid"
    },
    "copyAction": {
      "description": "Väljaväärtuse allikad töödeldakse järjest, kui need on aktiveeritud, kuni kehtivad kriteeriumid lülitatakse sisse või loend on lõpule viidud. Kriteeriumide määratlemiseks kasutage kriteeriumide muutmise nuppu.",
      "intersection": "Ristmik",
      "coordinates": "Koordinaadid",
      "address": "Aadress",
      "preset": "Eelseatud",
      "actionText": "Toimingud",
      "criteriaText": "Kriteeriumid",
      "enableText": "Lubatud"
    },
    "actions": {
      "hide": "Peida",
      "required": "Nõutav",
      "disabled": "Keelatud"
    }
  },
  "filterPage": {
    "submitHidden": "Kas edastada selle välja kohta atribuudi andmed isegi siis, kui see on peidetud?",
    "title": "Konfigureerige toimingu ${action} reegli avaldis",
    "filterBuilder": "Saate määrata väljale toimingu, kui kirje vastab ${any_or_all} järgmistele avaldistele",
    "noFilterTip": "Määratlege alljärgnevate tööriistade abil avaldus, mille korral toiming on aktiivne."
  },
  "geocoderPage": {
    "setGeocoderURL": "Määra geokodeerija URL",
    "hintMsg": "Märkus. Muudate geokodeerija teenust. Värskendage kindlasti kõik konfigureeritud geokodeerija väljavastendused.",
    "invalidUrlTip": "URL ${URL} ei sobi või pole kättesaadav."
  },
  "addressPage": {
    "popupTitle": "Aadress",
    "checkboxLabel": "Too väärtus geokodeerijast",
    "selectFieldTitle": "Atribuut:",
    "geocoderHint": "Geokodeerija vahetamiseks valige üldsätete all nupp Geokodeerija sätted"
  },
  "coordinatesPage": {
    "popupTitle": "Koordinaadid",
    "checkboxLabel": "Hangi koordinaadid",
    "coordinatesSelectTitle": "Koordinaatsüsteem:",
    "coordinatesAttributeTitle": "Atribuut:",
    "mapSpatialReference": "Kaardi koordinaatsüsteem",
    "latlong": "Laius/Pikkus"
  },
  "presetPage": {
    "popupTitle": "Eelseatud",
    "checkboxLabel": "Väli on eelseatud",
    "presetValueLabel": "Praegune eelseatud väärtus on:",
    "changePresetValueHint": "Selle eelseatud väärtuse muutmiseks valige üldsätete all nupp Määratle eelseatud väärtused"
  },
  "intersectionPage": {
    "checkboxLabel": "Too väärtus ristumiskoha kihi väljalt",
    "layerText": "Kihid",
    "fieldText": "Väljad",
    "actionsText": "Toimingud",
    "addLayerLinkText": "Lisa kiht"
  },
  "presetAll": {
    "popupTitle": "Määratle eelseatud vaikeväärtused",
    "deleteTitle": "Kustuta eelseatud väärtus",
    "hintMsg": "Siin on ära toodud kõigi kordumatute eelseatud väljade nimed. Mõne eelseatud välja eemaldamine keelab vastava välja eelseadena kõigis kihtides või tabelites."
  }
});