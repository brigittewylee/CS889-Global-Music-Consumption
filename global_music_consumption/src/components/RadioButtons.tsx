import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

export function RadioButton() {
  <FormControl>
    <FormLabel>
      <RadioGroup row>
        <FormControlLabel value="import" control={<Radio />} label="Import" />
        <FormControlLabel value="export" control={<Radio />} label="export" />
      </RadioGroup>
    </FormLabel>
  </FormControl>;
}
