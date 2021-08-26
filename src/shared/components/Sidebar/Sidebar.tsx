import React, { useState } from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input } from '@chakra-ui/react';

import RecipeCard from '../../../components/MealPlanner/components/RecipeCard/RecipeCard';
import { IRecipe } from '../../models/MealPlanner';

import './Sidebar.css';

const RecipeSidebar = ({ recipes, onClose, isOpen }: any) => {
  return (
    <Drawer isOpen={isOpen} placement="right" size="sm" onClose={onClose}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Buscador de recetas</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />

          <Droppable droppableId={'sidebar'}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="body">
                {recipes.map((recipe: IRecipe, index: number) => (
                  <RecipeCard index={index} recipe={recipe} draggableID={'sidebar-' + index} />
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default RecipeSidebar;
