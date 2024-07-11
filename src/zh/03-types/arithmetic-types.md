---
title: 3.2 算数类型
---

算数类型是一类能对数据进行算数运算的类型。C++ 中的算数类型包括**整数类型**和**浮点类型**。

## 整数类型

在前面的章节中，为了介绍表达式，介绍了三种类型 `int`、`bool` 和 `char`，这些类型都是整数类型。这里我们详细介绍整数类型。

C++ 中默认提供的整数类型包括：

| 类型                     | 含义               | 字面量形式                        | 类型大小                   |
| ------------------------ | ------------------ | --------------------------------- | -------------------------- |
| `short int`              | 短整数类型         | 没有字面量                        | 至少 2                     |
| `unsigned short int`     | 无符号短整数类型   | 没有字面量                        | 至少 2                     |
| `int`                    | 整数类型           | `123`，没有后缀                   | 至少 2，且不小于 `short`。 |
| `unsigned int`           | 无符号整数类型     | `123u`，后缀`u`，不区分大小写     | 至少 2，且不小于 `short`。 |
| `long int`               | 长整数类型         | `123l`，后缀`l`，不区分大小写     | 至少 4，且不小于 `int`。   |
| `unsigned long int`      | 无符号长整数类型   | `123ul`，后缀`ul`，不区分大小写   | 至少 4，且不小于 `int`。   |
| `long long int`          | 长长整数类型       | `123ll`，后缀`ll`，不区分大小写   | 至少 8，且不小于 `long`。  |
| `unsigned long long int` | 无符号长长整数类型 | `123ull`，后缀`ull`，不区分大小写 | 至少 8，且不小于 `long`。  |

上面提到的这些类型，字面量的后缀 `u`、`l`、`ll` 不区分大小写，并且 `u` 和 `l` / `ll` 的顺序任意，例如：

```cpp
123U;  // 值为123，类型为 unsigned int
123ul; // 值为123，类型为 unsigned long int
123lu; // 值为123，类型为 unsigned long int
123LL; // 值为123，类型为 long long int
123LLU; // 值为123，类型为 unsigned long long int
```

注意，不可以写作 `123lul`

上面描述的这些类型的名字由多个关键字组成，其中的一部分是可以省略、或者无影响地添加的：

| 类型                 | 等同的类型                                  | 最短形式         |
| -------------------- | ------------------------------------------- | ---------------- |
| `short int`          | `short`、`signed short`、`signed short int` | `short`          |
| `unsigned short int` | `unsigned short`                            | `unsigned short` |
| `int`                | `signed`、`signed int`                      | `int`            |
| `unsigned int`       | `unsigned`                                  | `unsigned`       |
| `long int`           | `long`、`signed long`、`signed long int`    | `long`           |
| `unsigned long int`  | `unsigned long`                             | `unsigned long`  |

除了上述用于表示基本整数的类型，C++ 还提供了一些用于表示字符的整数类型：

| 类型            | 含义            | 字面量形式        | 类型大小                      |
| --------------- | --------------- | ----------------- | ----------------------------- |
| `signed char`   | 有符号字符类型  | 没有字面量        | 1                             |
| `unsigned char` | 无符号字符类型  | 没有字面量        | 1                             |
| `char`          | 字符类型        | `'A'`             | 1                             |
| `char8_t`       | UTF-8 字符类型  | `u8'A'`，u8前缀   | 1                             |
| `char16_t`      | UTF-16 字符类型 | `u'A'`，u前缀     | 与 `std::uint_least16_t` 相同 |
| `char32_t`      | UTF-32 字符类型 | `U'A'`，大写U前缀 | 与 `std::uint_least32_t` 相同 |
| `wchar_t`       | 宽字符类型      | `L'A'`，大写L前缀 | 由平台决定                    |

`char` 是字符类型，属于整数类型，它与 `signed char` 或者 `unsigned char` 之一的值表示相同，但是从语言上 `char` 类型是一个独立的类型，与 `signed char` 和 `unsigned char` 均不同。

`char8_t` 是 UTF-8 字符类型，属于整数类型。它和 `unsigned char` 有相同的大小和符号性、大小和对齐，但它是和 `unsigned char` 不同的类型。

