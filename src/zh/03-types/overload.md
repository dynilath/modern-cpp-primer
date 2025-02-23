---
title: 3.6 初识重载
---

## 简单重载

考虑如下的两个函数（读者如果已经忘记了函数的形式参数的名字是可以省略的，可以回顾一下[前面的章节](../02-program-structure/function.md)）。

```cpp
int sqrt(int);
long long sqrt(long long);
double sqrt(double);
long double sqrt(long double);
```

这两个函数有完全相同的名字，当写下如下的函数调用的时候，会发生什么？
```cpp
sqrt(42);
```

这里，编译器会根据 `42` 的类型，选择调用 `int sqrt(int)` 或 `long long sqrt(long long)`。由于 `42` 是 `int` 类型的字面量，因此会调用 `int sqrt(int)`。

这种根据参数类型的不同而选择不同的函数的特性，称为**重载**。 

## 重载的作用

重载通常用于实现相似功能的函数，但是参数类型不同。例如这里提到的 `sqrt` 函数，对于不同的整数类型，都可以计算平方根。但人们往往不会不希望把所有的整数都转成`long long` 类型再计算，以及把所有的浮点数都转成 `long double` 类型再计算。人们一般只想使用那个效率最高且能满足需求的函数。如果不使用重载，这种需求就会变成如下的形式：

```cpp
int sqrt_int(int);
long long sqrt_long_long(long long);
double sqrt_double(double);
long double sqrt_long_double(long double);
```

这样，调用 `sqrt_XXX` 函数的时候，就需要根据参数的类型选择不同的函数，用户每次调用 `sqrt_XXX` 函数都需要考虑参数的类型。例如：

```cpp
void some_function(){
    /** 一些代码 */
    int value = make_some_value();
    /** 一些代码 */
    int temp_value = sqrt_int(value);
    /** 一些代码 */
    int temp_value2 = sqrt_int(value2);
    /** 一些代码 */
}
```

如果代码进行了一些改动，`make_some_value` 的返回类型发生了变化，那么所有的 `sqrt_XXX` 函数的调用都需要修改，产生与代码规模正相关的工作量。例如，如果 `make_some_value` 的返回类型从 `int` 变成了 `long long`，那么上面的代码就需要修改为：

```cpp
void some_function(){
    /** 一些代码 */
    long long value = make_some_value();
    /** 一些代码 */
    long long temp_value = sqrt_long_long(value);
    /** 一些代码 */
    long long temp_value2 = sqrt_long_long(value2);
    /** 一些代码 */
}
```

这会导致代码越多，修改的工作量就越大。最终导致代码维护成本难以控制。

我们不妨看看 `sqrt` 使用重载来实现，并且用上 `auto` 类型推导会如何：

```cpp
void some_function(){
    /** 一些代码 */
    auto value = make_some_value();
    /** 一些代码 */
    auto temp_value = sqrt(value);
    /** 一些代码 */
    auto temp_value2 = sqrt(value2);
    /** 一些代码 */
}
```

假如此时 `make_some_value` 的返回类型发生了变化，`some_function` 中，这段代码
```cpp
auto temp_value = sqrt(value);
```
会变成
```cpp
auto temp_value = sqrt(value); // 是的，对于程序员写下的代码来说，完全没有变化
```
于是，上面写出来的部分完全不需要进行任何修改。这样，代码的维护成本就大大降低了。

## 重载决议

重载决议是编译器在多个候选函数中选择最合适版本的过程。这个过程分为三个阶段：

- **候选函数收集**：查找与被调用函数同名且在作用域内的所有函数声明
- **可行函数筛选**：排除参数数量不匹配或无法隐式转换参数类型的候选
- **最佳匹配选择**：根据优先级确定最优匹配

### 候选函数收集

简单来说，候选函数是指与被调用函数同名，并且在相同作用域内的所有函数声明。例如：

```cpp
void foo(int a);
void foo(int a, int b);
void foo(double a);

namespace example {
void foo(int a);
void foo(int a, int b);
void foo(double a);
}

foo(1); // 候选函数集合为 {foo(int), foo(int, int), foo(double)}
example::foo(2); // 候选函数集合为 {example::foo(int), example::foo(int, int), example::foo(double)}
```

