# HTTP

- `http` 是我们前后台交互的时候的传输协议（即超文本传输协议）

## HTTP 的工作流程

1. 和服务器建立链接
2. 建立链接后，发送一个请求给服务器（请求）
3. 服务器接受到请求以后进行相应的处理并给出一个回应（响应）
4. 断开于服务器的链接


### 和服务器建立链接

- 怎么和服务器建立链接呢？

- 需要保证客户端的接受和发送正常，服务器端的接受和发送正常

- 这里就涉及到一个东西叫做 `TCP/IP` 协议

- 建立链接的主要步骤叫做 `三次握手`

  1. 客户端发送一个消息给到服务端

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     ```

  2. 服务端回给客户端一个消息

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     	客户端知道了 客户端可以正常发送消息
     	客户端知道了 客户端可以正常接受消息
     	客户端知道了 服务端可以正常接受消息
     	客户端知道了 服务端可以正常发送消息
     ```

  3. 客户端再回给服务端一个消息

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     	客户端知道了 客户端可以正常发送消息
     	客户端知道了 客户端可以正常接受消息
     	客户端知道了 服务端可以正常接受消息
     	客户端知道了 服务端可以正常发送消息
     	服务端知道了 服务端可以正常发送消息
     	服务端知道了 客户端可以正常接受消息
     ```

- 至此，依照 `TCP/IP` 协议的建立链接就建立好了

- 双方都知道双方可以正常收发消息

- 就可以进入到第二步，通讯了



### 发送一个请求

- 建立完链接以后就是发送请求的过程

- 我们的每一个请求都要把我们的所有信息都包含请求

- 每一个请求都会有一个 `请求报文`

- 在 `请求报文` 中会包含我们所有的请求信息（也就是我们要和服务端说的话都在里面）

- 我们的请求报文中会包含几个东西

  1. 请求行

    ```shell
     POST /user HTTP/1.1
     # POST 请求方式
     # /user 请求URL（不包含域名）
     # HTTP/1.1 请求协议版本
    ```

  2. 请求头（请求头都是键值对的形式出现的）

    ```shell
        user-agent: Mozilla/5.0 # 产生请求的浏览器信息
        accept: application/json # 表示客户端希望接受的数据类型
        Content-Type: application/x-www-form-urlencoded # 客户端发送的实体数据格式
        Host: 127.0.0.1 # 请求的主机名（IP）
    ```

  3. 请求空行（请求头和请求主体之间要留一个空白行）

     ```shell
     # 就是一个空行
     ```

  4. 请求体（本次请求携带的数据）

     ```shell
     # GET 请求是没有请求体数据的
     # POST 请求才有请求体数据
     ```

- 接下来看一个完整的请求报文

  ```shell
  POST /user HTTP/1.1      # 请求行
  Host: www.user.com
  Content-Type: application/x-www-form-urlencoded
  accept: application/json
  User-agent: Mozilla/5.0.     # 以上是首部
  #（此处必须有一空行）  # 空行分割header和请求内容 
  name=world   # 请求体
  ```

  ```shell
  GET /user HTTP/1.1      # 请求行
  Host: www.user.com
  Content-Type: application/x-www-form-urlencoded
  accept: application/json
  User-agent: Mozilla/5.0.     # 以上是首部
  #（此处必须有一空行）  # 空行分割header和请求内容 
  ```
  

### 接受一个响应

- 客户端的请求发送到服务端以后

- 服务端进行对应的处理

- 会给我们返回一个响应

- 每一个响应都会有一个 `响应报文`

- 在 `响应报文` 中会包含我们所有的响应信息（也就是服务端在接受到客户端请求以后，给我们的回信）

- 我们的 `响应报文` 中会包含几个信息

  1. 状态行

     ```shell
     HTTP/1.1 200 OK
     # HTTP/1.1 服务器使用的 HTTP 协议版本
     # 200 响应状态码
     # OK 对响应状态码的简单解释
     ```

  2. 响应头

     ```shell
     Date: Jan, 14 Aug 2019 12:42:30 GMT # 服务器时间
     Server: Apache/2.4.23 (Win32) OpenSSL/1.0.2j PHP/5.4.45 # 服务器类型
     Content-Type: text/html # 服务端给客户端的数据类型
     Content-Length: 11 # 服务端给客户端的数据长度
     ```

  3. 响应体

     ```shell
     hello world
     # 服务端给客户端的响应数据
     ```



### 断开于服务端的链接

- 之前我们的建立链接是基于 `TCP/IP` 协议的 `三次握手`
- 我们的断开链接是基于 `TCP/IP` 协议的 `四次挥手`
  1. 客户端发送一个我要断开的消息给服务端
  2. 服务端接受到以后发送一个消息告诉客户端我已经进入关闭等待状态
  3. 服务端再次发送一个消息告诉客户端，这个是我的最后一次消息给你，当我再接受到消息的时候就会关闭
  4. 客户端接受到服务端的消息以后，告诉服务器，我已经关闭，这个是给你的最后一个消息



### 完成一个 HTTP 请求

- 至此，一个 HTTP 请求就完整的完成了
- 一个 HTTP 请求必须要包含的四个步骤就是
  1. 建立链接
  2. 发送请求
  3. 接受响应
  4. 断开链接
- 在一个 HTTP 请求中，请求的部分有请求报文，接受响应的部分有响应报文
- 请求报文包含
  1. 请求行
  2. 请求头
  3. 请求空行
  4. 请求体
- 响应报文
  1. 状态行
  2. 响应头
  3. 响应体

