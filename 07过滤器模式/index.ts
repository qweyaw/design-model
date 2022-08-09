/* 
  过滤器模式:
    过滤器模式（Filter Pattern）或标准模式（Criteria Pattern）是一种设计模式，
    这种模式允许开发人员使用不同的标准来过滤一组对象，通过逻辑运算以解耦的方式把它们连接起来。
    这种类型的设计模式属于结构型模式，它结合多个标准来获得单一标准。
*/

/* 
  实现:
    创建一个 Person 对象、Criteria 接口和实现了该接口的实体类，来过滤 Person 对象的列表。
    CriteriaPatternDemo 类使用 Criteria 对象，基于各种标准和它们的结合来过滤 Person 对象的列表。
*/

// 1. 创建一个类，在该类上应用标准
class Person {
  private name: string;
  private gender: string;
  private maritalStatus: string;
  constructor(name: string, gender: string, maritalStatus: string) {
    this.name = name;
    this.gender = gender;
    this.maritalStatus = maritalStatus;
  }

  public getName() {
    return this.name;
  }
  public getGender() {
    return this.gender;
  }
  public getMaritalStatus() {
    return this.maritalStatus;
  }
}

// 2. 为标准 Criteria 创建接口
interface Criteria {
  meetCriteria: (persons: Array<Person>) => Array<Person>;
}

// 3. 创建实现 Criteria 接口的实体类
class CriteriaMale implements Criteria {
  public meetCriteria(persons: Person[]): Array<Person> {
    const malePersons = new Array<Person>();
    for (let i = 0; i < persons.length; i++) {
      const person = persons[i];
      if (person.getGender().toUpperCase() === "MALE") {
        malePersons.push(person);
      }
    }
    return malePersons;
  }
}

class CriteriaFemale implements Criteria {
  public meetCriteria(persons: Person[]): Array<Person> {
    const malePersons = new Array<Person>();
    for (let i = 0; i < persons.length; i++) {
      const person = persons[i];
      if (person.getGender().toUpperCase() === "FEMALE") {
        malePersons.push(person);
      }
    }
    return malePersons;
  }
}

class CriteriaSingle implements Criteria {
  public meetCriteria(persons: Person[]): Array<Person> {
    const malePersons = new Array<Person>();
    for (let i = 0; i < persons.length; i++) {
      const person = persons[i];
      if (person.getMaritalStatus().toUpperCase() === "SINGLE") {
        malePersons.push(person);
      }
    }
    return malePersons;
  }
}

class AndCriteria implements Criteria {
  private criteria: Criteria;
  private otherCroteria: Criteria;
  constructor(criteria: Criteria, otherCroteria: Criteria) {
    this.criteria = criteria;
    this.otherCroteria = otherCroteria;
  }
  public meetCriteria(persons: Person[]): Array<Person> {
    const firstCriteriaPersons: Array<Person> =
      this.criteria.meetCriteria(persons);
    return this.otherCroteria.meetCriteria(firstCriteriaPersons);
  }
}

class OrCriteria implements Criteria {
  private criteria: Criteria;
  private otherCroteria: Criteria;
  constructor(criteria: Criteria, otherCroteria: Criteria) {
    this.criteria = criteria;
    this.otherCroteria = otherCroteria;
  }

  public meetCriteria(persons: Person[]): Array<Person> {
    const firstCriteriaItems: Array<Person> =
      this.criteria.meetCriteria(persons);
    const otherCriteriaItems: Array<Person> =
      this.otherCroteria.meetCriteria(persons);
    for (let person of otherCriteriaItems) {
      if (!firstCriteriaItems.includes(person)) {
        firstCriteriaItems.push(person);
      }
    }
    return firstCriteriaItems;
  }
}

// 4. 使用不同的标准（Criteria）和它们的结合来过滤 Person 对象的列表。
function CriteriaPatternDemo() {
  const persons: Array<Person> = new Array<Person>();

  persons.push(new Person("Robert", "Male", "Single"));
  persons.push(new Person("John", "Male", "Married"));
  persons.push(new Person("Laura", "Female", "Married"));
  persons.push(new Person("Diana", "Female", "Single"));
  persons.push(new Person("Mike", "Male", "Single"));
  persons.push(new Person("Bobby", "Male", "Single"));

  const male: Criteria = new CriteriaMale();
  const female: Criteria = new CriteriaFemale();
  const single: Criteria = new CriteriaSingle();
  const singleAndMale: Criteria = new AndCriteria(single, male);
  const singleOrFemale: Criteria = new OrCriteria(single, female);

  console.log("Males: ");
  printPersons(male.meetCriteria(persons));

  console.log("\nFemales: ");
  printPersons(female.meetCriteria(persons));

  console.log("\nSingle Males: ");
  printPersons(singleAndMale.meetCriteria(persons));

  console.log("\nSingle Or Females: ");
  printPersons(singleOrFemale.meetCriteria(persons));

  function printPersons(persons: Array<Person>) {
    for (let person of persons) {
      console.log(
        "Person : [ Name : " +
          person.getName() +
          ", Gender : " +
          person.getGender() +
          ", Marital Status : " +
          person.getMaritalStatus() +
          " ]"
      );
    }
  }
}

CriteriaPatternDemo();
/* 
Males: 
Person : [ Name : Robert, Gender : Male, Marital Status : Single ]
Person : [ Name : John, Gender : Male, Marital Status : Married ]
Person : [ Name : Mike, Gender : Male, Marital Status : Single ]
Person : [ Name : Bobby, Gender : Male, Marital Status : Single ]

Females: 
Person : [ Name : Laura, Gender : Female, Marital Status : Married ]
Person : [ Name : Diana, Gender : Female, Marital Status : Single ]

Single Males: 
Person : [ Name : Robert, Gender : Male, Marital Status : Single ]
Person : [ Name : Mike, Gender : Male, Marital Status : Single ]
Person : [ Name : Bobby, Gender : Male, Marital Status : Single ]

Single Or Females: 
Person : [ Name : Robert, Gender : Male, Marital Status : Single ]
Person : [ Name : Diana, Gender : Female, Marital Status : Single ]
Person : [ Name : Mike, Gender : Male, Marital Status : Single ]
Person : [ Name : Bobby, Gender : Male, Marital Status : Single ]
Person : [ Name : Laura, Gender : Female, Marital Status : Married ]
*/
