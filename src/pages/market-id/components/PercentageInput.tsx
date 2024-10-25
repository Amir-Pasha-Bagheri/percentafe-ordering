import { Divider, Grid2, InputAdornment, TextField } from '@mui/material';
import Decimal from 'decimal.js';
import { ChangeEventHandler, useEffect, useState } from 'react';
import splitNumber from 'utils/splitNumber';

interface PercentageInputProps {
  totalRemain: number;
  priceAverage: number;
}

function PercentageInput(props: PercentageInputProps) {
  const [percentage, setPercentage] = useState<number>(0);
  const [payment, setPayment] = useState<number>(0);

  const onChangePercentage: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPercentage(Number(event.target.value));
  };

  useEffect(() => {
    let newPayment = new Decimal(percentage);
    newPayment = newPayment.div(100).mul(props.totalRemain).mul(props.priceAverage);

    setPayment(newPayment.toNumber());
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

      <Grid2 container justifyContent="space-between" sx={{ marginTop: 3 }}>
        <Grid2>Total Remain : {splitNumber(props.totalRemain)}</Grid2>

        <Divider orientation="vertical" flexItem />

        <Grid2>Price Average : {splitNumber(props.priceAverage)}</Grid2>

        <Divider orientation="vertical" flexItem />

        <Grid2>Payment : {splitNumber(payment)}</Grid2>
      </Grid2>
    </>
  );
}

export default PercentageInput;
