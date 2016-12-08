app.controller('InviteCtrl', ['$scope', '$sce', '$http', '$filter', 'FileUploader',
    'authService', 'Notification', '$q', '$timeout', '$filter', '$sce',
    function ($scope, $sce, $http, $filter, FileUploader, authService, Notification, $q, $timeout, $filter, $sce) {
        var doc = document.getElementById('iframe').contentWindow.document;

        $scope.editor = false;

        $scope.editorOptions = {
          lineWrapping : true,
          lineNumbers: true,
          identUnit: 2,
          mode: 'text/html',
          extraKeys: {
            "Ctrl-Space": "autocomplete",
            "F11": function(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
          }
        };

        var uploader = $scope.uploader = new FileUploader({
          url: "api/newsletter/upload_img",
          alias: "imagem",
          queueLimit: 5,
          autoUpload: true,
            headers: {"x-access-token": authService.token()}
        });

        $scope.editorChangedCode = function(){
          doc.open();
          doc.write($scope.html_editor);
          doc.close();
        };

        $scope.codemirrorLoaded = function(_editor){
          // Editor part
          var _doc = _editor.getDoc();

          _editor.focus();

          doc = document.getElementById('iframe').contentWindow.document;
          $scope.html_editor = [
            '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><!--[if IE]><html xmlns="http://www.w3.org/1999/xhtml" class="ie"><![endif]--><!--[if !IE]><!--><html style="margin: 0;padding: 0;" xmlns="http://www.w3.org/1999/xhtml"><!--<![endif]--><head>      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge" /><!--<![endif]-->      <meta name="viewport" content="width=device-width" /><style type="text/css">  @media only screen and (min-width: 620px){.wrapper h1{}.wrapper h1{font-size:26px !important;line-height:34px !important}.wrapper h2{}.wrapper h2{font-size:20px !important;line-height:28px !important}.wrapper h3{}.column p,.column ol,.column ul{}.wrapper .size-8{font-size:8px !important;line-height:14px !important}.wrapper .size-9{font-size:9px !important;line-height:16px !important}.wrapper .size-10{font-size:10px !important;line-height:18px !important}.wrapper .size-11{font-size:11px !important;line-height:19px !important}.wrapper .size-12{font-size:12px !important;line-height:19px !important}.wrapper .size-13{font-size:13px !important;line-height:21px !important}.wrapper .size-14{font-size:14px !important;line-height:21px !important}.wrapper .size-15{font-size:15px !important;line-height:23px !important}.wrapper .size-16{font-size:16px !important;line-height:24px !important}.wrapper   .size-17{font-size:17px !important;line-height:26px !important}.wrapper .size-18{font-size:18px !important;line-height:26px !important}.wrapper .size-20{font-size:20px !important;line-height:28px !important}.wrapper .size-22{font-size:22px !important;line-height:31px !important}.wrapper .size-24{font-size:24px !important;line-height:32px !important}.wrapper .size-26{font-size:26px !important;line-height:34px !important}.wrapper .size-28{font-size:28px !important;line-height:36px !important}.wrapper .size-30{font-size:30px !important;line-height:38px !important}.wrapper .size-32{font-size:32px !important;line-height:40px !important}.wrapper .size-34{font-size:34px !important;line-height:43px !important}.wrapper .size-36{font-size:36px !important;line-height:43px !important}.wrapper .size-40{font-size:40px !important;line-height:47px !important}.wrapper .size-44{font-size:44px   !important;line-height:50px !important}.wrapper .size-48{font-size:48px !important;line-height:54px !important}.wrapper .size-56{font-size:56px !important;line-height:60px !important}.wrapper .size-64{font-size:64px !important;line-height:63px !important}}  </style>      <style type="text/css">  body {    margin: 0;    padding: 0;  }  table {    border-collapse: collapse;    table-layout: fixed;  }  * {    line-height: inherit;  }  [x-apple-data-detectors],  [href^="tel"],  [href^="sms"] {    color: inherit !important;    text-decoration: none !important;  }  .wrapper .footer__share-button a:hover,  .wrapper .footer__share-button a:focus {    color: #ffffff !important;  }  .btn a:hover,  .btn a:focus,  .footer__share-button a:hover,  .footer__share-button a:focus,  .email-footer__links a:hover,  .email-footer__links a:focus {    opacity: 0.8;  }  .preheader,  .header,  .layout,  .column {    transition: width 0.25s ease-in-out, max-width 0.25s ease-in-out;  }  .layout,  .header {    max-width: 400px !important;    -fallback-width: 95% !important;    width: calc(100% - 20px) !important;  }  div.preheader {    max-width: 360px !important;    -fallback-width: 90% !important;    width: calc(100% - 60px) !important;  }  .snippet,  .webversion {    Float: none !important;  }  .column {    max-width: 400px !important;    width: 100% !important;  }  .fixed-width.has-border {    max-width: 402px !important;  }  .fixed-width.has-border .layout__inner {    box-sizing: border-box;  }  .snippet,  .webversion {    width: 50% !important;  }  .ie .btn {    width: 100%;  }  .ie .column,  [owa] .column,  .ie .gutter,  [owa] .gutter {    display: table-cell;    float: none !important;    vertical-align: top;  }  .ie div.preheader,  [owa] div.preheader,  .ie .email-footer,  [owa] .email-footer {    max-width: 560px !important;    width: 560px !important;  }  .ie .snippet,  [owa] .snippet,  .ie .webversion,  [owa] .webversion {    width: 280px !important;  }  .ie .header,  [owa] .header,  .ie .layout,  [owa] .layout,  .ie .one-col .column,  [owa] .one-col .column {    max-width: 600px !important;    width: 600px !important;  }  .ie .fixed-width.has-border,  [owa] .fixed-width.has-border,  .ie .has-gutter.has-border,  [owa] .has-gutter.has-border {    max-width: 602px !important;    width: 602px !important;  }  .ie .two-col .column,  [owa] .two-col .column {    width: 300px !important;  }  .ie .three-col .column,  [owa] .three-col .column,  .ie .narrow,  [owa] .narrow {    width: 200px !important;  }  .ie .wide,  [owa] .wide {    width: 400px !important;  }  .ie .two-col.has-gutter .column,  [owa] .two-col.x_has-gutter .column {    width: 290px !important;  }  .ie .three-col.has-gutter .column,  [owa] .three-col.x_has-gutter .column,  .ie .has-gutter .narrow,  [owa] .has-gutter .narrow {    width: 188px !important;  }  .ie .has-gutter .wide,  [owa] .has-gutter .wide {    width: 394px !important;  }  .ie .two-col.has-gutter.has-border .column,  [owa] .two-col.x_has-gutter.x_has-border .column {    width: 292px !important;  }  .ie .three-col.has-gutter.has-border .column,  [owa] .three-col.x_has-gutter.x_has-border .column,  .ie .has-gutter.has-border .narrow,  [owa] .has-gutter.x_has-border .narrow {    width: 190px !important;  }  .ie .has-gutter.has-border .wide,  [owa] .has-gutter.x_has-border .wide {    width: 396px !important;  }  .ie .fixed-width .layout__inner {    border-left: 0 none white !important;    border-right: 0 none white !important;  }  .ie .layout__edges {    display: none;  }  .mso .layout__edges {    font-size: 0;  }  .layout-fixed-width,  .mso .layout-full-width {    background-color: #ffffff;  }  @media only screen and (min-width: 620px) {    .column,    .gutter {      display: table-cell;      Float: none !important;      vertical-align: top;    }    div.preheader,    .email-footer {      max-width: 560px !important;      width: 560px !important;    }    .snippet,    .webversion {      width: 280px !important;    }    .header,    .layout,    .one-col .column {      max-width: 600px !important;      width: 600px !important;    }    .fixed-width.has-border,    .fixed-width.ecxhas-border,    .has-gutter.has-border,    .has-gutter.ecxhas-border {      max-width: 602px !important;      width: 602px !important;    }    .two-col .column {      width: 300px !important;    }    .three-col .column,    .column.narrow {      width: 200px !important;    }    .column.wide {      width: 400px !important;    }    .two-col.has-gutter .column,    .two-col.ecxhas-gutter .column {      width: 290px !important;    }    .three-col.has-gutter .column,    .three-col.ecxhas-gutter .column,    .has-gutter .narrow {      width: 188px !important;    }    .has-gutter .wide {      width: 394px !important;    }    .two-col.has-gutter.has-border .column,    .two-col.ecxhas-gutter.ecxhas-border .column {      width: 292px !important;    }    .three-col.has-gutter.has-border .column,    .three-col.ecxhas-gutter.ecxhas-border .column,    .has-gutter.has-border .narrow,    .has-gutter.ecxhas-border .narrow {      width: 190px !important;    }    .has-gutter.has-border .wide,    .has-gutter.ecxhas-border .wide {      width: 396px !important;    }  }  @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {    .fblike {      background-image: url(https://i3.createsend1.com/static/eb/master/13-the-blueprint-3/images/fblike@2x.png) !important;    }    .tweet {      background-image: url(https://i4.createsend1.com/static/eb/master/13-the-blueprint-3/images/tweet@2x.png) !important;    }    .linkedinshare {      background-image: url(https://i5.createsend1.com/static/eb/master/13-the-blueprint-3/images/lishare@2x.png) !important;    }    .forwardtoafriend {      background-image: url(https://i7.createsend1.com/static/eb/master/13-the-blueprint-3/images/forward@2x.png) !important;    }  }  @media (max-width: 321px) {    .fixed-width.has-border .layout__inner {      border-width: 1px 0 !important;    }    .layout,    .column {      min-width: 320px !important;      width: 320px !important;    }    .border {      display: none;    }  }  .mso div {    border: 0 none white !important;  }  .mso .w560 .divider {    Margin-left: 260px !important;    Margin-right: 260px !important;  }  .mso .w360 .divider {    Margin-left: 160px !important;    Margin-right: 160px !important;  }  .mso .w260 .divider {    Margin-left: 110px !important;    Margin-right: 110px !important;  }  .mso .w160 .divider {    Margin-left: 60px !important;    Margin-right: 60px !important;  }  .mso .w354 .divider {    Margin-left: 157px !important;    Margin-right: 157px !important;  }  .mso .w250 .divider {    Margin-left: 105px !important;    Margin-right: 105px !important;  }  .mso .w148 .divider {    Margin-left: 54px !important;    Margin-right: 54px !important;  }  .mso .font-avenir,  .mso .font-cabin,  .mso .font-open-sans,  .mso .font-ubuntu {    font-family: sans-serif !important;  }  .mso .font-bitter,  .mso .font-merriweather,  .mso .font-pt-serif {    font-family: Georgia, serif !important;  }  .mso .font-lato,  .mso .font-roboto {    font-family: Tahoma, sans-serif !important;  }  .mso .font-pt-sans {    font-family: "Trebuchet MS", sans-serif !important;  }  .mso .footer__share-button p {    margin: 0;  }  .mso .size-8,  .ie .size-8 {    font-size: 8px !important;    line-height: 14px !important;  }  .mso .size-9,  .ie .size-9 {    font-size: 9px !important;    line-height: 16px !important;  }  .mso .size-10,  .ie .size-10 {    font-size: 10px !important;    line-height: 18px !important;  }  .mso .size-11,  .ie .size-11 {    font-size: 11px !important;    line-height: 19px !important;  }  .mso .size-12,  .ie .size-12 {    font-size: 12px !important;    line-height: 19px !important;  }  .mso .size-13,  .ie .size-13 {    font-size: 13px !important;    line-height: 21px !important;  }  .mso .size-14,  .ie .size-14 {    font-size: 14px !important;    line-height: 21px !important;  }  .mso .size-15,  .ie .size-15 {    font-size: 15px !important;    line-height: 23px !important;  }  .mso .size-16,  .ie .size-16 {    font-size: 16px !important;    line-height: 24px !important;  }  .mso .size-17,  .ie .size-17 {    font-size: 17px !important;    line-height: 26px !important;  }  .mso .size-18,  .ie .size-18 {    font-size: 18px !important;    line-height: 26px !important;  }  .mso .size-20,  .ie .size-20 {    font-size: 20px !important;    line-height: 28px !important;  }  .mso .size-22,  .ie .size-22 {    font-size: 22px !important;    line-height: 31px !important;  }  .mso .size-24,  .ie .size-24 {    font-size: 24px !important;    line-height: 32px !important;  }  .mso .size-26,  .ie .size-26 {    font-size: 26px !important;    line-height: 34px !important;  }  .mso .size-28,  .ie .size-28 {    font-size: 28px !important;    line-height: 36px !important;  }  .mso .size-30,  .ie .size-30 {    font-size: 30px !important;    line-height: 38px !important;  }  .mso .size-32,  .ie .size-32 {    font-size: 32px !important;    line-height: 40px !important;  }  .mso .size-34,  .ie .size-34 {    font-size: 34px !important;    line-height: 43px !important;  }  .mso .size-36,  .ie .size-36 {    font-size: 36px !important;    line-height: 43px !important;  }  .mso .size-40,  .ie .size-40 {    font-size: 40px !important;    line-height: 47px !important;  }  .mso .size-44,  .ie .size-44 {    font-size: 44px !important;    line-height: 50px !important;  }  .mso .size-48,  .ie .size-48 {    font-size: 48px !important;    line-height: 54px !important;  }  .mso .size-56,  .ie .size-56 {    font-size: 56px !important;    line-height: 60px !important;  }  .mso .size-64,  .ie .size-64 {    font-size: 64px !important;    line-height: 63px !important;  }  .footer__share-button p {    margin: 0;  }  </style>            <title></title>    <!--[if !mso]><!--><style type="text/css">  @import url(https://fonts.googleapis.com/css?family=Ubuntu:400,700,400italic,700italic);  </style><link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700,400italic,700italic" rel="stylesheet" type="text/css" /><!--<![endif]--><style type="text/css">  body{background-color:#f2f2f2}.mso h1{}.mso h2{}.mso h3{}.mso .column,.mso .column__background td{}.mso .btn a{}.mso .webversion,.mso .snippet,.mso .layout-email-footer td,.mso .footer__share-button p{}.mso .webversion,.mso .snippet,.mso .layout-email-footer td,.mso .footer__share-button p{font-family:sans-serif !important}.mso .logo{}.mso .logo{font-family:Tahoma,sans-serif !important}.logo a:hover,.logo a:focus{color:#859bb1 !important}.mso .layout-has-border{border-top:1px solid #bfbfbf;border-bottom:1px solid #bfbfbf}.mso .layout-has-bottom-border{border-bottom:1px solid #bfbfbf}.mso .border,.ie .border{background-color:#bfbfbf}.mso h1,.ie h1{}.mso h1,.ie h1{font-size:26px !important;line-height:34px !important}.mso h2,.ie h2{}.mso h2,.ie h2{font-size:20px !important;line-height:28px !important}.mso h3,.ie h3{}.mso .layout__inner p,.ie .layout__inner p,.mso .layout__inner ol,.ie   .layout__inner ol,.mso .layout__inner ul,.ie .layout__inner ul{}  </style><meta name="robots" content="noindex,nofollow" />  <meta property="og:title" content="My First Campaign" />  </head>  <!--[if mso]>    <body class="mso">  <![endif]-->  <!--[if !mso]><!-->    <body class="full-padding" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;">  <!--<![endif]-->      <div class="wrapper" style="min-width: 320px;background-color: #f2f2f2;">        <div class="preheader" style="Margin: 0 auto;max-width: 560px;min-width: 280px; width: 280px;width: calc(28000% - 173040px);">          <div style="border-collapse: collapse;display: table;width: 100%;">          <!--[if (mso)|(IE)]><table align="center" class="preheader" cellpadding="0" cellspacing="0"><tr><td style="width: 280px" valign="top"><![endif]-->            <div class="snippet" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 140px; width: 140px;width: calc(14000% - 78120px);padding: 10px 0 5px 0;color: #b8b8b8;font-family: Ubuntu,sans-serif;">                          </div>          <!--[if (mso)|(IE)]></td><td style="width: 280px" valign="top"><![endif]-->            <div class="webversion" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 139px; width: 139px;width: calc(14100% - 78680px);padding: 10px 0 5px 0;text-align: right;color: #b8b8b8;font-family: Ubuntu,sans-serif;">                          </div>          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->          </div>        </div>                <div class="layout one-col fixed-width" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 173000px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;" emb-background-style>          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0"><tr class="layout-fixed-width" emb-background-style><td style="width: 600px" class="w560"><![endif]-->            <div class="column" style="text-align: left;color: #60666d;font-size: 14px;line-height: 21px;font-family: sans-serif;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);">                    <div style="font-size: 12px;font-style: normal;font-weight: normal;" align="center">            <a id="imageLink" href="http://www.smartcitybusiness.com.br/"><img class="gnd-corner-image gnd-corner-image-center gnd-corner-image-top" style="border: 0;display: block;height: auto;width: 100%;max-width: 900px;" alt="" width="600" src="http://www.smartcitybusiness.com.br/2016pt/wp-content/uploads/2014/12/planta.png" id="inviteImage"/></a>          </div>                      <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 20px;">        <div style="line-height:10px;font-size:1px">&nbsp;</div>      </div>                        <div style="Margin-left: 20px;Margin-right: 20px;">        <h2 style="Margin-top: 0;Margin-bottom: 0;font-style: normal;font-weight: normal;color: #43464a;font-size: 17px;line-height: 26px;" id="inviteTitle">Ol&#225;, Cliente,</h2>                <p class="size-14" id="content" style="Margin-top: 16px;Margin-bottom: 20px;font-size: 14px;line-height: 21px;" lang="x-size-14">Escreva o conteúdo da mensagem aqui.......</p>      </div>                <div style="Margin-left: 20px;Margin-right: 20px;">        <div class="btn btn--flat btn--large"  style="Margin-bottom: 20px;text-align: center;">          <a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #fff;background-color: #00afd1;font-family: sans-serif;" href="{{{buttonURL}}}" id="buttonConfirm">       Confirmar Cadastro          </a>        </div>      </div>                        <div style="Margin-left: 20px;Margin-right: 20px;">        <div style="line-height:10px;font-size:1px">&nbsp;</div>      </div>                        <div style="Margin-left: 20px;Margin-right: 20px;Margin-bottom: 24px;">        <p class="size-14" style="Margin-top: 0;Margin-bottom: 0;font-size: 14px;line-height: 21px;" lang="x-size-14" id="saudacao">Obrigado pela participa&#231;&#227;o,       </p>        <strong id="assinatura">Equipe SmartCity Buisiness America</strong>      <div style="text-align:center;margin-top:5px;"><a href="{{{url_unsubscribe}}}" style="text-decoration: underline;color:#878793;font-size:10px;">Unsubscribe</a></div>      </div>                      </div>          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->          </div>        </div>        <div style="line-height:40px;font-size:40px;">&nbsp;</div>        <div class="layout email-footer" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 173000px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;">          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0"><tr class="layout-email-footer"><td style="width: 400px;" valign="top" class="w360"><![endif]-->            <div class="column wide" style="text-align: left;font-size: 12px;line-height: 19px;color: #b8b8b8;font-family: Ubuntu,sans-serif;Float: left;max-width: 400px;min-width: 320px; width: 320px;width: calc(8000% - 47600px);">              <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 10px;Margin-bottom: 1px;">                <table class="email-footer__links emb-web-links" style="border-collapse: collapse;table-layout: fixed;"><tbody><tr>                  <img src="http://smartcitybusiness.com.br/home/wp-content/uploads/2016/10/logo_smart.png" height="60" width="100">                    <div>SmartCity Business America 2016</div>                                </tr></tbody></table>                </div>              </div>            </div>          </div>        </div>        <div class="layout one-col email-footer" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 173000px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;">          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0"><tr class="layout-email-footer"><td style="width: 600px;" class="w560"><![endif]-->            <div class="column" style="text-align: left;font-size: 12px;line-height: 19px;color: #b8b8b8;font-family: Ubuntu,sans-serif;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);">              <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 1px;Margin-bottom: 1px;">                <div>              </div>            </div>          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->          </div>        </div>    </div>  </body></html>'
          ].join('');
          $scope.editorChanged();
        };

        $scope.trustAsHtml = function(string) {
          return $sce.trustAsHtml(string);
        };


        $scope.allContacts = [];
        var TAG_A_REGEX = /^[<][a][ ]/i;

        $scope.eventApi = {
            onChange:  function(api, color, $event) {
                $scope.editorChanged();
            }
        };

        $scope.options = {
            swatchOnly: true
        };

        $scope.buttonColor = '#00afd1';
        $scope.buttonTextColor = '#fff';

        var uploader = $scope.uploader = new FileUploader({
            url: "api/newsletter/upload_img",
            alias: "imagem",
            queueLimit: 5,
            autoUpload: true,
            headers: {"x-access-token": authService.token()}
        });

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|'.indexOf(type) !== -1;
            }
        });

        $scope.cancelUpload = function(){
            uploader.cancelAll();
            uploader.clearQueue();
        };

        uploader.onSuccessItem = function(item, response){
            if(response.success){
                doc.getElementById("inviteImage").src = response.url;
            }
        };

        uploader.onErrorItem = function(item, response, status, headers) {
            Notification.error({message: $filter('translate')('ERROR_UPLOAD_IMAGE'), delay: 4000});
        };

        $scope.editorChanged = function(){

            doc.getElementById("content").innerHTML = $scope.content_editor.replace(/\n/g, "</br>");
            doc.getElementById("inviteTitle").innerHTML = $scope.title_editor;

            if ($scope.button_editor.length === 0) {
                doc.getElementById("buttonConfirm").style.visibility = "hidden";

                document.getElementById("buttonColorDiv").style.visibility = "hidden";
                document.getElementById("buttonTextColorDiv").style.visibility = "hidden";

            } else {
                doc.getElementById("buttonConfirm").style.visibility = "visible";

                document.getElementById("buttonColorDiv").style.visibility = "visible";
                document.getElementById("buttonTextColorDiv").style.visibility = "visible";
            }

            doc.getElementById("buttonConfirm").innerHTML = $scope.button_editor;
            doc.getElementById("buttonConfirm").style.backgroundColor = $scope.buttonColor;
            doc.getElementById("buttonConfirm").style.color = $scope.buttonTextColor;
            doc.getElementById("saudacao").innerHTML = $scope.greeting_editor;
            doc.getElementById("assinatura").innerHTML = $scope.from_editor;
            doc.getElementById("imageLink").href = $scope.imageLink;

        };


        $scope.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
        };

        $scope.checklist = [];
        $scope.categories = [];

        $scope.init = function () {
            //$scope.editorChanged();
            loadContacts();
            $http
                .get("api/newsletter/group")
                .then(function (response) {
                    if(response.data.success){
                        $scope.checklist = response.data.groups;
                        for(var i = 0; i < $scope.checklist.length; i++) {
                            $scope.checklist[i].value = false;
                        }
                    }
                },function (response) {});
            $http
                .get("api/newsletter/category")
                .then(function (response) {
                    if(response.data.success){
                        $scope.categories = response.data.categories;
                    }
                },function (response) {
                });

            $scope.loadingEvents = true;

            $http
                .get("api/event")
                .then(function (response) {
                    $scope.events = response.data.events;
                    $scope.loadingEvents = false;
                },function (response) {
                  $scope.loadingEvents = false;
                });


                    doc.getElementsByTagName("html")[0].innerHTML = '  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><!--[if IE]><html xmlns="http://www.w3.org/1999/xhtml" class="ie"><![endif]--><!--[if !IE]><!--><html style="margin: 0;padding: 0;" xmlns="http://www.w3.org/1999/xhtml"><!--<![endif]--><head>      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge" /><!--<![endif]-->      <meta name="viewport" content="width=device-width" /><style type="text/css">  @media only screen and (min-width: 620px){.wrapper h1{}.wrapper h1{font-size:26px !important;line-height:34px !important}.wrapper h2{}.wrapper h2{font-size:20px !important;line-height:28px !important}.wrapper h3{}.column p,.column ol,.column ul{}.wrapper .size-8{font-size:8px !important;line-height:14px !important}.wrapper .size-9{font-size:9px !important;line-height:16px !important}.wrapper .size-10{font-size:10px !important;line-height:18px !important}.wrapper .size-11{font-size:11px !important;line-height:19px !important}.wrapper .size-12{font-size:12px !important;line-height:19px !important}.wrapper .size-13{font-size:13px !important;line-height:21px !important}.wrapper .size-14{font-size:14px !important;line-height:21px !important}.wrapper .size-15{font-size:15px !important;line-height:23px !important}.wrapper .size-16{font-size:16px !important;line-height:24px !important}.wrapper   .size-17{font-size:17px !important;line-height:26px !important}.wrapper .size-18{font-size:18px !important;line-height:26px !important}.wrapper .size-20{font-size:20px !important;line-height:28px !important}.wrapper .size-22{font-size:22px !important;line-height:31px !important}.wrapper .size-24{font-size:24px !important;line-height:32px !important}.wrapper .size-26{font-size:26px !important;line-height:34px !important}.wrapper .size-28{font-size:28px !important;line-height:36px !important}.wrapper .size-30{font-size:30px !important;line-height:38px !important}.wrapper .size-32{font-size:32px !important;line-height:40px !important}.wrapper .size-34{font-size:34px !important;line-height:43px !important}.wrapper .size-36{font-size:36px !important;line-height:43px !important}.wrapper .size-40{font-size:40px !important;line-height:47px !important}.wrapper .size-44{font-size:44px   !important;line-height:50px !important}.wrapper .size-48{font-size:48px !important;line-height:54px !important}.wrapper .size-56{font-size:56px !important;line-height:60px !important}.wrapper .size-64{font-size:64px !important;line-height:63px !important}}  </style>      <style type="text/css">  body {    margin: 0;    padding: 0;  }  table {    border-collapse: collapse;    table-layout: fixed;  }  * {    line-height: inherit;  }  [x-apple-data-detectors],  [href^="tel"],  [href^="sms"] {    color: inherit !important;    text-decoration: none !important;  }  .wrapper .footer__share-button a:hover,  .wrapper .footer__share-button a:focus {    color: #ffffff !important;  }  .btn a:hover,  .btn a:focus,  .footer__share-button a:hover,  .footer__share-button a:focus,  .email-footer__links a:hover,  .email-footer__links a:focus {    opacity: 0.8;  }  .preheader,  .header,  .layout,  .column {    transition: width 0.25s ease-in-out, max-width 0.25s ease-in-out;  }  .layout,  .header {    max-width: 400px !important;    -fallback-width: 95% !important;    width: calc(100% - 20px) !important;  }  div.preheader {    max-width: 360px !important;    -fallback-width: 90% !important;    width: calc(100% - 60px) !important;  }  .snippet,  .webversion {    Float: none !important;  }  .column {    max-width: 400px !important;    width: 100% !important;  }  .fixed-width.has-border {    max-width: 402px !important;  }  .fixed-width.has-border .layout__inner {    box-sizing: border-box;  }  .snippet,  .webversion {    width: 50% !important;  }  .ie .btn {    width: 100%;  }  .ie .column,  [owa] .column,  .ie .gutter,  [owa] .gutter {    display: table-cell;    float: none !important;    vertical-align: top;  }  .ie div.preheader,  [owa] div.preheader,  .ie .email-footer,  [owa] .email-footer {    max-width: 560px !important;    width: 560px !important;  }  .ie .snippet,  [owa] .snippet,  .ie .webversion,  [owa] .webversion {    width: 280px !important;  }  .ie .header,  [owa] .header,  .ie .layout,  [owa] .layout,  .ie .one-col .column,  [owa] .one-col .column {    max-width: 600px !important;    width: 600px !important;  }  .ie .fixed-width.has-border,  [owa] .fixed-width.has-border,  .ie .has-gutter.has-border,  [owa] .has-gutter.has-border {    max-width: 602px !important;    width: 602px !important;  }  .ie .two-col .column,  [owa] .two-col .column {    width: 300px !important;  }  .ie .three-col .column,  [owa] .three-col .column,  .ie .narrow,  [owa] .narrow {    width: 200px !important;  }  .ie .wide,  [owa] .wide {    width: 400px !important;  }  .ie .two-col.has-gutter .column,  [owa] .two-col.x_has-gutter .column {    width: 290px !important;  }  .ie .three-col.has-gutter .column,  [owa] .three-col.x_has-gutter .column,  .ie .has-gutter .narrow,  [owa] .has-gutter .narrow {    width: 188px !important;  }  .ie .has-gutter .wide,  [owa] .has-gutter .wide {    width: 394px !important;  }  .ie .two-col.has-gutter.has-border .column,  [owa] .two-col.x_has-gutter.x_has-border .column {    width: 292px !important;  }  .ie .three-col.has-gutter.has-border .column,  [owa] .three-col.x_has-gutter.x_has-border .column,  .ie .has-gutter.has-border .narrow,  [owa] .has-gutter.x_has-border .narrow {    width: 190px !important;  }  .ie .has-gutter.has-border .wide,  [owa] .has-gutter.x_has-border .wide {    width: 396px !important;  }  .ie .fixed-width .layout__inner {    border-left: 0 none white !important;    border-right: 0 none white !important;  }  .ie .layout__edges {    display: none;  }  .mso .layout__edges {    font-size: 0;  }  .layout-fixed-width,  .mso .layout-full-width {    background-color: #ffffff;  }  @media only screen and (min-width: 620px) {    .column,    .gutter {      display: table-cell;      Float: none !important;      vertical-align: top;    }    div.preheader,    .email-footer {      max-width: 560px !important;      width: 560px !important;    }    .snippet,    .webversion {      width: 280px !important;    }    .header,    .layout,    .one-col .column {      max-width: 600px !important;      width: 600px !important;    }    .fixed-width.has-border,    .fixed-width.ecxhas-border,    .has-gutter.has-border,    .has-gutter.ecxhas-border {      max-width: 602px !important;      width: 602px !important;    }    .two-col .column {      width: 300px !important;    }    .three-col .column,    .column.narrow {      width: 200px !important;    }    .column.wide {      width: 400px !important;    }    .two-col.has-gutter .column,    .two-col.ecxhas-gutter .column {      width: 290px !important;    }    .three-col.has-gutter .column,    .three-col.ecxhas-gutter .column,    .has-gutter .narrow {      width: 188px !important;    }    .has-gutter .wide {      width: 394px !important;    }    .two-col.has-gutter.has-border .column,    .two-col.ecxhas-gutter.ecxhas-border .column {      width: 292px !important;    }    .three-col.has-gutter.has-border .column,    .three-col.ecxhas-gutter.ecxhas-border .column,    .has-gutter.has-border .narrow,    .has-gutter.ecxhas-border .narrow {      width: 190px !important;    }    .has-gutter.has-border .wide,    .has-gutter.ecxhas-border .wide {      width: 396px !important;    }  }  @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {    .fblike {      background-image: url(https://i3.createsend1.com/static/eb/master/13-the-blueprint-3/images/fblike@2x.png) !important;    }    .tweet {      background-image: url(https://i4.createsend1.com/static/eb/master/13-the-blueprint-3/images/tweet@2x.png) !important;    }    .linkedinshare {      background-image: url(https://i5.createsend1.com/static/eb/master/13-the-blueprint-3/images/lishare@2x.png) !important;    }    .forwardtoafriend {      background-image: url(https://i7.createsend1.com/static/eb/master/13-the-blueprint-3/images/forward@2x.png) !important;    }  }  @media (max-width: 321px) {    .fixed-width.has-border .layout__inner {      border-width: 1px 0 !important;    }    .layout,    .column {      min-width: 320px !important;      width: 320px !important;    }    .border {      display: none;    }  }  .mso div {    border: 0 none white !important;  }  .mso .w560 .divider {    Margin-left: 260px !important;    Margin-right: 260px !important;  }  .mso .w360 .divider {    Margin-left: 160px !important;    Margin-right: 160px !important;  }  .mso .w260 .divider {    Margin-left: 110px !important;    Margin-right: 110px !important;  }  .mso .w160 .divider {    Margin-left: 60px !important;    Margin-right: 60px !important;  }  .mso .w354 .divider {    Margin-left: 157px !important;    Margin-right: 157px !important;  }  .mso .w250 .divider {    Margin-left: 105px !important;    Margin-right: 105px !important;  }  .mso .w148 .divider {    Margin-left: 54px !important;    Margin-right: 54px !important;  }  .mso .font-avenir,  .mso .font-cabin,  .mso .font-open-sans,  .mso .font-ubuntu {    font-family: sans-serif !important;  }  .mso .font-bitter,  .mso .font-merriweather,  .mso .font-pt-serif {    font-family: Georgia, serif !important;  }  .mso .font-lato,  .mso .font-roboto {    font-family: Tahoma, sans-serif !important;  }  .mso .font-pt-sans {    font-family: "Trebuchet MS", sans-serif !important;  }  .mso .footer__share-button p {    margin: 0;  }  .mso .size-8,  .ie .size-8 {    font-size: 8px !important;    line-height: 14px !important;  }  .mso .size-9,  .ie .size-9 {    font-size: 9px !important;    line-height: 16px !important;  }  .mso .size-10,  .ie .size-10 {    font-size: 10px !important;    line-height: 18px !important;  }  .mso .size-11,  .ie .size-11 {    font-size: 11px !important;    line-height: 19px !important;  }  .mso .size-12,  .ie .size-12 {    font-size: 12px !important;    line-height: 19px !important;  }  .mso .size-13,  .ie .size-13 {    font-size: 13px !important;    line-height: 21px !important;  }  .mso .size-14,  .ie .size-14 {    font-size: 14px !important;    line-height: 21px !important;  }  .mso .size-15,  .ie .size-15 {    font-size: 15px !important;    line-height: 23px !important;  }  .mso .size-16,  .ie .size-16 {    font-size: 16px !important;    line-height: 24px !important;  }  .mso .size-17,  .ie .size-17 {    font-size: 17px !important;    line-height: 26px !important;  }  .mso .size-18,  .ie .size-18 {    font-size: 18px !important;    line-height: 26px !important;  }  .mso .size-20,  .ie .size-20 {    font-size: 20px !important;    line-height: 28px !important;  }  .mso .size-22,  .ie .size-22 {    font-size: 22px !important;    line-height: 31px !important;  }  .mso .size-24,  .ie .size-24 {    font-size: 24px !important;    line-height: 32px !important;  }  .mso .size-26,  .ie .size-26 {    font-size: 26px !important;    line-height: 34px !important;  }  .mso .size-28,  .ie .size-28 {    font-size: 28px !important;    line-height: 36px !important;  }  .mso .size-30,  .ie .size-30 {    font-size: 30px !important;    line-height: 38px !important;  }  .mso .size-32,  .ie .size-32 {    font-size: 32px !important;    line-height: 40px !important;  }  .mso .size-34,  .ie .size-34 {    font-size: 34px !important;    line-height: 43px !important;  }  .mso .size-36,  .ie .size-36 {    font-size: 36px !important;    line-height: 43px !important;  }  .mso .size-40,  .ie .size-40 {    font-size: 40px !important;    line-height: 47px !important;  }  .mso .size-44,  .ie .size-44 {    font-size: 44px !important;    line-height: 50px !important;  }  .mso .size-48,  .ie .size-48 {    font-size: 48px !important;    line-height: 54px !important;  }  .mso .size-56,  .ie .size-56 {    font-size: 56px !important;    line-height: 60px !important;  }  .mso .size-64,  .ie .size-64 {    font-size: 64px !important;    line-height: 63px !important;  }  .footer__share-button p {    margin: 0;  }  </style>            <title></title>    <!--[if !mso]><!--><style type="text/css">  @import url(https://fonts.googleapis.com/css?family=Ubuntu:400,700,400italic,700italic);  </style><link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700,400italic,700italic" rel="stylesheet" type="text/css" /><!--<![endif]--><style type="text/css">  body{background-color:#f2f2f2}.mso h1{}.mso h2{}.mso h3{}.mso .column,.mso .column__background td{}.mso .btn a{}.mso .webversion,.mso .snippet,.mso .layout-email-footer td,.mso .footer__share-button p{}.mso .webversion,.mso .snippet,.mso .layout-email-footer td,.mso .footer__share-button p{font-family:sans-serif !important}.mso .logo{}.mso .logo{font-family:Tahoma,sans-serif !important}.logo a:hover,.logo a:focus{color:#859bb1 !important}.mso .layout-has-border{border-top:1px solid #bfbfbf;border-bottom:1px solid #bfbfbf}.mso .layout-has-bottom-border{border-bottom:1px solid #bfbfbf}.mso .border,.ie .border{background-color:#bfbfbf}.mso h1,.ie h1{}.mso h1,.ie h1{font-size:26px !important;line-height:34px !important}.mso h2,.ie h2{}.mso h2,.ie h2{font-size:20px !important;line-height:28px !important}.mso h3,.ie h3{}.mso .layout__inner p,.ie .layout__inner p,.mso .layout__inner ol,.ie   .layout__inner ol,.mso .layout__inner ul,.ie .layout__inner ul{}  </style><meta name="robots" content="noindex,nofollow" />  <meta property="og:title" content="My First Campaign" />  </head>  <!--[if mso]>    <body class="mso">  <![endif]-->  <!--[if !mso]><!-->    <body class="full-padding" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;">  <!--<![endif]-->      <div class="wrapper" style="min-width: 320px;background-color: #f2f2f2;">        <div class="preheader" style="Margin: 0 auto;max-width: 560px;min-width: 280px; width: 280px;width: calc(28000% - 173040px);">          <div style="border-collapse: collapse;display: table;width: 100%;">          <!--[if (mso)|(IE)]><table align="center" class="preheader" cellpadding="0" cellspacing="0"><tr><td style="width: 280px" valign="top"><![endif]-->            <div class="snippet" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 140px; width: 140px;width: calc(14000% - 78120px);padding: 10px 0 5px 0;color: #b8b8b8;font-family: Ubuntu,sans-serif;">                          </div>          <!--[if (mso)|(IE)]></td><td style="width: 280px" valign="top"><![endif]-->            <div class="webversion" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 139px; width: 139px;width: calc(14100% - 78680px);padding: 10px 0 5px 0;text-align: right;color: #b8b8b8;font-family: Ubuntu,sans-serif;">                          </div>          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->          </div>        </div>                <div class="layout one-col fixed-width" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 173000px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;" emb-background-style>          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0"><tr class="layout-fixed-width" emb-background-style><td style="width: 600px" class="w560"><![endif]-->            <div class="column" style="text-align: left;color: #60666d;font-size: 14px;line-height: 21px;font-family: sans-serif;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);">                    <div style="font-size: 12px;font-style: normal;font-weight: normal;" align="center">            <a id="imageLink" href="http://www.smartcitybusiness.com.br/"><img class="gnd-corner-image gnd-corner-image-center gnd-corner-image-top" style="border: 0;display: block;height: auto;width: 100%;max-width: 900px;" alt="" width="600" src="http://www.smartcitybusiness.com.br/2016pt/wp-content/uploads/2014/12/planta.png" id="inviteImage"/></a>          </div>                      <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 20px;">        <div style="line-height:10px;font-size:1px">&nbsp;</div>      </div>                        <div style="Margin-left: 20px;Margin-right: 20px;">        <h2 style="Margin-top: 0;Margin-bottom: 0;font-style: normal;font-weight: normal;color: #43464a;font-size: 17px;line-height: 26px;" id="inviteTitle">Ol&#225;, Cliente,</h2>                <p class="size-14" id="content" style="Margin-top: 16px;Margin-bottom: 20px;font-size: 14px;line-height: 21px;" lang="x-size-14">Escreva o conteúdo da mensagem aqui.......</p>      </div>                <div style="Margin-left: 20px;Margin-right: 20px;">        <div class="btn btn--flat btn--large"  style="Margin-bottom: 20px;text-align: center;">          <a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #fff;background-color: #00afd1;font-family: sans-serif;" href="{{{buttonURL}}}" id="buttonConfirm">       Confirmar Cadastro          </a>        </div>      </div>                        <div style="Margin-left: 20px;Margin-right: 20px;">        <div style="line-height:10px;font-size:1px">&nbsp;</div>      </div>                        <div style="Margin-left: 20px;Margin-right: 20px;Margin-bottom: 24px;">        <p class="size-14" style="Margin-top: 0;Margin-bottom: 0;font-size: 14px;line-height: 21px;" lang="x-size-14" id="saudacao">Obrigado pela participa&#231;&#227;o,       </p>        <strong id="assinatura">Equipe SmartCity Buisiness America</strong>      <div style="text-align:center;margin-top:5px;"><a href="{{{url_unsubscribe}}}" style="text-decoration: underline;color:#878793;font-size:10px;">Unsubscribe</a></div>      </div>                      </div>          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->          </div>        </div>        <div style="line-height:40px;font-size:40px;">&nbsp;</div>        <div class="layout email-footer" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 173000px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;">          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0"><tr class="layout-email-footer"><td style="width: 400px;" valign="top" class="w360"><![endif]-->            <div class="column wide" style="text-align: left;font-size: 12px;line-height: 19px;color: #b8b8b8;font-family: Ubuntu,sans-serif;Float: left;max-width: 400px;min-width: 320px; width: 320px;width: calc(8000% - 47600px);">              <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 10px;Margin-bottom: 1px;">                <table class="email-footer__links emb-web-links" style="border-collapse: collapse;table-layout: fixed;"><tbody><tr>                  <img src="http://smartcitybusiness.com.br/home/wp-content/uploads/2016/10/logo_smart.png" height="60" width="100">                    <div>SmartCity Business America 2016</div>                                </tr></tbody></table>                </div>              </div>            </div>          </div>        </div>        <div class="layout one-col email-footer" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 173000px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;">          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0"><tr class="layout-email-footer"><td style="width: 600px;" class="w560"><![endif]-->            <div class="column" style="text-align: left;font-size: 12px;line-height: 19px;color: #b8b8b8;font-family: Ubuntu,sans-serif;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);">              <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 1px;Margin-bottom: 1px;">                <div>              </div>            </div>          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->          </div>        </div>    </div>  </body></html>';



                    $scope.content_editor = doc.getElementById("content").innerHTML.trim();
                    $scope.title_editor = doc.getElementById("inviteTitle").innerHTML.trim();
                    $scope.button_editor = doc.getElementById("buttonConfirm").innerHTML.trim();
                    $scope.greeting_editor = doc.getElementById("saudacao").innerHTML.trim();
                    $scope.from_editor = doc.getElementById("assinatura").innerHTML.trim();
                    $scope.imageLink = "http://www.smartcitybusiness.com.br/";

        };

        $scope.addChecklist = function(c){
            c.value = !(c.value);
        };


        $scope.newsletter = {emails: [], groups: []};

        $scope.send = function () {

            var groups = $filter('filter')($scope.checklist, {value: true});

            console.log($scope.newsletter);

            $scope.newsletter.emails = [];
            $scope.newsletter.groups = [];
            for(i in groups){
                $scope.newsletter.groups.push(groups[i]._id);
                for(j in groups[i].subscribers){
                    $scope.newsletter.emails.push(groups[i].subscribers[j].email);
                }
            }

            for(i in $scope.asyncContacts){

                $scope.newsletter.emails.push($scope.asyncContacts[i].email);

            }

            $scope.newsletter.content = doc.getElementsByTagName("html")[0].innerHTML;



            if(!$scope.newsletter.subject || $scope.newsletter.subject.trim().length == 0){
                Notification.error({message:$filter('translate')('SUBJECT_ERROR'), delay:4000});
                return false;
            }

            if(!$scope.newsletter.event){
                Notification.error({message:$filter('translate')('EVENTS_ERROR'), delay:4000});
                return false;
            }

            if(!$scope.newsletter.emails || $scope.newsletter.emails.length == 0){
                Notification.error({message:$filter('translate')('EMAILS_ERROR'), delay:4000});
                return false;
            }

            if(!$scope.newsletter.content || $scope.newsletter.content.trim().length == 0){
                Notification.error({message:$filter('translate')('CONTENT_ERROR'), delay:4000});
                return false;
            }

            if($scope.buttonLink && $scope.buttonLink.value != "") {
                $scope.newsletter.buttonLink = $scope.buttonLink.value;
            }

            console.dir($scope.newsletter);
            console.log($scope.asyncContacts);
            $http
                .post("api/invite/", $scope.newsletter)
                .then(function (response) {
                    Notification.success({message: $filter('translate')('INVITE_ADDED'), delay: 4000});
                }, function (response) {
                    Notification.error({message: $filter('translate')('ERROR_ADD_INVITE'), delay: 4000});
                });
        };

        var pendingSearch, cancelSearch = angular.noop;
        var cachedQuery, lastSearch;


        $scope.querySearch = querySearch;
        $scope.delayedQuerySearch = delayedQuerySearch;
        $scope.transformChip = transformChip;
        $scope.selectedItem = null;
        $scope.searchText = null;

        /**
         * Search for contacts; use a random delay to simulate a remote call
         */
        function querySearch (criteria) {
            console.log(criteria);
            return criteria ? $scope.allContacts.filter(createFilterFor(criteria)) : [];
        }

        /**
         * Async search for contacts
         * Also debounce the queries; since the md-contact-chips does not support this
         */
        function delayedQuerySearch(criteria) {
            cachedQuery = criteria;
            if ( !pendingSearch || !debounceSearch() )  {
                cancelSearch();

                return pendingSearch = $q(function(resolve, reject) {
                    // Simulate async search... (after debouncing)
                    cancelSearch = reject;
                    $timeout(function() {

                        resolve( $scope.querySearch(criteria) );

                        refreshDebounce();
                    }, Math.random() * 500, true)
                });
            }

            return pendingSearch;
        }

        function refreshDebounce() {
            lastSearch = 0;
            pendingSearch = null;
            cancelSearch = angular.noop;
        }

        /**
         * Debounce if querying faster than 300ms
         */
        function debounceSearch() {
            var now = new Date().getMilliseconds();
            lastSearch = lastSearch || now;

            return ((now - lastSearch) < 300);
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(contact) {
                return (contact._lowername.indexOf(lowercaseQuery) != -1) || (contact.email.indexOf(lowercaseQuery) != -1);
            };

        }

        function transformChip(chip) {
            var pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

            if(angular.isObject(chip)){
                return chip;
            }if(!chip.match(pattern)){
                return null;
            }
            var contact = $filter('filter')($scope.allContacts, {email: chip});

            if(contact.length > 0){
                console.log(contact);
                return contact[0];
            }

            console.log({name: chip.split("@")[0], email: chip});
            return {name: chip.split("@")[0], email: chip};
        }

        function loadContacts() {

            $http
                .get("api/person")
                .then(function (response) {
                    if(response.data.success){
                        var contacts = response.data.people;
                        $scope.allContacts = [];
                        //$scope.contacts = [$scope.allContacts[0]];
                        $scope.asyncContacts = [];
                        $scope.filterSelected = true;

                        $scope.allContacts = contacts.map(function (c, index) {

                            var contact = {
                                name: c.name
                            };

                            if(c.email){
                              contact.email = c.email.toLowerCase();
                            }
                            contact._lowername = contact.name.toLowerCase();
                            return contact;
                        });

                        console.log($scope.allContacts);
                    }
                },function (response) {});
        }


    }]);
