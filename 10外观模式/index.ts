/* 
  外观模式
    降低访问复杂系统的内部子系统时的复杂度，简化客户端之间的接口

  优点： 1、减少系统相互依赖。 2、提高灵活性。 3、提高了安全性。

  缺点：不符合开闭原则，如果要改东西很麻烦，继承重写都不合适。
*/

interface Shape {
  draw: () => void
}

class Circle implements Shape {
  draw() {
    console.log("draw: Circle")
  }
}

class Rectangle implements Shape {
  draw() {
    console.log("draw: Rectangle")
  }
}

class Square implements Shape {
  draw() {
    console.log("draw: Square")
  }
}

class ShapeMaker {
  private circle: Circle
  private renctangle: Rectangle
  private square: Square

  constructor() {
    this.circle = new Circle()
    this.renctangle = new Rectangle()
    this.square = new Square()
  }

  drawCircle() {
    this.circle.draw()
  }
  drawRectangle() {
    this.renctangle.draw()
  }
  drawSquare() {
    this.square.draw()
  }
}

function FacadePatternDemo() {
  const shapeMaker = new ShapeMaker()

  shapeMaker.drawCircle()
  shapeMaker.drawRectangle()
  shapeMaker.drawSquare()
}
FacadePatternDemo()
/* 
  draw: Circle
  draw: Rectangle
  draw: Square
*/
