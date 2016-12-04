title: git常用命令总结
date: 2016-12-03 16:00:30
tags:
- Git

categories:
- 总结
---


最近在开始写小论文，空暇时间想做些总结性的东东，那么就先写点关于git的常用命令的总结吧，方便自己也方便大家.....
PS: 虽然好像没人点进来瞅瞅过，没有SEO是硬伤.....
 <!--more-->

首先对Git仓库操作涉及的三个不同区域进行说明：
一个Git仓库下有三个不同的区域：
*Workspace(工作区)， Stage或者Index(暂存区)、Respository（仓库区）*
我们针对项目代码的更改操作都是在**工作区**进行的，通过执行`git add *`命令就把在**工作区**的改动提交到了**暂存区**，通过执行`git commit -m 'info about this commit'`就把已经存放在**暂存区**的改动给提交到了当前分支的**仓库区**
## 1.提交文件
```shell
$ git add * #添加当前目录中所有文件到暂存区
$ git commit -m [message] # 提交暂存区到仓库区
$ git remote add origin git@github.com:abcd/tmp.git  # 增加远程仓库到本地并明命名为origin
$ git push -u origin master # 推送此次修改，首次推送需要加上-u,之后推送就可以直接git push  origin master,origin是远程Git名字，这个可以自己定义，master是默认的分支，如果不在master分支提交需要写清楚分支名称

```
```shell
$ git add [file1] [file2] ... # 添加指定文件到暂存区
$ git add [dir] # 添加指定目录到暂存区，包括子目录
$ git add * # 添加当前目录的所有文件到暂存区

$ git add -p # 添加每个变化前，都会要求确认 对于同一个文件的多处变化，可以实现分次提交

$ git rm [file1] [file2] ...  # 感觉这条命令还是比较复杂的 下面详细说下
# 其作用：删除已经用`git commit`提交到仓库区中的文件并停止对其的跟踪，附带行为：
# 1.如果工作区对应的文件和当前已经提交到仓库区的文件保持一致 就直接也将工作区中的文件删除类似于`/bin/rm file1` 同时将此次删除操作放入暂存区
#如: 已经通过`git commit`将 文件改动后的file1文件提交到了仓库中，并且工作区此时也没有对其进行改动
#那么，通过`git rm file1` 就将仓库中的file1文件和本地工作区的文件都删除了，并且将删除操作放入了暂存区， 也就是说此时工作区的file1文件也没了（当前可以通过`git checkout` 命令进行恢复）
#2. 如果在工作区中对file1文件又进行了改动 导致（和仓库区不一致），此时有两种选择
#2.1 使用`-f` 选项 这会强制将暂存区还有工作区的file1文件删除 并将删除操作放入暂存区
#2.2 使用`--cached` 选项，这会删除仓库区中的文件，但会保留工作区的文件


$ git mv [file-original] [file-renamed] # 改名文件，并且将这个改名放入暂存区
$ git commit -m [message] # 提交暂存区到仓库区
$ git commit [file1] [file2] ... -m [message] # 提交暂存区的指定文件到仓库区
$ git commit -a # 提交工作区自上次commit之后的所有的变化，直接到仓库区
$ git commit -v # 提交时 在提交说明模板里显示所有diff信息


# 这个命令用的比较多，主要用于重写commit message 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息 # #但是如果你已经push过了，那么其历史最后一次，通过这个参数也不能修改了。
$ git commit --amend -m [message]

$ git commit --amend [file1] [file2] ... # 重做上一次commit，并包括指定文件的新变化

$ git push origin master# 提交更改到远程仓库
$ git pull origin master# 拉取远程更改到本地仓库默认自动合并
```
## 2.分支
```shell
$ git branch  # 列出所有本地分支
$ git branch -r # 列出所有远程分支
$ git branch -a # 列出所有本地分支和远程分支
$ git branch [branch-name] # 新建一个分支，但依然停留在当前分支
$ git checkout -b [branch] # 新建一个分支，并切换到该分支
$ git branch [branch] [commit] # 新建一个分支，指向指定commit
$ git branch --track [branch] [remote-branch] # 新建一个分支，与指定的远程分支建立追踪关系

$ git checkout [branch-name] # 切换到指定分支，并更新工作区
$ git checkout - # 切换到上一个分支

$ git branch --set-upstream [branch] [remote-branch]# 在现有分支与指定的远程分支之间建立追踪关系

$ git merge [branch] # 合并指定分支到当前分支，如果有冲突需要手动合并冲突（就是手动编辑文件保存咯），然后add,commit再提交

$ git cherry-pick [commit] # 选择一个commit，合并进当前分支

$ git branch -d [branch-name] # 删除分支

$ git push origin --delete [branch-name] # 删除远程分支
$ git branch -dr [remote/branch]
```

## 3.标签
标签的作用主要用于进行回退
```shell
$ git tag # 列出所有tag
$ git tag [tag] # 在当前commit新建一个tag
$ git tag [tag] [commit] # 在指定commit新建一个tag
$ git tag -d [tag] # 删除本地tag
$ git push origin :refs/tags/[tagName] # 删除远程tag
$ git show [tag] # 查看tag信息
$ git push [remote] [tag] # 提交指定tag
$ git push [remote] --tags # 提交所有tag
$ git checkout -b [branch] [tag] # 新建一个分支，指向某个tag

```
## 4. 撤销
如果你已经进行了N次的commit到本地的仓库，但是发现某个commit出错想撤销怎么办？

```shell
$ git checkout [file] # 恢复暂存区的指定文件到工作区
$ git checkout [commit] [file] # 恢复某个commit的指定文件到暂存区和工作区
$ git checkout . # 恢复暂存区的所有文件到工作区
$ git reset --hard HEAD^ # 回退到上一个版本，在Git中，用HEAD表示当前版本
$ git reset [file] # 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset --hard # 重置暂存区与工作区，与上一次commit保持一致

$ git reset [commit] # 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset --hard [commit] # 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --soft [commit]， #只重置HEAD


$ git revert [commit] # 新建一个commit，用来撤销指定commit 后者的所有变化都将被前者抵消，并且应用到当前分支

$ git stash # 暂时将未提交的变化移除，稍后再移入
$ git stash pop
```

## 5.查看文件信息
```shell
$ git log # 显示当前分支的版本历史
$ git log --stat # 显示commit历史，以及每次commit发生变更的文件
$ git log -S [keyword] # 搜索提交历史，根据关键词
$ git log [tag] HEAD --pretty=format:%s # 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --grep feature # 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件

$ git log --follow [file] # 显示某个文件的版本历史，包括文件改名
$ git whatchanged [file]

$ git log -p [file] # 显示指定文件相关的每一次diff

$ git log -5 --pretty --oneline # 显示过去5次提交

$ git shortlog -sn # 显示所有提交过的用户，按提交次数排序

#这个命令很棒啊！！
$ git blame [file] # 显示指定文件是什么人在什么时间修改过

$ git diff # 显示暂存区和工作区的差异
$ git diff --cached [file] # 显示暂存区和上一个commit的差异

$ git diff HEAD # 显示工作区与当前分支最新commit之间的差异

$ git diff [first-branch]...[second-branch] # 显示两次提交之间的差异

$ git diff --shortstat "@{0 day ago}" # 显示今天你写了多少行代码

$ git show [commit] # 显示某次提交的元数据和内容变化

$ git show --name-only [commit] # 显示某次提交发生变化的文件

$ git show [commit]:[filename] # 显示某次提交时，某个文件的内容
```
先就这样子吧.....
