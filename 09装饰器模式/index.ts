/* 
  装饰器模式
    允许向一个现有的对象添加新功能,同时又不改变其结构

  优点：
    装饰类和被装饰类可以独立发展，不会相互耦合，
    装饰模式是继承的一个替代模式，装饰模式可以动态扩展一个实现类的功能。

  缺点：多层装饰比较复杂。
*/
/* 
  实现:
    创建一个 Shape 接口和实现了 Shape 接口的实体类
    然后我们创建一个实现了 Shape 接口的抽象装饰类 ShapeDecorator，
    并把 Shape 对象作为它的实例变量。
*/

// 1. 创建接口
interface Shape {
  draw: () => void
}

// 2. 创建接口的实体类
class Rectangle implements Shape {
  draw() {
    console.log("Rectangle")
  }
}
class Circle implements Shape {
  draw() {
    console.log("Circle")
  }
}

// 3. 创建实现了 Shape 接口 的抽象装饰器类
abstract class ShapeDecorator implements Shape {
  protected decoratedShape: Shape
  constructor(decoratedShape: Shape) {
    this.decoratedShape = decoratedShape
  }
  draw() {
    this.decoratedShape.draw()
  }
}

// 4. 创建扩展了 ShapeDecorator 的实体类
class RedShapeDecorator extends ShapeDecorator {
  constructor(decoratedShape: Shape) {
    super(decoratedShape)
  }
  draw() {
    this.decoratedShape.draw()
    this.setRedBorder(this.decoratedShape)
  }
  private setRedBorder(decoratedShape: Shape): void {
    console.log("Border Color: Red")
  }
}

// 5. 使用 RedShapeDecorator 来装饰 Shape 对象
function DecoratorPatternDemo() {
  const circle: Shape = new Circle()
  const redCircle: ShapeDecorator = new RedShapeDecorator(new Circle())
  const redRectangle: ShapeDecorator = new RedShapeDecorator(new Rectangle())
  console.log("Circle with normal border")
  circle.draw()

  console.log("\nCircle of red border")
  redCircle.draw()

  console.log("\nRectangle of red border")
  redRectangle.draw()
}
DecoratorPatternDemo()
/* 
  Circle with normal border
  Circle

  Circle of red border
  Circle
  Border Color: Red

  Rectangle of red border
  Rectangle
  Border Color: Red
*/
