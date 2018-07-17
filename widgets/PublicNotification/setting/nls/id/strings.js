/*
 | Copyright 2017 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "searchSourceSetting": {
    "title": "Pengaturan Pencarian dan Buffer",
    "mainHint": "Anda dapat mengaktifkan pencarian teks alamat dan fitur, digitalisasi geometri, dan buffering."
  },
  "addressSourceSetting": {
    "title": "Layer Alamat",
    "mainHint": "Anda dapat menetapkan layer label penerima mana yang tersedia."
  },
  "notificationSetting": {
    "title": "Opsi Notifikasi",
    "mainHint": "Anda dapat menetapkan tipe notifikasi mana yang tersedia."
  },
  "groupingLabels": {
    "addressSources": "Layer yang akan digunakan untuk memilih layer penerima",
    "averyStickersDetails": "Stiker Avery(r)",
    "csvDetails": "File nilai terpisah koma (CSV)",
    "drawingTools": "Alat gambar untuk menetapkan area",
    "featureLayerDetails": "Feature layer",
    "geocoderDetails": "Geocoder",
    "labelFormats": "Format label yang tersedia",
    "printingOptions": "Opsi untuk halaman label cetak",
    "searchSources": "Cari sumber",
    "stickerFormatDetails": "Parameter halaman label"
  },
  "hints": {
    "alignmentAids": "Tanda ditambahkan ke halaman label untuk membantu Anda menyejajarkan halaman dengan printer Anda",
    "csvNameList": "Daftar terpisah koma nama kolom sensitif terhadap huruf besar atau kecil",
    "horizontalGap": "Spasi antara dua label dalam satu baris",
    "insetToLabel": "Spasi antara sisi label dan awal teks",
    "labelFormatDescription": "Bagaimana gaya label disajikan dalam daftar opsi format widget",
    "labelFormatDescriptionHint": "Tooltip untuk menambah deskripsi dalam daftar opsi format",
    "labelHeight": "Tinggi setiap label di halaman",
    "labelWidth": "Lebar setiap label di halaman",
    "localSearchRadius": "Menentukan radius dari area di sekitar pusat peta saat ini yang digunakan untuk mendorong peringkat calon geocoding sehingga calon yang terdekat dengan lokasi akan dimunculkan terlebih dahulu",
    "rasterResolution": "Sekitar 100 piksel per inci cocok dengan resolusi layar. Semakin tinggi resolusi, semakin banyak memori browser diperlukan. Setiap browser memiliki perbedaan kemampuan untuk menangani permintaan memori besar dengan baik.",
    "selectionListOfOptionsToDisplay": "Item yang dicentang ditampilkan sebagai opsi di widget; Ubah urutan sesuai keinginan",
    "verticalGap": "Spasi antara dua label dalam satu kolom"
  },
  "propertyLabels": {
    "bufferDefaultDistance": "Jarak buffer default",
    "bufferUnits": "Unit buffer yang akan disediakan di widget",
    "countryRegionCodes": "Kode negara atau wilayah",
    "description": "Deskripsi",
    "descriptionHint": "Petunjuk deskripsi",
    "displayField": "Kolom tampilan",
    "drawingToolsFreehandPolygon": "poligon bebas",
    "drawingToolsLine": "garis",
    "drawingToolsPoint": "titik",
    "drawingToolsPolygon": "poligon",
    "drawingToolsPolyline": "polyline",
    "enableLocalSearch": "Aktifkan pencarian lokal",
    "exactMatch": "Benar-benar cocok",
    "fontSizeAlignmentNote": "Ukuran font untuk catatan tentang margin cetak",
    "gridDarkness": "Kegelapan kisi",
    "gridlineLeftInset": "Sisipan garis kisi kiri",
    "gridlineMajorTickMarksGap": "Tanda centang besar setiap",
    "gridlineMinorTickMarksGap": "Tanda centang kecil setiap",
    "gridlineRightInset": "Sisipan garis kisi kanan",
    "labelBorderDarkness": "Kegelapan batas label",
    "labelBottomEdge": "Tepi bawah label di halaman",
    "labelFontSize": "Ukuran font",
    "labelHeight": "Tinggi label",
    "labelHorizontalGap": "Celah horizontal",
    "labelInitialInset": "Sisipan untuk teks label",
    "labelLeftEdge": "Tepi kiri label di halaman",
    "labelMaxLineCount": "Jumlah maksimum garis di label",
    "labelPageHeight": "Tinggi halaman",
    "labelPageWidth": "Lebar halaman",
    "labelRightEdge": "Tepi kanan label di halaman",
    "labelsInAColumn": "Jumlah label dalam satu kolom",
    "labelsInARow": "Jumlah label dalam satu baris",
    "labelTopEdge": "Tepi atas label di halaman",
    "labelVerticalGap": "Celah vertikal",
    "labelWidth": "Lebar label",
    "limitSearchToMapExtent": "Cari hanya dalam jangkauan peta saat ini",
    "maximumResults": "Hasil maksimum",
    "maximumSuggestions": "Saran maksimum",
    "minimumScale": "Skala minimum",
    "name": "Nama",
    "percentBlack": "% hitam",
    "pixels": "piksel",
    "pixelsPerInch": "piksel per inci",
    "placeholderText": "Teks placeholder",
    "placeholderTextForAllSources": "Teks placeholder untuk mencari semua sumber",
    "radius": "Radius",
    "rasterResolution": "Resolusi raster",
    "searchFields": "Kolom pencarian",
    "showAlignmentAids": "Tampilkan alat bantu penyejajaran di halaman",
    "showGridTickMarks": "Tampilkan tanda centang kisi",
    "showLabelOutlines": "Tampilkan garis kerangka label",
    "showPopupForFoundItem": "Tampilkan pop-up untuk fitur atau lokasi yang ditemukan",
    "tool": "Alat",
    "units": "Unit",
    "url": "URL",
    "urlToGeometryService": "URL ke layanan geometri",
    "useRelatedRecords": "Gunakan catatan terkaitnya",
    "useSecondarySearchLayer": "Gunakan layer pemilihan sekunder",
    "useSelectionDrawTools": "Gunakan alat gambar pilihan",
    "useVectorFonts": "Gunakan font vektor (hanya font Latin)",
    "zoomScale": "Skala zoom"
  },
  "buttons": {
    "addAddressSource": "Tambahkan layer berisi label alamat di popup-nya",
    "addLabelFormat": "Tambah format label",
    "addSearchSource": "Tambah sumber pencarian",
    "set": "Atur"
  },
  "placeholders": {
    "averyExample": "mis., label Avery(r) ${averyPartNumber}",
    "countryRegionCodes": "mis., USA,CHN",
    "descriptionCSV": "Nilai terpisah koma",
    "descriptionPDF": "Label PDF ${heightLabelIn} x ${widthLabelIn} inci; ${labelsPerPage} per halaman"
  },
  "tooltips": {
    "getWebmapFeatureLayer": "Dapatkan feature layer dari webmap",
    "openCountryCodes": "Klik untuk mendapatkan informasi selengkapnya mengenai kode",
    "openFieldSelector": "Klik untuk membuka pemilih kolom",
    "setAndValidateURL": "Atur dan validasi URL"
  },
  "problems": {
    "noAddresseeLayers": "Harap sebutkan paling sedikit satu layer penerima",
    "noBufferUnitsForDrawingTools": "Harap konfigurasikan paling sedikit satu unit buffer untuk alat gambar",
    "noBufferUnitsForSearchSource": "Harap konfigurasikan paling sedikit satu unit buffer untuk sumber pencarian \"${sourceName}\"",
    "noGeometryServiceURL": "Harap konfigurasikan URL ke layanan geometri",
    "noNotificationLabelFormats": "Harap sebutkan paling sedikit satu format label notifikasi",
    "noSearchSourceFields": "Harap konfigurasikan satu kolom pencarian atau lebih untuk sumber pencarian \"${sourceName}\"",
    "noSearchSourceURL": "Harap konfigurasikan URL untuk sumber pencarian \"${sourceName}\""
  }
});