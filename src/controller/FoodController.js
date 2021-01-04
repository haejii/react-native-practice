import foodIngredients from '../../foodIngredient.json';

const FoodController = {
  findByFoodName: (name) => {
    return foodIngredients.filter((food) => food.name.includes(name));
  },
};

export default FoodController;
