import React, { useState, useEffect } from 'react';
import { styled } from 'styletron-react';
import {Button, KIND, SIZE, SHAPE } from 'baseui/button';
import {Plus} from 'baseui/icon';
import { TaskModal } from './TaskModal';
import { ButtonGroup, MODE } from 'baseui/button-group';
import {
  Grab,
  Overflow
} from 'baseui/icon';

import ChevronDown from 'baseui/icon/chevron-down';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {StatefulMenu} from 'baseui/menu';

const ToolbarBase = styled('div', {
  width: '960px',
  height: '50px',
  borderTop: '2px solid #eee',
  boxSizing: 'border-box',
  overflow: 'hidden',
  padding: '2px 10px',
  display: 'flex',
  alignItems: 'center'
})

const ITEMS = [
  {key: 'SETTING', label: 'Setting'},
  {key: 'DOWNLOADPNG', label: 'Download PNG'},
];

export const Toolbar = ({
  onCreate,
  loading,
  onDownloadPNG,
  onSetting,
  onTypeChange,
  type
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    console.log(selected);
    if (selected === 0) {
      setSelectedType('DAY');
    }
    if (selected === 1) {
      setSelectedType('MONTH');
    }
    if (selected === 2) {
      setSelectedType('YEAR');
    }
  }, [selected])

  useEffect(() => {
    onTypeChange(selectedType);
  }, [selectedType])

  useEffect(() => {
    if (type === 'DAY') {
      setSelected(0)
    }
    if (type === 'MONTH') {
      setSelected(1)
    }
    if (type === 'YEAR') {
      setSelected(2)
    }
  }, [type])

  return (
    <>
      <ToolbarBase>
        <Button
          kind={KIND.primary}
          size={SIZE.compact}
          shape={SHAPE.pill}
          startEnhancer={() => <Plus size={16} />}
          disabled={loading}
          onClick={() => setIsOpen(!isOpen)}
        >
            Task
        </Button>
        <div style={{ flex: '1 1 auto'}}></div>    
        <ButtonGroup
          mode={MODE.radio}
          size={SIZE.compact}
          shape={SHAPE.pill}
          selected={selected}
          onClick={(event, index) => setSelected(index)}
        >
          <Button>Day</Button>
          <Button>Month</Button>
          <Button>Year</Button>
        </ButtonGroup>

        <StatefulPopover
          focusLock
          placement={PLACEMENT.bottomLeft}
          content={({close}) => (
            <StatefulMenu
              items={ITEMS}
              onItemSelect={(event) => {
                if (event.item.key === 'SETTING') {
                  onSetting();
                }
                if (event.item.key === 'DOWNLOADPNG') {
                  onDownloadPNG();
                }
                close()
              }}
            />
          )}
        >
          <Button kind={KIND.minimal} size={SIZE.compact} shape={SHAPE.circle}>
            <Overflow color="#707070" size={24}/>
        </Button>
        </StatefulPopover>

      </ToolbarBase>
      <TaskModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onCreate}
      />
    </>
  )
}