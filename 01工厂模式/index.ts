/*
    这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式
    使用: 明确地计划不同条件下创建不同实例时
    优点：
        1、一个调用者想创建一个对象，只要知道其名称就可以了。
        2、扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。
        3、屏蔽产品的具体实现，调用者只关心产品的接口。
    缺点：
        每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，
        在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。这并不是什么好事。
*/
/*
    实现:
        我们将创建一个 Shape 接口和实现 Shape 接口的实体类。下一步是定义工厂类 ShapeFactory。
        FactoryPatternDemo 类使用 ShapeFactory 来获取 Shape 对象。
        它将向 ShapeFactory 传递信息（CIRCLE / RECTANGLE / SQUARE），以便获取它所需对象的类型。
*/

// 1. 创建接口
interface Shape {
  draw: () => void;
}

// 2. 实现接口的实体类
class Rectangle implements Shape {
  public draw() {
    console.log("Inside Rectangle: draw() method");
  }
}

class Square implements Shape {
  public draw() {
    console.log("Inside Square: draw() method");
  }
}

class Circle implements Shape {
  public draw() {
    console.log("Inside Circle: draw() method");
  }
}

// 3. 创建工厂,生成给予给定信息的实体类对象
enum ShapeType {
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
  SQUARE = "SQUARE",
}
class ShapeFactory {
  public getShape(shapeType: string) {
    if (shapeType === null) {
      return null;
    }
    if (shapeType === ShapeType.RECTANGLE) {
      return new Rectangle();
    } else if (shapeType === ShapeType.SQUARE) {
      return new Square();
    } else if (shapeType === ShapeType.CIRCLE) {
      return new Circle();
    }
    return null;
  }
}

// 4. 使用该工厂, 通过传递类型信息来获取实体类对象
function FactoryPatternDemo() {
  const shapeFactory: ShapeFactory = new ShapeFactory();
  const shape1: Shape = shapeFactory.getShape("RECTANGLE") as Shape;
  shape1.draw();
}
FactoryPatternDemo() // Inside Rectangle: draw() method
