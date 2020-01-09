# はじめに
Power Appsでアプリを作成していると、日付の入力・選択にDatePickerコントロールを利用することがあります。
このDatePickerコントロール、カレンダーが必要ない場面では微妙に使いにくい印象を受けます。特に月を大きく変更するような日付選択、年の異なる日付選択をする場合です。
これらの課題は、しばしばドロップダウンで年・月・日をそれぞれ選択させることで解決したり、テキスト入力にyyyymmddの形式で入力させて、バリデーション というパターンで対応されます。

今回はギャラリーとボタンを組み合わせて、ちょっときれいな日付選択コントロールの作成方法を紹介します。


# 作り方
## 食材

| 材料  |  数 | 用途|
|---|---|---|
| ボタン  | 3  | 年・月・日の表示＋ギャラリーの表示トリガー
| ギャラリー  | 3  |年・月・日のアイテム表示・選択用|
| ギャラリー内ボタン  | 各1  | 数字表示＆年月日選択用|
|日付変数|1|選択日付用|
|Boolean変数|3|ギャラリーの表示切り替え|

## 準備
初期の選択日付はあってもなくてもよいのですが、ここでは簡単のためにToday()を使って初期選択日付を設定しておきます。

```App.OnStart
Set(dateSelected,Today())
```

## 年 選択
年の選択は比較的簡単です。
ボタンをスクリーンに追加して、このボタンに年を表示、また年変更用のギャラリーを表示させる処理を記載します。

```btnDispYear.Text
Year(dateSelected)
```
```btnDispYear.OnSelect
UpdateContext({visGalYear:true});
```
次に、スクリーンに縦型ギャラリーを追加し、ボタンをギャラリー内に追加します。
ギャラリーのItemsプロパティには選択範囲の年を頑張って入れます。

```galYear.Items
[2020,2019,2018,2017,2016]
```
こんな感じです。
ギャラリーの表示を変数を用いて切り替えたいので、Visibleプロパティに表示制御用の変数を設定します。

```galYear.Visible
visGalYear
```

次にギャラリー内のボタンですが、Textプロパティにはギャラリーの各アイテムを表示させます。

```btnYearSelect.Text
ThisItem.Value
```

ボタンをクリックしたときのアクションを設定します。
ボタンをクリックしたら、選択日付の『年』部分だけを入れ替える処理をします。また、選択したらギャラリーを非表示にしたいので、表示制御用の変数更新もしておきます。

```btnYearSelect.OnSelect
Set(dateSelected,
Date(ThisItem.Value, Month(dateSelected),Day(dateSelected)));
UpdateContext({visGalYear:false});
```
これで年の選択部分ができました。
実際動作させると以下のようになります。
![out1.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/202779/3a6c4b9c-77d4-22b4-381e-0925f99cf827.gif)

## 月 選択
月の選択も年とほとんど同じです。
選択月を表示するためのボタン、変更用のギャラリーを追加します。

```btnDispMonth.Text
Upper(Text(dateSelected,"mmm"))
```
```btnDispMonth.OnSelect
UpdateContext({visGalMonth:true});
```
ここは趣味というか、月であることがわかりやすいように、表示をJAN, FEB,MARなどの英語表記にしています。特に必要ない場合には```Month(dateSelected)```を代わりに設定してください。

月変更用のギャラリーのプロパティは以下の通りです。

```galMonth.Items
[1,2,3,4,5,6,7,8,9,10,11,12]
```
```galMonth.Visible
visGalMonth
```

ギャラリー内のボタンの表示も、選択月と合わせておきましょう。

```btnMonthSelect.Text
Upper(Text(Date(2000,ThisItem.Value,1),"mmm"))
```
Text関数でmmmを使って月を英語表記するには入力に日付型を求められるので、フェイクで、2000年X月1日を設定しています。

ボタンをクリックしたときのアクションは、今度は選択日付の『月』部分だけを入れ替えます。

```btnMonthSelect.OnSelect
Set(dateSelected,
Date(Year(dateSelected),ThisItem.Value,Day(dateSelected)));
UpdateContext({visGalMonth:false});
```
実際動作させると以下のようになります。

![out2.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/202779/29ce9041-c499-724e-0d11-120c5987ed34.gif)

## 日 選択
最後に日の表示ですが、ギャラリー側が少し変更をうけます。
日の選択範囲は年と月によって変わるからです。
ほかの部分については同様なので、省略します。(必要であれば巻末のプロパティ一覧を参照してください)

日の変更用ギャラリーのItemsは、それ以外の年・月をもとにして、1~31をフィルターします。

```galDay.Items
FirstN([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],DateDiff(Date(Year(dateSelected),Month(dateSelected),1),Date(Year(dateSelected),Month(dateSelected)+1,1)))
```
1~31のテーブルをFirstNで絞っているのですが、Nを決定する必要があります。
DateDiff(DateAdd(...)))部分がそれにあたります。

DateDiffは2つの日付の間にある日数をカウントする関数です。ここでやっているのは、
```Date(Year(dateSelected),Month(dateSelected),1)```、まずここで選択した年・月の1日を指定し、```Date(Year(dateSelected),Month(dateSelected)+1,1)```次の月の1日との間にある日数、つまり月の日数を出しています。

```btnDaySelect.OnSelect
Set(dateSelected,
Date(Year(dateSelected),Month(dateSelected),ThisItem.Value));
UpdateContext({visGalDay:false});
```
実際動作させると以下のようになります。

