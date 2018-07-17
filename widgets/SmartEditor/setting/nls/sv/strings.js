define({
  "layersPage": {
    "allLayers": "Alla lager",
    "title": "Välj en mall för att skapa geoobjekt",
    "generalSettings": "Allmänna inställningar",
    "layerSettings": "Lagerinställningar",
    "presetValueText": "Definiera förinställda värden",
    "geocoderSettingsText": "Inställningar för geokodning",
    "editDescription": "Ange visningstext för redigeringspanelen",
    "editDescriptionTip": "Den här texten visas ovanför mallväljaren. Lämna tomt om ingen text ska visas.",
    "promptOnSave": "Uppmana användaren att spara osparade ändringar när formuläret stängs eller vid övergång till nästa post.",
    "promptOnSaveTip": "Visa en uppmaning när användaren klickar på Stäng eller navigerar till nästa redigerbara post, om det finns ändringar som inte har sparats i det aktuella geoobjektet.",
    "promptOnDelete": "Begär bekräftelse innan en post tas bort.",
    "promptOnDeleteTip": "Visa en uppmaning om att bekräfta åtgärden när användaren klickat på Ta bort.",
    "removeOnSave": "Ta bort geoobjektet ur urvalet när posten sparas.",
    "removeOnSaveTip": "Alternativ för att ta bort geoobjektet ur urvalsuppsättningen när posten sparas. Om det är den enda valda posten återgår panelen till mallsidan.",
    "useFilterEditor": "Använd mallfilter för geoobjekt",
    "useFilterEditorTip": "Alternativ för att använda filtermallväljaren som ger möjlighet att visa ett lagers mall eller söka efter mallar utifrån namn.",
    "displayShapeSelector": "Visa ritalternativ",
    "displayShapeSelectorTip": "Alternativ för att visa en lista med giltiga ritalternativ för den valda mallen.",
    "displayPresetTop": "Visa lista med förinställda värden överst",
    "displayPresetTopTip": "Alternativ för att visa listan med förinställda värden över mallväljaren.",
    "listenToGroupFilter": "Tillämpa filtreringsvärden från gruppfiltreringswidgeten på förinställda fält",
    "listenToGroupFilterTip": "När ett filter används i gruppfiltreringswidgeten tillämpas värdet på ett matchande fält i listan över förinställda värden.",
    "keepTemplateActive": "Låt den markerade mallen vara aktiv",
    "keepTemplateActiveTip": "Om en mall har valts tidigare när mallväljlaren visas, väljer du den.",
    "geometryEditDefault": "Aktivera geometriredigering som standard",
    "autoSaveEdits": "Sparar ändringen automatiskt",
    "enableAttributeUpdates": "Visa uppdateringsknappen Attributåtgärder när redigera geometri är aktivt",
    "layerSettingsTable": {
      "allowDelete": "Tillåt borttagning",
      "allowDeleteTip": "Alternativ för att låta användaren ta bort ett geoobjekt – inaktiverat om lagret inte medger borttagning",
      "edit": "Redigerbar",
      "editTip": "Alternativ för att ta med lagret i widgeten",
      "label": "Lager",
      "labelTip": "Lagrets namn som det anges på kartan",
      "update": "Inaktivera geometriredigering",
      "updateTip": "Alternativ för att inaktivera möjligheten att flytta geometrin när den placerats eller geometrin på ett befintligt geoobjekt",
      "allowUpdateOnly": "Endast uppdatering",
      "allowUpdateOnlyTip": "Alternativ för att endast tillåta ändring av befintliga geoobjekt – markerat som standard och inaktiverat om det inte går att skapa nya geoobjekt i lagret",
      "fieldsTip": "Modifiera fälten som ska redigeras och definiera smarta attribut",
      "actionsTip": "Alternativ för att redigera fält eller få åtkomst till relaterade lager/tabeller",
      "description": "Beskrivning",
      "descriptionTip": "Alternativ för att ange text som ska visas överst på attributsidan.",
      "relationTip": "Visa relaterade lager och tabeller"
    },
    "editFieldError": "Fältmodifieringar och smarta attribut är inte tillgängliga för lager som inte kan redigeras",
    "noConfigedLayersError": "Smart redigerare kräver ett eller flera redigerbara lager"
  },
  "editDescriptionPage": {
    "title": "Definiera attributöversiktstext för <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Konfigurera fält för <b>${layername}</b>",
    "copyActionTip": "Attributåtgärder",
    "description": "Använd redigeringsknappen Åtgärder för att aktivera smarta attribut på ett lager. De smarta attributen kan kräva, dölja eller inaktivera ett fält baserat på värdena i andra fält. Använd knappen Kopiera åtgärder för att aktivera och definiera fältvärdets källa utifrån korsning, adress, koordinater och förinställning.",
    "fieldsNotes": "* är ett obligatoriskt fält. Om du avmarkerar Visa för detta fält, och redigeringsmallen inte fyller i fältvärdet, kan du inte spara en ny post.",
    "smartAttachmentText": "Konfigurera åtgärd för smarta bilagor",
    "smartAttachmentPopupTitle": "Konfigurera smarta bilagor för <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Visa",
      "displayTip": "Ange om fältet inte är synligt",
      "edit": "Redigerbar",
      "editTip": "Markera om fältet finns i attributformuläret",
      "fieldName": "Namn",
      "fieldNameTip": "Fältets namn som det anges i geodatabasen",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Fältets namn som det anges på kartan",
      "canPresetValue": "Förinställning",
      "canPresetValueTip": "Alternativ för att visa fältet i den förinställda fältlistan och låta användaren ange värdet före redigering",
      "actions": "Åtgärder",
      "actionsTip": "Ändra fältens ordning eller gör inställningar för smarta attribut"
    },
    "smartAttSupport": "Smarta attribut kan inte användas för obligatoriska databasfält"
  },
  "actionPage": {
    "title": "Konfigurera attributåtgärder för <b>${fieldname}</b>",
    "description": "Åtgärderna är alltid inaktiva om du inte anger villkor som utlöser dem. Åtgärderna bearbetas i ordningsföljd och endast en åtgärd kan utlösas per fält. Ange villkor med knappen för villkorsredigering.",
    "actionsSettingsTable": {
      "rule": "Åtgärd",
      "ruleTip": "Åtgärden utförs när villkoren är uppfyllda",
      "expression": "Uttryck",
      "expressionTip": "Resultatuttrycket i SQL-format från angivna villkor",
      "actions": "Villkor",
      "actionsTip": "Ändra ordningen i regeln och ange villkor för när den ska utlösas"
    },
    "copyAction": {
      "description": "Fältvärdets källa bearbetas i turordning om det är aktiverat tills dess att ett giltigt villkor utlöses eller listan är slutförd. Ange villkor med knappen för villkorsredigering.",
      "intersection": "Korsning",
      "coordinates": "Koordinater",
      "address": "Adress",
      "preset": "Förinställning",
      "actionText": "Åtgärder",
      "criteriaText": "Villkor",
      "enableText": "Aktiverad"
    },
    "actions": {
      "hide": "Dölj",
      "required": "Nödvändig",
      "disabled": "Inaktiverad"
    }
  },
  "filterPage": {
    "submitHidden": "Skicka attributdata för detta fält även om det är dolt?",
    "title": "Konfigurera uttryck för regeln ${action}",
    "filterBuilder": "Ange åtgärd för fältet när posten matchar ${any_or_all} av följande uttryck",
    "noFilterTip": "Använd verktygen nedan för att definiera påståendet för när åtgärden är aktiv."
  },
  "geocoderPage": {
    "setGeocoderURL": "Ange URL till geokodare",
    "hintMsg": "Obs! Du ändrar nu geokodningstjänsten, så se även till att du uppdaterar eventuella fältkarteringar för geokodning som du har konfigurerat.",
    "invalidUrlTip": "URL:en ${URL} är ogiltig eller går inte att öppna."
  },
  "addressPage": {
    "popupTitle": "Adress",
    "checkboxLabel": "Hämta värdet från geokodningstjänsten",
    "selectFieldTitle": "Attribut:",
    "geocoderHint": "Du kan ändra geokodningstjänsten med knappen Inställningar för geokodning i de allmänna inställningarna"
  },
  "coordinatesPage": {
    "popupTitle": "Koordinater",
    "checkboxLabel": "Hämta koordinater",
    "coordinatesSelectTitle": "Koordinatsystem:",
    "coordinatesAttributeTitle": "Attribut:",
    "mapSpatialReference": "Kartans geografiska referens",
    "latlong": "Latitud/longitud"
  },
  "presetPage": {
    "popupTitle": "Förinställning",
    "checkboxLabel": "Fältet är förinställt",
    "presetValueLabel": "Det aktuella förinställda värdet är:",
    "changePresetValueHint": "Det förinställda värdet kan ändras med knappen Definiera förinställda värden i de allmänna inställningarna"
  },
  "intersectionPage": {
    "checkboxLabel": "Hämta värde från korsningslagrets fält",
    "layerText": "Lager",
    "fieldText": "Fält",
    "actionsText": "Åtgärder",
    "addLayerLinkText": "Lägg till ett lager"
  },
  "presetAll": {
    "popupTitle": "Definiera de förinställda standardvärdena",
    "deleteTitle": "Ta bort förinställt värde",
    "hintMsg": "Alla unika förinställda fältnamn visas här. Om förinställda fält tas bort så inaktiveras respektive förinställda fält i alla lager/tabeller."
  }
});