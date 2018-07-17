define({
  "configText": "Definiera dina filtergrupper nedan",
  "labels": {
    "groupName": "Filteruppsättningens namn:",
    "groupNameTip": "Namnet på det filter som användaren kan välja från.",
    "groupDesc": "Beskrivning:",
    "groupDescTip": "Beskrivning av filteruppsättningen.",
    "groupOperator": "Förinställd operator:",
    "groupOperatorTip": "Alternativ för att fördefiniera filtrets operator. Om ingen förinställd operator väljs, använder filtret operatorn Lika med.",
    "groupDefault": "Förinställt värde:",
    "groupDefaultTip": "Alternativ för att välja ett värde från ett befintligt lager.",
    "sameLayerAppend": "När ett lager visas flera gånger:",
    "sameLayerConjunc": "Bifoga med:",
    "caseSearch": "Utför en skiftlägeskänslig sökning: "
  },
  "buttons": {
    "addNewGroup": "Lägg till en ny grupp",
    "addNewGroupTip": "Lägg till en ny filteruppsättning.",
    "addLayer": "Lägg till lager",
    "addLayerTip": "Lägg till ett lager i filteruppsättningen."
  },
  "inputs": {
    "groupName": "Namnge din grupp",
    "groupDesc": "Beskrivning av din grupp",
    "groupDefault": "Ange ett fördefinierat värde",
    "sameLayerAny": "Matcha ett eller flera uttryck",
    "sameLayerAll": "Matcha alla uttryck",
    "simpleMode": "Börja i Enkel vy",
    "simpleModeTip": "Alternativ för att förenkla det konfigurerade widgetgränssnittet. När alternativet markeras försvinner listrutan för operatorer och knapparna för att lägga till kriterier.",
    "webmapAppendModeAny": "Bifoga ett eller flera uttryck till befintligt kartfilter",
    "webmapAppendModeAll": "Bifoga alla uttryck till befintligt kartfilter",
    "webmapAppendModeTip": "Alternativ för att bifoga filtret i ett befintligt webbkartsfilter.",
    "persistOnClose": "Bevara när widgeten stängts",
    "optionsMode": "Dölj widgetalternativ",
    "optionsModeTip": "Alternativ för att visa ytterligare widgetinställningar i gränssnittet. Om alternativet markeras försvinner möjligheten att spara och läsa in definierade filter och att bevara filtret när widgeten stängs.",
    "optionOR": "ELLER",
    "optionAND": "OCH",
    "optionEQUAL": "LIKA MED",
    "optionNOTEQUAL": "INTE LIKA MED",
    "optionGREATERTHAN": "STÖRRE ÄN",
    "optionGREATERTHANEQUAL": "STÖRRE ÄN ELLER LIKA MED",
    "optionLESSTHAN": "MINDRE ÄN",
    "optionLESSTHANEQUAL": "MINDRE ÄN ELLER LIKA MED",
    "optionSTART": "BÖRJAR MED",
    "optionEND": "SLUTAR MED",
    "optionLIKE": "INNEHÅLLER",
    "optionNOTLIKE": "INNEHÅLLER INTE",
    "optionONORBEFORE": "ÄR PÅ ELLER FÖRE",
    "optionONORAFTER": "ÄR PÅ ELLER EFTER",
    "optionNONE": "INGEN"
  },
  "tables": {
    "layer": "Lager",
    "layerTip": "Lagrets namn som det anges på kartan.",
    "field": "Fält",
    "fieldTip": "Fält som lagret ska filtreras på.",
    "value": "Använd värde",
    "valueTip": "Alternativ för att använda listrutans värden från lagret. Om inget lager använder denna parameter, visas en vanlig textruta för användaren.",
    "zoom": "Zooma",
    "zoomTip": "Alternativ för att zooma till geoobjektens utbredning efter att filtret har använts. Endast ett lager kan väljas för zoomning.",
    "action": "Ta bort",
    "actionTip": "Ta bort lagret från filteruppsättningen."
  },
  "popup": {
    "label": "Välj ett värde"
  },
  "errors": {
    "noGroups": "Minst en grupp behövs.",
    "noGroupName": "Ett eller flera gruppnamn saknas.",
    "noDuplicates": "Ett eller flera gruppnamn är dubbletter.",
    "noRows": "Det behövs minst en rad i tabellen.",
    "noLayers": "Det finns inga lager i kartan."
  },
  "picker": {
    "description": "Hitta ett förinställt värde för den här gruppen med hjälp av det här formuläret.",
    "layer": "Välj ett lager",
    "layerTip": "Lagrets namn som det anges på webbkartan.",
    "field": "Välj ett fält",
    "fieldTip": "Fält som det förinställda värdet kommer att hämtas från.",
    "value": "Välj ett värde",
    "valueTip": "Värde som kommer att vara standardvärde i widgeten."
  }
});