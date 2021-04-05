import foodIngredients from '../../foodIngredient.json';

const FoodController = {
  findByFoodName: (name) => {
    return foodIngredients.filter((food) => food.name.includes(name));
  },
  findByFoodId: (id) => {
    console.log('id', id);
    return foodIngredients.find((food) => food.id === id);
  },
  findFoodsByIds: (ids) => {
    let foods = [];
    ids.forEach((id) => {
      foods.push(foodIngredients.find((food) => food.id === id));
    });

    return foods;
  },
  calculateNuturitionFoods: (ids) => {
    let nuturition = {
      calorie: 0,
      carbohydrate: 0,
      protein: 0,
      fat: 0,
      sodium: 0,
      calcium: 0,
      potassium: 0,
      iron: 0,
      phosphorus: 0,
    };
    ids.forEach((id) => {
      const food = foodIngredients.find((food) => food.id === id);

      nuturition.calorie += food.calorie;
      nuturition.protein += food.protein;
      nuturition.carbohydrate += food.carbohydrate;
      nuturition.sodium += food.sodium;
      nuturition.fat += food.fat;
      nuturition.potassium += food.potassium;
      nuturition.calcium += food.calcium;
      nuturition.phosphorus += food.phosphorus;
      nuturition.iron += food.iron;
    });

    return nuturition;
  },

  calculateBasketFoods: (ids) => {
    let nuturition = {
      calorie: 0,
      carbohydrate: 0,
      protein: 0,
      fat: 0,
      sodium: 0,
      calcium: 0,
      potassium: 0,
      iron: 0,
      phosphorus: 0,
    };
    ids.forEach((id) => {
      const food = foodIngredients.find((food) => food.id === id);

      nuturition.calorie += food.calorie;
      nuturition.protein += food.protein;
      nuturition.carbohydrate += food.carbohydrate;
      nuturition.sodium += food.sodium;
      nuturition.fat += food.fat;
      nuturition.potassium += food.potassium;
      nuturition.calcium += food.calcium;
      nuturition.phosphorus += food.phosphorus;
      nuturition.iron += food.iron;
    });

    return nuturition;
  },
};

export default FoodController;
