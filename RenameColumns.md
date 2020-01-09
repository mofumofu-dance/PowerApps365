#はじめに
今回はとても短い投稿です。
リストやCollectionを使って、自分自身を参照したFilter, LookUpを行う場合(自己結合的な)や、似たような構造のリスト、コレクション同士をFilter、結合する場合には、どうしても列名の重複が気になります。

例えば、何らかのスタッフリストのようなものがあったとします。
そのスタッフリストにはスタッフのID、名前、上司のIDが含まれています。
この時スタッフリストを自己参照して、上司の名前を解決した表を作りたいとしましょう。
単純に考えれば、「リストに列を追加して、その条件として、リストのIDがManagerIDと一致した行をとる」とすればよいです。(下図)
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/202779/f33b2790-5d63-2386-0abd-ae7272791719.png)

しかし、結果としてはManagerのTitleは解決できず、エラーになってしまいます。

それもそのはず。赤く囲んだ部分だけみれば、「自分のIDと上司のIDが一致した行」になっているからです。
本来はLookUpの外側のCol1にあるManagerIDと、LookUp内のCol1のIDが一致した行をとらなければなりません。

#解決方法
解決方法は単純です。いずれかの列名を**RenameColumns**関数で変更してあげましょう。(RenameColumnsにかんしては[こちら](https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/functions/function-table-shaping))
この場合でいえば、LookUp内のCol1の列名をID,ManagerIDとも変えれば解決します。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/202779/6e455da4-d315-a7e1-9e71-d48b3bcdc55e.png)
変更後の名前は何でもよいのですが、rをつけました。これによって、LookUp関数内の、**ManagerID**はLookUp関数の外側から与えられる列の値。そしてrIDはLookUp関数内の元ID という風に一意性を持たせることができました。

# おわり
RenameColumnsは自己結合や外積のような場合にとても有効です。また、参照する・されるリスト間で同じ名前の列がある場合にも、列名の一意性を担保してあげるという観点から重要になります。
ぜひ簡単な例で試してみてください。
