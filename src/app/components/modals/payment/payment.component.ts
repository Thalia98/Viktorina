import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ICreateOrderRequest } from 'ngx-paypal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  showPaypal: boolean = false;
  payPalConfig: any;
  user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  pay(price, coins) {
    this.payPalConfig = {
      currency: "EUR",
      clientId: "AfSlFqE3RIcBjC8V1iJurGREtohwEPX-gCXq-OJHaR0GIF_JrG_x0HkLEu-IPEOMdzwr3mJ0g4co1HY0",
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: price,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: price
              }
            }
          },
          items: [{
            name: 'Comprar monedas',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: price,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onClientAuthorization: (data) => {
        this.updateUserCoins(this.user.coins + coins);
        this.showPaypal = false;
      }
    };

    this.showPaypal = true;
  }

  updateUserCoins(coins) {
    this.userService.updateCoins(this.user.id, coins).then(() => {
      this.user.coins = coins;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
