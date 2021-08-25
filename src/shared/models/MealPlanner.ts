interface IRecipe {
  title: string;
  img?: string;
  duration?: number;
}

interface IMeal {
  title: string;
  recipes: IRecipe[];
  droppableId: string;
}

interface IMealDay {
  title: string;
  meals: IMeal[];
}

interface IMealPlanner {
  mealDays: IMealDay[];
}

export type { IRecipe, IMealPlanner, IMeal, IMealDay };
