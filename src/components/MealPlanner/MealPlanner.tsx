import React, { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { reorder, move, IMealPlanner, MealsEnum, IMeal, IMealDay, IRecipe, DaysEnum } from '../../shared';
import MealDay from './components/MealDay/MealDay';

import './MealPlanner.css';

const MealPlanner = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure();

  const [planner, setPlanner] = useState<IMealPlanner>({
    mealDays: Object.entries(DaysEnum).map((x) => ({
      title: x[1],
      meals: Object.entries(MealsEnum).map((y) => ({
        title: y[1],
        recipes: [],
        droppableId: `${x[1]}-${y[1]}`,
      })),
    })),
  });

  const [sidebarRecipes, setSidebarRecipes] = useState<IRecipe[]>([
    { title: 'Paella valenciana' },
    { title: 'Arroz con bogavante' },
    { title: 'Ensalada de pasta con pesto rojo' },
  ]);

  const openRecipesSidebar = (e: any) => {
    //onOpen();
  };

  const getList = (droppableId: string): IRecipe[] => {
    let { mealIndex, dayIndex } = getListIndex(droppableId);

    if (mealIndex === -1 || dayIndex === -1) return [];
    return planner.mealDays[dayIndex].meals[mealIndex].recipes;
  };

  const getListIndex = (droppableId: string): { dayIndex: number; mealIndex: number } => {
    let dayIndex = -1,
      mealIndex = -1;

    dayIndex = planner.mealDays.findIndex((meal: IMealDay) => {
      mealIndex = meal.meals.findIndex((meal: IMeal) => meal.droppableId === droppableId);

      return mealIndex !== -1;
    });

    return { mealIndex, dayIndex };
  };

  const onDragStart = (result: any) => {
    const { source } = result;

    //if (source.droppableId === 'sidebar') onClose();
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === 'sidebar') {
      const result = move(sidebarRecipes, getList(destination.droppableId), source, destination);

      setPlanner((planner: IMealPlanner) => {
        let newID = getListIndex(destination.droppableId);

        planner.mealDays[newID.dayIndex].meals[newID.mealIndex].recipes = result[1];

        return { ...planner };
      });

      // onOpen();
    } else if (source.droppableId === destination.droppableId) {
      const result = reorder(getList(source.droppableId), source.index, destination.index);

      setPlanner((planner: IMealPlanner) => {
        let { mealIndex, dayIndex } = getListIndex(source.droppableId);
        if (mealIndex === -1 || dayIndex === -1) return planner;

        planner.mealDays[dayIndex].meals[mealIndex].recipes = result;

        return { ...planner };
      });
    } else {
      const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);

      setPlanner((planner: IMealPlanner) => {
        let oldID = getListIndex(source.droppableId);
        let newID = getListIndex(destination.droppableId);

        planner.mealDays[oldID.dayIndex].meals[oldID.mealIndex].recipes = result[0];
        planner.mealDays[newID.dayIndex].meals[newID.mealIndex].recipes = result[1];

        return { ...planner };
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {planner.mealDays.map((mealDay: IMealDay) => (
          <MealDay mealDay={mealDay} openRecipesSidebar={openRecipesSidebar} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default MealPlanner;
