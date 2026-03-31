import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type Props = {
  impex: string;
  setImpex: (val: string) => void;
};

export function ImportExportRadioButton(props: Props) {
  console.log(props.impex);
  return (
    <FormControl>
      <FormLabel>
        <RadioGroup row value={props.impex} onChange={(e) => props.setImpex(e.target.value)}>
          <FormControlLabel
            sx={{ color: "white" }}
            value="import"
            control={
              <Radio
                sx={{
                  color: "white",
                }}
              />
            }
            label="Import"
          />
          <FormControlLabel
            sx={{ color: "white" }}
            value="export"
            control={
              <Radio
                sx={{
                  color: "white",
                }}
              />
            }
            label="Export"
          />
        </RadioGroup>
      </FormLabel>
    </FormControl>
  );
}
