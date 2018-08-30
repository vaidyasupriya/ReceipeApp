import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
constructor(private http: Http,
            private receipeService: RecipeService) {}

storeRecipes() {
 return this.http.put('https://ng-khau-data.firebaseio.com/recipes.json',
   this.receipeService.getRecipes() );
}

getRecipes() {
  this.http.get('https://ng-khau-data.firebaseio.com/recipes.json')
    .map(
    (response: Response) => {
      const recipes: Recipe[] = response.json() ;
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return recipes;
    }
  )
  .subscribe(
    (recipes: Recipe[]) => {
      this.receipeService.setRecipes(recipes);
    }
  );
}
}
