title: 外部CSS样式的读取和设定
date: 2014-12-30 20:34:19
tags:
- CSS
categories: 
- CSS
---

好久没有写博客了，是不是太懒了我?

最近练习原生javascript时，其中有一次需要获取外部CSS样式文件中的相应元素的样式。不熟悉CSS样式的童鞋可能会尝试通过使用如document.getElementById("id").style.color来获取属性中设置的样式。<!--more -->但这种方法只会获取元素style属性中设置的CSS样式，如果style中没有设置相关的样式,如color,那么document.getElementById("id").style方法的返回值就是空。也就是说不能通过这种方法来获得外部样式表中设置的样式.那怎样才能夺取外部样式呢?
如果要获取外部样式表中的样式,则需要用到window对象的getComputedStyle()方法。代码写法：getComputedStyle(id,null).color.但是可能会出现兼容问题，即在ie中可能不好使。两者兼容的写法为：
window.getComputedStyle?window.getComputedStyle(id,null).backgroundColor:id.currentStyle["backgroundColor"];
<p>是不是很简单呢,主要为了加深记忆，顺便练手了~</p> 