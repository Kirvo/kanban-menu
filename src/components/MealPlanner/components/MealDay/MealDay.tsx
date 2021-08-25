import React from 'react';

// import { Icon } from '@chakra-ui/react';
// import { FaPlus } from 'react-icons/fa';
import { Droppable } from 'react-beautiful-dnd';

import RecipeCard from '../RecipeCard/RecipeCard';

import { IMealDay, IMeal, IRecipe } from '../../../../shared';

import './MealDay.css';

const MealDay = ({ mealDay, openRecipesSidebar }: { mealDay: IMealDay; openRecipesSidebar: (e: any) => void }) => {
  return (
    <div className="planner-column">
      <div className="title">{mealDay.title}</div>

      {mealDay.meals.map(({ title, droppableId, recipes }: IMeal) => (
        <div className="meal-container">
          <div className="head">
            <div>{title}</div>

            <div onClick={openRecipesSidebar}>+</div>
            {/* <Icon
              as={FaPlus}
              onClick={openRecipesSidebar}
              cursor={'pointer'}
              _hover={{ color: 'black' }}
            /> */}
          </div>

          <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="body">
                {recipes.map((recipe: IRecipe, index: number) => (
                  <RecipeCard index={index} recipe={recipe} draggableID={droppableId + '-' + index} />
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
};

export default MealDay;
