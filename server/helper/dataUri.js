import DatauriParser from 'datauri/parser.js'
import path from 'path';
export const getDataUri = (file) => {
    const parsedData = new DatauriParser();
    const extname = path.extname(file.originalname).toString();
    return parsedData.format(extname, file.buffer);
}