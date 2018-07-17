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
  "_widgetLabel": "Maliyet Analizi Beta",
  "unableToFetchInfoErrMessage": "Geometri servisi/yapılandırılmış katman ayrıntıları alınamadı",
  "invalidCostingGeometryLayer": "Maliyet geometrisi katmanında 'esriFieldTypeGlobalID' alınamadı.",
  "projectLayerNotFound": "Haritada yapılandırılmış proje katmanı bulunamadı.",
  "costingGeometryLayerNotFound": "Haritada yapılandırılmış maliyet geometrisi katmanı bulunamadı.",
  "projectMultiplierTableNotFound": "Haritada yapılandırılmış proje çarpan ek maliyet tablosu bulunamadı.",
  "projectAssetTableNotFound": "Haritada yapılandırılmış proje varlık tablosu bulunamadı.",
  "createLoadProject": {
    "createProjectPaneTitle": "Proje Oluştur",
    "loadProjectPaneTitle": "Projeler Yükle",
    "projectNamePlaceHolder": "Proje Adı",
    "projectDescPlaceHolder": "Proje Açıklaması",
    "selectProject": "Proje Seç",
    "viewInMapLabel": "Haritada Görüntüle",
    "loadLabel": "Yükle",
    "createLabel": "Oluştur",
    "deleteProjectConfirmationMsg": "Projeyi silmek istediğinizden emin misiniz?",
    "noAssetsToViewOnMap": "Seçilen projenin haritada görüntülenecek herhangi bir varlığı bulunmuyor.",
    "projectDeletedMsg": "Proje başarıyla silindi.",
    "errorInCreatingProject": "Proje oluşturma hatası.",
    "errorProjectNotFound": "Proje bulunamadı.",
    "errorInLoadingProject": "Lütfen geçerli projenin seçilip seçilmediğini kontrol edin.",
    "errorProjectNotSelected": "Açılır listeden bir proje seç",
    "errorDuplicateProjectName": "Proje adı zaten var."
  },
  "statisticsSettings": {
    "tabTitle": "İstatistik ayarları",
    "addStatisticsLabel": "İstatistik Ekle",
    "addNewStatisticsText": "Yeni İstatistik Ekle",
    "deleteStatisticsText": "İstatistik Sil",
    "moveStatisticsUpText": "İstatistikleri Yukarı Taşı",
    "moveStatisticsDownText": "İstatistikleri Aşağı Taşı",
    "layerNameTitle": "Katman",
    "statisticsTypeTitle": "Tür",
    "fieldNameTitle": "Alan",
    "statisticsTitle": "Etiket",
    "actionLabelTitle": "İşlemler",
    "selectDeselectAllTitle": "Tümünü Seç"
  },
  "statisticsType": {
    "countLabel": "Sayım",
    "averageLabel": "Ortalama",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Toplam",
    "areaLabel": "Alan",
    "lengthLabel": "Uzunluk"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Katman (katmanlar), katman ayarları tablosunda düzenlenebilir olarak işaretlenmelidir"
  },
  "workBench": {
    "refresh": "Yenile",
    "noAssetAddedMsg": "Varlık eklenmedi",
    "units": "bitim (birimler)",
    "assetDetailsTitle": "Varlık Öğe Ayrıntıları",
    "costEquationTitle": "Maliyet Denklemi",
    "newCostEquationTitle": "Yeni Denklem",
    "defaultCostEquationTitle": "Varsayılan Denklem",
    "geographyTitle": "Coğrafya",
    "scenarioTitle": "Senaryo",
    "costingInfoHintText": "<div>İpucu: Aşağıdaki anahtar sözcükleri kullanın</div><ul><li><b>{TOTALCOUNT}</b>: Bir coğrafyadaki aynı tür varlıkların toplam sayısını kullanır</li><li><b>{MEASURE}</b>: Çizgi varlığı için uzunluk ve poligon varlığı için alanı kullanır</li><li><b>{TOTALMEASURE}</b>: Bir coğrafyada aynı türdeki çizgi varlığı için toplam uzunluğu poligon varlığı için toplam alanı kullanır</li></ul> Şu işlevleri kullanabilirsiniz:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Lütfen projenizin ihtiyacına göre maliyet denklemini düzenleyin.",
    "zoomToAsset": "Varlığa Yakınlaştır",
    "deleteAsset": "Varlığı Sil",
    "closeDialog": "İletişimi kapat",
    "objectIdColTitle": "Nesne kimliği",
    "costColTitle": "Maliyet",
    "errorInvalidCostEquation": "Geçersiz Maliyet Denklemi.",
    "errorInSavingAssetDetails": "Varlık ayrıntıları kaydedilemedi."
  },
  "assetDetails": {
    "inGeography": " ${geography} içinde ",
    "withScenario": " ${scenario} ile",
    "totalCostTitle": "Toplam Maliyet",
    "additionalCostLabel": "Açıklama",
    "additionalCostValue": "Değer",
    "additionalCostNetValue": "Net Değer"
  },
  "projectOverview": {
    "assetItemsTitle": "Varlık Öğeleri",
    "assetStatisticsTitle": "Varlık İstatistikleri",
    "projectSummaryTitle": "Proje Özeti",
    "projectName": "Proje Adı: ${name}",
    "totalCostLabel": "Toplam Proje Maliyeti (*):",
    "grossCostLabel": "Brüt Proje Maliyeti (*):",
    "roundingLabel": "* '${selectedRoundingOption}' olarak yuvarlanır",
    "unableToSaveProjectBoundary": "Proje katmanında proje sınırı kaydedilemedi.",
    "unableToSaveProjectCost": "Proje katmanında maliyet kaydedilemedi.",
    "roundCostValues": {
      "twoDecimalPoint": "İki Ondalık Noktası",
      "nearestWholeNumber": "En Yakın Tam Sayı",
      "nearestTen": "En Yakın On",
      "nearestHundred": "En Yakın Yüz",
      "nearestThousand": "En Yakın Bin",
      "nearestTenThousands": "En Yakın On Bin"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Proje Özniteliği",
    "projectAttributeTitle": "Proje Özniteliklerini Düzenle"
  },
  "costEscalation": {
    "costEscalationLabel": "Ek Maliyet Ekle",
    "valueHeader": "Değer",
    "addCostEscalationText": "Ek maliyet ekle",
    "deleteCostEscalationText": "Seçili ek Maliyeti sil",
    "moveCostEscalationUpText": "Seçili ek Maliyeti yukarı taşı",
    "moveCostEscalationDownText": "Seçili ek Maliyeti aşağı taşı",
    "invalidEntry": "Bir veya birkaç giriş geçersiz.",
    "errorInSavingCostEscalation": "Ek maliyet ayrıntıları kaydedilemedi."
  },
  "scenarioSelection": {
    "popupTitle": "Varlık için Senaryo Seç",
    "regionLabel": "Coğrafya",
    "scenarioLabel": "Senaryo",
    "noneText": "Yok",
    "copyFeatureMsg": "Seçili detayları kopyalamak istiyor musunuz?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Ayrıntılı İstatistikler",
    "noDetailStatisticAvailable": "Varlık istatistiği eklenmedi"
  }
});