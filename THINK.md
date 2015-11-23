#0.1.0
0.1.0版本是在原来的BakeWeb框架上改的

想法很简单

让model层变成全局域的，新增controller的onServerCreate与onServerDestroy接口

从而实现服务器渲染，与model层的缓存

实现还算比较成功

但问题有如下几点

1.让controller层创建model，而且每个model与model的名字必须一一对应，不然序列化model时会出错，这个限制有点狠

2.router设置不灵活，像header，footer这种每个页面都有的数据，用现在的做法每次都是重新渲染，footer就不能做切换动画了。

3.router仍未达成按需异步加载的能力。例如现在只打开a页面，那么应该只拉a页面的代码。当用户切换到b页面时，才需要拉b页面的代码，而不需要首次打开就是一股脑的全部拉，造成首屏时间慢。