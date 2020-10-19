import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
declare var QRCodeStyling: any;
declare var html2canvas: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // QRコードテキスト
  qrtext: string = ""

  constructor(private socialSharing: SocialSharing) {}

  /* -------------------------------
  QRコードを表示
  ------------------------------- */
  disp() {
    
    // QRコード表示済みの場合はクリア
    if (document.getElementById("canvas").firstChild) {
      document.getElementById("canvas").removeChild(document.getElementById("canvas").firstChild)
    }
    
    // QRコード作成
    const qrCode = new QRCodeStyling({
      width: 250,
      height: 250,
      data: this.qrtext,
      image: "../assets/logo-instagram.svg",
      dotsOptions: {
        color: "#f13f79",
        type: "dots"
      },
      imageOptions: {
        imageSize: 0.3,
      }
    });

    // QRコード表示
    qrCode.append(document.getElementById("canvas"));
  }

  /* -------------------------------
  QRコードをシェア
  ------------------------------- */
  share() {
    // HTML→canvas変換
    html2canvas(document.getElementById("QR")).then(canvas => {
      // 変換したcanvasをシェア
      this.socialSharing.share("","",canvas.toDataURL());
    });
  }

}
