---
title:  2.3 初识语句
---

**语句** 是 **依序执行** 的 C++ 程序片段。当多个语句被排列在一起时，它们会按照从前往后的顺序依次执行。

在编译器处理语句的时候，换行符如同空格一样，当做空白字符处理。因此，换行符不会影响语句的语义。

## 表达式语句

**表达式语句**简单来说就是一个[表达式](./expression.md)后面跟着一个分号 `;`。例如：

```cpp
a = 1;
int b = a + 1;
int c = a * b;
a = b, b = c, c = a;
```

表达式语句的执行就是计算表达式的值，然后抛弃这个值。表达式语句的主要作用是表达式的副作用，例如利用赋值表达式修改对象的值。

如果表达式语句的表达式是空的，那么这个表达式语句也称为**空语句**。例如：

```cpp
;
```

:::info 不完整的表达式
一个不完整的，或者说不符合语法规则的表达式，不能组成表达式语句，例如：
```cpp
a = ;
```
一般而言，编译器会检测到这种错误，并给出错误提示。
:::

## 声明语句

在前面的章节中，我们已经大概介绍了声明的形式。现在我们可以把声明称为**声明语句**。

在[声明](./declaration.md)中，介绍了声明语句的形式是：`类型 标识符;` 或者 `类型 标识符 初始化器;`。

