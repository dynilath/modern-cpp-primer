---
title: 3.1 类型概述
---

在[类型与对象](../02-program-structure/declaration.md#类型与对象)中，我们已经介绍过，对象的类型决定了对象的值的集合，以及对象上可以进行的操作。

本章将详细介绍 C++ 中的类型，包括基本类型、复合类型、自定义类型等。

除了对象有类型之外，前面常常提到的“值”也有类型，函数也有类型。

## 类型别名

在深入了解类型之前，我们先来看看类型别名。

类型别名是一个已存在类型的别名。通过类型别名，我们可以为一个类型定义一个新的名字。

声明类型别名的方式是使用 `using` 关键字，语法如下：

```cpp
using alias_type = existing_type;
```

其中，`alias_type` 是一个新引入的标识符，表示相同类型，`existing_type` 是已存在的类型的标识符（技术性地说，也能是表示类型的表达式，在这里我们不深入讨论）。

类型别名可以如同已经存在的类型一般使用，例如：

```cpp
typedef int Integer; // Integer 是 int 的别名

Integer a = 42; // 等价于 int a = 42;

int foo(int x); // 函数前向声明

Integer foo(Integer x) { // 可以这样定义，Integer 是 int 的别名意味着 Integer 就是 int 类型
    return x;
}
```

在 20 世纪的 C 和 C++ 中，`typedef` 是声明类型别名的关键字。相较于 `using` 关键字，`typedef` 更不直观。

`typedef` 的语法是：

```cpp
typedef declaration
```
这里的 `declaration` 是一个没有初始化器的声明语句。例如：

```cpp
typedef int Integer, integer;
```

如果这是一个声明语句，就是声明了两个 `int` 类型的对象： `Integer` 和 `integer`。由于这里前面有 `typedef`，这个声明的含义就变成了声明了两个 `int` 类型的类型别名：`Integer` 和 `integer`。

对于复杂的类型，这种声明会产生更多的麻烦，这在后面的章节中会有所体现。