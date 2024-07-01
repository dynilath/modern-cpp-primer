---
title: 3.1 类型概述
---

在[初识声明，类型与对象](../02-program-structure/declaration.md)中，我们简单介绍了类型的概念。在 C++ 中，类型是对象的属性，决定了对象的值的集合，以及对象上可以进行的操作。

## 整数类型

在前面的章节中，为了介绍表达式，介绍了三种类型 `int`、`bool` 和 `char`。这里我们详细介绍整数类型。

C++ 中默认提供的整数类型包括：

| 类型                     | 含义               | 最小字节数                            |
| ------------------------ | ------------------ | ------------------------------------- |
| `signed char`            | 有符号字符类型     | 占用 1 个字节。                       |
| `unsigned char`          | 无符号字符类型     | 占用 1 个字节。                       |
| `short int`              | 短整数类型         | 至少占用 2 个字节。                   |
| `unsigned short int`     | 无符号短整数类型   | 至少占用 2 个字节。                   |
| `int`                    | 整数类型           | 至少占用 2 个字节，且不小于 `short`。 |
| `unsigned int`           | 无符号整数类型     | 至少占用 2 个字节，且不小于 `short`。 |
| `long int`               | 长整数类型         | 至少占用 4 个字节，且不小于 `int`。   |
| `unsigned long int`      | 无符号长整数类型   | 至少占用 4 个字节，且不小于 `int`。   |
| `long long int`          | 长长整数类型       | 至少占用 8 个字节，且不小于 `long`。  |
| `unsigned long long int` | 无符号长长整数类型 | 至少占用 8 个字节，且不小于 `long`。  |

注意，这些类型名称中的一部分是可以省略、或者无影响地添加的。这包括：

| 类型                 | 等同的类型                                  | 最短形式         |
| -------------------- | ------------------------------------------- | ---------------- |
| `short int`          | `short`、`signed short`、`signed short int` | `short`          |
| `unsigned short int` | `unsigned short`                            | `unsigned short` |
| `int`                | `signed`、`signed int`                      | `int`            |
| `unsigned int`       | `unsigned`                                  | `unsigned`       |
| `long int`           | `long`、`signed long`、`signed long int`    | `long`           |
| `unsigned long int`  | `unsigned long`                             | `unsigned long`  |

`char` 是字符类型，属于整数类型，它与 `signed char` 或者 `unsigned char` 之一的二进制表示相同，但是从语言上 `char` 类型是一个独立的类型，与 `signed char` 和 `unsigned char` 均不同。

`wchar_t` 是宽字符类型，属于整数类型，它的大小与平台有关，通常是2字节或者4字节。

`bool` 类型是整数类型，它只有两个值 `true` 和 `false`。`bool` 类型的大小 C++ 没有规定，但是通常为1字节。

### 整型提升

之前的章节中介绍过，在计算 [乘性表达式](../02-program-structure/expression.md#乘性表达式) 时，如果操作数是 `bool` 或者 `char` 时，会转换为 `int` 类型。这种转换称为整型提升。

这个规则具体而言是：

对于 [正运算符](../02-program-structure/expression.md#正运算符)、[负运算符](../02-program-structure/expression.md#负运算符)、[移位表达式](../02-program-structure/expression.md#移位表达式)、[按位取反](../02-program-structure/expression.md#按位取反)、[乘性表达式](../02-program-structure/expression.md#乘性表达式)、[加性表达式](../02-program-structure/expression.md#加性表达式)、[按位与](../02-program-structure/expression.md#按位与)、[按位或](../02-program-structure/expression.md#按位或)、[按位异或](../02-program-structure/expression.md#按位异或)，整数类型的计算具有以下整数提升规则：

其中 操作数 表示上述表达式中，运算符左右两侧的表达式。这里的描述不需要区分左右操作数，对二者均有效。

- 如果操作数是 `bool` 类型，那么将操作数转换到 `int` 类型，那么 `false` 转换为 `0`，`true` 转换为 `1`。

- 如果 `int` 类型能表示两个操作数的所有值，那么提升到 `int` 类型。
- 否则，如果 `unsigned int` 类型能表示两个操作数的所有值，那么提升到 `unsigned int` 类型。
- 否则，如果 `long int` 类型能表示两个操作数的所有值，那么提升到 `long int` 类型。
- 否则，如果 `unsigned long int` 类型能表示两个操作数的所有值，那么提升到 `unsigned long int` 类型。