`char16_t` 是 UTF-16 字符类型，属于整数类型。它的大小足够表示一个 UTF-16 编码单元。它和 `std::uint_least16_t` 有相同的大小和符号性、大小和对齐，但它是和 `std::uint_least16_t` 不同的类型（见后文）。

`char32_t` 是 UTF-32 字符类型，属于整数类型。它的大小足够表示一个 UTF-32 编码单元。它和 `std::uint_least32_t` 有相同的大小和符号性、大小和对齐，但它是和 `std::uint_least32_t` 不同的类型（见后文）。

`wchar_t` 是宽字符类型，属于整数类型，它的大小由平台决定，通常是2字节或者4字节。

除了上述的整数类型之外，C++ 还提供了一些特殊的整数类型：

| 类型             | 含义                           | 字面量形式                      | 类型大小 |
| ---------------- | ------------------------------ | ------------------------------- | -------- |
| `bool`           | 布尔类型                       | `true`、`false`                 | 实现定义 |
| `std::size_t`    | 表示对象的大小的无符号整数类型 | `123uz`，后缀`uz`，不区分大小写 | 实现定义 |
|                  | 有符号形式的 `std::size_t`     | `123z`，后缀`z`，不区分大小写   | 实现定义 |
| `std::ptrdiff_t` | 有符号整数类型，用于指针差值   |                                 | 实现定义 |

`bool` 是布尔类型，属于整数类型，它只有两个值 `true` 和 `false`。`bool` 类型的大小 C++ 没有规定，但是通常为1字节。

`std::size_t` 是用于表示对象的大小的无符号整数类型。是 `sizeof` 和 `alignof` 运算符的结果类型。`std::size_t` 的大小由平台决定，且 `std::size_t` 实现通常是前述整数类型之一的类型别名。

`std::ptrdiff_t` 是用于表示指针差值的整数类型。它足够容纳两个指针之间的差值。我们会在后面的章节中介绍指针类型。


### 一些实现的类型大小

下表展示了不同实现的整数类型的位宽。

| 数据模型 | `short int` | `int` | `long int` | `long long int` | `std::size_t` | 典型平台                                      |
| -------- | ----------- | ----- | ---------- | --------------- | ------------- | --------------------------------------------- |
| ILP32    | 16          | 32    | 32         | 64              | 32            | x86                                           |
| LLP64    | 16          | 32    | 32         | 64              | 64            | Windows（包括 x86-64，IA-64，ARM64）          |
| LP64     | 16          | 32    | 64         | 64              | 64            | Unix和多数类Unix系统，如Linux，macOS，Solaris |
| ILP64    | 16          | 64    | 64         | 64              | 64            | 一些科学计算领域的平台，如Cray                |
| SILP64   | 64          | 64    | 64         | 64              | 64            | Classic UNICOS                                |
|          | 16          | 16    | 32         | 64              | 16            | 嵌入式系统，如AVR                             |
|          | 8           | 8     | 16         | 32              | 16            | 嵌入式系统，如AVR（int8模式）                 |
|          | 16          | 16    | 32         | 未提供          | 16            | **\*** Borland C++ 4.0 16bit                  |
|          | 16          | 32    | 32         | 未提供          | 32            | **\*** Borland C++ 4.0 32bit                  |

注：以 **\*** 标记的数据模型已经基本不再使用。

### 整数提升

