import React, { useState, useEffect } from 'react';
import { styled } from 'styletron-react';
import { H5, LabelSmall } from 'baseui/typography';
import { useStyletron } from 'baseui';
import { withStyle } from 'baseui';
import { Button, SIZE, KIND } from "baseui/button";


const SummaryBase = styled('div', {
  display: 'flex',
  height: '100%',
  justifyContent: 'flex-end'
})
const Block = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const Price = styled('div', ({ $theme }) => ({
  ...$theme.typography.LabelLarge,
  fontWeight: 'bolder',
  display: 'inline-block',
  margin: '0 2px'
}))

export const Summary = ({
  day = 0,
  unit = 0
}) => {
  const [css, theme] = useStyletron();
  const [total, setTotal] = useState(0);

  function parseNumber(numStr) {
    return Number(
      parseFloat(numStr)
    ).toLocaleString("en", {
      minimumFractionDigits: 0
    })
  }

  useEffect(() => {
    setTotal(day * unit);
  }, [day, unit]);

  return (
    <SummaryBase>
      <Block>
        <Button kind={KIND.secondary}>
          Days {parseNumber(day)}
        </Button>
      </Block>
      <Block>
        <Button kind={KIND.secondary}>
            Unit $ {parseNumber(unit)}
        </Button>
      </Block>
      <Block>
        <Button kind={KIND.secondary}>
            Total $ {parseNumber(total)}
        </Button>
      </Block>
    </SummaryBase>
  )
}