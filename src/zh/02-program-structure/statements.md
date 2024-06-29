---
title:  2.3 初识语句
---

**语句** 是 **依序执行**的 C++ 程序片段。

考虑到C++的语法，以及为了方便读者能够理解，这里先简单介绍一下的语句结构，在后续的章节中会详细介绍各种语句类型的作用。

在编译器开始处理语句的时候，换行符已经如同其他空白字符一样，当做空白字符处理。因此，换行符不会影响语句的语义。

## 表达式语句

**表达式语句**简单来说就是一个表达式后面跟着一个分号 `;`，但是表达式形式多种多样，很难一一列举。

总的来说，当你看到一行代码，行末有一个分号 `;`，那么这行代码一般就是一个表达式语句。

下面是一些表达式语句的例子：

```cpp
a = 1;
foo(b);
get<0>(t) = 1;
a = b, b = c, c = a;
```

如果表达式语句的表达式是空的，那么这个表达式语句也称为**空语句**。例如：

```cpp
;
```

## 声明语句

::: caution TODO: 补充内容
:::

## 复合语句

**复合语句** 是由花括号 `{}` 包围的语句序列。复合语句可以包含任意数量的语句，也可以嵌套在其他复合语句中。

我们可以简单地为前面表达式语句的例子添加花括号，就得到了复合语句的例子：

```cpp
{
    a = 1;
    foo(b);
    get<0>(t) = 1;
    a = b, b = c, c = a;
}
```

当然，复合语句里面可以包含所有种类的语句，包括带标号语句、表达式语句、复合语句等。

## 选择语句

在关键字一节中提到了 `if`、`else`、`switch` 等关键字，这些关键字用于构造选择语句。

### `if` 语句

`if` 语句的形式是：

```cpp
if (condition) statement
```
或者
```cpp
if (condition) statement
else statement
```

举例而言，`if` 语句可以像这样使用：

```cpp
if (a > b) max = a;
else max = b;
```

其中，`condition` 是一个表达式，用来表达选择条件，`statement` 是一个语句，用来表达选中时执行的操作。

这里的 `statement` 当然也可以是 `if` 语句。多个 `if` 语句可以嵌套在一起，形成如下的多层选择结构：

```cpp
if (condition1) 
    if (condition2) statement2
    else statement2_else
else 
    if (condition3) statement3
    else 
        if (condition4) statement4
        else statement4
```

::: tip
上面的代码中，通过缩进来表示语句的层次，这是一种常见的代码风格，可以使代码更加清晰易读。

此外，上面在 `if` 语句中直接使用另一个 `if` 语句的方式并不方便阅读，可以使用花括号 `{}` 构成复合语句来明确地表示 `if` 语句的范围，这样可以使代码更加清晰。例如：
    
```cpp
if (condition1) {
    if (condition2) statement2
    else statement2_else
} else {
    /* ... */
}
```
上面的代码中，`if` 后面的花括号 `{}` 就是用来构成复合语句的。虽然从程序的角度来看，这两种写法是等价的，但是后者对于人而言更加清晰。
:::

在多个条件并列时，我们也可以把连用的 `else` 和 `if` 理解成一个整体，称为 `else if`，这样可以使代码更加简洁：

```cpp
if (condition1) statement1
else if (condition2) statement2
else if (condition3) statement3
else statement4
```

### `switch` 语句

`switch` 语句的形式是：

```cpp
switch (expression) {
    case value1: statement1
    case value2: statement2
    ...
    default: statement
}
```

## 循环语句

::: caution TODO: 补充内容
:::

## 跳转语句

::: caution TODO: 补充内容
:::

## 带标号语句

**带标号语句**的形式是 `标号: 语句`。例如：

```cpp
label: foo(b);
to: a = b;
good: {
    a = 1;
    b = 2;
}
```

## try块

::: caution TODO: 补充内容
:::