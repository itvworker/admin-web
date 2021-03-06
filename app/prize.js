  /**全局参数**/
  var member_id = GetQueryString('member_id');
  var key = GetQueryString('key');
  var ac_id = GetQueryString('ac_id');
  var dataUrl = apiUrl + '/index.php?act=mall_api&op=lotteryIndex';

  /**初始化数据封装函数**/
  function ajaxDataIndex() {
      return new Promise(function(resolve, reject) {
          $.ajax({
              type: "post",
              async: true,
              url: dataUrl,
              data: {
                  member_id: member_id,
                  key: key,
                  ac_id: ac_id
              },
              dataType: "json",
              success: function(result) {
                  resolve(result);
              },

              error: function(errorMsg) {
                  var msg = "系统出错，请联系管理员!";
                  reject(msg);
              }
          });
      });
  }

  /**滚动逻辑**/
  function b() {
      t = parseInt(x.css('top'));
      y.css('top', '19px');
      x.animate({ top: t - 19 + 'px' }, 'slow'); //19为每个li的高度
      if (Math.abs(t) == h - 19) { //19为每个li的高度
          y.animate({ top: '0px' }, 'slow');
          z = x;
          x = y;
          y = z;
      }
      setTimeout(b, 3000); //滚动间隔时间 现在是3秒
  }

  //转盘参数初始化
  var turnplate = {
      restaraunts: [], //大转盘奖品名称
      colors: [], //大转盘奖品区块对应背景颜色
      outsideRadius: 185, //大转盘外圆的半径
      textRadius: 155, //大转盘奖品位置距离圆心的距离
      insideRadius: 48, //大转盘内圆的半径
      startAngle: 0, //开始角度
      bRotate: false //false:停止;ture:旋转
  };

  /**信息初始化**/
  $(document).ready(async function() {

      var indexInfo = await ajaxDataIndex();
      console.log(indexInfo);

      //动态添加大转盘的奖品与奖品区域背景颜色
      turnplate.restaraunts = ["300元现金券", "200元现金券", "谢谢参与", "10元现金券", "50元现金券", "谢谢参与", "100积分 ", "200积分"];
      turnplate.colors = ["#fc7072", "#FFFFFF", "#fc7072", "#FFFFFF", "#fc7072", "#FFFFFF", "#fc7072", "#FFFFFF"];


      var rotateTimeOut = function() {
          $('#wheelcanvas').rotate({
              angle: 0,
              animateTo: 2160,
              duration: 8000,
              callback: function() {
                  alert('网络超时，请检查您的网络设置！');
              }
          });
      };

      /**抽奖逻辑----旋转转盘 item:奖品位置; txt：提示语;**/
      var rotateFn = function(item, txt) {
          var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
          if (angles < 270) {
              angles = 270 - angles;
          } else {
              angles = 360 - angles + 270;
          }
          $('#wheelcanvas').stopRotate();
          $('#wheelcanvas').rotate({
              angle: 0,
              animateTo: angles + 1800,
              duration: 8000,
              callback: function() {
                  //alert(txt);

                  var win_info = txt;
                  $('.info_txt').html(win_info);

                  $('.cd-popup').addClass('is-visible');
                  $("html").on("touchmove", function() { return false });

                  turnplate.bRotate = !turnplate.bRotate;
              }
          });
      };

      /**点击抽奖动作**/
      $('.pointer').click(function() {
          if (turnplate.bRotate) return;
          turnplate.bRotate = !turnplate.bRotate;
          //获取随机数(奖品个数范围内)

          /*
           * @author   LiuManMan
           * @date     2017-10-08 10:52:12
           * @describe 这里应该后端获取奖品信息，奖品都是后端设计的
           */

          var item = rnd(1, turnplate.restaraunts.length);

          //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
          rotateFn(item, turnplate.restaraunts[item - 1]);

          console.log(item);
      });

      /**中奖提示点击事件**/
      $('.cd-popup').on('click', function(event) {
          if ($(event.target).is('.win_close')) {
              event.preventDefault();
              $(this).removeClass('is-visible');
              $('html').off('touchmove');
          }
      });

      // 随机数生成
      function rnd(n, m) {
          var random = Math.floor(Math.random() * (m - n + 1) + n);
          return random;

      }

      //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
      window.onload = function() {
          drawRouletteWheel();
      };

      // 绘制奖盘
      function drawRouletteWheel() {
          var canvas = document.getElementById("wheelcanvas");
          if (canvas.getContext) {
              //根据奖品个数计算圆周角度
              var arc = Math.PI / (turnplate.restaraunts.length / 2);
              var ctx = canvas.getContext("2d");
              //在给定矩形内清空一个矩形
              ctx.clearRect(0, 0, 422, 422);
              //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
              ctx.strokeStyle = "#FFBE04";
              //font 属性设置或返回画布上文本内容的当前字体属性
              ctx.font = '20px Microsoft YaHei';
              for (var i = 0; i < turnplate.restaraunts.length; i++) {
                  var angle = turnplate.startAngle + i * arc;
                  ctx.fillStyle = turnplate.colors[i];
                  ctx.beginPath();
                  //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                  ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
                  ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                  ctx.stroke();
                  ctx.fill();
                  //锁画布(为了保存之前的画布状态)
                  ctx.save();

                  //改变画布文字颜色
                  var b = i + 2;
                  if (b % 2) {
                      ctx.fillStyle = "#fc7072";
                  } else {
                      ctx.fillStyle = "#FFFFFF";
                  };

                  //----绘制奖品开始----
                  //  ctx.fillStyle = "#E5302F";
                  var text = turnplate.restaraunts[i];
                  var line_height = 22;
                  //translate方法重新映射画布上的 (0,0) 位置
                  ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

                  //rotate方法旋转当前的绘图
                  ctx.rotate(angle + arc / 2 + Math.PI / 2);

                  /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                  if (text.indexOf("元") > 0) { //流量包
                      var texts = text.split("元");
                      for (var j = 0; j < texts.length; j++) {
                          ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '18px Microsoft YaHei';
                          if (j == 0) {
                              ctx.fillText(texts[j] + "元", -ctx.measureText(texts[j] + "元").width / 2, j * line_height);
                          } else {
                              ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                          }
                      }
                  } else if (text.indexOf("元") == -1 && text.length > 4) { //奖品名称长度超过一定范围
                      text = text.substring(0, 4) + "||" + text.substring(4);
                      var texts = text.split("||");
                      for (var j = 0; j < texts.length; j++) {
                          ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                      }
                  } else {
                      //在画布上绘制填色的文本。文本的默认颜色是黑色
                      //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                  }

                  //添加对应图标
                  if (text.indexOf("现金券") > 0) {
                      var img = document.getElementById("shan-img");
                      img.onload = function() {
                          ctx.drawImage(img, -15, 40);
                      };
                      ctx.drawImage(img, -15, 40);
                  } else if (text.indexOf("谢谢参与") >= 0) {
                      var img = document.getElementById("sorry-img");
                      img.onload = function() {
                          ctx.drawImage(img, -15, 40);
                      };
                      ctx.drawImage(img, -15, 40);
                  }

                  //把当前画布返回（调整）到上一个save()状态之前
                  ctx.restore();
                  //----绘制奖品结束----
              }
          }
      }

  });