之前的章节中介绍过，在计算 [乘性表达式](../02-program-structure/expression.md#乘性表达式) 时，如果操作数是 `bool` 或者 `char` 时，会转换为 `int` 类型。这种转换称为整数提升。

这个规则具体而言是：

对于 [正运算符](../02-program-structure/expression.md#正运算符)、[负运算符](../02-program-structure/expression.md#负运算符)、[移位表达式](../02-program-structure/expression.md#移位表达式)、[按位取反](../02-program-structure/expression.md#按位取反)、[乘性表达式](../02-program-structure/expression.md#乘性表达式)、[加性表达式](../02-program-structure/expression.md#加性表达式)、[按位与](../02-program-structure/expression.md#按位与)、[按位或](../02-program-structure/expression.md#按位或)、[按位异或](../02-program-structure/expression.md#按位异或)，整数类型的计算具有以下整数提升规则：

将组成运算符所在表达式内，运算符左右两边的表达式称为操作数。对于正运算符、负运算符、按位取反，操作数是运算符右边的表达式。

如果操作数是 `bool` 类型，那么将操作数转换到 `int` 类型，`false` 转换为 `0`，`true` 转换为 `1`。

然后，按照下面的顺序：`int`、`unsigned int`、`long int`、`unsigned long int`，`long long int`、`unsigned long long int`。选择第一个值范围能够容纳所有操作数的类型。将操作数转换为这个类型。


### 定宽整数类型

除了上述的整数类型之外，根据实现，C++ 也会提供另外的整数类型，其中典型的就是定宽整数类型。这些类型有：

| 类型                  | 含义                         | 备注     |
| --------------------- | ---------------------------- | -------- |
| `std::int8_t`         | 有符号8位整数                | 可选提供 |
| `std::int16_t`        | 有符号16位整数               | 可选提供 |
| `std::int32_t`        | 有符号32位整数               | 可选提供 |
| `std::int64_t`        | 有符号64位整数               | 可选提供 |
| `std::uint8_t`        | 无符号8位整数                | 可选提供 |
| `std::uint16_t`       | 无符号16位整数               | 可选提供 |
| `std::uint32_t`       | 无符号32位整数               | 可选提供 |
| `std::uint64_t`       | 无符号64位整数               | 可选提供 |
| `std::int_fast8_t`    | 至少8位的最快整数类型        |          |
| `std::int_fast16_t`   | 至少16位的最快整数类型       |          |
| `std::int_fast32_t`   | 至少32位的最快整数类型       |          |
| `std::int_fast64_t`   | 至少64位的最快整数类型       |          |
| `std::uint_fast8_t`   | 至少8位的最快无符号整数类型  |          |
| `std::uint_fast16_t`  | 至少16位的最快无符号整数类型 |          |
| `std::uint_fast32_t`  | 至少32位的最快无符号整数类型 |          |
| `std::uint_fast64_t`  | 至少64位的最快无符号整数类型 |          |
| `std::int_least8_t`   | 至少8位的最小整数类型        |          |
| `std::int_least16_t`  | 至少16位的最小整数类型       |          |
| `std::int_least32_t`  | 至少32位的最小整数类型       |          |
| `std::int_least64_t`  | 至少64位的最小整数类型       |          |
| `std::uint_least8_t`  | 至少8位的最小无符号整数类型  |          |
| `std::uint_least16_t` | 至少16位的最小无符号整数类型 |          |
| `std::uint_least32_t` | 至少32位的最小无符号整数类型 |          |
| `std::uint_least64_t` | 至少64位的最小无符号整数类型 |          |
| `std::intmax_t`       | 最大位宽有符号整数类型       |          |
| `std::uintmax_t`      | 最大位宽无符号整数类型       |          |
| `std::intptr_t`       | 整数类型，用于指针           |          |
| `std::uintptr_t`      | 无符号整数类型，用于指针     |          |

这些类型的名字不是关键字，因此以 `std::` 作为前缀。

`std::int8_t`、`std::int16_t`等定宽整数类型的位宽是确定的，它仅当实现直接提供这样尺寸的整数类型时才会存在。如果前面提到的如 `int` `long int` 这样的类型本身就满足定宽的要求，那么这些定宽类型可以是对应的类型的别名。例如，如果某个实现中 `int` 恰好是32位的，那么允许 `using int32_t = int;` 来声明 `std::int32_t` 类型。

`std::int_fast8_t`、`std::int_fast16_t`等最快整数类型是指在当前平台上最快的整数类型，它们的位宽是不确定的，但是至少是指定的位宽。由于平台上最快的整数类型是 `int`, 因此尺寸小于 `int` 的最快整数类型往往是 `int`。

实现可以提供 `N` 不在上述之列的 `std::intN_t`，`std::int_fastN_t` 和 `std::int_leastN_t` 等类型，但也必须满足 `std::intN_t` 的位宽是 `N`，`std::int_fastN_t` 和 `std::int_leastN_t` 的位宽至少是 `N`。

`std::intptr_t` 和 `std::uintptr_t` 是用于指针的整数类型。`std::intptr_t` 是有符号整数类型，`std::uintptr_t` 是无符号整数类型。它们足够容纳对象指针类型的位宽。


## 浮点类型

::: important TODO: 浮点类型
:::