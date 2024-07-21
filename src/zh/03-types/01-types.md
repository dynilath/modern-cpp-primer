---
title: 3.1 类型概述
---

在[类型与对象](../02-program-structure/declaration.md#类型与对象)中，我们已经介绍过，对象的类型决定了对象的值的集合，以及对象上可以进行的操作。

本章将详细介绍 C++ 中的类型，包括基本类型、复合类型、自定义类型等。

除了对象有类型之外，前面常常提到的“值”也有类型，函数也有类型。

## 值表示与对象表示

在 C++ 中，类型是值的集合，以及值上的操作的集合。这里的“值”是指对象的值，而“对象”是指存储在内存中的数据。

由于一些对技术上的妥协，为了实现更高效更可靠的处理能力，对象占用的内存并不会完全用于表达对象的值，对象占用的内存中会存在一些**填充位**。

这里，对象占用的内存中的这些字节称为**对象表示**，对象表示中参与表示对象的值的位称呼为**值表示**。

在前面介绍[表达式](../02-program-structure/expression.md)的章节中，对于位运算，我们提到了“二进制表示”。这里的“二进制表示”是指对象的值表示。

::: info 二进制表示
在很多时候，人们描述对象会使用“二进制表示”这样的说法。通常而言，这是在用二进制来描述一个对象的值表示。不过，值表示是 C++ 标准中的的术语，在更广泛的场景里，使用“二进制表示”的说法更便于沟通。
:::

## 类型别名

类型别名是一个已存在类型的别名。通过类型别名，我们可以为一个类型定义一个新的名字。

声明类型别名的方式是使用 `using` 关键字，语法如下：

```cpp
using alias_type = existing_type;
```

其中，`alias_type` 是一个新引入的标识符，表示相同类型，`existing_type` 是已存在的类型的标识符（技术性地说，也能是表示类型的表达式，在这里我们不深入讨论）。

类型别名可以如同已经存在的类型一般使用，例如：

```cpp
using Integer = int; // Integer 是 int 的别名

Integer a = 42; // 等价于 int a = 42;

int foo(int x); // 函数前向声明

// 可以这样定义，Integer 是 int 的别名意味着 Integer 就是 int 类型
// 因此这里的函数定义和前向声明是匹配的
Integer foo(Integer x) { 
    return x;
}
```

### 旧式类型别名

在 20 世纪的 C 和 C++ 中，`typedef` 是声明类型别名的关键字。相较于 `using` 关键字，`typedef` 更不直观。

`typedef` 的语法是：

```cpp
typedef declaration
```
这里的 `declaration` 是一个没有初始化器的声明语句。例如：

```cpp
typedef int Integer, integer;
```

如果没有这里的 `typedef`，这会是一个声明语句，并声明了两个 `int` 类型的对象： `Integer` 和 `integer`。由于 `typedef` 的参与，这个声明的含义就变成了声明了两个 `int` 类型的类型别名：`Integer` 和 `integer`。

`typedef` 并不一定要出现在最开始，它可以出现在声明的标识符前面的任何位置。例如：
```cpp
int typedef Integer;
```
这样也是合法地声明了 `Integer` 是 `int` 的别名。

对于复杂的类型，这种别名声明会相比 `using` 产生一些麻烦，这在后面的章节中会有所体现。

## `auto` 推导声明

在声明一个对象时，我们可以使用 `auto` 关键字来代替声明中的对象类型，指示根据初始化器的类型来推导对象的类型。例如：

```cpp
// 由于初始化器是 int 字面量 42 类型为 int
// 因此推导 a 的类型为 int
auto a = 42; 

// 由于初始化器是 a，类型为 int
// 因此推导 b 的类型为 int
auto b = a;
```

此外，`auto`也可以用于函数参数和返回值的类型推导：

```cpp
auto sqrt(auto x) {
    auto a = x;
    while (a * a > x) {
        a = (a + x / a) / 2;
    }
    return a;
}

// 由于 42 是 int 类型，x 的类型也是 int
// 因此 foo 返回值的类型推导为 int，a 的类型也是 int
auto a = foo(42); 
```

对于目前的内容而言，读者可能会觉得 `auto` 的使用并不是很有必要，甚至会觉得 `auto` 的使用会使代码变得不够清晰。但是在后面的章节中，我们会逐渐看到 `auto` 的使用能够让复杂的程序变得简洁明了且更易维护。

## `decltype` 类型推导

`decltype` 是一个运算符，用来推导表达式的类型。`decltype` 的语法是：

```cpp
decltype(expression)
```

其中，`expression` 是一个表达式，整个 `decltype(expression)` 的结果是 `expression` 的类型，可以用在需要提供类型的语法位置。

`decltype` 可以如下使用：

```cpp
int a = 42;
decltype(a) b = 42; // b 的类型是 int
```

如同前面 `auto` 的例子，我们可以这样使用 `decltype`：

```cpp
auto sqrt(auto x) {
    decltype(x) a = x;
    while (a * a > x) {
        a = (a + x / a) / 2;
    }
    return a;
}
```

此外，C++ 中存在一些专门需要进行类型推导的场景，这时 `decltype` 就会发挥出它最重要的作用。这些场景会在后面的章节中详细介绍。