这里调用 `foo(1)` 时，会在全局作用域中查找 `foo` 函数，而调用 `example::foo(2)` 时，会在 `example` 命名空间中查找 `foo` 函数。

这里要考虑[`using` 声明](../02-program-structure/scope.md#using-声明)和[`using` 指令](../02-program-structure/scope.md#using-namespace-指令) 的影响。

对于 `using` 声明，它将接下来的名字替换为一个限定的名字，例如：

```cpp
void foo(int a);

namespace example { 
void foo(int a);
}

int main() {
    using example::foo;
    foo(1); // 候选函数集合为 {example::foo(int)}，而不包括 {foo(int)}
}
```

对于 `using` 指令，它将整个命名空间的名字引入当前作用域，例如：

```cpp
void foo(int a);

namespace example {
void foo(int a);
}

int main() {
    using namespace example;
    foo(1); // 候选函数集合为 {foo(int), example::foo(int)}，这里会因为无法决定用哪个而报错
}
```

::: info using namespace std;
在 C++ 中，有一个特殊的命名空间 `std`，其中包含了大量的标准库函数和对象。
在一些快速开发测试的情况，程序员不会定义很多函数，而倾向于直接使用标准库。这时候就会 `using namespace std;` 语句，将 `std` 命名空间中的所有名字引入当前作用域，省去每次都写 `std::` 的麻烦。
但是，对于较大的项目而言，这样会把大量的名字引入当前作用域，可能会导致名字冲突。
:::

### 可行函数筛选

在候选函数集合中，会排除那些参数数量不匹配，或者参数无法转换过去的函数。例如：

```cpp
void foo(int a, int b);
void foo(int a);

foo(1); 
// 候选函数集合为 {foo(int), foo(int, int)}
// 其中，foo(int, int) 无法匹配参数 1，不是可行函数，因此调用 foo(int)
```

### 最佳匹配选择

在可行函数集合中，会根据参数的类型和优先级选择最佳匹配的函数。例如：

```cpp
void foo(int a);
void foo(double a);

foo(1); // 调用 foo(int)
```

这里简单概括一下最佳匹配的规则：
- 如果有类型完全匹配的函数，选择这个函数
- 否则，选择最接近的类型

如果此时无法判断调用哪个函数，编译器会报错。例如：

```cpp
void foo(bool a);
void foo(short a);

foo(1); // 无法判断调用哪个函数 // [!code error] 
```

::: info 浮点与整数

C++ 中有一个常常被认为比较糟糕的部分，浮点数和整数之间是可转换的。例如：

```cpp
int a = 1.1; // a 的值是 1，浮点转换到整数，截断小数部分
```

只有上述这种情况，问题看起来并不大，但当我们考虑函数重载时：

```cpp
void foo(int a);
void foo(float a);

foo(1.1); // 无法判断调用哪个函数 // [!code error] 
```

这就有点让人疯狂了，凭什么我的浮点没有比整数更准确匹配？

然而，`1.1` 是 `double` 类型，到 `int` 和 `float` 类型都要经过一次转换。因此，在这个情况里，编译器无法判断调用哪个函数。

这种无论怎么看都是糟糕设计的情况，逐渐成为了 C++ 被打上“屎山”标签的论据。这使得开发者不得不如扫雷一般小心翼翼，并祈祷自动检查工具能够帮助自己找到这些问题。
:::

### 左值引用和右值引用的重载

::: important TODO: 补充内容
:::

## `auto` 参数的函数

::: important TODO: 润色与细化描述
:::

在声明函数类型时，并不能推导出函数参数类型为何，因此在声明函数类型时，必须显式指定参数类型，而不能使用 `auto`。例如：
```cpp
using binary_int_func = int(auto, auto); // 错误，auto 不能用在这里 // [!code error] 
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
    foo(1); // 无法判断调用哪个函数 // [!code error] 
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

注意，[`using` 声明](../02-program-structure/scope.md#using-声明)并不是增添地引入名字，而是让没有 `name_space::` 限定的使用如同有限定的使用，这在重载的意义上是有区别的。例如：

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