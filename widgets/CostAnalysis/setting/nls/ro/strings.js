///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define({
  "configText": "Stabilire configuraţie text:",
  "generalSettings": {
    "tabTitle": "Setări generale",
    "measurementUnitLabel": "Unitate de măsură",
    "currencyLabel": "Simbol de măsură",
    "roundCostLabel": "Cost rotunjit",
    "projectOutputSettings": "Setări rezultate proiect",
    "typeOfProjectAreaLabel": "Tip de domeniu de proiect",
    "bufferDistanceLabel": "Distanţă buffer",
    "roundCostValues": {
      "twoDecimalPoint": "Două puncte zecimale",
      "nearestWholeNumber": "Cel mai apropiat număr întreg",
      "nearestTen": "Cel mai apropiat număr de ordinul zecilor",
      "nearestHundred": "Cel mai apropiat număr de ordinul sutelor",
      "nearestThousand": "Cel mai apropiat număr de ordinul miilor",
      "nearestTenThousands": "Cel mai apropiat număr de ordinul zecilor de mii"
    },
    "projectAreaType": {
      "outline": "Contur",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Unitate monetară nevalidă",
      "bufferDistance": "Distanţă buffer nevalidă",
      "outOfRangebufferDistance": "Valoarea ar trebui să fie mai mare de 0 și mai mică sau egală cu 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Setări proiect",
    "costingGeometrySectionTitle": "Stabilirea caracteristicilor geografice pentru evaluarea costurilor (opţional)",
    "costingGeometrySectionNote": "Notă: Configurarea acestui strat tematic va permite utilizatorului să formuleze ecuaţii de cost pentru șabloanele de obiecte spaţiale în funcție de caracteristicile geografice.",
    "projectTableSectionTitle": "Posibilitatea de a salva/încărca setările proiectului (opţional)",
    "projectTableSectionNote": "Notă: Configurarea tuturor tabelelor și straturilor tematice va permite utilizatorului să salveze/încarce proiectul pentru utilizare ulterioară.",
    "costingGeometryLayerLabel": "Evaluarea geometriei stratului tematic",
    "fieldLabelGeography": "Câmp pentru etichetă geometrie",
    "projectAssetsTableLabel": "Tabel active proiect",
    "projectMultiplierTableLabel": "Tabel multiplicator costuri suplimentare proiect",
    "projectLayerLabel": "Strat tematic proiect",
    "configureFieldsLabel": "Configurare câmpuri",
    "fieldDescriptionHeaderTitle": "Descriere câmp",
    "layerFieldsHeaderTitle": "Câmp strat tematic",
    "selectLabel": "Selectare",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} este deja selectat",
      "invalidConfiguration": "Selectați ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Stratul/straturile tematice de tip poligon cu următoarele condiții vor fi afişate: <br/> <li>\tStratul tematic trebuie să aibă funcţia â€œQueryâ€</li><li>\tStratul tematic trebuie să aibă un câmp GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Straturile și câmpurile numerice ale câmpului selectat â€œCosting Geometry Layerâ€ vor fi afișate în lista verticală â€œField to Label Geographyâ€.</p>",
    "projectAssetsTableHelp": "<p>Tabelele cu următoarele condiții vor fi afișate: <br/> <li>Tabelul trebuie să aibă funcţii de editare, respectiv â€œCreateâ€, â€œDeleteâ€ și â€œUpdateâ€</li>    <li>Tabelul trebuie să aibă şase câmpuri cu numele exact și tipul de date:</li><ul><li>\tAssetGUID (GUID type field)</li><li>\tCostEquation (String type field)</li><li>\tScenario (String type field)</li><li>\tTemplateName (String type field)</li><li>    GeographyGUID (GUID type field)</li><li>\tProjectGUID (GUID type field)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabelele cu următoarele condiții vor fi afişate: <br/> <li>Tabelul trebuie să aibă funcţii de editare, respectiv â€œCreateâ€, â€œDeleteâ€ și â€œUpdateâ€</li>    <li>Tabelul trebuie să aibă cinci câmpuri cu numele exact și tipul de date:</li><ul><li>\tDescriere (String type field)</li><li>\tType (String type field)</li><li>\tValue (Float/Double type field)</li><li>\tCostindex (Integer type field)</li><li>   \tProjectGUID (GUID type field))</li></ul> </p>",
    "projectLayerHelp": "<p>Straturile tematice de tip poligon cu următoarele condiții vor fi afişate: <br/> <li>Stratul tematic trebuie să aibă funcţii de editare, respectiv â€œCreateâ€, â€œDeleteâ€ și â€œUpdateâ€</li>    <li>Stratul tematic trebuie să aibă cinci câmpuri cu numele exact și tipul de date:</li><ul><li>ProjectName (String type field)</li><li>Description (String type field)</li><li>Totalassetcost (Float/Double type field)</li><li>Grossprojectcost (Float/Double type field)</li><li>GlobalID (GlobalID type field)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Setări strat tematic",
    "layerNameHeaderTitle": "Nume strat tematic",
    "layerNameHeaderTooltip": "Lista straturilor tematice în hartă",
    "EditableLayerHeaderTitle": "Editabil",
    "EditableLayerHeaderTooltip": "Includeţi stratul tematic și șabloanele acestuia în widget-ul de calculare a costurilor",
    "SelectableLayerHeaderTitle": "Selectabil",
    "SelectableLayerHeaderTooltip": "Geometria din stratul tematic poate fi utilizată pentru a genera un nou element de cost",
    "fieldPickerHeaderTitle": "ID Proiect (opţional)",
    "fieldPickerHeaderTooltip": "Câmp opţional (de tip şir) pentru a stoca ID-ul proiectului în",
    "selectLabel": "Selectare",
    "noAssetLayersAvailable": "În harta web selectată nu a fost găsit niciun activ de strat tematic.",
    "disableEditableCheckboxTooltip": "Acest strat tematic nu are funcţii de editare",
    "missingCapabilitiesMsg": "Acestui strat tematic îi lipsesc următoarele capacități:",
    "missingGlobalIdMsg": "Acest strat tematic nu are câmpul GlobalId",
    "create": "Creare",
    "update": "Actualizare",
    "delete": "Ştergere"
  },
  "costingInfo": {
    "tabTitle": "Informații costuri",
    "proposedMainsLabel": "Elemente principale propuse",
    "addCostingTemplateLabel": "Adăugare şablon calculare cost",
    "manageScenariosTitle": "Gestionare scenarii",
    "featureTemplateTitle": "Şablon obiect spaţial",
    "costEquationTitle": "Ecuaţie costuri",
    "geographyTitle": "Geografie",
    "scenarioTitle": "Scenariu",
    "actionTitle": "Acţiuni",
    "scenarioNameLabel": "Nume scenariu",
    "addBtnLabel": "Adăugare",
    "srNoLabel": "Nu.",
    "deleteLabel": "Ştergere",
    "duplicateScenarioName": "Duplicare nume scenariu",
    "hintText": "<div>Sfat: Utilizaţi următoarele cuvinte cheie</div><ul><li><b>{TOTALCOUNT}</b>: Utilizează numărul total de active de același tip dintr-o formă geografică</li><li><b>{MEASURE}</b>: Utilizează lungimea liniei corespunzătoare activului și suprafeţei pentru un activ tip poligon poligon</li><li><b>{TOTALMEASURE}</b>: Utilizează lungimea liniei corespunzătoare activului și suprafeţei totale pentru un activ tip poligon de același tip dintr-o formă geografică</li></ul>Puteţi folosi funcţii precum:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Modificaţi ecuaţia costuri conform necesităţilor dvs. de proiect.",
    "noneValue": "Niciunul",
    "requiredCostEquation": "Ecuaţie cost nevalidă pentru ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Există o intrare şablon duplicat pentru ${layerName} : ${templateName}",
    "defaultEquationRequired": "Ecuaţia implicită este necesară pentru ${layerName} : ${templateName}",
    "validCostEquationMessage": "Introduceți o ecuaţie costuri validă",
    "costEquationHelpText": "Modificaţi ecuaţia costuri conform necesităţilor dvs. de proiect.",
    "scenarioHelpText": "Selectați scenariul conform necesităţilor dvs. de proiect.",
    "copyRowTitle": "Copiere rând",
    "noTemplateAvailable": "Adăugați cel puţin un şablon pentru ${layerName}",
    "manageScenarioLabel": "Gestionare scenariu",
    "noLayerMessage": "Adăugați cel puţin un strat tematic pentru ${tabName}",
    "noEditableLayersAvailable": "Straturile tematice trebuie să fie bifate ca editabile în fila Setări strat tematic"
  },
  "statisticsSettings": {
    "tabTitle": "Setări statistici",
    "addStatisticsLabel": "Adăugare statistică",
    "fieldNameTitle": "Câmp",
    "statisticsTitle": "Etichetă",
    "addNewStatisticsText": "Adăugare statistică nouă",
    "deleteStatisticsText": "Ștergere statistică",
    "moveStatisticsUpText": "Mutare statistică în sus",
    "moveStatisticsDownText": "Mutare statistică în jos",
    "selectDeselectAllTitle": "Selectare toate"
  },
  "statisticsType": {
    "countLabel": "Număr",
    "averageLabel": "Medie",
    "maxLabel": "Maxim",
    "minLabel": "Minim",
    "summationLabel": "Însumare",
    "areaLabel": "Suprafaţă",
    "lengthLabel": "Lungime"
  }
});