define({
  "configText": "Níže definujte skupiny filtrů",
  "labels": {
    "groupName": "Název sady filtrů:",
    "groupNameTip": "Název filtru, ze kterého bude uživatel vybírat.",
    "groupDesc": "Popis:",
    "groupDescTip": "Popis sady filtrů",
    "groupOperator": "Přednastavený operátor:",
    "groupOperatorTip": "Možnost předdefinovat operátor filtru. Pokud není vybrán přednastavený operátor, použije filtr operátor rovná se.",
    "groupDefault": "Přednastavená hodnota:",
    "groupDefaultTip": "Možnost vybrat hodnotu z existující vrstvy",
    "sameLayerAppend": "Pokud je vrstva uvedena v seznamu víckrát než jednou:",
    "sameLayerConjunc": "Připojit pomocí:",
    "caseSearch": "Proveďte vyhledávání s rozlišováním malých a velkých písmen: "
  },
  "buttons": {
    "addNewGroup": "Přidejte novou skupinu",
    "addNewGroupTip": "Přidá novou sadu filtrů.",
    "addLayer": "Přidat vrstvu",
    "addLayerTip": "Přidá do sady filtrů vrstvu."
  },
  "inputs": {
    "groupName": "Pojmenujte svou skupinu",
    "groupDesc": "Popis vaší skupiny",
    "groupDefault": "Zadejte předdefinovanou hodnotu",
    "sameLayerAny": "Přiřadit jakýkoliv výraz",
    "sameLayerAll": "Přiřadit všechny výrazy",
    "simpleMode": "Spustit v jednoduchém zobrazení",
    "simpleModeTip": "Možnost zjednodušit nakonfigurované rozhraní widgetu. Když je zaškrtnuta, odstraní se z rozhraní rozbalovací seznam operátorů a tlačítka pro přidání kritérií.",
    "webmapAppendModeAny": "Připojit jakékoliv výrazy k existujícímu mapovému filtru",
    "webmapAppendModeAll": "Připojit všechny výrazy k existujícímu mapovému filtru",
    "webmapAppendModeTip": "Možnost připojit filtr nastavený na existující filtr webové mapy.",
    "persistOnClose": "Zachovat po zavření widgetu",
    "optionsMode": "Skrýt možnosti widgetu",
    "optionsModeTip": "Možnost zobrazit další nastavení widgetů. Pokud je zaškrtnuta, bude z rozhraní odstraněna a zakázána možnost ukládání a načítání definovaných filtrů a zachování filtru po zavření widgetu.",
    "optionOR": "'NEBO'",
    "optionAND": "A",
    "optionEQUAL": "JE ROVNO",
    "optionNOTEQUAL": "NENÍ ROVNO",
    "optionGREATERTHAN": "VĚTŠÍ NEŽ",
    "optionGREATERTHANEQUAL": "VĚTŠÍ NEŽ NEBO ROVNO",
    "optionLESSTHAN": "MENŠÍ NEŽ",
    "optionLESSTHANEQUAL": "MENŠÍ NEŽ NEBO ROVNO",
    "optionSTART": "ZAČÍNÁ NA",
    "optionEND": "KONČÍ NA",
    "optionLIKE": "OBSAHUJE",
    "optionNOTLIKE": "NEOBSAHUJE",
    "optionONORBEFORE": "JE V TERMÍNU NEBO PŘED",
    "optionONORAFTER": "JE V TERMÍNU NEBO PO",
    "optionNONE": "Žádný"
  },
  "tables": {
    "layer": "Vrstvy",
    "layerTip": "Název vrstvy podle definice v mapě",
    "field": "Pole",
    "fieldTip": "Pole, podle kterého bude vrstva filtrována.",
    "value": "Používat hodnotu",
    "valueTip": "Možnost použít rozbalovací seznam hodnot z vrstvy. Pokud tento parametr nepoužívá žádná vrstva, zobrazí se uživateli pole prostého textu.",
    "zoom": "Zvětšení",
    "zoomTip": "Možnost přiblížit zobrazení na rozsah prvků po aplikaci filtru. Lze vybrat pouze jednu vrstvu, na kterou bude zobrazení přiblíženo.",
    "action": "Smazat (Delete)",
    "actionTip": "Odstraní vrstvu ze sady filtrů."
  },
  "popup": {
    "label": "Vyberte hodnotu"
  },
  "errors": {
    "noGroups": "Je nutné mít alespoň jednu skupiny.",
    "noGroupName": "Chybí jeden nebo více názvů skupin.",
    "noDuplicates": "Jeden nebo více názvů skupin se opakují.",
    "noRows": "Tabulka musí obsahovat alespoň jeden řádek.",
    "noLayers": "Mapa neobsahuje vrstvy."
  },
  "picker": {
    "description": "Použijte tento formulář k nalezení přednastavené hodnoty pro tuto skupinu.",
    "layer": "Vyberte vrstvu",
    "layerTip": "Název vrstvy podle definice ve webové mapě",
    "field": "Vyberte pole",
    "fieldTip": "Pole, ze kterého bude nastavena přednastavená hodnota.",
    "value": "Vyberte hodnotu",
    "valueTip": "Hodnota, která bude u widgetu výchozí."
  }
});