import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
function App() {
  const [content1, setContent1] = useState(
    <Typography id="content1" className="w-full">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit facere
      hic corporis laudantium dolores porro veritatis magni tempore, minus,
      autem in eligendi, atque numquam quasi harum tenetur consequuntur enim
      doloribus.
    </Typography>
  );
  const [content2, setContent2] = useState(
    <Typography id="content1" className="w-full">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit facere
      hic corporis laudantium dolores porro veritatis magni tempore, minus,
      autem in eligendi, atque numquam quasi harum tenetur consequuntur enim
      doloribus.
    </Typography>
  );
  const [contractValue, setContractValue] = useState("");
  const handleContractValueChange = (event) => {
    setContractValue(event.target.value);
  };
  const handleAnalyze = async () => {
    let analysis = await fetch(
      "http://localhost:3000/analyzer/analyze/contract",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contract: contractValue,
          language: "es",
        }),
      }
    );
    let analysisJson = await analysis.json();
    let keyPhrases = analysisJson.keyPhrases;
    let summaries = analysisJson.summary;
    setContent1(
      keyPhrases.map((keyPhrase) => (
        <Typography id="content1" className="w-full">
          - {keyPhrase}
        </Typography>
      ))
    );
    setContent2(
      summaries.map((summary) => (
        <Typography id="content1" className="w-full">
          - {summary.text}
        </Typography>
      ))
    );
    let divider = document.getElementById("divider");
    let result = document.getElementById("result");
    divider.classList.remove("!hidden");
    result.classList.remove("!hidden");
  };
  const handleClear = () => {
    let divider = document.getElementById("divider");
    let result = document.getElementById("result");
    setContractValue("");
    divider.classList.add("!hidden");
    result.classList.add("!hidden");
  };
  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-sky-500 to-indigo-500">
      <Paper className="p-5 flex flex-col items-center h-full gap-5">
        <Typography variant="h4" gutterBottom>
          Contract Analyzer
        </Typography>
        <div className="w-full px-10">
          <TextField
            id="contract"
            className="w-full"
            multiline
            label="Contrato"
            rows={13}
            value={contractValue}
            onChange={handleContractValueChange}
          />
        </div>
        <Stack className="w-full justify-center" direction={"row"} spacing={2}>
          <Button
            className="w-full max-w-60"
            variant="contained"
            onClick={handleAnalyze}
          >
            Analizar!
          </Button>
          <Button
            color="error"
            className="w-full max-w-60"
            variant="contained"
            onClick={handleClear}
          >
            Limpiar
          </Button>
        </Stack>
        <Divider id="divider" className="!hidden" flexItem></Divider>
        <Stack id="result" className="!hidden flex-col items-center">
          <Typography variant="h6" gutterBottom>
            Result
          </Typography>
          <Stack className="p-5" direction={"row"} spacing={5}>
            <Stack className="w-full" spacing={2}>
              <Typography id="content1" variant="body2" className="w-full">
                Palabras Clave
              </Typography>
              <Stack className="w-full">{content1}</Stack>
            </Stack>
            <Stack className="w-full" spacing={2}>
              <Typography id="content1" variant="body2" className="w-full">
                Resumen
              </Typography>
              <Typography id="content2" className="w-full">
                {content2}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </div>
  );
}

export default App;
