---
title: 3.5.2 函数引用
---

引用也可以用来指代一个函数，这种引用称为**函数引用**。例如：

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

函数引用也可以作为函数的返回值，例如：
```cpp
using binary_int_func = int(int, int);

binary_int_func& get_add() {
    return add;
}

auto& add_ref = get_add(); // add_ref 是 add 函数的引用
int result = add_ref(1, 2); // 调用 add 函数
```

在这里，`get_add` 函数返回了 `add` 函数的引用，然后我们可以通过 `add_ref` 来调用 `add` 函数。

当然，`get_add` 可以调用再紧跟调用，不需要额外的变量：
```cpp
int result = get_add()(1, 2); // 调用 add 函数
```

结合之前提到[switch 语句](../../02-program-structure/statements.md#switch-语句)的例子，我们可以把 `get_add` 函数进一步扩展：
```cpp
using binary_int_func = int(int, int);

int add(int a, int b) {
    return a + b;
}

int sub(int a, int b) {
    return a - b;
}

int mul(int a, int b) {
    return a * b;
}

int div(int a, int b) {
    return a / b;
}

int no_such_operator(int a, int b) {
    return 0;
}

binary_int_func& get_func(char op) {
    switch (op) {
        case '+':
            return add;
        case '-':
            return sub;
        case '*':
            return mul;
        case '/':
            return div;
        default:
            return no_such_operator;
    }
}
```

这样，我们就可以通过 `get_func` 来获取不同的函数引用，然后调用这些函数。例如：

```cpp
int result = get_func('+')(1, 2); // 调用 add 函数
```

## 函数右值引用

函数引用也可以是右值引用，例如：
```cpp
using binary_int_func = int(int, int);

int add(int a, int b) {
    return a + b;
}

binary_int_func&& get_add() {
    return add;
}
```

你可能会奇怪，这里的 `add` 在前面的例子里，似乎是绑定到左值引用的，这里为什么能绑定到右值引用？这是 C++ 为了方便使用所做的规定，右值引用和左值引用都可以绑定到函数，并得到一个有效的函数引用。

函数不是对象，也没有赋值的事情，不需要区分左值和右值。这里不区分左值和右值的设计可以让一些代码的设计更为简洁，在后面的章节中我们会看到相关例子。