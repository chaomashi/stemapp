define({
  "layersPage": {
    "allLayers": "Všechny vrstvy",
    "title": "Zvolte šablonu, podle které chcete vytvářet prvky.",
    "generalSettings": "Obecná nastavení",
    "layerSettings": "Nastavení vrstvy",
    "presetValueText": "Definovat hodnoty předvoleb",
    "geocoderSettingsText": "Nastavení služby Geocoder",
    "editDescription": "Zadejte text zobrazení pro panel úprav.",
    "editDescriptionTip": "Tento text se zobrazí nad nástrojem pro volbu šablon. Pokud nechcete použít žádný text, ponechte pole prázdné.",
    "promptOnSave": "Vyzve k uložení neuložených úprav, pokud formulář zavřete nebo přepnete na další záznam.",
    "promptOnSaveTip": "Zobrazí výzvu, když uživatel kliknutím obsah uzavře nebo přejde k dalšímu editovatelnému záznamu, pokud aktuální prvek obsahuje neuložené změny.",
    "promptOnDelete": "Při odstranění záznamu bude vyžadováno potvrzení.",
    "promptOnDeleteTip": "Zobrazí výzvu k potvrzení akce, pokud se uživatel kliknutím pokusí o odstranění.",
    "removeOnSave": "Při uložení se prvek odebere z výběru.",
    "removeOnSaveTip": "Možnost odstranit prvek ze sady výběru po uložení záznamu. Pokud jde o jediný vybraný záznam, panel se přepne zpět na stránku šablony.",
    "useFilterEditor": "Použít filtr šablon prvků",
    "useFilterEditorTip": "Možnost použít nástroj pro volbu šablon filtru, která umožňuje zobrazit šablonu jedné vrstvy nebo vyhledávat šablony podle názvu.",
    "displayShapeSelector": "Zobrazit možnosti kreslení",
    "displayShapeSelectorTip": "Možnost zobrazení seznamu platných možností kreslení pro zvolenou šablonu.",
    "displayPresetTop": "Zobrazit nahoře seznam přednastavených hodnot",
    "displayPresetTopTip": "Možnost zobrazit seznam přednastavených hodnot na nástroji pro volbu šablon",
    "listenToGroupFilter": "Použít hodnoty filtrů z widgetu Filtr skupin na přednastavená pole",
    "listenToGroupFilterTip": "Po aplikaci filtru na widget Filtr skupin aplikuje hodnotu na odpovídající pole v seznamu přednastavených polí.",
    "keepTemplateActive": "Ponechat vybranou šablonu aktivní",
    "keepTemplateActiveTip": "Když je zobrazen nástroj pro volbu šablon a šablona byla dříve vybrána, vybere se znovu.",
    "geometryEditDefault": "Standardně povolit úpravy geometrie",
    "autoSaveEdits": "Automaticky uloží úpravu",
    "enableAttributeUpdates": "Zobrazit tlačítko aktualizace Akcí atributů, pokud je aktivní volba editace geometrie",
    "layerSettingsTable": {
      "allowDelete": "Povolit odstranění",
      "allowDeleteTip": "Umožňuje uživatelům odstranit prvek; tato možnost je zakázána, pokud vrstva nepodporuje odstraňování.",
      "edit": "Editovatelné",
      "editTip": "Možnost zahrnout vrstvu ve widgetu.",
      "label": "Vrstva",
      "labelTip": "Název vrstvy podle definice v mapě.",
      "update": "Zakázat editaci geometrie",
      "updateTip": "Možnost zakázat přesouvání geometrie po umístění nebo přesouvání geometrie na existující prvek.",
      "allowUpdateOnly": "Pouze aktualizace",
      "allowUpdateOnlyTip": "Možnost povolit pouze úpravy existujících funkcí. Ve výchozím nastavení je tato možnost povolena. Je zakázána, pokud vrstva nepodporuje vytváření nových funkcí",
      "fieldsTip": "Umožňuje upravit pole, která budou editována, a definovat chytré atributy.",
      "actionsTip": "Možnost upravit pole nebo přejít na související vrstvy/tabulky",
      "description": "Popis",
      "descriptionTip": "Možnost zadat text, který se zobrazí v horní části stránky atributů.",
      "relationTip": "Zobrazit související vrstvy/tabulky"
    },
    "editFieldError": "Úprava polí a chytré atributy nejsou k dispozici u vrstev, které nejsou editovatelné.",
    "noConfigedLayersError": "Smart Editor vyžaduje jednu či více editovatelných vrstev."
  },
  "editDescriptionPage": {
    "title": "Definujte text přehledu atributů pro vrstvu <b>${layername}</b> "
  },
  "fieldsPage": {
    "title": "Konfigurujte pole pro vrstvu <b>${layername}</b>",
    "copyActionTip": "Akce atributů",
    "description": "Pro aktivaci Chytrých atributů vrstvy použijte tlačítko Upravit akce. Chytré atributy umí vyžadovat, skrýt či zakázat pole na základě hodnot v dalších polích. Použijte tlačítko Kopírovat akce, pokud si přejete aktivovat a definovat zdroj hodnoty pole pomocí průsečíků, adresy, souřadnic a předvolby.",
    "fieldsNotes": "Pole označené hvězdičkou (*) je povinné pole. Zobrazení tohoto pole a editace šablony nevyplní hodnotu tohoto pole, nebudete moci uložit nový záznam.",
    "smartAttachmentText": "Konfigurovat akci chytrých Vazeb",
    "smartAttachmentPopupTitle": "Konfigurovat chytré vazby pro <b>${layername}</b>",
    "fieldsSettingsTable": {
      "display": "Zobrazení",
      "displayTip": "Určuje, zda je pole viditelné.",
      "edit": "Editovatelné",
      "editTip": "Označte, pokud se pole nachází ve formuláři atributů.",
      "fieldName": "Název",
      "fieldNameTip": "Název pole definovaný v databázi",
      "fieldAlias": "Alternativní jméno",
      "fieldAliasTip": "Název pole definovaný v mapě",
      "canPresetValue": "Přednastavené",
      "canPresetValueTip": "Možnost zobrazit pole v seznamu přednastavených polí a umožnit uživatelům nastavit hodnotu před zahájením editace.",
      "actions": "Akce",
      "actionsTip": "Umožňuje měnit pořadí polí nebo nastavovat chytré atributy."
    },
    "smartAttSupport": "Chytré atributy nejsou podporovány u vyžadovaných polí databáze."
  },
  "actionPage": {
    "title": "Konfigurovat Akce atributů pro <b>${fieldname}</b>",
    "description": "Tyto akce jsou vždy vypnuty, nezadáte-li kritéria, která je spustí. Tyto akce jsou zpracovány v pořadí a spustí se pouze jedna akce na pole. Kritéria definujete pomocí tlačítka Kritéria.",
    "actionsSettingsTable": {
      "rule": "Akce",
      "ruleTip": "Akce provedená po splnění kritéria",
      "expression": "Výraz",
      "expressionTip": "Výsledný výraz ve formátu SQL z definovaného kritéria",
      "actions": "Kritéria",
      "actionsTip": "Změňte pořadí pravidla a definujte kritéria po jeho spuštění"
    },
    "copyAction": {
      "description": "Zdroje hodnot polí se zpracovávají v daném pořadí, pokud je aktivováno, dokud nedojde k spuštění platného kritéria nebo není dokončen seznam. Pokud si přejete definovat kritéria, použijte tlačítko Úprava kritérií.",
      "intersection": "Průsečík",
      "coordinates": "Souřadnice",
      "address": "Adresa",
      "preset": "Přednastavené",
      "actionText": "Akce",
      "criteriaText": "Kritéria",
      "enableText": "Povoleno"
    },
    "actions": {
      "hide": "Skrýt",
      "required": "Požadováno",
      "disabled": "Nepovoleno"
    }
  },
  "filterPage": {
    "submitHidden": "Odeslat atributová data pro toto pole i pokud je skryté?",
    "title": "Konfigurace výrazu pro pravidlo ${fiction}",
    "filterBuilder": "Nastavte akci u pole, pokud se záznam shoduje s ${any_or_all} z následujících výrazů",
    "noFilterTip": "Pomocí níže umístěných nástrojů definujte podmínku pro situaci, kdy je akce aktivní."
  },
  "geocoderPage": {
    "setGeocoderURL": "Nastavit adresu URL geokodéru",
    "hintMsg": "Poznámka: Provádíte změnu služby geocoder. Ujistěte se prosím, že jste aktualizovali veškerá mapování polí geocoder, které jste konfigurovali.",
    "invalidUrlTip": "Adresa URL ${URL} je neplatná nebo nepřístupná."
  },
  "addressPage": {
    "popupTitle": "Adresa",
    "checkboxLabel": "Získat hodnotu ze služby Geocoder",
    "selectFieldTitle": "Atribut:",
    "geocoderHint": "Pokud si přejete provést změnu služby geocoder, přejděte do všeobecných nastavení a použijte tlačítko ‚Nastavení služby geocoder‘"
  },
  "coordinatesPage": {
    "popupTitle": "Souřadnice",
    "checkboxLabel": "Získat souřadnice",
    "coordinatesSelectTitle": "Souřadnicový systém:",
    "coordinatesAttributeTitle": "Atribut:",
    "mapSpatialReference": "Souřadnicový systém mapy",
    "latlong": "zeměpisné šířky/délky"
  },
  "presetPage": {
    "popupTitle": "Přednastavené",
    "checkboxLabel": "Pole bude nastaveno jako předvolba",
    "presetValueLabel": "Aktuální hodnota předvolby je:",
    "changePresetValueHint": "Pokud si přejete tuto hodnotu předvolby změnit, přejděte do všeobecných nastavení a použijte tlačítko ‚Definovat hodnoty předvoleb‘"
  },
  "intersectionPage": {
    "checkboxLabel": "Získat hodnotu z pole vrstvy křížení",
    "layerText": "Vrstvy",
    "fieldText": "Pole",
    "actionsText": "Akce",
    "addLayerLinkText": "Přidat vrstvu"
  },
  "presetAll": {
    "popupTitle": "Definovat výchozí hodnoty předvoleb",
    "deleteTitle": "Odstranit hodnotu předvolby",
    "hintMsg": "V tomto seznamu jsou uvedeny veškeré jedinečné názvy předvoleb. Pokud odstraníte pole předvolby, dojde k zákazu dotyčného pole jako předvolby ve všech vrstvách/tabulkách."
  }
});