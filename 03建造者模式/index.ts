/* 
    建造者模式:
        建造者模式（Builder Pattern）使用多个简单的对象一步一步构建成一个复杂的对象
        这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式
    
    优点： 1、建造者独立，易扩展。 2、便于控制细节风险。

    缺点： 1、产品必须有共同点，范围有限制。 2、如内部变化复杂，会有很多的建造类
*/
/* 
    实现:
        我们假设一个快餐店的商业案例，其中，一个典型的套餐可以是一个汉堡（Burger）和一杯冷饮（Cold drink）。
        汉堡（Burger）可以是素食汉堡（Veg Burger）或鸡肉汉堡（Chicken Burger），它们是包在纸盒中。
        冷饮（Cold drink）可以是可口可乐（coke）或百事可乐（pepsi），它们是装在瓶子中。

        我们将创建一个表示食物条目（比如汉堡和冷饮）的 Item 接口和实现 Item 接口的实体类，
        以及一个表示食物包装的 Packing 接口和实现 Packing 接口的实体类，汉堡是包在纸盒中，冷饮是装在瓶子中。

        然后我们创建一个 Meal 类，带有 Item 的 ArrayList 和一个通过结合 Item 来创建不同类型的 Meal 对象的 MealBuilder。
        BuilderPatternDemo 类使用 MealBuilder 来创建一个 Meal。
*/

// 1. 创建一个表示 食物条目 和 食物包装 的接口
interface Packing {
  pack: () => string;
}
interface Item {
  name: () => string;
  packing: () => Packing;
  price: () => number;
}

// 2. 创建实现 Packing 接口的实体类
class Wrapper implements Packing {
  public pack(): string {
    return "Wrapper";
  }
}

class Bottle implements Packing {
  public pack(): string {
    return "Bottle";
  }
}

// 3. 创建实现 Item 接口的抽象类
class Burger implements Item {
  public packing(): Packing {
    return new Wrapper();
  }
  public price() {
    return 1;
  }
  public name() {
    return "Burger";
  }
}

class ColdDrink implements Item {
  public packing(): Packing {
    return new Bottle();
  }
  public price() {
    return 1;
  }
  public name() {
    return "ColdDrink";
  }
}

// 4. 创建扩展 Burger 和 ColdDrink 的实体类
class VenBurger extends Burger {
  public price(): number {
    return 22.7;
  }
  public name(): string {
    return "Ven Burger";
  }
}

class ChickenBurger extends Burger {
  public price(): number {
    return 22.7;
  }
  public name(): string {
    return "ChickenBurger";
  }
}

class Coke extends ColdDrink {
  public price(): number {
    return 98.7;
  }
  public name(): string {
    return "Coke Drink";
  }
}

class Pepsi extends ColdDrink {
  public price(): number {
    return 22.7;
  }
  public name(): string {
    return "Pepsi";
  }
}

// 5. 创建一个 Meal 类, 带有定义上面 Item 的对象
class Meal {
  private items: Item[] = new Array<Item>();

  public addItem(item: Item): void {
    this.items.push(item);
  }

  public getCost(): number {
    let cost = 0.0;
    for (let i = 0; i < this.items.length; i++) {
      cost += this.items[i].price();
    }
    return cost;
  }

  public showItems() {
    for (let i = 0; i < this.items.length; i++) {
      const cur = this.items[i];
      console.log(cur.name());
      console.log(cur.price());
      console.log(cur.packing().pack());
    }
  }
}

// 6. 创建一个 MealBuilder 类, 实际的 Builder 类 负责创建 Meal 对象
class MealBuilder {
  public prepareVegMel(): Meal {
    const meal = new Meal();
    meal.addItem(new VenBurger());
    meal.addItem(new Coke());
    return meal;
  }

  public prepareNonVegMeal(): Meal {
    const meal = new Meal();
    meal.addItem(new ChickenBurger());
    meal.addItem(new Pepsi());
    return meal;
  }
}

// 7. 使用
function BuilderPatternDemo() {
  const mealBuilder: MealBuilder = new MealBuilder();

  const vegMeal = mealBuilder.prepareVegMel();
  vegMeal.showItems();
  console.log("total cost: " + vegMeal.getCost());

  const nonVegMeal = mealBuilder.prepareNonVegMeal();
  nonVegMeal.showItems();
  console.log("total cost: " + nonVegMeal.getCost());
}
BuilderPatternDemo();
/* 
Ven Burger
22.7
Wrapper
Coke Drink
98.7
Bottle
total cost: 121.4
ChickenBurger
22.7
Wrapper
Pepsi
22.7
Bottle
total cost: 45.4
*/
