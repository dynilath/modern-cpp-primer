---
title: 2.9 简单的控制台程序
---

控制台是在如今的计算机上最常见最基础的程序运行形式，它是一种基于文本的用户界面。

在控制台程序中，用户通过键盘输入命令，程序通过控制台输出结果。这种形式虽然古老而基础，但是在许多场景下仍然有着广泛的甚至不可替代的应用。

## 控制台操作概述

打开控制台，应该会看到如下的提示：

::: tabs#shell-type
@tab:active powershell
```powershell
PS C:\Users\admin>
```
@tab cmd
```cmd
C:\Users\admin>
```

@tab bash
```bash
admin@Computer: ~ $
```
:::

这样的提示表示现在的控制台正在等待用户输入命令。用户可以在这里输入命令，然后按下回车键，控制台会执行用户输入的命令。

在输入光标左边，通常会展示当前的工作路径。


先快速地学习一下，控制台中的一些常见命令：

::: tabs#shell-type

@tab:active powershell

| 命令          | 使用方式             | 功能                               |
| ------------- | -------------------- | ---------------------------------- |
| `cd`          | `cd <目录路径>`      | 切换工作路径到 `<目录路径>` 的位置 |
| `ls`          | `ls`                 | 列出当前目录下的文件和文件夹       |
| `pwd`         | `pwd`                | 显示当前工作路径                   |
| `cat`         | `cat <文件路径>`     | 显示文件内容                       |
| `Get-Command` | `Get-Command <命令>` | 显示命令的路径                     |

@tab cmd
| 命令    | 使用方式          | 功能                               |
| ------- | ----------------- | ---------------------------------- |
| `cd`    | `cd <目录路径>`   | 切换工作路径到 `<目录路径>` 的位置 |
| `dir`   | `dir`             | 列出当前目录下的文件和文件夹       |
| `cd`    | `cd`              | 显示当前工作路径                   |
| `type`  | `type <文件路径>` | 显示文件内容                       |
| `where` | `where <命令>`    | 显示命令的路径                     |

@tab bash

| 命令    | 使用方式         | 功能                               |
| ------- | ---------------- | ---------------------------------- |
| `cd`    | `cd <目录路径>`  | 切换工作路径到 `<目录路径>` 的位置 |
| `ls`    | `ls`             | 列出当前目录下的文件和文件夹       |
| `pwd`   | `pwd`            | 显示当前工作路径                   |
| `cat`   | `cat <文件路径>` | 显示文件内容                       |
| `which` | `which <命令>`   | 显示命令的路径                     |

:::

这里认为读者正在操作一个视窗系统，所以创建/删除/编辑文件等操作在这里不会展示，使用视窗系统的文件管理器显然更加高效直接。

本书的目的是教授 C++ 语言，而不是操作系统的使用。如果读者对操作系统的使用有兴趣，可以参考其他的书籍或者教程。

接下来，使用显示命令的路径的指令看看编译器的路径。

::: tabs#shell-type
@tab:active powershell
```powershell
Get-Command g++
```
如果看到 `无法将“g++”项识别为 cmdlet、函数...`，说明编译器没有安装或者没有配置好环境变量。请参考第一章的内容，安装并配置好编译器。

@tab cmd
```cmd
where cl
```
如果看到 `INFO: Could not find files for the given pattern(s).`，说明编译器没有安装或者没有配置好环境变量。请参考第一章的内容，安装并配置好编译器。

@tab bash
```bash
which g++
```
如果没有看到任何输出，说明编译器没有安装或者没有配置好环境变量。请参考第一章的内容，安装并配置好编译器。
:::

## `main` 函数

在 C++ 程序中，`main` 函数是程序的入口。程序从 `main` 函数开始执行。

`main` 函数需要程序在源码内定义，且只能有一个。`main` 函数的定义形式有两种：

```cpp
int main() {
    // 在这里写程序
}
```
或者
```cpp
int main(int argc, char** argv) {
    // 在这里写程序
}
```

::: info char** 类型
参数 `argv` 的类型是 `char **`，这是一个指向字符指针的指针。这个参数是用来接收命令行参数的。
例如，前面提到的 `cd <目录路径>` 这样控制台命令，就是调用了一个名为 `cd` 的程序，并且传递了一个参数 `<目录路径>`。这个参数就是命令行参数，通过 `argv` 参数传递给程序。

关于命令行参数，以及 `char **` 类型，我们会在后面的章节中详细讲解。
:::

`main` 函数的返回值类型必须是 `int`，并且如果程序正常执行结束，应该返回 `0`。如果程序执行出现错误，可以返回其他的值，表示程序的错误状态。

C++ 标准规定，如果 `main` 函数执行到末尾，却没有提供返回值，其效果等同于 `return 0;`。也即是说，下面的两个程序是等价的：

```cpp
int main(){
}
```
和
```cpp
int main(){
    return 0;
}
```

现在，我们来写一个简单的控制台程序。在 `main.cpp` 文件中写入如下内容：

