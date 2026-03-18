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
            value="import"
            control={<Radio />}
            label="Import"
          />
          <FormControlLabel
            value="export"
            control={<Radio />}
            label="Export"
          />
        </RadioGroup>
      </FormLabel>
    </FormControl>
  );
}
