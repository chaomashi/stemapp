///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Esri. All Rights Reserved.
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
  "_widgetLabel": "Görüntüleme",
  "geometryServicesNotFound": "Geometri servisi kullanılamıyor.",
  "unableToDrawBuffer": "Tampon çizilemiyor. Lütfen yeniden deneyin.",
  "invalidConfiguration": "Geçersiz yapılandırma.",
  "clearAOIButtonLabel": "Yeniden Başla",
  "noGraphicsShapefile": "Karşıya yüklenen shapefile ögesinde grafik yok.",
  "zoomToLocationTooltipText": "Konuma yaklaştır",
  "noGraphicsToZoomMessage": "Yaklaştırılacak Grafik bulunamadı.",
  "placenameWidget": {
    "placenameLabel": "Konum ara"
  },
  "drawToolWidget": {
    "useDrawToolForAOILabel": "Çizim modunu seç",
    "toggleSelectability": "Seçilebilirliği değiştirmek için tıklayın",
    "chooseLayerTitle": "Seçilebilir katmanı seç",
    "selectAllLayersText": "Tümünü Seç",
    "layerSelectionWarningTooltip": "AOI oluşturmak için en az bir katman seçilmelidir"
  },
  "shapefileWidget": {
    "shapefileLabel": "Sıkıştırılmış bir shapefile ögesi yükle",
    "uploadShapefileButtonText": "Yükle",
    "unableToUploadShapefileMessage": "Shapefile karşıya yüklenemiyor."
  },
  "coordinatesWidget": {
    "selectStartPointFromSearchText": "Bir başlangıç noktası tanımlayın",
    "addButtonTitle": "Ekle",
    "deleteButtonTitle": "Kaldır",
    "mapTooltipForStartPoint": "Başlangıç noktası tanımlamak için haritaya tıklayın",
    "mapTooltipForUpdateStartPoint": "Başlangıç noktasını güncellemek için haritaya tıklayın",
    "locateText": "Bul",
    "locateByMapClickText": "Başlangıç koordinatlarını seçin",
    "enterBearingAndDistanceLabel": "Başlangıç noktasına göre yönünü ve uzaklığını girin",
    "bearingTitle": "Yön",
    "distanceTitle": "Mesafe",
    "planSettingTooltip": "Plan Ayarları",
    "invalidLatLongMessage": "Geçerli değer girin."
  },
  "bufferDistanceAndUnit": {
    "bufferInputTitle": "Tampon mesafesi (isteğe bağlı)",
    "bufferInputLabel": "Gösterilen sonuç aralığı"
  },
  "traverseSettings": {
    "bearingLabel": "Yön",
    "lengthLabel": "Uzunluk",
    "addButtonTitle": "Ekle",
    "deleteButtonTitle": "Kaldır"
  },
  "planSettings": {
    "expandGridTooltipText": "Kılavuzu genişlet",
    "collapseGridTooltipText": "Kılavuzu daralt",
    "directionUnitLabelText": "Yol Tarifi Birimi",
    "distanceUnitLabelText": "Mesafe ve Uzunluk Birimleri",
    "planSettingsComingSoonText": "Pek Yakında"
  },
  "newTraverse": {
    "invalidBearingMessage": "Geçersiz Yön.",
    "invalidLengthMessage": "Geçersiz Uzunluk.",
    "negativeLengthMessage": "Eksi Uzunluk"
  },
  "reportsTab": {
    "aoiAreaText": "AOI alanı",
    "downloadButtonTooltip": "İndir",
    "printButtonTooltip": "Yazdır",
    "uploadShapefileForAnalysisText": "Analize eklenecek Shapefile ögesini karşıya yükle",
    "uploadShapefileForButtonText": "Gözat",
    "downloadLabelText": "Biçim Seç:",
    "downloadBtnText": "İndir",
    "noDetailsAvailableText": "Sonuç bulunamadı",
    "featureCountText": "Sayım",
    "featureAreaText": "Alan",
    "featureLengthText": "Uzunluk",
    "attributeChooserTooltip": "Görüntülenecek öznitelikleri seçin",
    "csv": "CSV",
    "filegdb": "Coğrafi Veri Tabanı Dosyası",
    "shapefile": "Shapefile",
    "noFeaturesFound": "Seçilen dosya biçimi için sonuç bulunamadı",
    "selectReportFieldTitle": "Alan seç",
    "noFieldsSelected": "Seçili alan yok",
    "intersectingFeatureExceedsMsgOnCompletion": "Bir veya birkaç katman için kayıt sayısı üst sınırına ulaşıldı.",
    "unableToAnalyzeText": "Analiz yapılamıyor, kayıt sayısı üst sınırına ulaşıldı.",
    "errorInPrintingReport": "Rapor yazdırılamıyor. Rapor ayarlarının geçerli olup olmadığını denetleyin.",
    "aoiInformationTitle": "İlgi Alanı (AOI) Bilgileri",
    "summaryReportTitle": "Özet",
    "notApplicableText": "Geçerli Değil",
    "downloadReportConfirmTitle": "İndirmeyi onayla",
    "downloadReportConfirmMessage": "İndirmek istediğinizden emin misiniz?",
    "noDataText": "Veri Yok",
    "createReplicaFailedMessage": "İndirme işlemi aşağıdaki katmanlar için yapılamadı: <br/> ${layerNames}",
    "extractDataTaskFailedMessage": "İndirme işlemi başarısız oldu.",
    "printLayoutLabelText": "Düzen",
    "printBtnText": "Yazdır",
    "printDialogHint": "Not: Rapor başlığı ve yorumlar rapor önizlemesinden düzenlenebilir.",
    "unableToDownloadFileGDBText": "Coğrafi Veri Tabanı Dosyası, nokta veya çizgi konumları içeren AOI için indirilemiyor",
    "unableToDownloadShapefileText": "Shapefile, nokta veya çizgi konumları içeren AOI için indirilemiyor",
    "analysisUnitLabelText": "Gösterilen sonuç aralığı:",
    "analysisUnitButtonTooltip": "Analiz için birimleri seç",
    "analysisCloseBtnText": "Kapat",
    "feetUnit": "Ayak / Ayakkare",
    "milesUnit": "Mil / Dönüm",
    "metersUnit": "Metre / Metrekare",
    "kilometersUnit": "Kilometre / Kilometrekare",
    "hectaresUnit": "Kilometre / Hektar",
    "hectaresAbbr": "hektar",
    "layerNotVisibleText": "Analiz edilemiyor, katman kapatıldı veya ölçek görünürlük aralığının dışında.",
    "refreshBtnTooltip": "Raporu yenile",
    "featureCSVAreaText": "Kesişim Alanı",
    "featureCSVLengthText": "Kesişim Uzunluğu",
    "errorInFetchingPrintTask": "Baskı görevi bilgileri getirilirken hata oluştu. Lütfen tekrar deneyin."
  }
});