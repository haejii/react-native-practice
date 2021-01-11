import foodIngredients from '../../foodIngredient.json';

const FoodController = {
  findByFoodName: (name) => {
    return foodIngredients.filter((food) => food.name.includes(name));
  },
  findByFoodId: (id) => {
    return foodIngredients.find((food) => food.id === id);
  },
};

export default FoodController;
