import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AlertTitle, Typography } from '@mui/material';
import CsvReader from '../CSVReader/CSVReader';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/system';

export default function HomePage(props) {
    return <div>
        <h1>Generator kodów kreskowych</h1>
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Generuj kody z pliku
                </Typography>
                <Alert severity="info">
                    <AlertTitle>Instrukcja</AlertTitle>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        1. Otwórz listę kodów w Excelu (przekopiuj z  Verto)
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        2. Sprawdź czy istnieją trzy kolumny: Typ | Adres | Kod kreskowy
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        3. Eksportuj kody jako plik CSV
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        4. Wczytaj plik
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        5. Wciśnij generuj plik
                    </Typography>
                </Alert>
                <Box sx={{ mt: 2 }}>
                    <CsvReader />
                </Box>
            </CardContent>
        </Card>
    </div >
}