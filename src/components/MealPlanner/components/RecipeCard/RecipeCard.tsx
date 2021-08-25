import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { IRecipe } from '../../../../shared';

import './RecipeCard.css';

const RecipeCard = ({ index, recipe, draggableID }: { index: number; recipe: IRecipe; draggableID: string }) => {
  return (
    <Draggable index={index} key={draggableID} draggableId={draggableID}>
      {(provided, snapshot) => (
        <div className="meal" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="meal-title" title={recipe.title}>
            {recipe.title}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default RecipeCard;
