/* 
  组合模式:
    组合模式（Composite Pattern），又叫部分整体模式，是用于把一组相似的对象当作一个单一的对象。
    组合模式依据树形结构来组合对象，用来表示部分以及整体层次。这种类型的设计模式属于结构型模式，它创建了对象组的树形结构。

    这种模式创建了一个包含自己对象组的类。该类提供了修改相同对象组的方式。

    优点： 1、高层模块调用简单。 2、节点自由增加。

    缺点：在使用组合模式时，其叶子和树枝的声明都是实现类，而不是接口，违反了依赖倒置原则。
*/

/* 
  实现: 
    有一个类 Employee，该类被当作组合模型类。CompositePatternDemo 类使用 Employee 类来添加部门层次结构，并打印所有员工。
*/

// 1. 创建 Employee 类，该类带有 Employee 对象的列表。
class Employee {
  private name: string;
  private dept: string;
  private salary: number;
  private subordinates: Array<Employee>;
  constructor(name: string, dept: string, sal: number) {
    this.name = name;
    this.dept = dept;
    this.salary = sal;
    this.subordinates = [];
  }
  public add(e: Employee): void {
    this.subordinates.push(e);
  }

  public remove(e: Employee): void {
    const index = this.subordinates.findIndex((item) => item.name === e.name);
    if (index > -1) {
      this.subordinates.splice(index, 1);
    }
  }

  public getSubordinates(): Array<Employee> {
    return this.subordinates;
  }

  public toString(): string {
    return (
      "Employee :[ Name : " +
      this.name +
      ", dept : " +
      this.dept +
      ", salary :" +
      this.salary +
      " ]"
    );
  }
}

// 2. 使用 Employee 类来创建和打印员工的层次结构。
function CompositePatternDemo() {
  const CEO: Employee = new Employee("John", "CEO", 30000);
  const headSales: Employee = new Employee("Robert", "Head Sales", 20000);
  const headMarketing: Employee = new Employee(
    "Michel",
    "Head Marketing",
    20000
  );
  const clerk1: Employee = new Employee("Laura", "Marketing", 10000);
  const clerk2: Employee = new Employee("Bob", "Marketing", 10000);
  const salesExecutive1: Employee = new Employee("Richard", "Sales", 10000);
  const salesExecutive2: Employee = new Employee("Rob", "Sales", 10000);

  CEO.add(headSales);
  CEO.add(headMarketing);

  headSales.add(salesExecutive1);
  headSales.add(salesExecutive2);

  headMarketing.add(clerk1);
  headMarketing.add(clerk2);

  //打印该组织的所有员工
  console.log("CEO", CEO);
  for (let headEmployee of CEO.getSubordinates()) {
    console.log("headEmployee", headEmployee);
    for (let employee of headEmployee.getSubordinates()) {
      console.log("employee", employee);
    }
  }
}
CompositePatternDemo();
/* 
CEO Employee {
  name: 'John',
  dept: 'CEO',
  salary: 30000,
  subordinates: [
    Employee {
      name: 'Robert',
      dept: 'Head Sales',
      salary: 20000,
      subordinates: [Array]
    },
    Employee {
      name: 'Michel',
      dept: 'Head Marketing',
      salary: 20000,
      subordinates: [Array]
    }
  ]
}
headEmployee Employee {
  name: 'Robert',
  dept: 'Head Sales',
  salary: 20000,
  subordinates: [
    Employee {
      name: 'Richard',
      dept: 'Sales',
      salary: 10000,
      subordinates: []
    },
    Employee {
      name: 'Rob',
      dept: 'Sales',
      salary: 10000,
      subordinates: []
    }
  ]
}
employee Employee {
  name: 'Richard',
  dept: 'Sales',
  salary: 10000,
  subordinates: []
}
employee Employee {
  name: 'Rob',
  dept: 'Sales',
  salary: 10000,
  subordinates: []
}
headEmployee Employee {
  name: 'Michel',
  dept: 'Head Marketing',
  salary: 20000,
  subordinates: [
    Employee {
      name: 'Laura',
      dept: 'Marketing',
      salary: 10000,
      subordinates: []
    },
    Employee {
      name: 'Bob',
      dept: 'Marketing',
      salary: 10000,
      subordinates: []
    }
  ]
}
employee Employee {
  name: 'Laura',
  dept: 'Marketing',
  salary: 10000,
  subordinates: []
}
employee Employee {
  name: 'Bob',
  dept: 'Marketing',
  salary: 10000,
  subordinates: []
}

*/
