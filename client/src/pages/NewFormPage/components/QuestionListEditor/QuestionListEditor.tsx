import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';

import { QuastionEditor } from '../QuestionEditor';
import type { LocalQuestion, LocalQuestionOption } from '../../types';

import styles from './QuestionListEditor.module.scss';

type Props = {
  questions: LocalQuestion[];
  onUpdateQuestion: (tempId: string, fields: Partial<LocalQuestion>) => void;
  onDeleteQuestion: (tempId: string) => void;
  onAddOption: (questionTempId: string) => void;
  onUpdateOption: (
    questionTempId: string,
    optionTempId: string,
    fields: Partial<LocalQuestionOption>,
  ) => void;
  onDeleteOption: (questionTempId: string, optionTempId: string) => void;
  onReorderQuestions: (fromIndex: number, toIndex: number) => void; // нове
};

export const QuestionListEditor: React.FC<Props> = ({
  questions,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
  onReorderQuestions,
}) => {
  if (!questions.length) {
    return null;
  }

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;
    onReorderQuestions(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="questions">
        {provided => (
          <div
            className={styles.list}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {questions.map((q, index) => (
              <Draggable key={q.tempId} draggableId={q.tempId} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <QuastionEditor
                      question={q}
                      onUpdate={onUpdateQuestion}
                      onDelete={onDeleteQuestion}
                      onAddOption={onAddOption}
                      onUpdateOption={onUpdateOption}
                      onDeleteOption={onDeleteOption}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
