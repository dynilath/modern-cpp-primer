---
title: 1.1 Hello, World!
---

学习一门编程语言，通常从让程序在屏幕上打印一行文字开始。这一节我们写出第一个 C++ 程序，把它编译成可执行文件并运行；同时把之后所有章节都要用到的编译环境准备好。

## 为什么使用 xclang

C++ 是一门编译型语言：写好的源代码要先交给编译器翻译成机器指令，才能运行。因此，写第一行代码之前，先要有一个能用的编译器。

本书统一使用 **xclang**。它是一个打包好的 C++ 工具链，一个压缩包里同时包含了 Clang 编译器、libc++ 标准库、链接器，以及 Windows 需要的系统头文件和静态运行库，解压就能用。选择它有三个原因：

- **不需要另外安装开发环境**。不需要 Visual Studio，也不需要 MSYS2、MinGW 之类的发行包。
- **支持 `import std`**。本书从第一个程序开始，就用 C++20 引入的模块来使用标准库；xclang 自带标准库模块的源码，可以自己编译出来。
- **产物是单个可执行文件**。标准库静态链接，生成的 `.exe` 只依赖 Windows 自带的系统库，复制到别的电脑上也能直接运行。

:::note[关于 xclang]
xclang 由 [clice](https://github.com/clice-io) 项目发布，基于 LLVM 23，使用 Apache-2.0 许可证。本书写作时使用的版本是 23.1.3.3。
:::

## 安装 xclang

### 下载

打开 [xclang 的 Releases 页面](https://github.com/clice-io/xclang/releases)，下载文件名形如 `xclang-23.1.3.3-x86_64-w64-mingw32.tar.xz` 的压缩包，大约 96MB。本书假设读者使用的是 64 位 Windows 系统。如果页面上已经有更新的版本，下载最新的即可：后文的命令与版本号无关，只有压缩包文件名里的版本号会不同。

:::note[其他操作系统]
xclang 为每个操作系统都提供了对应的压缩包：macOS 上是 `aarch64-apple-darwin` 或 `x86_64-apple-darwin`，Linux 上是 `x86_64-unknown-linux-gnu` 或 `aarch64-unknown-linux-gnu`。安装和使用方法与本节相同，只需把路径换成解压后的位置，运行程序时用 `./hello` 而不是 `.\hello`。
:::

### 解压

Windows 从 10 版本 1803 起自带 `tar` 命令；如果系统里没有，也可以用 7-Zip 等解压工具，`.tar.xz` 需要解压两次（先 xz，再 tar）。在压缩包所在的目录（通常是「下载」文件夹）打开 PowerShell，执行：

```powershell
cd $HOME\Downloads
tar -xf .\xclang-23.1.3.3-x86_64-w64-mingw32.tar.xz -C C:\
```

解压完成后，工具链就在 `C:\xclang` 目录下。这个目录不要随意移动，后文的命令都假设它在这里；如果要换位置，把所有命令里的路径一起改掉即可。

### 加入 PATH

为了让编译器在任何目录都能直接使用，需要把 `C:\xclang\bin` 加入 `PATH` 环境变量：

1. 在开始菜单搜索「环境变量」，打开「编辑账户的环境变量」；
2. 在「用户变量」中选中 `Path`，点击「编辑」；
3. 点击「新建」，填入 `C:\xclang\bin`，然后一路确定。

环境变量修改后，**已经打开的终端不会生效**，需要重新打开一个。然后执行：

```powershell
clang++ --version
```

应当看到类似下面的输出：

```
clang version 23.1.3 (https://github.com/llvm/llvm-project 0d261d1ca552c95a8f007e061c787ac7132fbcbc)
Target: x86_64-w64-windows-gnu
Thread model: posix
InstalledDir: C:\xclang\bin
Configuration file: C:\xclang\bin\x86_64-w64-windows-gnu.cfg
```

看到 `clang version` 就说明安装成功了。如果显示的版本号不是 23.1.3，说明系统里还有另一个 `clang++`，并且它的目录在 `PATH` 中更靠前，参见文末的「常见问题」。

:::tip[不想改环境变量？]
也可以跳过这一步，之后所有命令里的 `clang++` 都换成完整路径 `C:\xclang\bin\clang++`。只是命令会比较长。
:::

### 编译标准库模块

`import std;` 并不是一条普通的声明：它要求编译器手里有一份**已经编译好的** `std` 模块。xclang 的压缩包里带的是模块的源码，所以需要先编译一次（大约 2 秒），产物之后可以一直复用。

```powershell
mkdir C:\xclang\std
clang++ -std=c++23 -Wno-reserved-module-identifier --precompile C:\xclang\x86_64-w64-mingw32\share\libc++\v1\std.cppm -o C:\xclang\std\std.pcm
```

执行完，`C:\xclang\std\std.pcm` 会是一个大约 36MB 的文件。这条命令的各个部分：

- `--precompile`：只做预编译，把模块接口（`.cppm` 文件）转换成本节后面要用的模块文件（`.pcm` 文件）；
- `-std=c++23`：使用 C++23 标准。这个选项必须和之后编译程序时**完全一致**，否则模块无法加载；
- `-Wno-reserved-module-identifier`：关掉「`std` 是保留的模块名」这条警告。`std` 确实是标准保留的名字，这条警告是标准库自己的源码触发的，编译时忽略即可；
- 最后那个长路径是工具链里 libc++ 的模块源码，位于 `<工具链>/<目标平台>/share/libc++/v1/` 下。如果路径对不上（比如换了平台或版本），可以执行 `clang++ -print-library-module-manifest-path` 打印模块清单的位置，模块源码就在清单旁边的 `../share/libc++/v1/` 目录里。

为什么不直接附带一份编译好的模块文件？因为模块文件与编译器的版本、编译选项严格绑定，换一个版本或者换一组选项就无法加载。让每个使用者按自己的环境编译一次，反而最稳妥。

## 第一个程序

新建一个文件夹用来放练习代码，例如 `C:\cpp`。在其中新建文本文件 `hello.cpp`，写入下面的内容：

```cpp
import std;

int main() {
    std::println("Hello, World!");
}
```

注意文件名后缀是 `.cpp`，不是 `.txt`。可以用任意文本编辑器编写，用记事本也可以，但建议使用支持 C++ 语法高亮的编辑器。

## 编译并运行

在 `hello.cpp` 所在的目录打开控制台：在资源管理器的地址栏中输入 `powershell` 然后回车，就会在当前目录打开 PowerShell。执行：

```powershell
clang++ -std=c++23 -fprebuilt-module-path=C:\xclang\std hello.cpp -o hello
```

这条命令的含义：

- `clang++`：编译器；
- `-std=c++23`：使用 C++23 标准（要和编译 `std.pcm` 时一致）；
- `-fprebuilt-module-path=C:\xclang\std`：告诉编译器去哪里找已经编译好的模块，也就是上一步生成的 `std.pcm`；
- `hello.cpp`：要编译的源文件；
- `-o hello`：指定输出文件的名字。Windows 上会自动补上 `.exe` 后缀，所以产物是 `hello.exe`。

编译完成后，运行这个程序：

```powershell
.\hello
```

屏幕上应当输出：

```
Hello, World!
```

本书后面所有示例程序，都可以用同样的命令编译运行，只需要把 `hello.cpp` 换成对应的文件名。

## 这个程序做了什么

- `import std;` 导入 C++ 标准库。标准库由许多部分组成（输入输出、字符串、容器……），这一行把它们全部导入当前文件。旧式的写法要在文件开头写一长串 `#include`，模块是 C++20 引入的替代方案：导入一次即可使用，编译也更快。
- `int main() { ... }` 定义了 `main` 函数。每个 C++ 程序都从 `main` 开始执行；`int` 表示它返回一个整数，`{}` 中是这个函数要做的事。
- `std::println("Hello, World!");` 调用标准库里的 `println` 函数，输出一行文字并在末尾换行。`std::` 表示 `println` 属于标准库的命名空间 `std`，这样就不会和程序员自己定义的、或者别的库里的同名函数混淆。

## 常见问题

- **`'clang++' 不是内部或外部命令`**：`PATH` 没有配置好，或者配置后没有重新打开终端。
- **`clang++ --version` 显示的版本不是 23.1.3**：系统里还装着别的 Clang，并且它的目录在 `PATH` 里更靠前。最省事的办法是改用完整路径 `C:\xclang\bin\clang++`；也可以把旧 Clang 的目录从 `PATH` 中删掉，或者把 `C:\xclang\bin` 放到它的前面。
- **`fatal error: module 'std' not found`**：编译时没有加 `-fprebuilt-module-path`，或者 `std.pcm` 没有生成成功。
- **`configuration mismatch` 或 `C++23 was enabled in precompiled file`**：编译程序和编译 `std.pcm` 时使用的 `-std` 不一致。把两处都改成 `-std=c++23`，并重新编译一次 `std.pcm`。
- **升级 xclang 后突然编译失败**：模块文件与编译器的版本绑定，换了工具链之后需要重新编译一次 `std.pcm`。
- **输出中文时出现乱码**：这是 Windows 控制台默认代码页的问题，和程序本身无关，后续章节会再讨论。

下一节开始，我们从 C++ 程序最基本的构成单位——标识符和关键字——看起。
