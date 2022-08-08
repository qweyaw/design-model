/*
    这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式

    1、单例类只能有一个实例。
    2、单例类必须自己创建自己的唯一实例。
    3、单例类必须给所有其他对象提供这一实例。

    优点：
        1、在内存里只有一个实例，减少了内存的开销，尤其是频繁地创建和销毁实例（比如管理学院首页页面缓存）
        2、避免对资源的多重占用（比如写文件操作）

    缺点：没有接口，不能继承，与单一职责原则冲突，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化。

    注意事项: getInstance() 方法中需要使用同步锁 synchronized (Singleton.class) 防止多线程同时进入造成 instance 被多次实例化
*/
/*
    实现:
        我们将创建一个 SingleObject 类。SingleObject 类有它的私有构造函数和本身的一个静态实例。
        SingleObject 类提供了一个静态方法，供外界获取它的静态实例。
        SingletonPatternDemo 类使用 SingleObject 类来获取 SingleObject 对象。
*/

// 1. 创建 Singleton 类

class SingleObject {
  private static instance: SingleObject = new SingleObject();

  public static getInstance(): SingleObject {
    return this.instance;
  }

  public showMessage() {
    console.log("message");
  }
}

// 2. 从 Singleton 类获取 唯一的对象
function SingletonPatternDemo() {
  const obj = SingleObject.getInstance();
  obj.showMessage();
}
SingletonPatternDemo() // message
// 几种实现方式
// 1. 线程不安全  是否 Lazy 初始化：是, 是否多线程安全：否 , 实现难度：易  多线程不能正常工作
class Singleton1 {
  private static instance: Singleton1;
  private Singleton1() {}

  public static getInstance(): Singleton1 {
    if (this.instance == null) {
      this.instance = new Singleton1();
    }
    return this.instance;
  }
}

// 2. 线程安全  是否 Lazy 初始化：是, 是否多线程安全：是 , 实现难度：易
class Singleton2 {
  private static instance: Singleton2;
  private Singleton() {}
  //synchronized
  public static getInstance(): Singleton2 {
    if (this.instance == null) {
      this.instance = new Singleton2();
    }
    return this.instance;
  }
}