![out3.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/202779/d5cfbd29-16da-58a4-716e-2ff98f49184d.gif)

## 補正
大体これで完成なのですが、1つ面倒な問題があります。
年月日は選ぶ順番が前後することがあるので、例えば3/31を選択してから、月を2月に変更すると、2/31→3/3になってしまいます。これはなかなか気持ちの悪いもので、月を2にしたはずなのに、ギャラリーが閉じられたら3に変わっているんです。あまりよくないですよね...

これを緩和するために、『もし選択した日付が次の月に入ってしまう場合には、月の最終日にセットする』という処理を追加します。
先ほどの例でいえば、3/31を選択した状態で、2月にすると、選択日付としては2/28が選ばれるような挙動です。

悪くはないですよね。
この処理は年・月の変更時にのみ入れればよいです。

```btnMonthSelect.OnSelect
If(
    /*選択した日付がカレンダーで正しく存在するかどうかをチェック*/
    Text(Date(Year(dateSelected),ThisItem.Value,Day(dateSelected)),"[$-en-US]yyyy/m/d")
    　=Year(dateSelected)&"/"&ThisItem.Value&"/"&Day(dateSelected),

    /*存在すればdateSelectedをそのまま更新*/
    Set(dateSelected,Date(Year(dateSelected),ThisItem.Value,Day(dateSelected))),
    
    /*存在しなければ、一番近い月末を選択 例:3/31を選んでから、月を2月に変更→dateSelectedは2/28*/
    Set(dateSelected,DateAdd(Date(Year(dateSelected),ThisItem.Value+1,1),-1,Days))
);
UpdateContext({showMonth:false});
```
年のほうも同様です。これを入れておかないと、ユーザーが混乱する可能性がありますので、少しの気遣い、すてきなUIの精神で入れておきましょう。


# 完成したものはこちら
完成したものがこちらになります。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/PowerApps?src=hash&amp;ref_src=twsrc%5Etfw">#PowerApps</a> Birthday Selector UI <a href="https://t.co/KfJF0xY5QV">pic.twitter.com/KfJF0xY5QV</a></p>&mdash; Hiro (@mofumofu_dance) <a href="https://twitter.com/mofumofu_dance/status/1208759227558195200?ref_src=twsrc%5Etfw">December 22, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# おわりに
Power AppsでUIを作る場合、どうしても既定のパーツでは使いにくいシチュエーションが出てきます。
凝った仕組みとかアニメーションを入れる必要は全くないと思いますが、少しでも使いやすいようにする努力はローコードで早く作れる分、かけてもいい時間なのかなと思います。

# 付録 - プロパティ一覧
ここではパーツごとに設定したプロパティを記載します。
テーブルなので、いささか長くなりますが、参考にしてみてください。

|パーツ種|パーツ名|プロパティ名 |値| 
|---|---|---|---|
|ボタン|btnDispMonth|Text|Upper(Text(dateSelected,"[$-en-US]mmm"))|
|||OnSelect|UpdateContext({visGalYear:false,visGalMonth:true,visGalDay:false})|
|ボタン|btnDispDay|Text|Day(dateSelected)|
|||OnSelect|UpdateContext({visGalYear:false,visGalMonth:false,visGalDay:true})|
|ボタン|btnDispYear|Text|Year(dateSelected)|
|||OnSelect|UpdateContext({visGalYear:true,visGalMonth:false,visGalDay:false})|
|ギャラリー|galMonth|Visible|visGalMonth|
|||Items|[1,2,3,4,5,6,7,8,9,10,11,12]|
|ボタン|btnMonthSelect|Text|Upper(Text(Date(2000,ThisItem.Value,1),"[$-en-US]mmm"))|
|||OnSelect|If(Text(Date(Year(dateSelected),ThisItem.Value,Day(dateSelected)),"[$-en-US]yyyy/m/d")=Year(dateSelected)&"/"&ThisItem.Value&"/"&Day(dateSelected),Set(dateSelected,Date(Year(dateSelected),ThisItem.Value,Day(dateSelected))),Set(dateSelected,DateAdd(Date(Year(dateSelected),ThisItem.Value+1,1),-1,Days)));UpdateContext({visGalMonth:false});Reset(galMonth)|
|ギャラリー|galDay|Visible|visGalDay|
|||Items|FirstN([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],DateDiff(Date(Year(dateSelected),Month(dateSelected),1),Date(Year(dateSelected),Month(dateSelected)+1,1)))|
|ボタン|btnDaySelect|Text|ThisItem.Value|
|||OnSelect|Set(dateSelected,Date(Year(dateSelected),Month(dateSelected),ThisItem.Value));UpdateContext({visGalDay:false});Reset(galDay)|
|ギャラリー|galYear|Visible|visGalYear|
|||Items|[2020,2019,2018,217,2016,2015,2014,2013,2012,2011]]|
|ボタン|btnYearSelect|Text|ThisItem.Value|
|||OnSelect|If(Text(Date(ThisItem.Value,Month(dateSelected),Day(dateSelected)),"[$-en-US]yyyy/m/d")=ThisItem.Value&"/"&Month(dateSelected)&"/"&Day(dateSelected),Set(dateSelected,Date(ThisItem.Value,Month(dateSelected),Day(dateSelected))),Set(dateSelected,DateAdd(Date(ThisItem.Value,Month(dateSelected)+1,1),-1)));UpdateContext({visGalYear:false});Reset(galYear)|



