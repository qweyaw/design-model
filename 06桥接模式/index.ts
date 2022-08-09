/*
  桥接模式:
    把抽象化与实现化解耦，使得二者可以独立变化。
    这种类型的设计模式属于结构型模式，它通过提供抽象化和实现化之间的桥接结构，来实现二者的解耦。
    这种模式涉及到一个作为桥接的接口，使得实体类的功能独立于接口实现类。这两种类型的类可被结构化改变而互不影响。

    优点： 1、抽象和实现的分离。 2、优秀的扩展能力。 3、实现细节对客户透明。

    缺点：桥接模式的引入会增加系统的理解与设计难度，由于聚合关联关系建立在抽象层，要求开发者针对抽象进行设计与编程。
*/
/*
  实现:
    有一个作为桥接实现的 DrawAPI 接口和实现了 DrawAPI 接口的实体类 RedCircle、GreenCircle。
    Shape 是一个抽象类，将使用 DrawAPI 的对象。BridgePatternDemo 类使用 Shape 类来画出不同颜色的圆。
*/

// 1. 创建 桥接 实现接口
interface DrawAPI {
  drawCircle: (radius: number, x: number, y: number) => void;
}

// 2. 创建实现DrawAPI 接口 的实体桥接实现类
class RedCircle implements DrawAPI {
  public drawCircle(radius: number, x: number, y: number) {
    console.log(
      "Drawing Circle[ color: red, radius: " +
        radius +
        ", x: " +
        x +
        ", y: " +
        y +
        "]"
    );
  }
}

class GreenCircle implements DrawAPI {
  public drawCircle(radius: number, x: number, y: number) {
    console.log(
      "Drawing Circle[ color: green, radius: " +
        radius +
        ", x: " +
        x +
        ", y: " +
        y +
        "]"
    );
  }
}

// 3. 使用 DrawAPI 接口 创建 Shape 抽象类

abstract class Shape {
  protected drawApi: DrawAPI;
  constructor(drawApi: DrawAPI) {
    this.drawApi = drawApi;
  }
  public abstract draw: () => void;
}

// 4. 创建 实现 Shape 类 的实体类
class Circle extends Shape {
  private readonly x: number;
  private readonly y: number;
  private readonly radius: number;

  constructor(radius: number, x: number, y: number, drawAPI: DrawAPI) {
    super(drawAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  public draw = (): void => {
    this.drawApi.drawCircle(this.radius, this.x, this.y);
  };
}

// 6. 使用 Shape 和 DrawAPI 画出不同的圆
function BridgePatternDemo() {
  const redCircle = new Circle(10, 100, 100, new RedCircle());
  const greenCircle = new Circle(10, 100, 100, new GreenCircle());

  redCircle.draw();
  greenCircle.draw();
}
BridgePatternDemo()
/*
  Drawing Circle[ color: red, radius: 10, x: 100, y: 100]
  Drawing Circle[ color: green, radius: 10, x: 100, y: 100]
*/
