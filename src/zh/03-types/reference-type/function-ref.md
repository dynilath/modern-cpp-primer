---
title: 3.5.2 函数引用
---

可以使用引用绑定到函数：

```cpp
int add(int a, int b) {
    return a + b;
}

auto& add_ref = add; // add_ref 是 add 函数的引用

int result = add_ref(1, 2); // 调用 add 函数
```

这里的 `add_ref` 是 `add` 函数的引用，可以像函数一样调用。这种引用称为**函数的引用**。

函数引用也可以作为函数的参数，例如：
```cpp
int apply(auto& func, int a, int b) {
    return func(a, b);
}

int result = apply(add, 1, 2);
```

在这里，`apply` 函数接受一个函数引用作为参数，然后调用这个函数。

## 函数类型与函数引用类型

读者可以发现，在上面的例子中，`apply` 函数中的参数 `auto& func` 也能绑定到对象。此时：
```cpp
int a = 1;
int result = apply(a, 2, 3); // ![!code error] // 错误，a 不是函数
```
这样就会产生错误，因为 `a` 不是函数。但是这个错误会出现在 `apply` 函数里面，在调用方并不会产生提示。  
此时，我们就会希望通过类型来限制 `func` 只能绑定到函数。这就需要使用函数类型，以及函数引用类型。

函数类型的形式是
```cpp
return_type (parameter_type1, parameter_type2, ...)
```
这里的 `return_type` 是函数的返回值类型，`parameter_type1, parameter_type2, ...` 是函数的参数类型。例如：

```cpp
using binary_int_func = int(int, int);
```
这样，`binary_int_func` 就是一个函数类型，它接受两个 `int` 类型的参数，返回一个 `int` 类型的值。

在我们声明了 `binary_int_func` 之后，就可以使用这个类型来限制 `func` 的类型：
```cpp
// 通过在 binary_int_func 后面加上 & 来组成一个函数引用类型
int apply(binary_int_func& func, int a, int b) {
    return func(a, b);
}

int a = 1;
apply(a, 2, 3); // [!code error] // 错误，a 不是函数

float add(float a, float b) {
    return a + b;
}
apply(add, 2, 3); // [!code error] // 错误，add 类型不匹配
```
这样，在调用 `apply` 函数时，就会提示无法用 `a` 初始化 `apply` 的第一个参数。这在 `apply` 函数的实现比较复杂的时候能够有效的提升分析错误的效率。

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

::: info 直接声明函数引用类型与旧式类型别名
在前面，我们为了限制函数引用的类型，使用了一个类型别名来表达函数类型：
```cpp
using binary_int_func = int(int, int);
```

函数引用类型当然也可以使用类型别名：
```cpp
using binary_int_func_ref = binary_int_func&;
```

如果要直接声明一个函数引用类型，其形式就会变得复杂：
```cpp
using binary_int_func_ref = int(&)(int, int);
```

为什么在这里？因为 `&` 作为一个修饰符应当出现在那个标识符的前面，而函数的参数应当出现在标识符的后面，这种期待声明、类型、调用的形式统一的设计是从 C 语言中继承下来的。

使用[旧式类型别名](./type-intro.md#旧式类型别名) `typedef` 时，这种体现会更加明显：
```cpp
typedef int binary_int_func(int, int); // 声明了一个函数类型
typedef int (&binary_int_func_ref)(int, int); // 声明了一个函数引用类型

int add(int,int); // 函数声明，为了简便起见，省略了函数体
```
:::

## 在返回值中使用函数引用

::: important TODO: 补充内容
:::
