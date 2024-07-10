---
title: 1.2 标识符与关键字
---

## 标识符

在 C++ 中，程序员常常需要自定义的标记来表示一些程序的实体，例如对象、函数、类型等等。程序员赋予程序实体名字，之后在程序的其他部分就可以通过这个名字来引用这个实体。这个名字就是**标识符**。

标识符是由字母、数字和下划线组成的，其中第一个字符必须是字母或下划线（不能是数字）。标识符是大小写敏感的，也就是说 `hello` 和 `Hello` 是两个不同的标识符。

举例而言，在下面的程序中

```cpp
import std;

int main() {
    int a = 1;
    std::println(a);
}
```

相信读者很容易理解到，`a` 就是一个标识符，它代表一个整数对象。

此外，这里的 `int`、`main`、`std`、`cout`、`endl`、`import`、`return` 都是标识符。它们与程序员自己定义的标识符有所区别，有的是关键字，有的是具有特殊意义的标识符，有的是预定义的标识符，这会在后文做出解释。

::: info 更多标识符
读者可能已经发现了标识符几乎可以是任何语言的字符，中文字符可以、日文字符也可以，甚至是许多emoji都可以（非人脸的多数emoji）。  

技术性地讲，任何标记为 XID_Start 的 Unicode 字符都可以作为标识符的首字符，而任何标记为 XID_Continue 的 Unicode 字符都可以作为标识符的后续字符。  

但由于目前世界上的编码标准与运行环境千奇百怪，读者虽然在自己的试验项目中可以如此做，但在实际工程中，我们还是尽量使用英文字符作为标识符。  
:::

## 关键字

在 C++ 中，有一些特殊的标识符，这些标识符被称为关键字。关键字被保留为特殊用途，不能被程序员使用、命名其它实体。例如，`int` 是一个关键字，程序员不能将 `int` 作为对象、函数、类型的名字。

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

在 C++ 中，还有一些标识符被保留，不能被程序员使用，命名实体。这些标识符通常是用于库的实现，或者是用于未来的扩展。例如，`__reserved` 是一个保留的标识符，程序员不能将 `__reserved` 作为对象、函数、类型的名字。

具体而言，以 `__` 开头的标识符都是保留的标识符。以 `_` 开头，第二个字符是大写字母的标识符也是保留的标识符。全局命名空间中，以一个下划线开始的标识符。都是被保留的。例如，任何位置出现的`_Reserved`、`_M_reserved`、`__m`，在全局命名空间的 `_x` 都是保留的标识符。

读者可能会在调试程序中看到标准库的源文件，会发现许多如本节所述的，被称为保留的标识符，名称。例如，下面是 `microsoft/STL` 中的一段代码：

```cpp
    template <class... _Valty>
    _CONSTEXPR20 _Ty& _Emplace_one_at_back(_Valty&&... _Val) {
        // insert by perfectly forwarding into element at end, provide strong guarantee
        auto& _My_data   = _Mypair._Myval2;
        pointer& _Mylast = _My_data._Mylast;

        if (_Mylast != _My_data._Myend) {
            return _Emplace_back_with_unused_capacity(_STD forward<_Valty>(_Val)...);
        }

        return *_Emplace_reallocate(_Mylast, _STD forward<_Valty>(_Val)...);
    }
```

这里的 `_CONSTEXPR20`、`_Ty`、`_Emplace_one_at_back`、`_Valty`、`_My_data` 等等全都都是保留的标识符。

除了标准规定的一些名称比较好看的函数与类型，标准库本身实现的时候，基本上被限制使用上述的保留标识符。而作为标准库的使用者，**不应当**使用这些标识符，这是一种规范。

## 快速练习

<Choices 
    :questions="[
        {
            text: '下面的代码中，有哪些是标识符？',
            code: 'const int a = 1;',
            options: ['const', 'int', 'a', '=', '1'],
            answers: ['const', 'int', 'a']
        },
        {
            text: '下面的代码中，有哪些是关键字？',
            code: 'const int a = 1;',
            options: ['const', 'int', 'a', '=', '1'],
            answers: ['const', 'int']
        },
        {
            text: '下面的代码中，有哪些是标识符？',
            code: 'int plus_one(int a) { \n    return a + 1; \n}',
            options: ['int', 'plus_one', 'a', 'return', '1', '+', ';'],
            answers: ['plus_one', 'int', 'a', 'return']
        },
        {
            text: '下面的代码中，有哪些是标识符？',
            code: '#include <iostream> \nint main() { \n    std::cout << &#34;Hello, World&#34;; \n}',
            options: ['include', 'iostream', 'int', 'main', 'std', 'cout', '<<', '&#34Hello, World&#34', ';'],
            answers: ['int', 'main', 'std', 'cout']
        },
        {
            text: '下面的代码中，有哪些是关键字？',
            code: '#include <iostream> \n\nint main() { \n    std::cout << &#34;Hello, World&#34;; \n}',
            options: ['include', 'iostream', 'int', 'main', 'std', 'cout', '<<', '&#34Hello, World&#34', ';'],
            answers: ['int']
        },
    ]"
/>
