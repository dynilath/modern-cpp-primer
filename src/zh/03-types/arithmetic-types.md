---
title: 3.2 算数类型
---

算数类型是一类能对数据进行算数运算的类型。C++ 中的算数类型包括**整数类型**和**浮点类型**。

## 整数类型

在前面的章节中，为了介绍表达式，介绍了三种类型 `int`、`bool` 和 `char`，这些类型都是整数类型。这里我们详细介绍整数类型。

C++ 中默认提供的整数类型包括：

| 类型                     | 含义               | 字面量后缀/前缀     | 最小字节数                            |
| ------------------------ | ------------------ | ------------------- | ------------------------------------- |
| `signed char`            | 有符号字符类型     | 无法声明字面量      | 占用 1 个字节。                       |
| `unsigned char`          | 无符号字符类型     | 无法声明字面量      | 占用 1 个字节。                       |
| `short int`              | 短整数类型         | 无法声明字面量      | 至少占用 2 个字节。                   |
| `unsigned short int`     | 无符号短整数类型   | 无法声明字面量      | 至少占用 2 个字节。                   |
| `int`                    | 整数类型           |                     | 至少占用 2 个字节，且不小于 `short`。 |
| `unsigned int`           | 无符号整数类型     | `123u`，后缀`u`     | 至少占用 2 个字节，且不小于 `short`。 |
| `long int`               | 长整数类型         | `123l`，后缀`l`     | 至少占用 4 个字节，且不小于 `int`。   |
| `unsigned long int`      | 无符号长整数类型   | `123ul`，后缀`ul`   | 至少占用 4 个字节，且不小于 `int`。   |
| `long long int`          | 长长整数类型       | `123ll`，后缀`ll`   | 至少占用 8 个字节，且不小于 `long`。  |
| `unsigned long long int` | 无符号长长整数类型 | `123ull`，后缀`ull` | 至少占用 8 个字节，且不小于 `long`。  |

上面提到的这些类型，字面量的后缀 `u`、`l`、`ll` 不区分大小写，并且 `u` 和 `l` / `ll` 的顺序任意，例如：

```cpp
123U;  // 值为123，类型为 unsigned int
123ul; // 值为123，类型为 unsigned long int
123lu; // 值为123，类型为 unsigned long int
123LL; // 值为123，类型为 long long int
123LLU; // 值为123，类型为 unsigned long long int
```

注意，不可以写作 `123lul`

上面描述的这些类型名称由多个关键字组成，中的一部分是可以省略、或者无影响地添加的：

| 类型                 | 等同的类型                                  | 最短形式         |
| -------------------- | ------------------------------------------- | ---------------- |
| `short int`          | `short`、`signed short`、`signed short int` | `short`          |
| `unsigned short int` | `unsigned short`                            | `unsigned short` |
| `int`                | `signed`、`signed int`                      | `int`            |
| `unsigned int`       | `unsigned`                                  | `unsigned`       |
| `long int`           | `long`、`signed long`、`signed long int`    | `long`           |
| `unsigned long int`  | `unsigned long`                             | `unsigned long`  |

`char` 是字符类型，属于整数类型，它与 `signed char` 或者 `unsigned char` 之一的二进制表示相同，但是从语言上 `char` 类型是一个独立的类型，与 `signed char` 和 `unsigned char` 均不同。

`char8_t` 是 UTF-8 字符类型，属于整数类型。它有和 `unsigned char` 相同的大小和符号性，

`wchar_t` 是宽字符类型，属于整数类型，它的大小由平台决定，通常是2字节或者4字节。

`bool` 类型是整数类型，属于整数类型，它只有两个值 `true` 和 `false`。`bool` 类型的大小 C++ 没有规定，但是通常为1字节。

### 整型提升