在[表达式](./expression.md#进一步理解初始化)中，介绍了声明语句的形式是：`类型 初始化声明, 初始化声明, 初始化声明 ... ;`。

下面是一些声明语句的例子：

```cpp
int a; // 声明并创建一个整数类型的对象 a
int b = 42; // 声明并创建一个整数类型的对象 b，并初始化为整数值 42
int c, d = 1, e = 2; // 声明并创建整数类型的对象 c、d、e，并初始化 d 为 1，e 为 2
```

## 复合语句

**复合语句**是由花括号 `{}` 包围的语句序列。复合语句可以包含任意数量的语句，也可以嵌套在其他复合语句中。

我们可以简单地为[表达式语句](#表达式语句)的例子添加花括号，就得到了复合语句的例子：

```cpp
{
    a = 1;
    int b = a + 1;
    int c = a * b;
    a = b, b = c, c = a;
}
```
这里，`{}` 包围的部分就是一个复合语句，里面包含了四个语句：`a = 1;`、`int b = a + 1;`、`int c = a * b;`、`a = b, b = c, c = a;`。

复合语句里面可以包含所有种类的语句，包括带标号语句、表达式语句、复合语句等。

在复合语句内，只能出现语句序列，而如下的代码是错误的：
```cpp
{
    int a = 1;
    b = 3
}
```
这里，`b = 3` 没有 `;` 结尾，只是一个表达式而非语句，编译器一般会报错。

## 带标号语句

**带标号语句**的形式是 `label statement`。这里 `label` 是一个标号，`statement` 是一个语句。标号的结尾总是一个冒号 `:`，标号后面的语句可以是任意一种语句。

标号语句的执行就是执行标号后面的语句，前面的标号在这时没有实际作用。

标号的形式可以是：
- 标识符跟着一个冒号 `:`，例如 `label:`
- `case value:`，其中 `value` 是一个表达式
- `default:`

```cpp
label: a = b, c = 3;
good: {
    a = 1;
    b = 2;
}
```

标号语句会用于 `switch` 语句中，用来表达程序的跳转目标。

::: info
`case` 标号后面的表达式技术上来说是一个常量表达式，这个概念会在后续章节中介绍。在目前的阶段，读者可以暂时认为 `case` 后面的 `value` 必须是一个字面量的整数。
:::

## 选择语句

在关键字一节中提到了 `if`、`break`、`else`、`switch` 等关键字，这些关键字用于构造选择语句。

### `if` 语句

`if` 语句的形式是：

```cpp
if (condition) statement
```
或者
```cpp
if (condition) statement
else statement
```

这里 `condition` 是一个表达式，用来表达选择条件，`statement` 是一个语句，用来表达选中时执行的操作。包围 `condition` 的括号是 `if` 语句的一部分，不可省略。

::: tip
注意，表达式语句结尾的 `;` 是表达式语句的一部分。当在 `if` 语句中使用表达式语句时，结尾的 `;` 不要忘记。
```cpp
if (a > b) max = a;
//                ^ 这里不要忘记分号
```
:::

::: tip
有时候你需要将一个[相等表达式](./expression.md#相等表达式)作为 `condition`，例如：
```cpp
if (a == b) equal = true;
```
初学者会经常错误地将 `a == b` 写成 `a = b`，但 `a = b` 是一个[赋值表达式](./expression.md#赋值表达式)，将 `b` 赋值给 `a`，并且返回 `a` 的值。这样，并不会做 `a` 和 `b` 是否相等的判断。
:::

`if` 语句的执行流程是：
1. 计算 `condition` 的值。
2. 将 `condition` 的值转换为 `bool`。
3. 如果上一步的结果为 `true`，则执行 `statement`；否则，执行 `else` 后面的 `statement`。

举例而言，`if` 语句可以像这样使用：
```cpp
if (a > b) max = a;
else max = b;
```
在上面的代码中，如果 `a` 大于 `b`，则将 `a` 的值赋给 `max`；否则，将 `b` 的值赋给 `max`。

此外，在 `if` 的 `condition` 之前，可以加入一个初始化语句，例如：
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
在这里，先声明并初始化了一个整数类型的对象 `a`，然后执行了后面的 `if` 语句。

### `switch` 语句

`switch` 语句的形式是：

```cpp
switch (condtion) statement
```

这里 `condtion` 是一个表达式，用来表达选择条件，`statement` 是语句，表示 `switch` 需要控制执行的语句。

你可能会奇怪，这后面只有一个 `statement`，这个选择语句在选择什么呢？实际上，`switch` 语句规定了，在 `switch` 语句中的任何一个语句，可以使用 `case` 或者 `default` 标号，组成标号语句。

这意味着 `switch` 后面的 `statement` 往往是一个复合语句，里面包含了多个 `case` 标号语句和 `default` 标号语句。

举例而言，`switch` 语句可以像这样使用：
```cpp
switch (a) {
    case 1: as = 1; break;
    case 2: as = 4; break;
    case 3: as = 9; break;
    default: as = 0;
}
```
在这里，`switch` 语句的 `statement` 是一个复合语句，里面包含了三个 `case` 标号语句和一个 `default` 标号语句。当 `a` 的值为 `1` 时，执行 `as = 1;`，然后结束 `switch` 语句；当 `a` 的值为 `2` 时，执行 `as = 4;`，然后结束 `switch` 语句；当 `a` 的值为 `3` 时，执行 `as = 9;`，然后结束 `switch` 语句；当 `a` 的值不是 `1`、`2`、`3` 时，执行 `as = 0;`，然后我们来到了这个 `switch` 语句的结尾。

`switch` 语句的执行过程是：
1. 计算 `condtion` 的值。
2. 比较 `condtion` 的值和 `switch` 语句中 `case` 标号语句后面的 `value` 的值。
   - 如果存在 `condtion` 的值和某个 `case` 后面的 `value` 的值相等，则从这个 `case` 语句开始依次执行。
   - 如果找不到 `condtion` 的值和任何 `case` 后面的 `value` 的值相等，则从 `default` 标号语句开始执行。
3. 如果执行到 `break;` 语句，则结束 `switch` 语句的执行。

这里， `break;` 也是一种语句，称为**跳转语句**，它用于多种语句结构中，`switch` 语句中的 `break;` 用于结束 `switch` 语句的执行。

此外，在 `switch` 的 `condition` 之前，可以加入一个初始化语句，例如：
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
这里，先声明并初始化了一个整数类型的对象 `b`，然后执行了后面的 `switch` 语句。

### 多层选择结构

`if` 语句中出现的 `statement` 当然也可以是 `if` 语句。多个 `if` 语句可以嵌套在一起，形成如下的多层选择结构：

```cpp
if (condition1) 
    if (condition2) statement2
    else statement2_else
else 
    if (condition3) statement3
    else 
        if (condition4) statement4
        else statement4
```

在多个条件并列时，我们也可以把连用的 `else` 和 `if` 理解成一个整体，称为 `else if`，这样可以使代码更加简洁：

```cpp
if (condition1) statement1
else if (condition2) statement2
else if (condition3) statement3
else statement4
```

::: tip
上面的代码中，通过缩进来表示语句的层次，这是一种常见的代码风格，可以使代码更加清晰易读。

此外，上面在 `if` 语句中直接使用另一个 `if` 语句的方式并不方便阅读，可以使用花括号 `{}` 构成复合语句来明确地表示 `if` 语句的范围，这样可以使代码更加清晰。例如：
    
```cpp
if (condition1) {
    if (condition2) statement2
    else statement2_else
} else {
    /* ... */
}
```
这里，`if` 后面的花括号 `{}` 将 `if` 语句构成了复合语句。虽然从程序的角度来看，这两种写法是等价的，但是后者对于人而言更加清晰。
:::

对于`switch`语句，在常见的设计中，我们希望 `switch` 语句在执行完一个 `case` 标号语句后就结束。这时我们需要在每个 `case` 标号语句后面加上 `break;` 语句，就像前面的例子那样。但有的时候我们需要作出更复杂的选择，例如：

```cpp
switch(a) {
    case 1: case 2: case 3: result = 1; 
    // 上面这里是一个标号语句套着标号语句，再套着标号语句，再套着赋值表达式语句。
    default:
    if(a % 7) result = 2;
    else if(a % 5) case 4: result = 3;
    else result = 0;
}
```

在这个例子中：
- 当 `a` 的值为 `1`、`2`、`3` 时，`result` 的值为 `1`
- 当 `a` 的值为 `4` 时，`result` 的值为 `3`
- 当 `a` 的值不是 `1`、`2`、`3` 时，如果 `a` 除以 `7` 的余数不为 `0`，`result` 的值为 `2`
  - 否则，如果 `a` 除以 `5` 的余数不为 `0`，`result` 的值为 `3`；
  - 否则，`result` 的值为 `0`。

此外，你可以在 `switch` 语句中使用 `switch` 语句。这时，`case` 和 `default` 标号语句，以及 `break;` 跳转语句仅关联到往上级最近的 `switch` 语句。例如

```cpp
switch(a) {
    case 1: 
        switch(b) {
            case 2: result = 1; break;
            case 3: result = 2; break;
            default: result = 0;
        }
        break;
    case 4: result = 3; break;
    default: result = 0;
}
```
当 `a` 的值为 `3` 的时候，这里不会执行 `result = 2;`，而是执行 `result = 0;`（最后的 `default` 标号语句）。

::: tip
这样的设计会带来显著的可读性问题，程序员应当选择适合当前开发情况的代码。
:::

## 循环语句

循环语句有三种，包括 `while`、`do while` 和 `for`。

### `while` 语句

`while` 语句的形式是：

```cpp
while (condition) statement
```
这里 `condition` 是一个表达式，用来表达循环条件，`statement` 是一个语句，表示循环体。

`while` 语句的执行流程是：
1. 计算 `condition` 表达式的值。将 `condition` 的值转换为 `bool`.
2. 如果上一步的结果为 `true`，则执行 `statement`，然后回到第一步；否则，结束 `while` 语句的执行。

举例而言，`while` 语句可以像这样使用：
```cpp
int a = 0, sum = 0;
while (a < 10) {
    sum += a;
    a += 1;
}
// 执行到这里时，a 的值为 10，sum 的值为 45
```

此外，如果在 `while` 语句中执行到 `break;` 语句，那么 `while` 语句的执行会结束。如果执行到 `continue;` 语句，那么 `while` 语句的执行会跳过本次循环的剩余部分，直接进入下一次循环（回到上述执行流程的第一步，即再次计算 `condition` 的值 ）。

这里，`break;` 和 `continue;` 都是**跳转语句**。

### `do while` 语句

`do while` 语句的形式是：

```cpp
do statement while (condition);
```
注意，在 `while (condition)` 后面有一个分号 `;`。

这里 `condition` 是一个表达式，用来表达循环条件，`statement` 是一个语句，表示循环体。

`do while` 语句和 `while` 语句很像，不同之处在于 `do while` 语句会先执行 `statement`，然后再判断 `condition` 的值。因此，`do while` 语句至少会执行一次 `statement`。

具体而言，`do while` 语句的执行流程是：
1. 执行 `statement`。
2. 计算 `condition` 表达式的值。将 `condition` 的值转换为 `bool`。
3. 如果上一步的结果为 `true`，则回到第一步；否则，结束 `do while` 语句的执行。

同样的，可以在 `do while` 语句中使用 `break;` 和 `continue;` 语句。`break;` 语句会结束 `do while` 语句的执行。
区别于 `while` 语句，`do while` 语句的 `condition` 计算在循环的末尾，在 `do while` 中执行 `continue;` 会跳转到 `condition` 的计算部分，判断是否继续循环。

下面是一个 `do while` 语句的例子：
```cpp
int a = 0;
do {
    if(b % 2) {
        a += b;
        break;
    }

    if(c < 10) {
        a = c;
        break;
    }
} while (false);
```
这里使用了 `do ... while(false)` 这样的写法，以体现出和 `while` 的区别。

在这个程序里，如果 `b` 为奇数，那么会将 `b` 赋值给 `a`；如果 `b` 为偶数，且 `c` 小于 `10`，那么 `a` 的值为 `c`；否则，`a` 的值为 `0`。由于 `condition` 为 `false`，所以这个 `do while` 里面的语句只会执行一次。

:::tip
这种 `do ... while(false)` 的写法在实际开发中会用在 `switch` 无法处理的多条件选择中。
:::

### `for` 语句

`for` 语句的形式是：

```cpp
for (init condition; loop) statement
```

这里 `init` 是初始化语句，`condition` 是循环条件表达式，`loop` 是循环后表达式，`statement` 是循环体语句。

这里，初始化语句可以是一个表达式语句或者一个声明语句。注意，这两种语句的末尾都有一个分号 `;`。这使得实际情况中，`for` 语句看起来会像是 `for( ... ; ... ; ...)` 这样，有两个分号的形式。

`for` 语句的执行流程是：
1. 执行 `init` 语句。
2. 计算 `condition` 表达式的值。将 `condition` 的值转换为 `bool`。
3. 如果上一步的结果为 `true`，则执行 `statement`，然后执行 `loop`，再回到第二步；否则，结束 `for` 语句的执行。

举例而言，`for` 语句可以像这样使用：
```cpp
int sum = 0;
for (int i = 0; i < 10; i += 1) {
    sum += i;
}
// 执行到这里时，sum 的值为 45
```

`for` 语句中的 `condition` 可以为空，这时 `for` 语句的执行流程是：
1. 执行 `init` 语句。
2. 执行 `statement`。然后执行 `loop`，再回到第二步。

这种情况下，`for` 语句会一直执行下去，必须通过内部的 `break;` 语句来结束循环。例如：

```cpp
int sum = 1;
for(;;) { // 这里 init、condition、loop 都为空，在初始化语句执行和循环体执行后，都不会做任何事
    sum = sum * 2;
    if(sum > 100) break;
}
```
这里，`sum` 的值会一直翻倍，直到 `sum` 的值大于 `100` 时，执行 `break;` 语句，结束 `for` 语句的执行。

### 平凡空循环

如果一个循环语句的循环体是空语句、或者是空的复合语句（对于 `for` 还需要循环后表达式为空），这样的循环语句在每次循环只会执行循环条件的计算。

而如果循环条件计算总是得到`true`，这会导致循环语句成为一个**平凡空循环**。例如：

```cpp
while (true);
for(;;);
do{} while(10 > 0);
```

这样的平凡空循环会被替换为一次对`std::this_thread::yield`的调用。这个调用的具体作用会在后续章节中介绍，目前读者只需要理解为，这使得平凡空循环看起来就是让程序“暂停”了一下，而不是无限循环卡死在这里。