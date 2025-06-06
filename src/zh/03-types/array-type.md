---
title: 3.8 数组类型
---

# 数组类型

数组（Array）是一种复合类型，它可以在连续的内存空间中存储相同类型的多个元素。

## 数组的声明与初始化

声明数组时，需要指定元素的类型和数组的大小。数组的大小必须是一个常量表达式，读者目前可以把它理解为一个整数字面量。

```cpp
// 声明一个包含 5 个整数的数组，这个数组的类型是 int[5]
int numbers[5];
```

需要注意，数组类型是一个复合类型，它的大小是由元素类型和数组大小共同决定的。  
这里 `int numbers[5];` 的类型是 `int[5]`，其中的 `5` 是数组的大小。


数组可以在声明时进行初始化：
```cpp 
// 声明并初始化数组
int numbers[5] {10, 20, 30, 40, 50};
// 现在 `numbers` 包含 5 个整数，按顺序依次是 10, 20, 30, 40, 50
```

或者，可以只初始化部分元素，未初始化的元素将被初始化为 0：

```cpp
// 只初始化前两个元素，其他元素将被初始化为 0
int numbers[5] {10, 20}; 
```

此外，C++ 支持通过初始化器的长度来推断数组的大小：

```cpp
// 数组大小自动推断为 5，注意这里 numbers 的类型是 `int[5]` 而不是 `int[]`
int numbers[] {10, 20, 30, 40, 50}; 
```

::: info 初始化
观察前面的这段代码：

```cpp
int numbers[] {10, 20, 30, 40, 50};
```

这里使用 `{}` 的初始化形式称为 **列表初始化**，你也可以在括号前面添加一个 `=` 符号，如下所示：

```cpp
int numbers[] = {10, 20, 30, 40, 50};
```

这两种形式是等价的，没有语义上的区别，也没有性能上的差异。不要把使用了 `=` 的形式错误地理解成 “先声明一个数组，然后再赋值” 的过程。

更深入的关于初始化的内容会在之后的章节中介绍，这里只需要知道数组可以使用 `{}` 进行初始化即可。
:::


## 访问数组元素

可以通过索引操作符/下标操作符`[]`来访问数组中的元素，这是一种独特的[后缀表达式](../02-program-structure/expression/posix-expr.md)。数组的索引从 `0` 开始。

```cpp
int numbers[5] = {10, 20, 30, 40, 50};

int first_element = numbers[0]; // 访问第一个元素，值为 10
int third_element = numbers[2]; // 访问第三个元素，值为 30

numbers[4] = 55; // 修改第五个元素的值
```

访问超出数组边界的元素会导致未定义行为。

::: info 为什么数组类型有一部分在标识符后面？

考虑如下的声明：
```cpp
int numbers[5];
```

如果使用 `using` 声明这里 `numbers` 的类型，程序会修改为如下：
```cpp
using five_integers_t = int[5];
five_integers_t numbers; // 等效于 int numbers[5];
```

这就显得很古怪，为什么直接声明的时候，类型有一部分在标识符后面？

这是沿承自 C 语言的语法设计。在 C 语言中，设计者希望数组的声明和使用（下标访问）有相同的形式。这就导致了数组的大小被以这样的方式放在了标识符的后面。

历史证明这是个非常糟糕的设计，带来了巨大的理解和程序编写困难。但这个尾大不掉的语法设计已经传承数十年，C++ 也没有能够铲除它。
:::

## 数组的引用

引用可以绑定到数组，如下所示：

```cpp
int numbers[5] = {10, 20, 30, 40, 50};
auto& ref = numbers; // ref 是一个对数组的引用

ref[0] = 100; // 修改数组的第一个元素
```

这里 `ref` 是一个对数组 `numbers` 的引用，可以通过 `ref` 来访问和修改数组的元素。

::: info 数组的引用的类型

类似于[函数引用](./reference-type/function-ref.md)，数组的引用类型是在类型中添加 `&` 修饰符，例如：

```cpp
using five_integers_ref = int (&)[5]; // 声明一个对包含 5 个整数的数组的引用类型
```

你也可以直接给 `five_integers_t` 添加 `&` 修饰符来声明这个类型

```cpp
using five_integers_t = int[5]; // 声明一个包含 5 个整数的数组类型
using five_integers_ref = five_integers_t&; // 声明对应的引用类型 

five_integers_t& ref = numbers; // 直接在声明中额外添加 & 修饰符
```
:::


## 多维数组

你可以在 C++ 中声明多维数组，实际上这就是数组的数组，是数组的简单嵌套形式。

```cpp
// 声明一个 2x3 的二维整数数组
int matrix1[3][2];

// 初始化一个 3x2 的二维数组，这里使用嵌套的初始化器
int matrix2[3][2] = {
    {1, 0},
    {0, 1},
    {0, 0}
};

// 访问二维数组的元素
int element = matrix2[1][1]; // 访问第二行第二列的元素，值为 1
```

读者可以尝试通过 `auto&` 和代码编辑器的类型提示功能来查看多维数组的类型，如下：
```cpp
auto& matrix2_ref = matrix2; // matrix2_ref 的类型是 int (&)[3][2]
auto& row_ref = matrix2[1]; // row_ref 的类型是 int (&)[2]
```

可以发现，`matrix2` 的类型其实是 `int[2]` 类型的、大小为 3 的数组。即 `int[3][2]` 实际外层的数组的大小是 3，内层数组的大小是 2。在需要处理数组大小的时候，需要尤其注意这一点。

::: info 矩形数组
多维数组也被称为矩形数组（rectangular array），因为每一行的长度都是相同的。这种数组事实上就是一维数组，可以通过如下的方式转换：

```cpp 
// 用一维数组来代替表示之前的二维数组，包含 6 个整数
int matrix2[3*2] = {
    1, 0,
    0, 1,
    0, 0
};

int & access(size_t row, size_t col) {
    return matrix2[row * 2 + col]; // 访问二维数组的元素
}

int element = access(1, 1) // 访问第二行第二列的元素，值为 1

// 也可以使用 auto 的实现来让访问通用化，任何列数为 2 的矩形数组都可以使用这个函数
int & general_access(auto& arr, size_t row, size_t col) {
    return arr[row * 2 + col]; // 访问二维数组的元素
}

// 访问 matrix2 第二行第二列的元素，值为 1
int element2 = general_access(matrix2, 1, 1); 

```

矩形数组在各方面与一维数组都相同，但除了按照二维坐标访问元素以外，处理的时候矩形数组都更为麻烦（类型复杂、遍历要写多层、转换计算非常麻烦、连续性难以处理）。

这里建议读者在处理矩形数组情况时，都使用一维数组来代替。
:::
