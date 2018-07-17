define({
  "layersPage": {
    "allLayers": "Alle lag",
    "title": "Vælg en skabelon til at oprette objekter med",
    "generalSettings": "Generelle indstillinger",
    "layerSettings": "Lagindstillinger",
    "presetValueText": "Definer forudindstillede værdier",
    "geocoderSettingsText": "Indstillinger for geokodningstjeneste",
    "editDescription": "Angiv visningstekst for redigeringspanelet",
    "editDescriptionTip": "Denne tekst vises oven over skabelonvælgeren. Du kan lade feltet være tomt, hvis du ikke ønsker nogen tekst.",
    "promptOnSave": "Prompt om at gemme ikke-gemte redigeringer, når formularen lukkes eller skifter til den næste post.",
    "promptOnSaveTip": "Viser en prompt, når brugeren klikker på luk eller navigerer til den næste redigérbare post, når det aktuelle objekt har ikke-gemte redigeringer.",
    "promptOnDelete": "Bed om bekræftelse, når der skal slettes en post.",
    "promptOnDeleteTip": "Vis en prompt, når brugeren klikker på slet for at bekræfte handlingen.",
    "removeOnSave": "Fjern objekt fra markeringen efter lagring.",
    "removeOnSaveTip": "Indstilling, der fjerner objektet fra den angivne markering, når posten gemmes. Hvis det er den eneste valgte post, skifter panelet tilbage til skabelonsiden.",
    "useFilterEditor": "Brug objektskabelonfilter",
    "useFilterEditorTip": "Indstilling, der bruger filterskabelonvælgeren, som giver mulighed for at få vist en skabelon for et enkelt lag eller søge efter skabeloner efter navn.",
    "displayShapeSelector": "Vis tegnefunktioner",
    "displayShapeSelectorTip": "Indstilling, der viser en liste med gyldige tegnefunktioner for den valgte skabelon.",
    "displayPresetTop": "Vis en liste med forudindstillede værdier øverst",
    "displayPresetTopTip": "Indstilling, der viser listen med forudindstillede værdier oven over skabelonvælgeren.",
    "listenToGroupFilter": "Anvend filterværdier fra Gruppefiltrerings-widget'en til de forudindstillede felter",
    "listenToGroupFilterTip": "Når der anvendes et filter i Gruppefiltrerings-widget'en, skal værdien anvendes til et tilsvarende felt på listen Foruddefineret værdi.",
    "keepTemplateActive": "Bevar den valgte skabelon som aktiv",
    "keepTemplateActiveTip": "Hvis der tidligere har været valgt en skabelon, når skabelonvælgeren vises, skal du vælge skabelonen igen.",
    "geometryEditDefault": "Aktivér geometri-redigering som standard",
    "autoSaveEdits": "Gemmer ændringerne automatisk",
    "enableAttributeUpdates": "Vis opdateringsknappen Attributhandlinger, når redigering af geometri er aktiv",
    "layerSettingsTable": {
      "allowDelete": "Tillad sletning",
      "allowDeleteTip": "Indstilling, der gør det muligt for brugeren at slette et objekt. Indstillingen deaktiveres, hvis laget ikke understøtter sletning",
      "edit": "Redigérbar",
      "editTip": "Indstilling, der omfatter laget i widget'en",
      "label": "Lag",
      "labelTip": "Navnet på laget, som det er defineret i kortet",
      "update": "Deaktivér geometriredigering",
      "updateTip": "Indstilling, der deaktiverer muligheden for at flytte geometrien, når den først er placeret, eller at flytte geometrien for et eksisterende objekt",
      "allowUpdateOnly": "Opdatér kun",
      "allowUpdateOnlyTip": "Indstilling, der kun tillader redigering af eksisterende objekter. Indstillingen er aktiveret som standard, og den deaktiveres, hvis laget ikke understøtter oprettelse af nye objekter",
      "fieldsTip": "Redigér de felter, der skal redigeres, og definér smarte attributter",
      "actionsTip": "Indstilling til redigering af felter eller adgang til tilknyttede lag/tabeller",
      "description": "Beskrivelse",
      "descriptionTip": "Indstilling til indtastning af tekst, der skal vises øverst på attributsiden.",
      "relationTip": "Få vist tilknyttede lag og tabeller"
    },
    "editFieldError": "Feltredigeringer og smarte attributter er ikke tilgængelige for lag, der ikke er redigérbare",
    "noConfigedLayersError": "Smart-redigering kræver et eller flere redigérbare lag"
  },
  "editDescriptionPage": {
    "title": "Definér attributoversigtsteksten for <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Konfigurér felter for <b>${layername}</b>",
    "copyActionTip": "Attributhandlinger",
    "description": "Brug knappen til redigering af handlinger til at aktivere smarte attributter for et lag. Smarte attributter kan gøre et felt påkrævet eller skjule eller deaktivere feltet ud fra værdierne i andre felter. Brug knappen til kopiering af handlinger til at aktivere og definere kilden til feltværdien efter gennemskæring, adresse, koordinater og forudindstilling.",
    "fieldsNotes": "* er et påkrævet felt. Hvis du fjerner markeringen af Vis for dette felt, og redigeringsskabelonen ikke udfylder den pågældende feltværdi, vil du ikke kunne gemme en ny post.",
    "smartAttachmentText": "Konfigurér handlingen smarte vedhæftninger",
    "smartAttachmentPopupTitle": "Konfigurér smarte vedhæftninger for <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Visning",
      "displayTip": "Bestem, om feltet skal være synlig eller ej",
      "edit": "Redigérbar",
      "editTip": "Markér, hvis feltet findes i attributform",
      "fieldName": "Navn",
      "fieldNameTip": "Navnet på feltet, som det er defineret i databasen",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Navnet på feltet, som det er defineret i kortet",
      "canPresetValue": "Forudindstillet",
      "canPresetValueTip": "Indstilling, der viser feltet i listen med forudindstillede felter og gør det muligt for brugeren at angive værdien før redigering",
      "actions": "Handlinger",
      "actionsTip": "Redigér felternes rækkefølge, eller definér smarte attributter"
    },
    "smartAttSupport": "Smarte attributter understøttes ikke for de påkrævede databasefelter"
  },
  "actionPage": {
    "title": "Konfigurér attributhandlingerne for <b>${fieldname}</b>",
    "description": "Handlingerne er altid deaktiverede, medmindre du angiver de kriterier, som skal udløse handlingerne. Handlingerne behandles i rækkefølge, og der udløses kun én handling pr. felt. Brug kriterieredigeringsknappen til at definere kriterierne.",
    "actionsSettingsTable": {
      "rule": "Handling",
      "ruleTip": "Handlingen udføres, når kriterierne er opfyldt",
      "expression": "Udtryk",
      "expressionTip": "Det resulterende udtryk i SQL-format ud fra de definerede kriterier",
      "actions": "Kriterier",
      "actionsTip": "Redigér rækkefølgen for reglerne, og definér kriterierne for, hvornår handlingen skal udløses"
    },
    "copyAction": {
      "description": "Kilder til feltværdier behandles i rækkefølge, hvis dette er aktiveret, indtil et gyldigt kriterium udløses, eller listen er afsluttet. Brug knappen til redigering af kriterier til at definere kriterierne.",
      "intersection": "Vejkryds",
      "coordinates": "Koordinater",
      "address": "Adresse",
      "preset": "Forudindstillet",
      "actionText": "Handlinger",
      "criteriaText": "Kriterier",
      "enableText": "Aktiveret"
    },
    "actions": {
      "hide": "Skjul",
      "required": "Krævet",
      "disabled": "Deaktiveret"
    }
  },
  "filterPage": {
    "submitHidden": "Send attributdata for dette felt, også når det er skjult?",
    "title": "Konfigurér udtryk for reglen ${action}",
    "filterBuilder": "Angiv handlingen for feltet, når posten svarer til ${any_or_all} af følgende udtryk",
    "noFilterTip": "Definér erklæringen for, hvornår handlingen er aktiv, ved hjælp af værktøjerne nedenfor."
  },
  "geocoderPage": {
    "setGeocoderURL": "Angiv geokodnings-URL",
    "hintMsg": "Bemærk: Du er ved at ændre geokodningstjenesten. Husk at opdatere eventuelle felt-mappings, som du har konfigureret.",
    "invalidUrlTip": "URL’en ${URL} er ugyldig eller utilgængelig."
  },
  "addressPage": {
    "popupTitle": "Adresse",
    "checkboxLabel": "hent værdi fra geokodningstjenesten",
    "selectFieldTitle": "Attribut:",
    "geocoderHint": "Hvis du vil ændre geokodningstjeneste, skal du gå til knappen for indstillinger for geokodningstjeneste under de generelle indstillinger"
  },
  "coordinatesPage": {
    "popupTitle": "Koordinater",
    "checkboxLabel": "Hent koordinater",
    "coordinatesSelectTitle": "Koordinatsystem:",
    "coordinatesAttributeTitle": "Attribut:",
    "mapSpatialReference": "Kort-spatial reference",
    "latlong": "Breddegrad/længdegrad"
  },
  "presetPage": {
    "popupTitle": "Forudindstillet",
    "checkboxLabel": "Feltet er forudindstillet",
    "presetValueLabel": "Den nuværende forudindstillede værdi er:",
    "changePresetValueHint": "Hvis du vil ændre denne forudindstillede værdi, skal du gå til knappen ’Definér forudindstillede værdier’ under de generelle indstillinger"
  },
  "intersectionPage": {
    "checkboxLabel": "Hent værdi fra gennemskæringslagets felt",
    "layerText": "Lag",
    "fieldText": "Felter",
    "actionsText": "Handlinger",
    "addLayerLinkText": "Tilføj et lag"
  },
  "presetAll": {
    "popupTitle": "Definer de forudindstillede standardværdier",
    "deleteTitle": "Slet den forudindstillede værdi",
    "hintMsg": "Navnet på alle unikke forudindstillede felter er angivet her. Fjernelse af et forudindstillet felt vil deaktivere det pågældende felt som forudindstillet fra alle lag/tabeller."
  }
});