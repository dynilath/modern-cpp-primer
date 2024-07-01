---
title: 2.5 初识作用域与命名空间
---

## 语句与作用域

### 声明语句与作用域
在 C++ 中，一个名字在被声明引入之前，是无效的。

```cpp
a = 1; // 错误：a 在这里是无效的

int a = 0; // 声明并创建一个整数类型的对象 a
```
在上面的例子中，`a` 在被声明之前是无效的，所以第一行代码是错误的。只有在 `a` 被声明之后，`a` 才是有效的。


### 复合语句与作用域
在前面我们已经讲过了[复合语句](./statements.md#复合语句)，复合语句的另一个重要作用是**引入作用域**。在复合语句内部声明的名称，只在复合语句内部有效。例如：

```cpp
int a = 1;
{
    int b = 2;
    a = 1; // 在复合语句内部，可以访问外部的名称
}
b = 3; // 错误：在复合语句外部，b 已经不可见
```
在上面的例子中，`b` 是在复合语句内部声明的，所以在复合语句外部是不可见的。这样的机制可以避免名称冲突，也可以提高程序的可读性。

### 循环体中的声明

在循环语句的循环体内，可以声明新的对象。这些对象只能在循环体内使用。例如：
```cpp
for (int i = 0; i < 10; ++i) {
    int a = 0;
    while (a < 10) {
        int b = i; 
        a += b * a; // 可以访问 a 和 b
    }
    b = 2; // [!code error] // 错误：b 在这里是不可见的
}
a = 2; // [!code error] // 错误：a 在这里是不可见的
```
::: tip 循环之间
在不同的循环之间，声明的对象是不可见的。例如：
```cpp
for (int i = 0; i < 10; ++i) {
    if(i > 0) a = 1; // [!code error]  // 错误：a 在这里是不可见
    int a = i; // 这里声明了一个新的 int 类型的对象 a
}
```
每一次循环，都会离开作用域，进入下一次循环的作用域。此时，上一次循环中声明的对象是不可见的，即使名称相同。

在 `for` 语句初始化语句中声明的对象（`for( ... ; ; )` 括号里面左边的部分），在每一次循环之间保持可见。
:::

### `for` 语句与作用域

在[`for` 语句](./statements.md#for-语句)中，`for` 语句的初始化部分中声明的名称，只在 `for` 语句内部有效。例如：
```cpp
for (int i = 0; i < 10; ++i) 
    a += i; // i 在这里是可见的
// i 在这里是不可见的
```

如果 `for` 语句的循环体是一个复合语句，其内部也对 `for` 的初始化部分声明的名称是可见的。例如：
```cpp
for (int i = 0; i < 10; ++i) {
    int a = 0;
    a += i; // i 在这里是可见的
}
// 在这里，a 和 i 都是不可见的
```

如果 `for` 语句的循环体是一个[声明语句](./statements.md#声明语句)，那么这个声明只在 `for` 语句内部有效。例如：
```cpp
for(int i = 0; i < 10; ++i) int a = 0;

a += 1; // [!code error] // 错误：a 在这里是不可见的
```

### 选择语句与作用域

在[`if` 语句](./statements.md#if-语句)、[`switch` 语句](./statements.md#switch-语句)中，在选择条件里可以写一个声明语句，这个声明的名称只在选择语句内部有效。

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

c = 2; // [!code error] // 错误：c 在这里是不可见的

switch(a) int d = 2;

d = 3; // [!code error] // 错误：d 在这里是不可见的
```

### 函数与作用域

在[函数](./function.md)中，函数的参数列表中声明的名称只在函数内部有效。例如：
```cpp
int add_mul(int a, int b, int c) {
    int sum = a + b;
    return sum * c;
}
// a, b, c, sum 在这里都是不可见的
int sub_mul(int a, int b, int c) {
    // 这里的 a, b, c 是新的 a, b, c，和 add_mul 的 a, b, c 不同

    int diff = a - b;
    return diff * c;
}
// a, b, c, diff 在这里都是不可见的
```

## 不同的作用域与重复的名称

在不同的作用域中，可以使用相同的名称。例如：
```cpp
int a = 1;
{
    int a = 2;
    a += 1; // 在这里，a 是内部的 a
}

int add_one(int a) {
    return a + 1; // 在这里，a 是参数 a，不是外部的 a
}

// 在这里，a 是最外部的 a，值为 1
```

## 初识命名空间

在 C++ 中，命名空间是一种用来避免名称冲突的机制。

### 全局命名空间

对于每个源文件，在所有的作用域之外，有一个全局的作用域，这个全局的作用域称为**全局命名空间**。源文件中其他的作用域，例如函数、复合语句、`for` 语句、`if` 语句、`switch` 语句等，都是在全局命名空间之内，可以访问全局命名空间中的名称。

在全局命名空间中，不能出现多数的语句，但是可以出现[声明语句](./statements.md#声明语句)、[函数定义](./function.md#函数的定义)、[函数前向声明](./function.md#前向声明)等。例如：

```cpp
// 文件 main.cpp 开始

int a = 1; // 可以在全局命名空间中声明一个整数类型的对象 a

int add_a(int x); // 可以前向声明 add_a 函数

int main() { // 可以定义 main 函数
    a = add_a(2); 
    return 0;
}

int add_a(int x) { // 可以定义 add_a 函数
    return a + x;
}

a = 2; // [!code error] // 错误：在全局命名空间中不能有这样的语句
1 + a; // [!code error] // 错误：在全局命名空间中不能有这样的语句

// 文件 main.cpp 结束
```

### 命名空间与有限定名称

在 C++ 中提供了命名空间的机制，可以用来避免名称冲突。命名空间的声明形式是：
```cpp
namespace name {
    // 在这里进行声明和定义
}
```
这里，`namespace` 是一个关键字，指示这是一个命名空间的声明。`name` 是命名空间的名称，可以是任意合法的[标识符](../01-hello-world/id-and-keyword.md)。

命名空间的声明必须在命名空间中，而不能在语句带来的的作用域内。

类似于全局命名空间，声明的命名空间仍然不能出现多数的语句，但是可以出现声明语句、函数定义、函数前向声明等。

命名空间不是对象，也没有值，它只用于组织程序中的名称。

在命名空间中声明的名称，只在命名空间内部有效。例如：
```cpp
namespace A {
    int a = 1;
}

int b = a; // [!code error] // 错误：a 在这里是不可见的
```

但区别于函数、复合语句产生的作用域，命名空间内的名称可以通过有限定名称的方式访问。

有限定名称的形式是 
```cpp
namespace_name :: name
```
中间的 `::` 是作用域解析运算符，用来指示名称 `name` 是在 `namespace_name` 命名空间中的。例如：

```cpp
namespace A {
    int a = 1;
}

int b = A::a; // 正确：通过有限定名称访问 A 命名空间中的 a
```

有限定名称作为表达式时，是一个[基本表达式](./expression.md#基本表达式)。

### 命名空间的嵌套

除了在全局命名空间中声明命名空间，也可以在命名空间中声明命名空间，这样就形成了命名空间的嵌套。例如：
```cpp
namespace A {
    int a = 1;
    namespace B {
        int b = 2;
    }
}
```
对这样嵌套的命名空间可以这样访问：
```cpp
int c = A::B::b; // 通过有限定名称访问 A 命名空间中的 B 命名空间中的 b
```

### 内联命名空间

在声明命名空间时，可以使用 `inline` 关键字，将命名空间声明为内联命名空间。
```cpp
namespace A {
    inline namespace B {
        int b = 2;
    }
}
```
内联命名空间内的名称可以直接通过其外部的命名空间访问，不需要有限定名称。例如：
```cpp
int c = A::b; // 通过有限定名称访问 A 命名空间中的 B 命名空间中的 b
```

这个直接访问的机制是传递的，例如：
```cpp
namespace A {
    inline namespace B {
        inline namespace C {
            int c = 3;
        }
    }
}

int d = A::c; // 通过有限定名称访问 A 命名空间中的 C 命名空间中的 c
```

### 相同名称的命名空间

命名空间本身可以具有相同的名称，不会产生冲突。例如：
```cpp
namespace A {
    int a = 1;
}

namespace A {
    int b = 2;
}
```
这样的两个命名空间 `A` 可以认为是同一个命名空间。这样的机制可以用来分割命名空间的声明。

此外，如果要声明一个已经声明过的内层命名空间，可以通过 `::` 限定来声明。例如：
```cpp
namespace A {
    namespace B {
        int b = 2;
    }
}

namespace A::B {
    int c = 3;
}
```
上面 `c` 的声明等价于
```cpp
namespace A {
    namespace B {
        int c = 3;
    }
}
```

## `using` 声明

有时候，我们并不想每次都通过有限定名称的方式访问命名空间中的名称，尤其是名称太长，也没啥冲突的时候。

在 C++ 中，可以使用 `using` 声明来引入命名空间中的名称。`using` 声明的形式是：
```cpp
using namespace_name :: name;
```
这里，`using` 是一个关键字，指示这是一个 `using` 声明。`namespace_name` 是命名空间的名称，`name` 是命名空间中的名称。

整个 `using` 声明组成了一个[声明语句](./statements.md#声明语句)。`using` 声明可以在任何作用域内使用。

`using` 声明引入的名称，可以在引入的作用域内直接使用，不需要有限定名称。例如：
```cpp
namespace A {
    int a = 1;
}

void inc_a() {
    using A::a; // 引入 A 命名空间中的 a
    a += 1; // 直接使用 a，不需要 A::a
}
```

注意，`using` 声明引入的名称，必须要在引入之后，且只在引入的作用域内有效。例如：
```cpp
namespace A {
    int a = 1;
}

void inc_a() {
    a += 1; // [!code error] // 错误：a 在这里是不可见的
    using A::a; // 引入 A 命名空间中的 a
}

a += 1; // [!code error] // 错误：a 在这里是不可见的
```

### 有限定访问全局命名空间
有的时候，我们会想要引入名称后，访问一个全局命名空间中的名称。这时候，可以使用前面没有命名空间名称的 `::` 作用域解析运算符。例如：
```cpp
int a = 1;
namespace A {
    int a = 2;
}

void inc_a() {
    using A::a; // 引入 A 命名空间中的 a
    ::a += 1; // ::a 是全局命名空间中的 a，而非 A::a
}
```

### 引入多个名称
`using` 声明可以一次引入多个名称。例如：
```cpp
namespace A {
    int a = 1;
    int b = 2;
}

void inc_a() {
    using A::a, A::b; // 引入 A 命名空间中的 a 和 b
    a += 1;
    b += 1;
}
```
这等价于使用了两个 `using` 声明，分别引入 `A::a` 和 `A::b`。

### 在命名空间中使用 `using` 声明

在命名空间中，可以使用 `using` 声明来引入其他命名空间中的名称。例如：
```cpp
namespace A {
    int a = 1;
}

namespace B {
    using A::a; // 在 B 命名空间中引入 A 命名空间中的 a
    int b = a;
}

int c = B::b; // 正确：可以访问 B 命名空间中的 b
int d = B::a; // 正确：可以访问 B 命名空间中引入的 A 命名空间中的 a
```

## `using namespace` 指令

有时候，我们会想要引入一个命名空间中的所有名称。这时候，可以使用 `using namespace` 指令。`using namespace` 指令的形式是：
```cpp
using namespace namespace_name;
```
这里，`using` 是一个关键字，指示这是一个 `using` 指令。`namespace_name` 是命名空间的名称。

完整的 `using namespace` 指令组成了一个[声明语句](./statements.md#声明语句)。`using namespace` 指令可以在任何作用域内使用。

`using namespace` 指令引入的名称，可以在引入的作用域内直接使用，不需要有限定名称。例如：
```cpp
namespace A {
    int a = 1;
    int b = 2;

    void inc_a() {
        a += 1;
        b += 1;
    }
}

int inc_a_then_sum() {
    using namespace A; // 引入 A 命名空间中的所有名称

    inc_a(); // 可以直接调用 inc_a
    return a + b; // 可以直接使用 a 和 b 
}
```

### 在命名空间中使用 `using namespace` 指令

在命名空间中，可以使用 `using namespace` 指令来引入其他命名空间中的所有名称。例如：
```cpp
namespace A {
    int a = 1;
    int b = 2;
}

namespace B {
    using namespace A; // 在 B 命名空间中引入 A 命名空间中的所有名称
}

int c = B::a; // 正确：可以访问 B 命名空间中引入的 A 命名空间中的 a
int d = B::b; // 正确：可以访问 B 命名空间中引入的 A 命名空间中的 b
```

## 标准库命名空间

在 C++ 中，规定了一个特殊的命名空间 `std`，用来存放标准库中的名称。在 C++ 标准库中的名称，都在 `std` 命名空间中。例如：
```cpp
import std;

int main() {
    std::println("Hello, World!");
}
```

标准库命名空间在源文件中默认已经声明，所以可以直接使用。但根据预处理指令的影响，`std` 命名空间中具有的名称会有所不同。

这里，`std::println` 中的 `std` 是标准库命名空间，`println` 是 `std` 命名空间中的一个函数，它的作用是根据参数，输出一行文本。

虽然，已经声明的命名空间可以再次声明，不会产生冲突。即，程序员可以写 `namespace std {}`，不会产生问题。

但是，C++ 规定，程序员**不应当**在 `std` 命名空间中添加声明。类似于[保留的标识符](../01-hello-world/id-and-keyword.md#保留的标识符)，`std`可以理解为一个保留为标准库使用的命名空间。

这样的规定是为了避免程序员干扰标准库的功能，产生不可预测的结果。

:::info println 究竟是什么？
技术性的来说，`println` 是一个函数模板。关于 `println` 函数的实现（例如，为什么能用[字符串字面量](../01-hello-world/literals.md#字符串字面量)为参数），以及何为输出，这些我们在后面的章节中讲解。
:::

:::info import std; 是什么？
在前面[预处理指令](../01-hello-world/source-processed.md#预处理指令)中，我们知道 `import std;` 是一个和模块相关的预处理指令。
它的作用是导入一个名为 `std` 的模块。具体的模块导入机制，我们会在后面的章节中讲解。
:::