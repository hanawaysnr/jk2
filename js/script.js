      $(document).ready(function() {
        $("#os-phrases > h2").lettering('words').children("span").lettering().children("span").lettering();
      })
// 代入
 var $btn = $('.hamicon');
 var $nav = $('.header-navigation');
//ハンバーガーメニュー横から開く
  $btn.on('click', function(){
  drawerToggle();
  });
  $('header-navigation-list-item').on('click', function(){

  drawerToggle();

});
       function drawerToggle() {

          if($btn.hasClass('active')) {

            $nav.animate({
              'left': '-450px'
            });
            $btn.animate({
              'left': 0
            });

          } else {

            $nav.animate({
              'left': 0
            });
            $btn.animate({
              'left': '450px'
            });
          }

          $btn.toggleClass('active');

        }



function initMap() {
  // 地図の中心を決める
  var latlng = new google.maps.LatLng(35.388276, 139.427348);

  // 地図を表示するためのオプションを設定する
  var opt = {
    zoom: 14,
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
}


// ここからif文章
function iftest() {
  var str = prompt("数値を入力してください。");
  var num = Number(str);

  if (num % 2 == 0) {
    // 2の倍数
    alert("2の倍数です。");
  } else if (num % 3 == 0) {
    // 3の倍数
    alert("3の倍数です。");
  } else {
    // 上記以外なら
    alert("2の倍数でも、3の倍数でもありません。");
  }
}
