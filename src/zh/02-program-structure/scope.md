---
title: 2.5 语句与作用域
---

## 声明语句与作用域
在 C++ 中，一个名字在被声明引入之前，是无效的。

```cpp
a = 1; // 错误：a 在这里是无效的

int a = 0; // 声明并创建一个整数类型的对象 a
```
在上面的例子中，`a` 在被声明之前是无效的，所以第一行代码是错误的。只有在 `a` 被声明之后，`a` 才是有效的。


## 复合语句与作用域
在前面我们已经讲过了[复合语句](./statements.md#复合语句)，复合语句的另一个重要作用是**引入作用域**。在复合语句内部声明的名字，只在复合语句内部有效。例如：

```cpp
int a = 1;
{
    int b = 2;
    a = 1; // 在复合语句内部，可以访问外部的名字
}
b = 3; // 错误：在复合语句外部，b 已经不可见
```
在上面的例子中，`b` 是在复合语句内部声明的，所以在复合语句外部是不可见的。这样的机制可以避免名字冲突，也可以提高程序的可读性。

## 循环体中的声明

在循环语句的循环体内，可以声明新的对象。这些对象只能在循环体内使用。例如：
```cpp
for (int i = 0; i < 10; ++i) {
    int a = 0;
    while (a < 10) {
        int b = i; 
        a += b * a; // 可以访问 a 和 b
    }
    b = 2; // 错误：b 在这里是不可见的 // [!code error] 
}
a = 2; // 错误：a 在这里是不可见的 // [!code error] 
```
::: tip 循环之间
在不同的循环之间，声明的对象是不可见的。例如：
```cpp
for (int i = 0; i < 10; ++i) {
    if(i > 0) a = 1;  // 错误：a 在这里是不可见 // [!code error] 
    int a = i; // 这里声明了一个新的 int 类型的对象 a
}
```
每一次循环，都会离开作用域，进入下一次循环的作用域。此时，上一次循环中声明的对象是不可见的，即使名字相同。

在 `for` 语句初始化语句中声明的对象（`for( ... ; ; )` 括号里面左边的部分），在每一次循环之间保持可见。
:::

## `for` 语句与作用域

在[`for` 语句](./statements.md#for-语句)中，`for` 语句的初始化部分中声明的名字，只在 `for` 语句内部有效。例如：
```cpp
for (int i = 0; i < 10; ++i) 
    a += i; // i 在这里是可见的
// i 在这里是不可见的
```

如果 `for` 语句的循环体是一个复合语句，其内部也对 `for` 的初始化部分声明的名字是可见的。例如：
```cpp
for (int i = 0; i < 10; ++i) {
    int a = 0;
    a += i; // i 在这里是可见的
}
// 在这里，a 和 i 都是不可见的
```

如果 `for` 语句的循环体是一个[声明语句](./statements.md#声明语句)，那么这个声明只在 `for` 语句内部有效。例如：
```cpp
for(int i = 0; i < 10; ++i) 
    int a = 0;

a += 1; // 错误：a 在这里是不可见的 // [!code error] 
```

## 选择语句与作用域

在[`if` 语句](./statements.md#if-语句)、[`switch` 语句](./statements.md#switch-语句)中，在选择条件里可以写一个声明语句，这个声明的名字只在选择语句内部有效。

例如，在 `if` 语句提到了一个例子：
```cpp
if (int a = 1; a > b) max = a;
else max = b;
```
这和下面的代码是等价的：
```cpp
{
    int a = 1;
    if (a > b) max = a;
    else max = b;
}
```
从作用域的角度来说也是等价的，`a` 只在 `if` 语句内部有效。提到的等价代码中，加入 `{}` 组成复合语句正好描述了这个作用域的关系。

类似的，`switch` 语句选择条件中的声明也只在 `switch` 语句内部有效。例如：
```cpp
switch (int b = 2; a) {
    case 1: as = b; break;
    case 2: as = b * 4; break;
    default: as = 0;
}
```
这和下面的代码是等价的：
```cpp
{
    int b = 2;
    switch (a) {
        case 1: as = b; break;
        case 2: as = b * 4; break;
        default: as = 0;
    }
}
```

与 `for` 语句类似，如果 `if` 语句或 `switch` 语句的选择体是一个[声明语句](./statements.md#声明语句)，那么这个声明只在 `if` 语句或 `switch` 语句内部有效。例如：
```cpp
if(a > b) int c = 1;

c = 2; // 错误：c 在这里是不可见的 // [!code error] 

switch(a) int d = 2;

d = 3; // 错误：d 在这里是不可见的 // [!code error] 
```

## 函数与作用域

在[函数](./function.md)中，函数的参数列表中声明的名字只在函数内部有效。例如：

```cpp
int add_mul(int a, int b, int c) {
    int sum = a + b;
    return sum * c;
}
// add_mul 函数中的一切，包括 a, b, c, sum 在这里都是不可见的

int sub_mul(int a, int b, int c) {
    // 这里的 a, b, c 是新的 a, b, c，和 add_mul 的 a, b, c 不同

    int diff = a - b;
    return diff * c;
}
// sub_mul 函数中的一切，包括 a, b, c, diff 在这里都是不可见的

a = 1; // 错误：不管是哪个 a，在这里都是不可见的 // [!code error] 
```
