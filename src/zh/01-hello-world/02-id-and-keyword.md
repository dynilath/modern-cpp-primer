---
title: 1.2 标识符与关键字
---

## 标识符

在 C++ 中，程序员常常需要自定义的标记来表示一些程序的实体，例如变量、函数、类型等等。程序员赋予程序实体名字，之后在程序的其他部分就可以通过这个名字来引用这个实体。这个名字就是标识符。

标识符是由字母、数字和下划线组成的，其中第一个字符必须是字母或下划线。标识符是大小写敏感的，也就是说 `hello` 和 `Hello` 是两个不同的标识符。

::: info 
读者可能已经发现了标识符几乎可以是任何字符，中文字符可以、日文字符可以、甚至是表情符号也可以。  

技术性地讲，任何标记为 XID_Start 的 Unicode 字符都可以作为标识符的首字符，而任何标记为 XID_Continue 的 Unicode 字符都可以作为标识符的后续字符。  

但由于目前世界上的编码标准与运行环境千奇百怪，读者虽然在自己的试验项目中可以如此做，但在实际工程中，我们还是尽量使用英文字符作为标识符。  
:::

## 关键字

在 C++ 中，有一些特殊的标识符，这些标识符被称为关键字。关键字被保留为特殊用途，不能用作程序员定义的标识符。例如，`int` 是一个关键字，程序员不能将 `int` 作为变量名、函数名、类型名。

下面列出了 C++ 中的所有关键字：

|           |              |           |                  |          |
| --------- | ------------ | --------- | ---------------- | -------- |
| alignas   | constinit    | false     | public           | true     |
| alignof   | const_cast   | float     | register         | try      |
| asm       | continue     | for       | reinterpret_cast | typedef  |
| auto      | co_await     | friend    | requires         | typeid   |
| bool      | co_return    | goto      | return           | typename |
| break     | co_yield     | if        | short            | union    |
| case      | decltype     | inline    | signed           | unsigned |
| catch     | default      | int       | sizeof           | using    |
| char      | delete       | long      | static           | virtual  |
| char8_t   | do           | mutable   | static_assert    | void     |
| char16_t  | double       | namespace | static_cast      | volatile |
| char32_t  | dynamic_cast | new       | struct           | wchar_t  |
| class     | else         | noexcept  | switch           | while    |
| concept   | enum         | nullptr   | template         |
| const     | explicit     | operator  | this             |
| consteval | export       | private   | thread_local     |
| constexpr | extern       | protected | throw            |

## 保留的标识符

在 C++ 中，还有一些标识符被保留，不能用作程序员定义的标识符。这些标识符通常是用于库的实现，或者是用于未来的扩展。例如，`__reserved` 是一个保留的标识符，程序员不能将 `__reserved` 作为变量名、函数名、类型名。

具体而言，每个以`__`开头的标识符都是保留的标识符；每个以`_`开头，第二个字符是大写字母的标识符也是保留的标识符。例如，`_Reserved` 是保留的标识符。