之前的章节中介绍过，在计算 [乘性表达式](../02-program-structure/expression.md#乘性表达式) 时，如果操作数是 `bool` 或者 `char` 时，会转换为 `int` 类型。这种转换称为整型提升。

这个规则具体而言是：

对于 [正运算符](../02-program-structure/expression.md#正运算符)、[负运算符](../02-program-structure/expression.md#负运算符)、[移位表达式](../02-program-structure/expression.md#移位表达式)、[按位取反](../02-program-structure/expression.md#按位取反)、[乘性表达式](../02-program-structure/expression.md#乘性表达式)、[加性表达式](../02-program-structure/expression.md#加性表达式)、[按位与](../02-program-structure/expression.md#按位与)、[按位或](../02-program-structure/expression.md#按位或)、[按位异或](../02-program-structure/expression.md#按位异或)，整数类型的计算具有以下整数提升规则：

其中 操作数 表示上述表达式中，运算符左右两侧的表达式。这里的描述不需要区分左右操作数，对二者均有效。

- 如果操作数是 `bool` 类型，那么将操作数转换到 `int` 类型，`false` 转换为 `0`，`true` 转换为 `1`。

然后，按照下面的顺序：`int`、`unsigned int`、`long int`、`unsigned long int`，`long long int`、`unsigned long long int`。选择第一个值范围能够容纳所有操作数的类型。将操作数转换为这个类型。

### 扩展整数类型

除了上述的整数类型之外，根据实现，C++ 也会提供另外的整数类型，其中典型的就是定宽整数类型。这些类型有：

| 类型           | 含义                         | 备注     |
| -------------- | ---------------------------- | -------- |
| int8_t         | 有符号8位整数                | 可选提供 |
| int16_t        | 有符号16位整数               | 可选提供 |
| int32_t        | 有符号32位整数               | 可选提供 |
| int64_t        | 有符号64位整数               | 可选提供 |
| uint8_t        | 无符号8位整数                | 可选提供 |
| uint16_t       | 无符号16位整数               | 可选提供 |
| uint32_t       | 无符号32位整数               | 可选提供 |
| uint64_t       | 无符号64位整数               | 可选提供 |
| int_fast8_t    | 至少8位的最快整数类型        |          |
| int_fast16_t   | 至少16位的最快整数类型       |          |
| int_fast32_t   | 至少32位的最快整数类型       |          |
| int_fast64_t   | 至少64位的最快整数类型       |          |
| uint_fast8_t   | 至少8位的最快无符号整数类型  |          |
| uint_fast16_t  | 至少16位的最快无符号整数类型 |          |
| uint_fast32_t  | 至少32位的最快无符号整数类型 |          |
| uint_fast64_t  | 至少64位的最快无符号整数类型 |          |
| int_least8_t   | 至少8位的最小整数类型        |          |
| int_least16_t  | 至少16位的最小整数类型       |          |
| int_least32_t  | 至少32位的最小整数类型       |          |
| int_least64_t  | 至少64位的最小整数类型       |          |
| uint_least8_t  | 至少8位的最小无符号整数类型  |          |
| uint_least16_t | 至少16位的最小无符号整数类型 |          |
| uint_least32_t | 至少32位的最小无符号整数类型 |          |
| uint_least64_t | 至少64位的最小无符号整数类型 |          |
| intmax_t       | 最大位宽整数类型             |          |

`int8_t`、`int16_t`等定宽整数类型的位宽是确定的，它仅当实现直接提供这样尺寸的整数类型时才会存在。如果前面提到的如 `int` `long int` 这样的类型本身就满足定宽的要求，那么这些定宽类型可以是对应的类型的别名。例如，如果某个实现中 `int` 恰好是32位的，那么允许 `using int32_t = int;` 来声明 `int32_t` 类型。

`int_fast8_t`、`int_fast16_t`等最快整数类型是指在当前平台上最快的整数类型，它们的位宽是不确定的，但是至少是指定的位宽。由于平台上最快的整数类型是 `int`, 因此尺寸小于 `int` 的最快整数类型往往是 `int`。

实现可以提供 `N` 超过64的 `intN_t`，`int_fastN_t` 和 `int_leastN_t` 等类型。这仅在实现支持有该宽度的整数类型时才会存在。