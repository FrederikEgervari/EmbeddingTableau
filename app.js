console.log("hi");

let viz;

// 1. Variable to store vizContainer

const vizContainer = document.getElementById("vizContainer");

// 2. Create a variable ti store dashboard options

const options = {
  device: "desktop",
  height: "800px",
  width: "1222px",
};

// 3. Create a variable to store the URL

const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia";

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

initViz();

// 4. Create constant for button

const exportPDFbutton = document.getElementById("exportPDF");
const exportPPTbutton = document.getElementById("exportPPT");

// 5. Create a function which is run on click

function exportPDFfunction() {
  viz.showExportPDFDialog();
}

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

// 6. Create event listener for button on click

exportPDFbutton.addEventListener("click", exportPDFfunction);
exportPPTbutton.addEventListener("click", exportPPTfunction);

// 10. Adding filters

const filterButton = document.getElementById("FilterButton");

filterButton.addEventListener("click", getRangeValues);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // need to get active sheet, but this could be a dashboard or a worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets you need to filter
  console.log(sheets);
  // index of the sheet you want to filter
  const sheetToFilter = sheets[2];
  // do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
