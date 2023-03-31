import * as React from "react";
import "../CSS/test.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Soin {
  ID_Soin: number;
  ID_Patient: number;
  Nom: String;
  Prenom: String;
  Date_Debut: string;
  Date_Fin: string;
  Soin: string;
  Matin: string;
  Journee: string;
  Soir: string;
  Commentaire: string;
}
const rows: Soin[] = [];

fetch("http://localhost:8080/show_soins", {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data: Soin[]) => {
    data.forEach((soin) => {
      rows.push(soin);
    });
  })
  .catch((error) => console.error(error));

  

export default function AfficheSoins() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead style={{ backgroundColor: "#d8e2dc", color: "black" }}>
          <TableRow >
            <TableCell align="center">Patient</TableCell>
            <TableCell align="center">Date de début</TableCell>
            <TableCell align="center">Date de fin</TableCell>
            <TableCell align="center">Soin</TableCell>
            <TableCell align="center">Matin</TableCell>
            <TableCell align="center">Journée</TableCell>
            <TableCell align="center">Soir</TableCell>
            <TableCell align="center">Commentaire</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((Soin) => (
            <TableRow key={Soin.ID_Soin}>
              <TableCell align="center">{Soin.Prenom} {Soin.Nom}</TableCell>
              <TableCell align="center">{Soin.Date_Debut}</TableCell>
              <TableCell align="center">{Soin.Date_Fin}</TableCell>
              <TableCell align="center">{Soin.Soin}</TableCell>
              <TableCell align="center">{Soin.Matin}</TableCell>
              <TableCell align="center">{Soin.Journee}</TableCell>
              <TableCell align="center">{Soin.Soir}</TableCell>
              <TableCell align="center">{Soin.Commentaire}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
