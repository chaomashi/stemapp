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
  "_widgetLabel": "Analiză cost Beta",
  "unableToFetchInfoErrMessage": "Nu se poate prelua serviciul de geometrie/detaliile stratului tematic configurat",
  "invalidCostingGeometryLayer": "Nu se poate obţine 'esriFieldTypeGlobalID' în evaluarea geometriei stratului tematic.",
  "projectLayerNotFound": "Nu se poate găsi în hartă stratul tematic proiect configurat.",
  "costingGeometryLayerNotFound": "Nu se poate găsi în hartă evaluarea geometriei stratului tematic configurat.",
  "projectMultiplierTableNotFound": "Nu se poate găsi în hartă tabelul proiect configurat, cu multiplicatorul de costuri suplimentare.",
  "projectAssetTableNotFound": "Nu se poate găsi în hartă tabelul proiect configurat cu active.",
  "createLoadProject": {
    "createProjectPaneTitle": "Creare proiect",
    "loadProjectPaneTitle": "Încărcare proiect",
    "projectNamePlaceHolder": "Nume proiect",
    "projectDescPlaceHolder": "Descriere proiect",
    "selectProject": "Selectare proiect",
    "viewInMapLabel": "Vizualizare în hartă",
    "loadLabel": "Încărcare",
    "createLabel": "Creare",
    "deleteProjectConfirmationMsg": "Sigur doriţi să ştergeţi proiectul?",
    "noAssetsToViewOnMap": "Proiectul selectat nu are active de vizualizat pe hartă.",
    "projectDeletedMsg": "Proiect şters cu succes.",
    "errorInCreatingProject": "Eroare la crearea proiectului.",
    "errorProjectNotFound": "Proiectul nu a fost găsit.",
    "errorInLoadingProject": "Verificaţi dacă este selectat un proiect valid.",
    "errorProjectNotSelected": "Selectați un proiect din lista verticală",
    "errorDuplicateProjectName": "Numele proiectului există deja."
  },
  "statisticsSettings": {
    "tabTitle": "Setări statistici",
    "addStatisticsLabel": "Adăugare statistică",
    "addNewStatisticsText": "Adăugare statistică nouă",
    "deleteStatisticsText": "Ștergere statistică",
    "moveStatisticsUpText": "Mutare statistică în sus",
    "moveStatisticsDownText": "Mutare statistică în jos",
    "layerNameTitle": "Strat tematic",
    "statisticsTypeTitle": "Tip",
    "fieldNameTitle": "Câmp",
    "statisticsTitle": "Etichetă",
    "actionLabelTitle": "Acţiuni",
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
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Straturile tematice trebuie să fie bifate ca editabile în fila Setări strat tematic"
  },
  "workBench": {
    "refresh": "Reîmprospătare",
    "noAssetAddedMsg": "Niciun activ adăugat",
    "units": "unitate (unităţi)",
    "assetDetailsTitle": "Detalii element activ",
    "costEquationTitle": "Ecuaţie costuri",
    "newCostEquationTitle": "Ecuaţie nouă",
    "defaultCostEquationTitle": "Ecuaţie implicită",
    "geographyTitle": "Geografie",
    "scenarioTitle": "Scenariu",
    "costingInfoHintText": "<div>Sfat: Utilizaţi următoarele cuvinte cheie</div><ul><li><b>{TOTALCOUNT}</b>: Utilizează numărul total de active de același tip dintr-o formă geografică</li> <li><b>{MEASURE}</b>: Utilizează lungimea liniei corespunzătoare activului și suprafeţei pentru un activ tip poligon poligon</li><li><b>{TOTALMEASURE}</b>: Utilizează lungimea liniei corespunzătoare activului și suprafeţei totale pentru un activ tip poligon de același tip dintr-o formă geografică</li></ul> Puteţi folosi funcţii precum:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Modificaţi ecuaţia costuri conform necesităţilor dvs. de proiect.",
    "zoomToAsset": "Faceţi zoom pe activ",
    "deleteAsset": "Ștergere activ",
    "closeDialog": "Închidere dialog",
    "objectIdColTitle": "ID obiect",
    "costColTitle": "Cost",
    "errorInvalidCostEquation": "Ecuaţia cost nu este validă.",
    "errorInSavingAssetDetails": "Nu s-au putut salva detaliile despre active."
  },
  "assetDetails": {
    "inGeography": " în ${geography} ",
    "withScenario": " cu ${scenario}",
    "totalCostTitle": "Total cost",
    "additionalCostLabel": "Descriere",
    "additionalCostValue": "Valoare",
    "additionalCostNetValue": "Valoare netă"
  },
  "projectOverview": {
    "assetItemsTitle": "Elemente active",
    "assetStatisticsTitle": "Statistică active",
    "projectSummaryTitle": "Rezumat proiect",
    "projectName": "Nume proiect: ${name}",
    "totalCostLabel": "Cost total proiect (*):",
    "grossCostLabel": "Cost brut proiect (*):",
    "roundingLabel": "* Rotunjire la '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Nu se poate salva limita proiectului în stratul tematic proiect.",
    "unableToSaveProjectCost": "Nu se pot salva costurile în stratul tematic proiect.",
    "roundCostValues": {
      "twoDecimalPoint": "Două puncte zecimale",
      "nearestWholeNumber": "Cel mai apropiat număr întreg",
      "nearestTen": "Cel mai apropiat număr de ordinul zecilor",
      "nearestHundred": "Cel mai apropiat număr de ordinul sutelor",
      "nearestThousand": "Cel mai apropiat număr de ordinul miilor",
      "nearestTenThousands": "Cel mai apropiat număr de ordinul zecilor de mii"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atribut proiect",
    "projectAttributeTitle": "Editare atribute proiect"
  },
  "costEscalation": {
    "costEscalationLabel": "Adăugare cost suplimentar",
    "valueHeader": "Valoare",
    "addCostEscalationText": "Adăugare cost suplimentar",
    "deleteCostEscalationText": "Ștergere cost suplimentar selectat",
    "moveCostEscalationUpText": "Mutare în sus cost suplimentar selectat",
    "moveCostEscalationDownText": "Mutare în jos cost suplimentar selectat",
    "invalidEntry": "Una sau multe entităţi nu sunt valide.",
    "errorInSavingCostEscalation": "Nu s-au putut salva detaliile despre costurile suplimentare."
  },
  "scenarioSelection": {
    "popupTitle": "Selectare scenariu pentru activul respectiv",
    "regionLabel": "Geografie",
    "scenarioLabel": "Scenariu",
    "noneText": "Niciunul",
    "copyFeatureMsg": "Doriţi să copiaţi obiectele spaţiale selectate?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Statistică detalii",
    "noDetailStatisticAvailable": "Nicio statistică despre active adăugată"
  }
});