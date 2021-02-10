import React from 'react';
import { styled } from 'styletron-react';
import {Button, KIND } from 'baseui/button';
import {Plus} from 'baseui/icon';
import {LabelMedium} from 'baseui/typography';
import { TaskModal } from './TaskModal';

const ToolbarBase = styled('div', {
  width: '960px',
  height: '50px',
  borderTop: '2px solid #eee',
  boxSizing: 'border-box',
  overflow: 'hidden'
})

const Operation = styled('div', {
  width: '200px',
  height: '50px',
})


export const Toolbar = ({
  onCreate,
  loading
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <ToolbarBase>
        <Operation>
          <Button
            kind={KIND.tertiary}
            startEnhancer={() => <Plus size={24} />}
            disabled={loading}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start'
                })
              }
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <LabelMedium>
              Create Task { loading }
            </LabelMedium>
          </Button>
        </Operation>
      </ToolbarBase>
      <TaskModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onCreate}
      />
    </>
  )
}