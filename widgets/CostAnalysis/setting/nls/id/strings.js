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
  "configText": "Atur teks konfig:",
  "generalSettings": {
    "tabTitle": "Pengaturan umum",
    "measurementUnitLabel": "Unit Pengukuran",
    "currencyLabel": "Simbol Pengukuran",
    "roundCostLabel": "Biaya Bulat",
    "projectOutputSettings": "Pengaturan Output Proyek",
    "typeOfProjectAreaLabel": "Tipe Area Proyek",
    "bufferDistanceLabel": "Jarak Buffer",
    "roundCostValues": {
      "twoDecimalPoint": "Dua Titik Desimal",
      "nearestWholeNumber": "Jumlah Keseluruhan Terdekat",
      "nearestTen": "Puluhan Terdekat",
      "nearestHundred": "Ratusan Terdekat",
      "nearestThousand": "Ribuan Terdekat",
      "nearestTenThousands": "Puluhan Ribu Terdekat"
    },
    "projectAreaType": {
      "outline": "Kerangka",
      "buffer": "Buffer"
    },
    "errorMessages": {
      "currency": "Unit mata uang tidak valid",
      "bufferDistance": "Jarak buffer tidak valid",
      "outOfRangebufferDistance": "Nilai harus lebih besar dari 0 dan kurang dari atau sama dengan 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Pengaturan proyek",
    "costingGeometrySectionTitle": "Tentukan geografi untuk penetapan biaya (opsional)",
    "costingGeometrySectionNote": "Catatan: Mengonfigurasi layer ini akan memungkinkan pengguna mengatur persamaan biaya template fitur berdasarkan geografi.",
    "projectTableSectionTitle": "Kemampuan untuk Menyimpan/Memuat pengaturan proyek (opsional)",
    "projectTableSectionNote": "Catatan: Mengonfigurasi semua tabel dan layer akan memungkinkan pengguna menyimpan/memuat proyek untuk digunakan belakangan.",
    "costingGeometryLayerLabel": "Layer Geometri Penetapan Biaya",
    "fieldLabelGeography": "Kolom untuk Melabeli Geografi",
    "projectAssetsTableLabel": "Tabel Aset Proyek",
    "projectMultiplierTableLabel": "Tabel Biaya Tambahan Pengganda Proyek",
    "projectLayerLabel": "Layer Proyek",
    "configureFieldsLabel": "Konfigurasi Kolom",
    "fieldDescriptionHeaderTitle": "Deskripsi Kolom",
    "layerFieldsHeaderTitle": "Kolom Layer",
    "selectLabel": "Pilih",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} sudah dipilih",
      "invalidConfiguration": "Harap pilih ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Layer poligon dengan kondisi berikut akan ditampilkan: <br/> <li>\tLayer harus memiliki kemampuan â€œKueriâ€</li><li>\tLayer harus memiliki kolom GlobalID</li></p>",
    "fieldToLabelGeographyHelp": "<p>Kolom string dan numerik â€œLayer Geometri Penetapan Biayaâ€ yang dipilih akan ditampilkan di menu traik-turun â€œKolom untuk Melabeli Geometriâ€.</p>",
    "projectAssetsTableHelp": "<p>Tabel dengan ketentuan berikut akan ditampilkan: <br/> <li>Tabel harus memiliki kemampuan pengeditan yaitu â€œBuatâ€, â€œHapusâ€ dan â€œPerbaruiâ€</li>    <li>Tabel harus memiliki enam kolom dengan nama dan tipe data yang tepat:</li><ul><li>\tAssetGUID (Kolom tipe GUID)</li><li>\tCostEquation (Kolom tipe string)</li><li>\tSkenario (Kolom tipe string)</li><li>\tTemplateName (Kolom tipe string)</li><li>    GeographyGUID (Kolom tipe GUID)</li><li>\tProjectGUID (Kolom tipe GUID)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabel dengan ketentuan berikut akan ditampilkan: <br/> <li>Tabel harus memiliki kemampuan pengeditan yaitu â€œBuatâ€, â€œHapusâ€ dan â€œPerbaruiâ€</li>    <li>Tabel harus memiliki lima kolom dengan nama dan tipe data yang tepat:</li><ul><li>\tDeskripsi (Kolom tipe string)</li><li>\tTipe (Kolom tipe string)</li><li>\tNilai (Kolom tipe mengambang/ganda)</li><li>\tCostindex (Kolom tipe integer)</li><li>    \tProjectGUID (Kolom tipe GUID)</li></ul> </p>",
    "projectLayerHelp": "<p>Layer poligon dengan ketentuan berikut akan ditampilkan: <br/> <li>Layer harus memiliki kemampuan pengeditan yaitu â€œBuatâ€, â€œHapusâ€ dan â€œPerbaruiâ€</li>    <li>Layer harus memiliki lima kolom dengan nama dan tipe data yang tepat:</li><ul><li>ProjectName (Kolom tipe string)</li><li>Deskripsi (Kolom tipe string)</li><li>Totalasssetcost (Kolom tipe mengambang/ganda)</li><li>Grossprojectcost (Kolom tipe mengambang/ganda)</li><li>GlobalID (Kolom tipe GlobalID)</li></ul> </p>"
  },
  "layerSettings": {
    "tabTitle": "Pengaturan layer",
    "layerNameHeaderTitle": "Nama layer",
    "layerNameHeaderTooltip": "Daftar layer di peta",
    "EditableLayerHeaderTitle": "Dapat Diedit",
    "EditableLayerHeaderTooltip": "Sertakan layer dan template-nya dalam widget penetapan biaya",
    "SelectableLayerHeaderTitle": "Dapat Dipilih",
    "SelectableLayerHeaderTooltip": "Geometri dari fitur dapat digunakan untuk menghasilkan item biaya baru",
    "fieldPickerHeaderTitle": "ID Proyek (opsional)",
    "fieldPickerHeaderTooltip": "Kolom opsional (dari string tipe) untuk menyimpan ID Proyek di",
    "selectLabel": "Pilih",
    "noAssetLayersAvailable": "Tidak ada aset ditemukan dalam wepmap terpilih",
    "disableEditableCheckboxTooltip": "Layer ini tidak memiliki kemampuan pengeditan",
    "missingCapabilitiesMsg": "Layer ini kehilangan kemampuan berikut:",
    "missingGlobalIdMsg": "Layer ini tidak memiliki kolom GlobalID",
    "create": "Buat",
    "update": "Perbarui",
    "delete": "Hapus"
  },
  "costingInfo": {
    "tabTitle": "Info Penetapan Biaya",
    "proposedMainsLabel": "Saluran Utama Diusulkan",
    "addCostingTemplateLabel": "Tambahkan Template Penetapan Biaya",
    "manageScenariosTitle": "Kelola Skenario",
    "featureTemplateTitle": "Template Fitur",
    "costEquationTitle": "Persamaan Biaya",
    "geographyTitle": "Geografi",
    "scenarioTitle": "Skenario",
    "actionTitle": "Tindakan",
    "scenarioNameLabel": "Nama Skenario",
    "addBtnLabel": "Tambah",
    "srNoLabel": "No.",
    "deleteLabel": "Hapus",
    "duplicateScenarioName": "Duplikasi nama skenario",
    "hintText": "<div>Petunjuk: Gunakan kata kunci berikut</div><ul><li><b>{TOTALCOUNT}</b>: Menggunakan jumlah total aset tipe yang sama dalam suatu geografi</li><li><b>{MEASURE}</b>: Menggunakan panjang untuk aset garis dan area untuk aset poligon</li><li><b>{TOTALMEASURE}</b>: Menggunakan panjang total untuk aset garis dan area total untuk aset poligon dengan tipe yang sama dalam suatu geografi</li></ul>Anda dapat menggunakan fungsi seperti:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Harap edit persamaan biaya sesuai kebutuhan proyek Anda.",
    "noneValue": "Tidak Ada",
    "requiredCostEquation": "Persamaan biaya tidak valid untuk ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Entri template duplikat sudah ada untuk ${layerName} : ${templateName}",
    "defaultEquationRequired": "Persamaan default harus diisi untuk ${layerName} : ${templateName}",
    "validCostEquationMessage": "Harap masukkan persamaan biaya yang valid",
    "costEquationHelpText": "Harap edit persamaan biaya sesuai kebutuhan proyek Anda",
    "scenarioHelpText": "Harap pilih skenario sesuai kebutuhan proyek Anda",
    "copyRowTitle": "Salin Baris",
    "noTemplateAvailable": "Harap tambahkan paling sedikit satu template untuk ${layerName}",
    "manageScenarioLabel": "Kelola skenario",
    "noLayerMessage": "Harap masukkan paling sedikit satu layer di ${tabName}",
    "noEditableLayersAvailable": "Layer harus dicentang sebagai dapat diedit di tab pengaturan layer"
  },
  "statisticsSettings": {
    "tabTitle": "Pengaturan statistik",
    "addStatisticsLabel": "Tambahkan statistik",
    "fieldNameTitle": "Kolom",
    "statisticsTitle": "Label",
    "addNewStatisticsText": "Tambahkan Statistik Baru",
    "deleteStatisticsText": "Hapus Statistik",
    "moveStatisticsUpText": "Pindahkan Statistik ke Atas",
    "moveStatisticsDownText": "Pindahkan Statistik ke Bawah",
    "selectDeselectAllTitle": "Pilih Semua"
  },
  "statisticsType": {
    "countLabel": "Jumlah",
    "averageLabel": "Rata-Rata",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Penjumlahan",
    "areaLabel": "Area",
    "lengthLabel": "Panjang"
  }
});