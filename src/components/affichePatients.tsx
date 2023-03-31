import * as React from "react";
import "../CSS/test.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Patient {
  ID_Patient: number;
  Nom: string;
  Prenom: string;
  Date_Naissance: string;
  Sexe: string;
  Num_Tel: string;
  Adresse: string;
  Commentaire: string;
}
const rows: Patient[] = [];
fetch("http://localhost:8080/show_patients", {
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
    data.forEach((patient) => {
      rows.push(patient);
    });
  })
  .catch((error) => console.error(error));

  

export default function AffichePatients() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#d8e2dc", color: "black" }}>
          <TableRow >
            <TableCell align="center">Nom</TableCell>
            <TableCell align="center">Prénom</TableCell>
            <TableCell align="center">Date de naissance</TableCell>
            <TableCell align="center">Sexe</TableCell>
            <TableCell align="center">Numéro de téléphone</TableCell>
            <TableCell align="center">Adresse</TableCell>
            <TableCell align="center">Commentaire</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((Patient) => (
            <TableRow key={Patient.ID_Patient}>
              <TableCell align="center">{Patient.Nom}</TableCell>
              <TableCell align="center">{Patient.Prenom}</TableCell>
              <TableCell align="center">{Patient.Date_Naissance}</TableCell>
              <TableCell align="center">{Patient.Sexe}</TableCell>
              <TableCell align="center">{Patient.Num_Tel}</TableCell>
              <TableCell align="center">{Patient.Adresse}</TableCell>
              <TableCell align="center">{Patient.Commentaire}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
