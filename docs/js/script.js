        var map;
        var marker = [];
        var infoWindow = [];
        var markerData = [ // マーカーを立てる場所名・緯度・経度
          {
               name: '麺の月',
               lat: 35.397340,
                lng: 139.464417

         }, {
                name: '食彩和牛しげ吉 湘南台店',
             lat: 35.397268,
                lng: 139.469179
         }, {
                name: 'ニューオリンズ',
             lat: 35.395354,
              lng: 139.467724
         }, {
                name: 'ピッツァ　サルヴァトーレ　クオモ',
                lat: 35.396207,
                lng: 139.466835
         }, {
                name: '豚菜',
             lat: 35.395418,
             lng: 139.468529
         }, {
                name: 'マントラ',
              lat: 35.396218,
              lng: 139.464794
         }, {
               name: 'よってこや',
              lat: 35.396290,
              lng: 139.465318
         }, {
              name: '西輝家',
             lat: 35.393599,
             lng: 139.470268
         }, {
             name: '旬魚',
            lat: 35.396849,
            lng: 139.469996
         }, {
             name: 'サルパラダイス',
            lat: 35.396207,
            lng: 139.466835

         }
        ];

        function initMap() {
          // 地図の中心を決める
          var latlng = new google.maps.LatLng(35.396534, 139.466533);

          // 地図を表示するためのオプションを設定する
          var opt = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // 地図を表示する。
          var map = new google.maps.Map(document.getElementById('map'), opt);

          // イベントリスナ（コールバック関数）
          function click_callback(e) {
            alert(e.latLng.toString());
          }

          // イベントリスナの設定
          map.addListener('click', click_callback);


         // マーカー毎の処理
         for (var i = 0; i < markerData.length; i++) {
                markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
                marker[i] = new google.maps.Marker({ // マーカーの追加
                 position: latlng, // マーカーを立てる位置を指定
                    map: map // マーカーを立てる地図を指定
               });

             infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                 content: '<div class="map">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
               });

             markerEvent(i); // マーカーにクリックイベントを追加
         }

        }

        // マーカーにクリックイベントを追加
        function markerEvent(i) {
            marker[i].addListener('click', function() { // マーカーをクリックしたとき
              infoWindow[i].open(map, marker[i]); // 吹き出しの表示
          });
        }





        var total = 20;  //カードの枚数
        var speed = 150;  //カードをめくる速度
        var returnSec = 1000;  //めくったカードが元に戻る秒数
        var cat = [];  //各カードの番号を格納する配列
        var index;  //クリックしたカードの並び順
        var first = true;  //クリックしたカードが1枚目かどうかの判定用
        var card1;  //1枚目に引いたカードの番号
        var card2;  //2枚目に引いたカードの番号
        var pair = 0;  //正解したカードのペア数


        //カードを閉じる
        function cardClose(i,n){
          $("#card li:eq("+i+")").stop().animate({ left: "75"}, speed);
          $("#card li:eq("+i+") img").stop().animate({ width: "0",height: "200px"}, speed,
          function(){
            n(i);
          });
        }
        //表面を開く
        function omoteOpen(){
          $("#card li:eq("+index+") img").attr("src","img/card"+cat[index]+".png");
          $("#card li:eq("+index+") img").stop().animate({ width: "150px",height: "200px"}, speed);
          $("#card li:eq("+index+")").stop().animate({ left: "0"}, speed);
        }
        //裏面を開く
        function uraOpen(j){
          $("#card li:eq("+j+") img").attr("src","img/card.png");
          $("#card li:eq("+j+") img").stop().animate({ width: "150px",height: "200px"}, speed);
          $("#card li:eq("+j+")").stop().animate({ left: "0"}, speed);
        }

        //クリックできないようにカードをロック
        function cardlock(){
          $("#card li:eq("+index+")").addClass("lock");
        }
        //全てのカードをロック
        function alllock(){
          $("#card li").addClass("lock");
        }
        //全てのカードをアンロック
        function unlock(){
          $("#card li").removeClass("lock");
        }

        //選んだ2枚のカードの正否
        function comparison() {
          if(card1==card2){  //2枚が同じカードであれば
            $("#card li:eq("+index+")").addClass("off");  //2枚目のカードのクリック判定を無効に
            $("#card li:eq("+index1+")").addClass("off");  //1枚目のカードのクリック判定を無効に
            pair++;  //ペア数を1増やす
            if(pair==total/2){  //ペアが全て見つかったら
              setTimeout(function(){  //最後のカードがめくられた後にクリアー表示
                alert("クリアー！")
                location.href = 'map.html';
              }, returnSec);
            }
          } else {  //2枚が違うカードであれば
            setTimeout(function(){  //returnSecミリ秒後（カードをめくる動作が終わった後）に
                cardClose(index,uraOpen);  //2枚目のカードを裏面に戻す
                cardClose(index1,uraOpen);  //1枚目のカードを裏面に戻す
            }, returnSec);
          }
          first = true;  //1枚目かどうかの判定を有効に
          card2 = 0;  //2枚目のカードの並び順をリセット
          setTimeout(function(){
            unlock();  //全てのカードの.lockを削除
          }, returnSec+speed*2);
        }

        $(function(){
          //カードの番号を配列に格納
          for(i=1; i<=total/2; i++) {
            cat.push(i,i);
          }
          //配列の中身をランダムに並び替え
          cat.sort(function() {
            return Math.random() - Math.random();
          });
          //カード画像の入ったliタグの生成
          for(i=1; i<=total; i++) {
            $("#card").append("<li><img src='img/card.png'></li>");
          }

          $("#card li").click(function(){
            index = $("#card li").index(this);  //選択したカードの順番をindexに保存
            cardlock();  //選択したカードのクリックを無効にする関数
            cardClose(index,omoteOpen);  //カードを閉じ、表面を開く関数

            if(first == true){  //選択したカードが1枚目であれば
              index1 = index;  //カードの順番をindex1に保存
              card1= cat[index];  //並び順を基に表面の番号を配列から取り出しcard1に保存
              first = false;  //1枚目かどうかの判定を無効に

            } else {  //選択したカードが2枚目であれば
              alllock();  //全てのカードのクリックを無効にする関数
              card2 = cat[index];  //並び順を基に表面の番号を配列から取り出しcard2に保存
              comparison();  //card1とcard2を比べて正否の判定をする関数
            }
          });

        });


// div要素を格納
var cards = [];
// 開始時間
var startTime;
// 経過秒数用 タイマーID
// 開始時刻を取得
   startTime = new Date();
   // タイマー開始
   startTimer();

// タイマー開始
function startTimer(){
    timer = setInterval(showSecond, 1000);
}

// 秒数表示
function showSecond(){

    var nowTime = new Date();
    var elapsedTime = Math.floor((nowTime - startTime) / 1000);
    var str = '経過秒数: ' + elapsedTime + '秒';

    var re = document.getElementById('result');
    re.innerHTML = str;
}
