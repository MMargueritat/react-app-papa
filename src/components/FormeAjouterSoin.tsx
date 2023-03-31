import React from "react";
import "../CSS/Forme_Patient.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type FormValuesSoin = {
  nom_patient: string;
  dateDeb_soin: string;
  dateFin_soin: string;
  soin: number;
  checkboxes: boolean[];
  commentaire_soin: string;
};

interface nomP {
  ID_Patient: number;
  Nom: String;
  Prenom: String;
  Date_Naissance: string;
}
const rows: nomP[] = [];

interface listeS {
  ID_ListeSoin: number;
  libelSoin: String;
}
const rowsListeS: listeS[] = [];

function appelDB() {
  fetch("http://localhost:8080/show_listeSoin", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: listeS[]) => {
      data.forEach((listeSoins) => {
        rowsListeS.push(listeSoins);
      });
    })
    .catch((error) => console.error(error));

  fetch("http://localhost:8080/show_patient_nomP", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: nomP[]) => {
      data.forEach((patient) => {
        rows.push(patient);
      });
    })
    .catch((error) => console.error(error));
}
appelDB()

function FormeSoin() {
  const schema = yup.object().shape({
    dateDeb_soin: yup
      .string()
      .matches(
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        "Format invalide : JJ/MM/AAAA"
      )
      .required("Ce champs est obligatoire."),
    dateFin_soin: yup
      .string()
      .matches(
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        "Format invalide : JJ/MM/AAAA"
      )
      .required("Ce champs est obligatoire."),
    commentaire_soin: yup.string(),
    checkboxes: yup
      .array()
      .of(yup.boolean())
      .min(1, "Veuillez cocher au moins une case.")
      .test(
        "at-least-one-checked",
        "Veuillez cocher au moins une case.",
        (values = []) => values.some(Boolean)
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValuesSoin>({
    resolver: yupResolver(schema),
  });

  const addBDDSoin = handleSubmit((datas) => {
    const body: FormValuesSoin = {
      nom_patient: datas.nom_patient,
      dateDeb_soin: datas.dateDeb_soin,
      dateFin_soin: datas.dateFin_soin,
      soin: datas.soin,
      checkboxes: datas.checkboxes,
      commentaire_soin: datas.commentaire_soin,
    };

    fetch("http://localhost:8080/addSoin", {
      method: "POST",
      mode: "cors",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    
    window.location.reload();
    appelDB()
  });

  return (
    <form onSubmit={addBDDSoin} className="Form-joli">
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-label">Patient</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Patient"
            {...register("nom_patient")}
          >
            {rows.map((nomP) => (
              <MenuItem key={nomP.ID_Patient} value={nomP.ID_Patient}>
                {nomP.Prenom} {nomP.Nom} {nomP.Date_Naissance}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        id="dateDeb_soin"
        label="Date de début du soin"
        variant="outlined"
        error={!!errors.dateDeb_soin}
        helperText={!!errors.dateDeb_soin && errors.dateDeb_soin.message}
        {...register("dateDeb_soin")}
      />

      <TextField
        id="dateFin_soin"
        label="Date de fin du soin"
        variant="outlined"
        error={!!errors.dateFin_soin}
        helperText={!!errors.dateFin_soin && errors.dateFin_soin.message}
        {...register("dateFin_soin")}
      />

      <FormControlLabel
        control={<Checkbox color="primary" {...register("checkboxes.0")} />}
        label="Matin"
      />

      <FormControlLabel
        control={<Checkbox color="primary" {...register("checkboxes.1")} />}
        label="Journée"
      />

      <FormControlLabel
        control={<Checkbox color="primary" {...register("checkboxes.2")} />}
        label="Soir"
      />
      {errors?.checkboxes && (
        <p style={{ color: "red" }}>{`${errors?.checkboxes?.message}`}</p>
      )}

      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-label">Soin</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="SoinListe"
            {...register("soin")}
          >
            {rowsListeS.map((listeSoin) => (
              <MenuItem
                key={listeSoin.ID_ListeSoin}
                value={listeSoin.ID_ListeSoin}
              >
                {listeSoin.libelSoin}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        id="commentaire_soin"
        label="Commentaire"
        variant="outlined"
        error={!!errors.commentaire_soin}
        helperText={
          !!errors.commentaire_soin && errors.commentaire_soin.message
        }
        {...register("commentaire_soin")}
      />

      <Button variant="outlined" type="submit">
        Ajouter le nouveau soin
      </Button>
    </form>
  );
}

export default FormeSoin;
