define({
  "layersPage": {
    "allLayers": "Kaikki karttatasot",
    "title": "Luo kohteita valitsemalla malli",
    "generalSettings": "Yleiset asetukset",
    "layerSettings": "Karttatason asetukset",
    "presetValueText": "Määritä esiasetusarvot",
    "geocoderSettingsText": "Geokooderin asetukset",
    "editDescription": "Järjestä näyttöteksti muokkauspaneelia varten",
    "editDescriptionTip": "Tämä teksti näytetään mallin valitsimen yläpuolella. Jätä tyhjäksi, jos et halua siihen tulevan tekstiä.",
    "promptOnSave": "Kehote tallentamattomien muokkausten tallentamiseksi, kun lomake on suljettu tai vaihdettu seuraavaksi tietueeksi.",
    "promptOnSaveTip": "Näytä kehote, kun käyttäjä napsauttaa sulkemistoimintoa tai siirtyy seuraavaan muokattavissa olevaan tietueeseen, kun nykyisessä kohteessa on tallentamattomia muokkauksia.",
    "promptOnDelete": "Vaadi vahvistus tietuetta poistettaessa.",
    "promptOnDeleteTip": "Näytä kehote, kun käyttäjä vahvistaa toiminnon napsauttamalla poistotoimintoa.",
    "removeOnSave": "Poista kohde valinnasta tallennettaessa.",
    "removeOnSaveTip": "Toiminto, joka poistaa kohteen valintajoukosta, kun tietue tallennetaan. Jos se on ainoa valittu tietue, paneeli vaihdetaan takaisin mallisivulle.",
    "useFilterEditor": "Käytä kohdemallien suodatinta",
    "useFilterEditorTip": "Toiminto, joka käyttää suodatinmallin valitsinta, joka antaa mahdollisuuden katsella yhtä karttatasomallia tai hakea malleja nimen mukaan.",
    "displayShapeSelector": "Näytä piirustusasetukset",
    "displayShapeSelectorTip": "Vaihtoehto, joka tuo näkyviin valitun mallin kelvollisten piirustusasetusten luettelon.",
    "displayPresetTop": "Näytä ennalta määritetty arvoluettelo ylhäällä",
    "displayPresetTopTip": "Vaihtoehto, joka tuo näkyviin ennalta määritetyn arvoluettelon mallivalitsimen yläpuolella.",
    "listenToGroupFilter": "Käytä ryhmäsuodattimen pienoisohjelman suodatinarvoja esiasetetuissa kentissä",
    "listenToGroupFilterTip": "Kun suodatinta käytetään ryhmäsuodattimen pienoisohjelmassa, käytä arvoa vastaavassa kentässä esiasetettujen arvojen luettelossa.",
    "keepTemplateActive": "Pidä valittu mallipohja aktiivisena",
    "keepTemplateActiveTip": "Kun mallipohjan valitsin on näkyvissä, poista aiemmin valitun mallinpohjan valinta.",
    "geometryEditDefault": "Ota käyttöön geometrian muokkaus oletusarvoisesti",
    "autoSaveEdits": "Tallentaa muokkauksen automaattisesti",
    "enableAttributeUpdates": "Näytä Ominaisuustietotoiminnot-päivityspainike, kun geometrian muokkaus on käytössä",
    "layerSettingsTable": {
      "allowDelete": "Salli poisto",
      "allowDeleteTip": "Toiminto, joka sallii käyttäjän poistaa kohteen. Se on pois käytöstä, jos karttataso ei mahdollista poistamista",
      "edit": "Muokattavissa",
      "editTip": "Toiminto, joka sisällyttä karttatason pienoisohjelmaan",
      "label": "Karttataso",
      "labelTip": "Karttatason nimi karttaan määritetyssä muodossa",
      "update": "Poista geometrian muokkaus käytöstä",
      "updateTip": "Toiminto, joka estää geometrian siirtämisen sen asettamisen jälkeen tai geometrian siirtämisen olemassa olevaan kohteeseen",
      "allowUpdateOnly": "Vain päivitys",
      "allowUpdateOnlyTip": "Toiminto, joka sallii vain olemassa olevien kohteiden muokkauksen. Se on valittuna oletusarvoisesti ja poistetaan käytöstä, jos karttataso ei mahdollista uusien kohteiden luomista",
      "fieldsTip": "Muokkaa muokattavia kenttiä ja määritä älykkäät ominaisuudet",
      "actionsTip": "Asetus, jonka avulla voi muokata kenttiä tai käyttää liittyviä karttatasoja tai taulukoita",
      "description": "Kuvaus",
      "descriptionTip": "Asetus näyttää kirjoitetun tekstin ominaisuussivun yläosassa.",
      "relationTip": "Näytä liittyvät karttatasot ja taulukot"
    },
    "editFieldError": "Kentän muokkaukset ja älykkäät ominaisuudet eivät ole käytettävissä karttatasoissa, joita ei voi muokata",
    "noConfigedLayersError": "Älykäs muokkausohjelma edellyttää vähintään yhtä muokattavaa karttatasoa"
  },
  "editDescriptionPage": {
    "title": "Määritä ominaisuuden yleiskatsausteksti karttatasolle <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Määritä kentät karttatasolle <b>${layername}</b>",
    "copyActionTip": "Ominaisuustietotoiminnot",
    "description": "Käytä Toiminnot-muokkauspainiketta, kun haluat aktivoida älykkäät ominaisuudet karttatasossa. Älykkäät ominaisuudet voivat edellyttää, piilottaa tai poistaa kentän käytöstä muiden kenttien arvojen perusteella. Käytä Toiminnot-kopiointipainiketta, kun haluat aktivoida ja määrittää kenttäarvon lähteen risteyksen, osoitteen, koordinaattien ja esiasetusten perusteella.",
    "fieldsNotes": "* on pakollinen kenttä. Jos poistat Näytä-valinnan tämän kentän kohdalta ja muokkausmalli ei luo tätä kentän arvoa, et pysty tallentamaan uutta tietuetta.",
    "smartAttachmentText": "Määritä Älykkäät liitteet -toiminto",
    "smartAttachmentPopupTitle": "Määritä älykkäät liitteet karttatasolle <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Näytä",
      "displayTip": "Määritä, näkyykö kenttä",
      "edit": "Muokattavissa",
      "editTip": "Valitse tämä, jos kenttä on ominaisuustietomuodossa",
      "fieldName": "Nimi",
      "fieldNameTip": "Tietokantaan määritetty kentän nimi",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Karttaan määritetty kentän nimi",
      "canPresetValue": "Esiasetus",
      "canPresetValueTip": "Toiminto, joka näyttää kentän esiasetuskenttien luettelossa ja sallii käyttäjän määrittää arvo ennen muokkausta",
      "actions": "Toiminnot",
      "actionsTip": "Muuta kenttien järjestystä tai aseta älykkäät ominaisuudet käyttöön"
    },
    "smartAttSupport": "Älykkäät ominaisuudet -toimintoa ei tueta pakollisissa tietokannan kentissä"
  },
  "actionPage": {
    "title": "Määritä ominaisuustietotoiminnot kentälle <b>${fieldname}</b>",
    "description": "Toiminnot ovat aina pois käytöstä, ellet määritä ehtoja, joiden perusteella ne käynnistetään. Toiminnot käsitellään järjestyksessä, ja kenttää kohti käynnistetään vain yksi toiminto. Voit määrittää ehdot ehtojen muokkauspainikkeella.",
    "actionsSettingsTable": {
      "rule": "Toiminto",
      "ruleTip": "Toiminto suoritetaan, kun ehdot täyttyvät",
      "expression": "Lauseke",
      "expressionTip": "SQL-muodossa oleva määritettyjen ehtojen perusteella syntyvä lauseke",
      "actions": "Hakuperusteet",
      "actionsTip": "Muuta säännön järjestystä ja määritä ehdot, kun se käynnistetään."
    },
    "copyAction": {
      "description": "Kenttäarvon lähteet käsitellään järjestyksessä, jos ne on aktivoitu, kunnes kelvollinen ehto täyttyy tai luettelo on käyty loppuun. Voit määrittää ehdot ehtojen muokkauspainikkeella.",
      "intersection": "Risteys",
      "coordinates": "Koordinaatit",
      "address": "Osoite",
      "preset": "Esiasetus",
      "actionText": "Toiminnot",
      "criteriaText": "Hakuperusteet",
      "enableText": "Käytössä"
    },
    "actions": {
      "hide": "Piilota",
      "required": "Pakollinen",
      "disabled": "Poissa käytöstä"
    }
  },
  "filterPage": {
    "submitHidden": "Lähetetäänkö tälle kentälle ominaisuustiedot myös, kun se on piilotettu?",
    "title": "Määritä lauseke säännölle ${action}",
    "filterBuilder": "Aseta kentälle tehtävä toiminto, kun tietue vastaa ${any_or_all} seuraavaa lauseketta",
    "noFilterTip": "Määritä alla olevien työkalujen avulla lauseke sitä tilannetta varten, kun toiminto on aktiivinen."
  },
  "geocoderPage": {
    "setGeocoderURL": "Määritä geokooderin URL-osoite",
    "hintMsg": "Huomautus: Olet muuttamassa geokoodauspalvelua. Varmista, että päivität määrittämäsi geokooderin kenttämääritykset.",
    "invalidUrlTip": "Syötetty URL-osoite ${URL} on virheellinen, tai se ei ole käytettävissä."
  },
  "addressPage": {
    "popupTitle": "Osoite",
    "checkboxLabel": "Nouda arvo geokooderista",
    "selectFieldTitle": "Ominaisuustieto:",
    "geocoderHint": "Jos haluat vaihtaa geokooderin, valitse yleisten asetusten Geokooderin asetukset -painike"
  },
  "coordinatesPage": {
    "popupTitle": "Koordinaatit",
    "checkboxLabel": "Nouda koordinaatit",
    "coordinatesSelectTitle": "Koordinaattijärjestelmä:",
    "coordinatesAttributeTitle": "Ominaisuustieto:",
    "mapSpatialReference": "Kartan koordinaatistotieto",
    "latlong": "Leveysaste/Pituusaste"
  },
  "presetPage": {
    "popupTitle": "Esiasetus",
    "checkboxLabel": "Kentän arvo määritetään ennalta",
    "presetValueLabel": "Nykyinen esiasetusarvo on:",
    "changePresetValueHint": "Jos haluat muuttaa tämän esiasetusarvon, valitse yleisten asetusten Määritä esiasetusarvot -painike"
  },
  "intersectionPage": {
    "checkboxLabel": "Nouda arvo leikkaavan karttatason kentästä",
    "layerText": "Karttatasot",
    "fieldText": "Kentät",
    "actionsText": "Toiminnot",
    "addLayerLinkText": "Lisää karttataso"
  },
  "presetAll": {
    "popupTitle": "Määritä oletusarvoiset esiasetusarvot",
    "deleteTitle": "Poista esiasetusarvo",
    "hintMsg": "Kaikki yksilölliset esiasetusten kenttien nimet on lueteltu tässä. Esiasetetun kentän poistaminen poistaa vastaavan kentän käytöstä esiasetuksena kaikista karttatasoista ja taulukoista."
  }
});