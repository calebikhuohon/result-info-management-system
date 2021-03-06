
import { AppError } from './app-error';
import sheetJs from 'xlsx';

const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const getData = (lastColRow, columns, headers, sheet) => {
  const data = [];

  for (let R = 2; R <= lastColRow; R++) {
    const element = {};

    headers.forEach((header, index) => {
      const cellValue = getValue(sheet, columns[index], R);

      if (cellValue) {
        element[header] = cellValue.w ? cellValue.w : cellValue.v;
      }
    });
    if (Object.keys(element).length > 0) {
      data.push(element);
    }
  }

  return data;
}

const getValue = (sheet, column, R) => sheet[`${column}${R}`];

const getSheetNames = (workbook) => workbook.SheetNames;

const getDesiredCells = (worksheet) => worksheet['!ref'];

const getLastRowCol = (cells) => {
  const rows = cells.split(':');
  const lastColRow = rows.length > 1 ? rows[1] : rows[0];

  const lastColLetter = extractLetter(lastColRow);
  const array = lastColRow.split(lastColLetter);

  return Number(array[1]);
}

const getColumnsAndHeaders = (worksheet, desired_cells) => {
  const cells = desired_cells.split(':');
  const lastCell = cells.length > 1 ? cells[1] : cells[0];
  const lastColLetter = extractLetter(lastCell);

  let iterator = 0;
  let accumulator = '';
  let accumulatorIterator = 0;
  const headers = [];
  const excelColumns = [];

  while (true) {

    const currentCell = `${accumulator}${abc[iterator++]}`;
    const cellHeader = worksheet[currentCell + 1];

    if (cellHeader) {
      headers.push(cellHeader.v)
      excelColumns.push(currentCell);
    }

    if (lastColLetter === currentCell) {
      return { headers: headers, excelColumns: excelColumns };
    }

    if (iterator >= abc.length) {
      const test = abc[accumulatorIterator++];
      iterator = 0;
      accumulator = test;
    }
  }
}

const extractLetter = (str) => {
  const array = str.split(/[0-9]+/);
  return array[0];
}

const parseSheet = (data) => {
  const parsedXls = {};

  var workbook = sheetJs.read(data, {
    type: 'buffer',
  });
  const sheetNames = getSheetNames(workbook);

  sheetNames.forEach(name => {
    const sheet = workbook.Sheets[name];
    const desiredCells = getDesiredCells(sheet);
    const lastColRow = getLastRowCol(desiredCells);
    const columnsAndHeaders = getColumnsAndHeaders(sheet, desiredCells);

    parsedXls[name] = getData(lastColRow, columnsAndHeaders.excelColumns, columnsAndHeaders.headers, sheet);
  });

  return parsedXls;
}

const onFileSelection = (file) => {
  return new Promise((resolve, reject) => {
    resolve(parseSheet(file));
  });
};

export const parseFile = (file) => {
  return onFileSelection(file)
    .then(data => {
      return data;
    }).catch(err => {
      throw new AppError(err);
    });
};


