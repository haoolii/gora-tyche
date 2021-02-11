import React, { useState, useEffect } from 'react';
import { HeadingSmall} from 'baseui/typography'
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Block } from 'baseui/block';
import { Button, KIND, SIZE } from 'baseui/button';
import { styled } from 'baseui';
import { DatePicker } from "baseui/datepicker";
const SettingBase = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
})

const Operation = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end'
})
export const Setting = ({
  setting,
  onSubmit,
  onClose
}) => {
  const [title, setTitle] = useState('');
  const [unit, setUnit] = useState(0);
  const [rootStart, setRootStart] = useState();
  const [rootEnd, setRootEnd] = useState();

  useEffect(() => {
    setTitle(setting.title);
    setUnit(setting.unit);
    setRootStart(setting.rootStart);
    setRootEnd(setting.rootEnd);
  }, [setting])

  function submit() {
    onSubmit({
      title,
      unit,
      rootStart,
      rootEnd
    });
  }

   return (
     <SettingBase>
        <Block>
          <HeadingSmall marginBottom="scale700">
            Setting
          </HeadingSmall>
          <FormControl label="Title">
            <Input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
          </FormControl>
          <FormControl label="Unit Cost">
            <Input value={unit} type="number" onChange={e => setUnit(e.currentTarget.value)}/>
          </FormControl>
          <FormControl label="Start Date">
            <DatePicker value={rootStart} onChange={event => setRootStart(event.date)}/>
          </FormControl>
          <FormControl label="End Date">
            <DatePicker value={rootEnd} onChange={event => setRootEnd(event.date)}/>
          </FormControl>
        </Block>
        <Operation>
          <Button size={SIZE.large} kind={KIND.tertiary} onClick={onClose}>
            Cancel
          </Button>
          <Block marginRight="10px"></Block>
          <Button size={SIZE.large} onClick={submit}>
            Save
          </Button>
        </Operation>
     </SettingBase>
  )
}