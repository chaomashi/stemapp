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
  "configText": "Yapılandırma metni ayarla:",
  "generalSettings": {
    "tabTitle": "Genel ayarlar",
    "measurementUnitLabel": "Ölçüm Birimi",
    "currencyLabel": "Ölçüm Sembolü",
    "roundCostLabel": "Maliyeti Yuvarla",
    "projectOutputSettings": "Proje Çıktı Ayarları",
    "typeOfProjectAreaLabel": "Proje Alanı Türü",
    "bufferDistanceLabel": "Tampon Mesafesi",
    "roundCostValues": {
      "twoDecimalPoint": "İki Ondalık Noktası",
      "nearestWholeNumber": "En Yakın Tam Sayı",
      "nearestTen": "En Yakın On",
      "nearestHundred": "En Yakın Yüz",
      "nearestThousand": "En Yakın Bin",
      "nearestTenThousands": "En Yakın On Bin"
    },
    "projectAreaType": {
      "outline": "Ana Hat",
      "buffer": "Tampon"
    },
    "errorMessages": {
      "currency": "Geçersiz para birimi",
      "bufferDistance": "Geçersiz tampon mesafesi",
      "outOfRangebufferDistance": "Değer 0'dan büyük veya 100'den az veya eşit olmalıdır"
    }
  },
  "projectSettings": {
    "tabTitle": "Proje ayarları",
    "costingGeometrySectionTitle": "Maliyet için coğrafyayı tanımla (opsiyonel)",
    "costingGeometrySectionNote": "Not: Bu katmanı yapılandırmak, kullanıcının coğrafyayı temel alan detay şablonlarının maliyet denklemlerini ayarlamasına izin verecektir.",
    "projectTableSectionTitle": "Proje ayarlarını Kaydetme/Yükleme becerisi (opsiyonel)",
    "projectTableSectionNote": "Not: Tüm tabloları ve katmanları yapılandırmak, kullanıcının daha sonra kullanmak üzere projeyi kaydetmesine/yüklemesine olanak tanır.",
    "costingGeometryLayerLabel": "Maliyet Geometrisi Katmanı",
    "fieldLabelGeography": "Coğrafya Etiketleme Alanı",
    "projectAssetsTableLabel": "Proje Varlıkları Tablosu",
    "projectMultiplierTableLabel": "Proje Çarpanı Ek Maliyet Tablosu",
    "projectLayerLabel": "Proje Katmanı",
    "configureFieldsLabel": "Alanları Yapılandır",
    "fieldDescriptionHeaderTitle": "Alan Tanımı",
    "layerFieldsHeaderTitle": "Katman Alanı",
    "selectLabel": "Seç",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} zaten seçildi",
      "invalidConfiguration": "Lütfen ${fieldsString} seç"
    },
    "costingGeometryHelp": "<p>Aşağıdaki koşullara sahip poligon katmanı (katmanları) gösterilir: <br/> <li>\tKatman â€œQueryâ€ becerisine sahip olmalıdır</li><li>\tKatmanda bir GlobalID alanı bulunmalıdır</li></p>",
    "fieldToLabelGeographyHelp": "<p>Seçili â€œCosting Geometry Layerâ€ dizileri ve sayısal alanları â€œField to Label Geographyâ€ açılır penceresinde gösterilecektir.</p>",
    "projectAssetsTableHelp": "<p>Aşağıdaki koşullara sahip tablo (tablolar) gösterilecektir: <br/> <li>Tabloda şu düzenleme becerileri olmalıdır: â€œCreateâ€, â€œDeleteâ€ ve â€œUpdateâ€</li>    <li>Tabloda aynı ad ve aynı veri türüne sahip altı alan bulunmalıdır:</li><ul><li>\tAssetGUID (GUID türü alan)</li><li>\tCostEquation (Dizi türü alan)</li><li>\tSenaryo (Dizi türü alan)</li><li>\tTemplateName (Dizi türü alan)</li><li>    GeographyGUID (GUID türü alan)</li><li>\tProjectGUID (GUID türü alan)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Aşağıdaki koşullara sahip tablo (tablolar) gösterilecektir: <br/> <li>Tabloda şu düzenleme becerileri olmalıdır: â€œCreateâ€, â€œDeleteâ€ and â€œUpdateâ€</li>    <li>Tabloda aynı ad ve aynı veri türüne sahip beş alan bulunmalıdır:</li><ul><li>\tAçıklama (Dizi türü alan)</li><li>\tTür (Dizi türü alan)</li><li>\tDeğer (Kayar/Çift tür alan)</li><li>\tCostindex (Tam sayı türü alan)</li><li>   \tProjectGUID (GUID türü alan))</li></ul> </p>",
    "projectLayerHelp": "<p>Aşağıdaki koşullara sahip poligon katmanı (katmanları) gösterilecektir: <br/> <li>Katmanda şu düzenleme becerileri olmalıdır: â€œCreateâ€, â€œDeleteâ€ and â€œUpdateâ€</li>    <li>Katmanda aynı ad ve aynı veri türüne sahip beş alan bulunmalıdır:</li><ul><li>\tProjectName (Dizi türü alan)</li><li>\tAçıklama (Dizi türü alan)</li><li>\tTotalassetcost (Kayar/Çift tür alan)</li><li>\tGrossprojectcost (Kayar/Çift tür alan)</li><li>   \tGlobalID (GlobalID türü alan))</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Katman ayarları",
    "layerNameHeaderTitle": "Katman adı",
    "layerNameHeaderTooltip": "Haritadaki katmanlar listesi",
    "EditableLayerHeaderTitle": "Düzenlenebilir",
    "EditableLayerHeaderTooltip": "Maliyet aracına katman ve şablonlarını dahil et",
    "SelectableLayerHeaderTitle": "Seçilebilir",
    "SelectableLayerHeaderTooltip": "Yeni bir maliyet öğesi oluşturmak için detaydan geometri kullanılabilir",
    "fieldPickerHeaderTitle": "Proje kimliği (opsiyonel)",
    "fieldPickerHeaderTooltip": "Proje kimliğinin depolanacağı opsiyonel alan (dizi türünün)",
    "selectLabel": "Seç",
    "noAssetLayersAvailable": "Seçilen web haritasında varlık katmanı bulunamadı",
    "disableEditableCheckboxTooltip": "Bu katmanda düzenleme becerileri yok",
    "missingCapabilitiesMsg": "Bu katmanda aşağıdaki beceriler yok:",
    "missingGlobalIdMsg": "Bu katmanda GlobalId alanı yok",
    "create": "Oluştur",
    "update": "Güncelle",
    "delete": "Sil"
  },
  "costingInfo": {
    "tabTitle": "Maliyet Bilgileri",
    "proposedMainsLabel": "Teklif Edilenler",
    "addCostingTemplateLabel": "Maliyet Şablonu Ekle",
    "manageScenariosTitle": "Senaryoları Yönet",
    "featureTemplateTitle": "Detay Taslağı",
    "costEquationTitle": "Maliyet Denklemi",
    "geographyTitle": "Coğrafya",
    "scenarioTitle": "Senaryo",
    "actionTitle": "İşlemler",
    "scenarioNameLabel": "Senaryo Adı",
    "addBtnLabel": "Ekle",
    "srNoLabel": "No.",
    "deleteLabel": "Sil",
    "duplicateScenarioName": "Yinelenen senaryo adı",
    "hintText": "<div>İpucu: Aşağıdaki anahtar sözcükleri kullanın</div><ul><li><b>{TOTALCOUNT}</b>: Bir coğrafyadaki aynı tür varlıkların toplam sayısını kullanır</li><li><b>{MEASURE}</b>: Çizgi varlığı için uzunluk ve poligon varlığı için alanı kullanır</li><li><b>{TOTALMEASURE}</b>: Bir coğrafyada aynı türdeki çizgi varlığı için toplam uzunluğu poligon varlığı için toplam alanı kullanır</li></ul> Şu işlevleri kullanabilirsiniz:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Lütfen projenizin ihtiyacına göre maliyet denklemini düzenleyin.",
    "noneValue": "Yok",
    "requiredCostEquation": "${layerName} için geçersiz maliyet denklemi: ${templateName}",
    "duplicateTemplateMessage": "${layerName} için mevcut şablon girişini yinele: ${templateName}",
    "defaultEquationRequired": "${layerName} için varsayılan denklem gerekli: ${templateName}",
    "validCostEquationMessage": "Lütfen geçerli maliyet denklemini girin",
    "costEquationHelpText": "Lütfen maliyet denklemini projenizin ihtiyaçlarına uygun olarak düzenleyin",
    "scenarioHelpText": "Lütfen senaryoyu projenizin ihtiyaçlarına uygun olarak seçin",
    "copyRowTitle": "Sırayı Kopyala",
    "noTemplateAvailable": "${layerName} için lütfen en az bir şablon ekleyin",
    "manageScenarioLabel": "Senaryoyu yönet",
    "noLayerMessage": "${tabName}'e lütfen en az bir katman ekleyin",
    "noEditableLayersAvailable": "Katman (katmanlar), katman ayarları tablosunda düzenlenebilir olarak işaretlenmelidir"
  },
  "statisticsSettings": {
    "tabTitle": "İstatistik ayarları",
    "addStatisticsLabel": "İstatistik Ekle",
    "fieldNameTitle": "Alan",
    "statisticsTitle": "Etiket",
    "addNewStatisticsText": "Yeni İstatistik Ekle",
    "deleteStatisticsText": "İstatistik Sil",
    "moveStatisticsUpText": "İstatistikleri Yukarı Taşı",
    "moveStatisticsDownText": "İstatistikleri Aşağı Taşı",
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
  }
});