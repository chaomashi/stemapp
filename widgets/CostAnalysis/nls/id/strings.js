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
  "_widgetLabel": "Analisis Biaya Beta",
  "unableToFetchInfoErrMessage": "Tidak dapat mengambil detail layanan geometri/layer terkonfigurasi",
  "invalidCostingGeometryLayer": "Tidak dapat memperoleh 'esriFieldTypeGlobalID' dalam layer geometri penetapan biaya.",
  "projectLayerNotFound": "Tidak dapat menemukan layer proyek terkonfigurasi di peta.",
  "costingGeometryLayerNotFound": "Tidak dapat menemukan layer geometri penetapan biaya terkonfigurasi di peta.",
  "projectMultiplierTableNotFound": "Tidak dapat menemukan tabel biaya tambahan pengganda proyek terkonfigurasi di peta.",
  "projectAssetTableNotFound": "Tidak dapat menemukan tabel aset proyek terkonfigurasi di peta.",
  "createLoadProject": {
    "createProjectPaneTitle": "Buat Proyek",
    "loadProjectPaneTitle": "Muat Proyek",
    "projectNamePlaceHolder": "Nama Proyek",
    "projectDescPlaceHolder": "Deskripsi Proyek",
    "selectProject": "Pilih Proyek",
    "viewInMapLabel": "Lihat di Peta",
    "loadLabel": "Muat",
    "createLabel": "Buat",
    "deleteProjectConfirmationMsg": "Apakah Anda yakin ingin menghapus proyek tersebut?",
    "noAssetsToViewOnMap": "Proyek terpilih tidak memiliki aset apa pun untuk dilihat di peta.",
    "projectDeletedMsg": "Proyek berhasil dihapus.",
    "errorInCreatingProject": "Kesalahan dalam membuat proyek.",
    "errorProjectNotFound": "Proyek tidak ditemukan.",
    "errorInLoadingProject": "Harap periksa apakah poyek valid dipilih.",
    "errorProjectNotSelected": "Pilih proyek dari menu tarik-turun",
    "errorDuplicateProjectName": "Nama proyek sudah ada."
  },
  "statisticsSettings": {
    "tabTitle": "Pengaturan statistik",
    "addStatisticsLabel": "Tambahkan statistik",
    "addNewStatisticsText": "Tambahkan statistik baru",
    "deleteStatisticsText": "Hapus Statistik",
    "moveStatisticsUpText": "Pindahkan Statistik ke Atas",
    "moveStatisticsDownText": "Pindahkan Statistik ke Bawah",
    "layerNameTitle": "Layer",
    "statisticsTypeTitle": "Jenis",
    "fieldNameTitle": "Kolom",
    "statisticsTitle": "Label",
    "actionLabelTitle": "Tindakan",
    "selectDeselectAllTitle": "Pilih Semua"
  },
  "statisticsType": {
    "countLabel": "Jumlah",
    "averageLabel": "Rata-rata",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Penjumlahan",
    "areaLabel": "Area",
    "lengthLabel": "Panjang"
  },
  "costingInfo": {
    "noEditableLayersAvailable": "Layer harus dicentang sebagai dapat diedit di tab pengaturan layer"
  },
  "workBench": {
    "refresh": "Muat Ulang",
    "noAssetAddedMsg": "Tidak ada aset ditambahkan",
    "units": "unit",
    "assetDetailsTitle": "Detail Item Aset",
    "costEquationTitle": "Persamaan Biaya",
    "newCostEquationTitle": "Persamaan Baru",
    "defaultCostEquationTitle": "Persamaan Default",
    "geographyTitle": "Geografi",
    "scenarioTitle": "Skenario",
    "costingInfoHintText": "<div>Petunjuk: Gunakan kata kunci berikut</div><ul><li><b>{TOTALCOUNT}</b>: Menggunakan jumlah total aset tipe yang sama dalam suatu geografi</li> <li><b>{MEASURE}</b>: Menggunakan panjang untuk aset garis dan area untuk aset poligon</li><li><b>{TOTALMEASURE}</b>: Menggunakan panjang total untuk aset garis dan area total untuk aset poligon dengan tipe yang sama dalam suatu geografi</li></ul> Anda dapat menggunakan fungsi seperti:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Harap edit persamaan biaya sesuai kebutuhan proyek Anda.",
    "zoomToAsset": "Zoom Ke Aset",
    "deleteAsset": "Hapus Aset",
    "closeDialog": "Tutup dialog",
    "objectIdColTitle": "Id Objek",
    "costColTitle": "Biaya",
    "errorInvalidCostEquation": "Persamaan Biaya Tidak Valid.",
    "errorInSavingAssetDetails": "Tidak dapat menyimpan detail aset."
  },
  "assetDetails": {
    "inGeography": " dalam ${geography} ",
    "withScenario": " dengan ${scenario}",
    "totalCostTitle": "Total Biaya",
    "additionalCostLabel": "Deskripsi",
    "additionalCostValue": "Nilai",
    "additionalCostNetValue": "Nilai Bersih"
  },
  "projectOverview": {
    "assetItemsTitle": "Item Aset",
    "assetStatisticsTitle": "Statistik Aset",
    "projectSummaryTitle": "Ringkasan Proyek",
    "projectName": "Nama Proyek: ${name}",
    "totalCostLabel": "Total Biaya Proyek (*):",
    "grossCostLabel": "Biaya Kotor Proyek (*):",
    "roundingLabel": "* Dibulatkan ke '${selectedRoundingOption}'",
    "unableToSaveProjectBoundary": "Tidak dapat menyimpan batas proyek dalam layer proyek.",
    "unableToSaveProjectCost": "Tidak dapat menyimpan biaya dalam layer proyek.",
    "roundCostValues": {
      "twoDecimalPoint": "Dua Titik Desimal",
      "nearestWholeNumber": "Jumlah Keseluruhan Terdekat",
      "nearestTen": "Puluhan Terdekat",
      "nearestHundred": "Ratusan Terdekat",
      "nearestThousand": "Ribuan Terdekat",
      "nearestTenThousands": "Puluhan Ribu Terdekat"
    }
  },
  "projectAttribute": {
    "projectAttributeText": "Atribut Proyek",
    "projectAttributeTitle": "Edit Atribut Proyek"
  },
  "costEscalation": {
    "costEscalationLabel": "Tambahkan Biaya Tambahan",
    "valueHeader": "Nilai",
    "addCostEscalationText": "Tambahkan biaya tambahan",
    "deleteCostEscalationText": "Hapus biaya tambahan terpilih",
    "moveCostEscalationUpText": "Pindahkan biaya tambahan terpilih ke atas",
    "moveCostEscalationDownText": "Pindahkan biaya tambahan terpilih ke bawah",
    "invalidEntry": "Satu entri atau lebih tidak valid.",
    "errorInSavingCostEscalation": "Tidak dapat menyimpan detail biaya tambahan"
  },
  "scenarioSelection": {
    "popupTitle": "Pilih Skenario untuk Aset",
    "regionLabel": "Geografi",
    "scenarioLabel": "Skenario",
    "noneText": "Tidak Ada",
    "copyFeatureMsg": "Apakah Anda ingin menyalin fitur yang dipilih?"
  },
  "detailStatistics": {
    "detailStatisticsLabel": "Statistik Detail",
    "noDetailStatisticAvailable": "Tidak ada statistik aset ditambahkan"
  }
});