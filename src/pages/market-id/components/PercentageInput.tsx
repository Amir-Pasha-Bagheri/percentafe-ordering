import { Divider, FormHelperText, Grid2, InputAdornment, TextField } from '@mui/material';
import Decimal from 'decimal.js';
import { ChangeEventHandler, useEffect, useState } from 'react';
import splitNumber from 'utils/splitNumber';

interface PercentageInputProps {
  totalRemain: number;
  priceAverage: number;
}

function PercentageInput(props: PercentageInputProps) {
  const [percentage, setPercentage] = useState<number>(0);
  const [payment, setPayment] = useState<string>('0');

  const onChangePercentage: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPercentage(Number(event.target.value));
  };

  useEffect(() => {
    let newPayment = new Decimal(percentage);
    newPayment = newPayment.div(100).mul(props.totalRemain).mul(props.priceAverage);

    setPayment(newPayment.toFixed(2));
  }, [percentage, props.priceAverage, props.totalRemain]);

  return (
    <>
      <TextField
        label="Remain Percentage"
        variant="standard"
        autoComplete="off"
        type="number"
        value={percentage}
        onChange={onChangePercentage}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          },
        }}
      />
      <FormHelperText>Total Remains: {props.totalRemain}</FormHelperText>

      <Grid2 container sx={{ marginTop: 3 }} spacing={3}>
        <Grid2>Price Average : {splitNumber(props.priceAverage.toFixed(2))} $</Grid2>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 3, marginRight: 3 }}
        />

        <Grid2>
          Amount : {splitNumber(new Decimal(percentage).div(100).mul(props.totalRemain).toString())}
        </Grid2>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 3, marginRight: 3 }}
        />

        <Grid2>Payment : {splitNumber(payment)} $</Grid2>
      </Grid2>
    </>
  );
}

export default PercentageInput;
