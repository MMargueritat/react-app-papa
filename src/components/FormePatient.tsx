import React from "react";
import "../CSS/Forme_Patient.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type FormValues = {
  nom_patient: string;
  prenom_patient: string;
  date_naissance_patient: Date;
  sexe_patient: string;
  adresse_patient: string;
  numTel_patient: string;
  commentaire_patient: string;
};

function FormePatient() {
  const schema = yup.object().shape({
    nom_patient: yup.string().required("Ce champs est obligatoire."),
    prenom_patient: yup.string().required("Ce champs est obligatoire."),
    date_naissance_patient: yup
      .string()
      .matches(
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        "Format invalide : JJ/MM/AAAA"
      )
      .required("Ce champs est obligatoire."),
    adresse_patient: yup.string().required("Ce champs est obligatoire."),
    numTel_patient: yup
      .string()
      .matches(
        /(0|\\+33|0033)[1-9][0-9]{8}/,
        "Ce champs est obligatoire."
      ),
    commentaire_patient: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const addBDDPatient = handleSubmit((datas) => {
    const body: FormValues = {
      nom_patient: datas.nom_patient,
      prenom_patient: datas.prenom_patient,
      date_naissance_patient: datas.date_naissance_patient,
      sexe_patient: datas.sexe_patient,
      adresse_patient: datas.adresse_patient,
      numTel_patient: datas.numTel_patient,
      commentaire_patient: datas.commentaire_patient,
    };

    fetch("http://localhost:8080/add", {
      method: "POST",
      mode: "cors",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    reset();
    window.location.reload();
  });

  return (
    <form onSubmit={addBDDPatient} className="Form-joli">
      <TextField
        id="nom_patient"
        label="Nom"
        variant="outlined"
        error={!!errors.nom_patient}
        helperText={!!errors.nom_patient && errors.nom_patient.message}
        {...register("nom_patient")}
      />

      <TextField
        id="prenom_patient"
        label="Prénom"
        variant="outlined"
        error={!!errors.prenom_patient}
        helperText={!!errors.prenom_patient && errors.prenom_patient.message}
        {...register("prenom_patient")}
      />

      <TextField
        id="date_naissance_patient"
        label="Date de naissance"
        variant="outlined"
        error={!!errors.date_naissance_patient}
        helperText={
          !!errors.date_naissance_patient &&
          errors.date_naissance_patient.message
        }
        {...register("date_naissance_patient")}
      />
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="F"
          id="sexe_patient"
        >
          <FormControlLabel
            value="F"
            control={<Radio />}
            label="Femme"
            {...register("sexe_patient")}
          />
          <FormControlLabel
            value="H"
            control={<Radio />}
            label="Homme"
            {...register("sexe_patient")}
          />
        </RadioGroup>
      </FormControl>

      <TextField
        id="adresse_patient"
        label="Adresse"
        variant="outlined"
        error={!!errors.adresse_patient}
        helperText={!!errors.adresse_patient && errors.adresse_patient.message}
        {...register("adresse_patient")}
      />

      <TextField
        id="numTel_patient"
        label="Numéro de téléphone"
        variant="outlined"
        error={!!errors.numTel_patient}
        helperText={!!errors.numTel_patient && errors.numTel_patient.message}
        {...register("numTel_patient")}
      />

      <TextField
        id="commentaire_patient"
        label="Commentaire"
        variant="outlined"
        error={!!errors.commentaire_patient}
        helperText={
          !!errors.commentaire_patient && errors.commentaire_patient.message
        }
        {...register("commentaire_patient")}
      />

      <Button variant="outlined" type="submit">
        Ajouter le nouveau patient
      </Button>
    </form>
  );
}

export default FormePatient;
