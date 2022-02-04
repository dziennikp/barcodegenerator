import { Button, Box } from '@mui/material';
import { useState, useEffect } from 'react'
import { createPDF } from './create-pdf';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function CsvReader() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (isLoading) {
            createPDF(csvArray, setIsLoading);
        }
    }, [isLoading])
    const [csvArray, setCsvArray] = useState([]);

    const processCSV = (str, delim = ',') => {
        const headers = ["type", "title", "code"];
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');

        const newArray = rows.map(row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        const chunks = (a) =>
            Array.from(new Array(Math.ceil(a.length / 3)), (_, i) => a.slice(i * 3, i * 3 + 3));
        const array = chunks(newArray);
        setCsvArray(array)
    }

    const submit = (csvFile) => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            processCSV(text)
        }

        reader.readAsText(file);
    }

    return (
        <Box>
            {csvArray.length > 0 ?
                <Button variant="contained"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsLoading(true);
                    }}>
                    <ListAltIcon />
                    Utwórz listę kodów
                </Button> :
                <Button
                    variant="contained"
                    component="label"
                    onChange={(e) => {
                        submit(e.target.files[0])
                    }}
                >
                    <UploadFileIcon />
                    Wczytaj plik
                    <input
                        type="file"
                        accept='.csv, .xls'
                        hidden
                    />
                </Button>
            }
        </Box>
    );

}