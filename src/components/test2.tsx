import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Patient {
  ID_Patient: number;
  Prenom: String;
  Nom: String;
}
const rowsMatin: Patient[] = [];
const rowsJournee: Patient[] = [];
const rowsSoir: Patient[] = [];

fetch("http://localhost:8080/recup_calendrier_matin", {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data: Patient[]) => {
    data.forEach((pat) => {
      rowsMatin.push(pat);
    });
  })
  .catch((error) => console.error(error));

fetch("http://localhost:8080/recup_calendrier_journee", {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data: Patient[]) => {
    data.forEach((pat) => {
      rowsJournee.push(pat);
    });
  })
  .catch((error) => console.error(error));

fetch("http://localhost:8080/recup_calendrier_soir", {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data: Patient[]) => {
    data.forEach((pat) => {
      rowsSoir.push(pat);
    });
  })
  .catch((error) => console.error(error));

const DateCalendarWithTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar onChange={handleDateChange} />
      </LocalizationProvider>
      {selectedDate && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead style={{ backgroundColor: "#d8e2dc", color: "black" }}>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">30/03/2023</TableCell>
                <TableCell align="center">Date de fin</TableCell>
                <TableCell align="center">Soin</TableCell>
                <TableCell align="center">Matin</TableCell>
                <TableCell align="center">Journée</TableCell>
                <TableCell align="center">Soir</TableCell>
                <TableCell align="center">Commentaire</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell> Matin </TableCell>
                {rowsMatin.map((PMatin) => (
                  <TableCell align="center">
                    {PMatin.Prenom} {PMatin.Nom}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell> Journée</TableCell>
                {rowsJournee.map((PJournee) => (
                  <TableCell align="center">
                    {PJournee.Prenom} {PJournee.Nom}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell> Soir</TableCell>
                {rowsSoir.map((PSoir) => (
                  <TableCell align="center">
                    {PSoir.Prenom} {PSoir.Nom}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DateCalendarWithTable;