```cpp
import std;

int main() {
    std::println("Hello, World!");
}
```

这里，`std::println` 中的 `std` 是标准库命名空间，`println` 是 `std` 命名空间中的一个函数，它的作用是根据参数，输出一行文本，这里输出的是 `Hello, World!`。

接下来，我们来编译这个程序。

::: tabs#shell-type

@tab:active powershell

```powershell
g++ main.cpp -o main
```
这里表示用 `g++` 编译 `main.cpp` 文件，生成一个名为 `main` 的可执行文件。

> 这里 `g++` 是 `gcc` 编译器组件中处理 C++ 源文件的程序，参考前面介绍的 `int main(int argc, char** argv)` 结构，这里 `main.cpp`、`-o`、`main` 都是命令行参数，通过 `argv` 参数传入一个文件名为 `g++` 的程序。

@tab cmd

```cmd
cl main.cpp /Fe:main
```
这里表示用 `cl` 编译 `main.cpp` 文件，生成一个名为 `main.exe` 的可执行文件。

> 这里 `cl` 是 Visual Studio 编译器组件中处理 C++ 源文件的程序，参考前面介绍的 `int main(int argc, char** argv)` 结构，这里 `main.cpp`、`/Fe:`、`main` 都是命令行参数，通过 `argv` 参数传入一个文件名为 `cl` 的程序。

@tab bash

```bash
g++ main.cpp -o main
```
这里表示用 `g++` 编译 `main.cpp` 文件，生成一个名为 `main` 的可执行文件。

> 这里 `g++` 是 `gcc` 编译器组件中处理 C++ 源文件的程序，参考前面介绍的 `int main(int argc, char** argv)` 结构，这里 `main.cpp`、`-o`、`main` 都是命令行参数，通过 `argv` 参数传入一个文件名为 `g++` 的程序。

:::

编译完成后，我们可以运行这个程序。

::: tabs#shell-type
@tab:active powershell
```powershell
.\main
```
@tab cmd
```cmd
main.exe
```
@tab bash
```bash
./main
```
:::

应该会看到如下的输出：

```
Hello, World!
```

## 输出值

在上面的程序中，我们使用了 `std::println` 函数来输出文本。这个函数是标准库中的一个函数，用来输出文本到控制台。这个函数能够接受多个参数，将参数作为文本输出到控制台。例如：
    
```cpp
import std;

int main() {
    int a = 123;
    std::println("The value of a = {}", a);
}
```

在这个程序中，`std::println` 函数接受了两个参数，第一个参数是一个字符串，第二个参数是一个整数。`std::println` 函数会将第一个参数中的 `{}` 替换为第二个参数的值，然后输出到控制台。

如果 `std::println` 有更多的参数，那么第二个参数会对应替换到第一个 `{}`，第三个参数会对应替换到第二个 `{}`，以此类推。

::: info {} 的作用
技术性地说 `{}` 是一个占位符，用来表示在这个位置输出一个参数。
这个占位符中可以包含格式化信息，例如 `{:h}` 表示输出十六进制整数，`{:b}` 表示输出二进制整数等。`{0:}`表示输出第一个参数，无论这个占位符是不是第一个出现的。

这个占位符的详细使用方法会在后续章节中介绍。
:::

这个程序的输出应该是：

```
The value of a = 123
```

在默认情况下，`int` 会被输出为十进制整数，`char` 会被输出为对应ACSII码的字符，`bool` 会被输出为 `true` 或 `false`。

现在，使用上之前实现的 `sqrt` 函数和循环语句，输出一些内容吧。

```cpp
import std;

int sqrt(int x) {
    int a = x;
    while (a * a > x) {
        a = (a + x / a) / 2;
    }
    return a;
}

int main() {
    for (int i = 1; i <= 10; i++) {
        std::println("The square root of {} is {}", i, sqrt(i));
    }
}
```

上面程序的输出应当是：

```
The square root of 1 is 1
The square root of 2 is 1
The square root of 3 is 1
The square root of 4 is 2
The square root of 5 is 2
The square root of 6 is 2
The square root of 7 is 2
The square root of 8 is 2
The square root of 9 is 3
The square root of 10 is 3

```

## 输入字符

::: important TODO: 补充内容
:::

```cpp
std::getchar();
```

```cpp
int c, result = 0;
while((c = std::getchar()) != '\n') {
    result = result * 10 + (c - '0');
}
std::println("The input number is {}", result);
```

```cpp
int result = 0;
while(true) {
    int c = std::getchar();
    if(c > '9' || c < '0') {
        break;
    }
    result = result * 10 + (c - '0');
}
std::println("The input number is {}", result);
```

## 输入多个整数并求和

::: important TODO: 补充内容
:::

```cpp
int result = 0; 
int sum = 0;
while(true) {
    int c = std::getchar();
    if(c == ' ' || c == ',') {
        sum += result;
        result = 0;
        continue;
    } else if(c > '9' || c < '0') {
        sum += result;
        break;
    }
    result = result * 10 + (c - '0');
}
```