define({
  "layersPage": {
    "allLayers": "Alle lagen",
    "title": "Selecteer template voor het maken van objecten",
    "generalSettings": "Algemene instellingen",
    "layerSettings": "Laaginstellingen",
    "presetValueText": "Vooraf ingestelde waarden bepalen",
    "geocoderSettingsText": "Geocodeerinstellingen",
    "editDescription": "Geef displaytekst op voor paneel bewerken",
    "editDescriptionTip": "Deze tekst wordt weergegeven boven de Template picker, laat dit veld leeg voor geen tekst.",
    "promptOnSave": "Vraag om onopgeslagen bewerkingen op te slaan als het formulier wordt gesloten of bij overschakelen naar het volgende record.",
    "promptOnSaveTip": "Toont een vraag als de gebruiker klikt, afsluit of naar het volgende bewerkbare record gaat als het huidige object bewerkingen bevat die nog niet zijn opgeslagen.",
    "promptOnDelete": "Bevestiging is nodig voor het verwijderen van een record.",
    "promptOnDeleteTip": "Toont een prompt als de gebruiker op verwijderen klikt om de actie te bevestigen.",
    "removeOnSave": "Verwijder object van selectie bij opslaan.",
    "removeOnSaveTip": "Optie om het object te verwijderen uit de selectie ingesteld als de record wordt opgeslagen. Als dit het enige geselecteerde record is, schakelt het paneel terug naar de template-pagina.",
    "useFilterEditor": "Gebruik objecttemplatefilter",
    "useFilterEditorTip": "Optie om de Filter Template kiezer te gebruiken die de mogelijkheid biedt om de template van één laag te bekijken of op naam te zoeken naar templates.",
    "displayShapeSelector": "Tekenopties weergeven",
    "displayShapeSelectorTip": "Optie om een ​​lijst met geldige tekenopties voor de geselecteerde template weer te geven.",
    "displayPresetTop": "Toon de vooraf ingestelde waardenlijst bovenaan",
    "displayPresetTopTip": "Optie om de vooraf ingestelde waardenlijst boven de templatepicker te tonen.",
    "listenToGroupFilter": "Filterwaarden van de widget Groepfilter op Vooraf ingestelde velden toepassen",
    "listenToGroupFilterTip": "Als er een filter wordt toegepast in de widget Groepfilter, pas de waarde dan toe op een overeenkomstig veld in de lijst met Vooraf ingestelde waarden.",
    "keepTemplateActive": "Houd geselecteerde template actief",
    "keepTemplateActiveTip": "Als de templatekeuze weergegeven wordt, en als een template voordien geselecteerd werd, selecteer het dan nogmaals.",
    "geometryEditDefault": "Geometrie bewerken standaard inschakelen",
    "autoSaveEdits": "Slaat automatisch het bewerken op",
    "enableAttributeUpdates": "Toont updateknop voor Attribuutacties als bewerken van geometie actief is",
    "layerSettingsTable": {
      "allowDelete": "Verwijderen toestaan",
      "allowDeleteTip": "Optie om de gebruiker een object te laten verwijderen; uitgeschakeld als de laag verwijderen niet ondersteunt",
      "edit": "Bewerkbaar",
      "editTip": "Optie om de laag op te nemen in de widget",
      "label": "Kaartlaag",
      "labelTip": "Naam van de laag zoals gedefinieerd in de kaart",
      "update": "Geometrie bewerken uitschakelen",
      "updateTip": "Optie voor het uitschakelen van de mogelijkheid om de geometrie te verplaatsen of de geometrie van een bestaand object te verplaatsen",
      "allowUpdateOnly": "Alleen bijwerken",
      "allowUpdateOnlyTip": "Optie om alleen het wijzigen van bestaande objecten mogelijk te maken, standaard aangevinkt en uitgeschakeld als de laag het maken van nieuwe objecten niet ondersteunt",
      "fieldsTip": "Wijzig de velden om te bewerken en definieer Slimme attributen",
      "actionsTip": "Optie om velden te bewerken of gerelateerde lagen/tabellen te openen",
      "description": "Beschrijving",
      "descriptionTip": "Optie om tekst in te voeren die u wilt weergeven aan de bovenkant van de attribuutpagina.",
      "relationTip": "Gerelateerde lagen en tabellen weergeven"
    },
    "editFieldError": "Veldwijzigingen en slimme attributen zijn niet beschikbaar voor lagen die niet bewerkbaar zijn",
    "noConfigedLayersError": "Smart Editor vereist een of meerdere bewerkbare lagen"
  },
  "editDescriptionPage": {
    "title": "Definieer de attribuutoverzichttekst voor <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Configureer velden voor <b>${layernaam}</b>",
    "copyActionTip": "Attribuutacties",
    "description": "Gebruik de Acties bewerken knop om Slimme Attributen op een laag te activeren. De Slimme Attributen kunnen een veld vereisen, verbergen of uitschakelen op basis van waarden in andere velden. Gebruik de Acties kopiëren knop om veldwaardebronnen te activeren en bepalen op kruispunt, adres, coördinaten en vooraf ingesteld.",
    "fieldsNotes": "* is een verplicht veld. Als u het selectievakje Voor dit veld tonen weghaalt en template bewerken vult de veldwaarde niet in, dan kunt u geen nieuw record opslaan.",
    "smartAttachmentText": "De slimme Bijlagen actie configureren",
    "smartAttachmentPopupTitle": "Slimme bijlagen configureren voor <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Weergeven",
      "displayTip": "Bepaal of het veld niet zichtbaar is",
      "edit": "Bewerkbaar",
      "editTip": "Controleer of het veld aanwezig is in het attribuutformulier",
      "fieldName": "Naam",
      "fieldNameTip": "Naam van het veld gedefinieerd in de database",
      "fieldAlias": "Alias",
      "fieldAliasTip": "Naam van het veld gedefinieerd in de kaart",
      "canPresetValue": "Voorinstelling",
      "canPresetValueTip": "Optie om het veld weer te geven in de vooringestelde veldlijst en laat de gebruiker de waarde instellen voor bewerken",
      "actions": "Acties",
      "actionsTip": "Wijzig de volgorde van de velden of stel Slimme attributen in"
    },
    "smartAttSupport": "Slimme attributen worden niet ondersteund op de vereiste databasevelden"
  },
  "actionPage": {
    "title": "Attribuutacties configureren voor <b>${fieldname}</b>",
    "description": "De acties staan altijd uit, tenzij u de criteria opgeeft waarmee ze worden geactiveerd. De acties worden verwerkt op volgorde en slechts één actie wordt geactiveerd per veld. Gebruik de knop Criteria bewerken om de criteria vast te stellen.",
    "actionsSettingsTable": {
      "rule": "Actie",
      "ruleTip": "Actie uitgevoerd als aan de criteria is voldaan",
      "expression": "Expressie",
      "expressionTip": "De resulterende expressie in SQL-indeling van de gedefinieerde criteria",
      "actions": "Criteria",
      "actionsTip": "Wijzig de volgorde van de regels en definieer de criteria als ze geactiveerd worden"
    },
    "copyAction": {
      "description": "Veldwaardebronnen worden in volgorde verwerkt indien geactiveerd, tot een geldig criterium geactiveerd wordt of de lijst afgewerkt is. Gebruik de knop Criteria bewerken om de criteria te bepalen.",
      "intersection": "Kruispunt",
      "coordinates": "Coördinaten",
      "address": "Adres",
      "preset": "Voorinstelling",
      "actionText": "Acties",
      "criteriaText": "Criteria",
      "enableText": "Ingeschakeld"
    },
    "actions": {
      "hide": "Verbergen",
      "required": "Vereist",
      "disabled": "Uitgeschakeld"
    }
  },
  "filterPage": {
    "submitHidden": "Attribuutgegevens indienen voor dit veld ook indien verborgen?",
    "title": "Configureer uitdrukking voor de ${action} regel",
    "filterBuilder": "Actie instellen op veld als de record overeenkomt met ${any_or_all} de volgende expressies",
    "noFilterTip": "Definieer met de onderstaande tools de verklaring voor als de actie actief is."
  },
  "geocoderPage": {
    "setGeocoderURL": "Geocoder-URL instellen",
    "hintMsg": "Opmerking: U staat op het punt de geocodeerservice te wijzigen; zorg ervoor dat u ook alle geocodeerveldmappings die u geconfigureerd hebt bijwerkt.",
    "invalidUrlTip": "De URL ${URL} is ongeldig of ontoegankelijk."
  },
  "addressPage": {
    "popupTitle": "Adres",
    "checkboxLabel": "Waarde ophalen van de Geocoder",
    "selectFieldTitle": "Attribuut:",
    "geocoderHint": "Om geocoder te wijzigen, ga naar de knop 'Geocoderinstellingen' in Algemene instellingen"
  },
  "coordinatesPage": {
    "popupTitle": "Coördinaten",
    "checkboxLabel": "Coördinaten ophalen",
    "coordinatesSelectTitle": "Coördinatensysteem",
    "coordinatesAttributeTitle": "Attribuut:",
    "mapSpatialReference": "Ruimtelijke referentie van de kaart",
    "latlong": "Breedtegraad/lengtegraad"
  },
  "presetPage": {
    "popupTitle": "Voorinstelling",
    "checkboxLabel": "Veld zal vooraf ingesteld worden",
    "presetValueLabel": "Huidige vooraf ingestelde waarde is:",
    "changePresetValueHint": "Om deze waarde te wijzigen, ga naar de knop 'Vooraf ingestelde waarden bepalen' in Algemene instellingen"
  },
  "intersectionPage": {
    "checkboxLabel": "Waarde ophalen vanuit kruispuntlaagveld",
    "layerText": "Kaartlagen",
    "fieldText": "Velden",
    "actionsText": "Acties",
    "addLayerLinkText": "Een laag toevoegen"
  },
  "presetAll": {
    "popupTitle": "De standaard vooraf ingestelde waarden bepalen",
    "deleteTitle": "Vooraf ingestelde waarde verwijderen",
    "hintMsg": "Alle unieke vooraf ingestelde veldnamen zijn hier vermeld. Als u een vooraf ingesteld veld verwijdert, zal dit veld uitgeschakeld worden in alle lagen/tabellen."
  }
});