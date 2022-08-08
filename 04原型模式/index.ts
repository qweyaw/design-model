/*
  原型模式:
    用于创建重复的对象，同时又能保证性能。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

  优点： 1、性能提高。 2、逃避构造函数的约束。

  缺点： 1、配备克隆方法需要对类的功能进行通盘考虑，这对于全新的类不是很难，
          但对于已有的类不一定很容易，特别当一个类引用不支持串行化的间接对象，或者引用含有循环结构的时候。
        2、必须实现 Cloneable 接口。
*/

/*
  实现:
    创建一个抽象类 Shape 和扩展了 Shape 类的实体类。
    下一步是定义类 ShapeCache，该类把 shape 对象存储在一个 Hashtable 中，并在请求的时候返回它们的克隆。
*/

// 1. 创建一个实现了 cloneable 接口 的类

abstract class Shape {
  private id: string = "";
  protected type: string = "";

  abstract draw(): void;

  public getType(): string {
    return this.type;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }
  // 待实现
  public clone = () => {
    // try {
    //   clone = JSON.parse(JSON.stringify(this));
    //   return clone;
    // } catch (error) {}
    return Object.create(this);
  };
}

// 2. 上面抽象类的实体类
class Rectangle extends Shape {
  public shapeType() {
    this.type = "Rectangle";
  }

  public draw() {
    console.log("Rectangle");
  }
}

class Circle extends Shape {
  public shapeType() {
    this.type = "Circle";
  }

  public draw() {
    console.log("Circle");
  }
}

class Square extends Shape {
  public shapeType() {
    this.type = "Square";
  }

  public draw() {
    console.log("Square");
  }
}

// 3. 存储 类
class ShapeCache {
  // @ts-ignore
  public static shapeMap: Map<string, Shape> = new Map<string, Shape>();

  public static getShape(shapeId: string): Shape {
    const cacheShape = ShapeCache.shapeMap.get(shapeId) as Shape;
    return cacheShape.clone();
  }

  public static loadCache(): void {
    const circle: Circle = new Circle();
    circle.shapeType();
    circle.setId("1");
    this.shapeMap.set(circle.getId(), circle);

    const square: Circle = new Square();
    square.shapeType();
    square.setId("2");
    this.shapeMap.set(square.getId(), square);

    const rectangle: Circle = new Rectangle();
    rectangle.shapeType();
    rectangle.setId("3");
    this.shapeMap.set(rectangle.getId(), rectangle);
  }
}

// 4. 使用
function PrototypePatternDemo() {
  ShapeCache.loadCache();
  const cloneShape1: Shape = ShapeCache.getShape("1");
  const cloneShape11: Shape = ShapeCache.getShape("1");
  console.log(111, cloneShape1.getType(), cloneShape1 === cloneShape11);

  const cloneShape2: Shape = ShapeCache.getShape("2");
  console.log(222, cloneShape2.getType());

  const cloneShape3: Shape = ShapeCache.getShape("3");
  console.log(333, cloneShape3.getType());
}

PrototypePatternDemo();
/*
  111 Circle false
  222 Square
  333 Rectangle
*/
