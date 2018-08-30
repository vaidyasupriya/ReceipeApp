import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredients= this.adjustIngredients(this.ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredients = this.adjustIngredients(this.ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
  this.ingredients[index] =  newIngredient;
  this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredients(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  adjustIngredients (ingredients: Ingredient[]) {
      length  = ingredients.length;

      for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1 ; j < length ; j++) {
          if (ingredients[i].name.toLowerCase() === ingredients[j].name.toLowerCase()) {
            ingredients[i].amount += ingredients[j].amount;
            ingredients.splice(j, 1);
            length = length - 1 ;
          }
        }
      }

      return this.ingredients;
  }
}
