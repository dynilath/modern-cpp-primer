---
title: 3.6 初识重载
---

## `auto` 参数的函数

::: important TODO: 润色与细化描述
:::

在声明函数类型时，并不能推导出函数调用类型为何，因此在声明函数类型时，必须显式指定参数类型，而不能使用 `auto`。例如：
```cpp
using binary_int_func = int(auto, auto); // [!code error] // 错误，auto 不能用在这里
```

但是，我们可以通过函数类型来确定一个声明中有 `auto` 的函数的形式：
```cpp
auto add(auto a, auto b) { // 这个函数的参数和返回值类型尚不确定
    return a + b;
}

using binary_int_func = int(int, int);
int apply(binary_int_func& func, int a, int b) {
    return func(a, b);
}

int result = apply(add, 2, 3); // 正确，用 add 初始化 func
```
这里，使用 `add` 初始化 `func` 时，会被推导为 `int(int, int)`，从而确定了 `add` 的参数和返回值类型。

::: info 你的第一个模板函数
考虑如下的代码：
```cpp
auto add(auto a, auto b) { 
    return a + b; 
}
```
技术性地说，这里的 `add` 函数是一个函数模板，而非函数。当函数存在参数的类型（返回值没有影响）声明为 `auto` 时，这个函数就是一个模板。  
这样设计使得这个 `add` 可以适应于各种各样的参数，并且以和计算结果相同的方式返回出来。

当 `add` 函数的两个参数类型被确定时，这个函数模板就会被自动推导成为一个对应的函数，例如：
```cpp
auto result = add(1, 2); // result 是 int 类型
auto result2 = add(1.0, 2.0); // result2 是 double 类型
auto result3 = add(1, 2.0); // result3 是 double 类型
```
你可能会觉得，这不就是把运算符 `+` 变成了个函数吗，但我们可以考虑一些更复杂的计算，例如[简单的控制台程序](../02-program-structure/cli-program.md)中的 `sqrt` 函数：
```cpp
auto sqrt(auto x) {
    auto a = x;
    while (a * a > x) {
        a = (a + x / a) / 2;
    }
    return a;
}

auto result = sqrt(314159ull);  // result 是 unsigned long long 类型
```
这时候，无论 `x` 是什么整数类型，`sqrt` 函数都能选择对应类型的局部对象 `a` 的类型，并返回对应类型的结果。而不需要费劲写下 `sqrt` `sqrtus` `sqrtul` `sqrtull` 等一系列函数，不用在调用的时候推敲要用哪个函数，不用再担惊受怕会不会因为类型不匹配发生数据溢出错误。
:::

## 函数重载

在函数的[前向声明](../02-program-structure/function.md#前向声明)中，读者可能已经注意到，如果前向声明和函数定义的参数列表不一致，似乎并不会直接导致编译错误。  
这是因为 C++ 的一个影响深远的特性：**函数重载**。

目前，介绍的内容已经足够对函数重载进行初步的理解，简单来说，函数重载是指，函数名相同时但参数列表不同时，可以定义多个这样的函数。在调用的时候，会选择最为匹配的函数。例如：
    
```cpp
// 为了简便，这里只给出函数声明
int add(int a, int b);
double add(double a, double b);

int main() {
    int a = 1, b = 2;
    float c = 1.0, d = 2.0;
    int result1 = add(a, b); // 调用 int add(int, int)
    double result2 = add(c, d); // 调用 double add(double, double)
}
```

不过，当无法判断哪个函数更为匹配时，编译器会报错。例如：

```cpp
// 为了简便，这里只给出函数声明
void foo(long a);
void foo(double a);

int main() {
    foo(1); // [!code error] // 无法判断调用哪个函数
}
```

## 重载决议

函数重载的选择过程称为**重载决议**。重载决议由如下的步骤组成：

1. 建立候选函数集合
2. 去除不可行的候选函数
3. 选择最佳的候选函数

### 建立候选函数集合

候选函数集合是指所有与调用的函数名相同的函数。例如：

```cpp
// 为了简便，这里只给出函数声明

void foo(int a);
void foo(double a);

namespace example {
    void foo(long a);
}

int main() {
    int int_value = 1;
    long long_value = 1l;

    foo(int_value); // 候选函数集合为 {foo(int), foo(double)}

    {
        using namespace example;
        foo(long_value); // 候选函数集合为 {foo(int), foo(double), example::foo(long)}
    }
}
```

注意，[`using` 声明](../02-program-structure/scope.md#using-声明)并不是增添地引入名称，而是让没有 `name_space::` 限定的使用如同有限定的使用，这在重载的意义上是有区别的。例如：

```cpp
// 为了简便，这里只给出函数声明
void foo(int a);
void foo(double a);

namespace example {
    void foo(long a);
}

int main() {
    using example::foo;
    foo(1); // 候选函数集合仅有 {example::foo(long)}
}
```

在上面的例子中，`foo(1)` 会调用 `example::foo(long)`，而不是 `foo(int)` 或 `foo(double)`。因为这里 `foo` 的调用如同 `example::foo` 一样，是一个限定的调用。

### 