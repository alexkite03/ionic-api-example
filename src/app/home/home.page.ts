import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CambiosService } from '../api/cambios.service';
import { Cambio } from './../interfaces/cambio'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
cambios: any;
cambio: any;

  constructor(public cambiosService: CambiosService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.getCambios();
    //this.getCambio('9');
    //this.deleteCambio('4');
  }

//ALERT DE NUEVO CAMBIO//
async openAlert() {
  const alert = await this.alertCtrl.create({
    header: 'Nuevo cambio',
    inputs: [
      {
        name: 'sierra1',
        type: 'text',
        placeholder: 'Número de sierra 1'
      },
      {
        name: 'dia1',
        type: 'text',
        placeholder: 'Día que hace'
      },
      {
        name: 'sierra2',
        type: 'text',
        placeholder: 'Número de sierra 2'
      },
      {
        name: 'dia2',
        type: 'text',
        placeholder: 'Día que hace'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelado');
        }
      }, {
        text: 'Crear',
        handler: (data) => {
          this.crearCambio(data.sierra1, data.sierra2, data.dia1, data.dia2);
        }
      }
    ]
  });
  await alert.present();
}

//ALERT DE EDITAR EL CAMBIO//

async editAlert(id: string) {
  this.cambiosService.getCambio(id)
    .subscribe(async cambio => { 
      this.cambio = cambio;
      const alert = await this.alertCtrl.create({
        header: 'Editar cambio',       
        inputs: [
          {
            name: 'sierra1',
            type: 'text',
            placeholder: 'Número de sierra 1',
            value: this.cambio["cambio"].sierra1
          },
          {
            name: 'dia1',
            type: 'text',
            placeholder: 'Día que hace',
            value: this.cambio["cambio"].dia1
          },
          {
            name: 'sierra2',
            type: 'text',
            placeholder: 'Número de sierra 2',
            value: this.cambio["cambio"].sierra2
          },
          {
            name: 'dia2',
            type: 'text',
            placeholder: 'Día que hace',
            value: this.cambio["cambio"].dia2
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Cancelado');
            }
          }, {
            text: 'editar',
            handler: (data) => {
              this.updateCambio(cambio["cambio"].id, data.sierra1, data.sierra2, data.dia1, data.dia2);
            }
          }
        ]
      });
      await alert.present();
    });

}

async presentToast(message: string){
  const toast = await this.toastCtrl.create({
    message,
    duration:2000
  });
  await toast.present();
}


//API//
getCambios() {
  this.cambiosService.getCambios()
  .subscribe(cambios => {
    this.cambios = cambios["cambios"];
  });
}

getCambio(id: string){
  this.cambiosService.getCambio(id)
  .subscribe(async cambio => {
    this.cambio = cambio;
  });
}

crearCambio(sierra1: string, sierra2: string, dia1: string, dia2: string){
  const cambio = {
    sierra1,
    sierra2,
    dia1,
    dia2
  };
  this.cambiosService.addCambio(cambio)
  .subscribe((nuevoCambio)=>{
    this.cambios.push(nuevoCambio);
  });
}

updateCambio(id: string, sierra1: string, sierra2: string, dia1: string, dia2: string){
  this.cambio = {
    id,
    sierra1,
    sierra2,
    dia1,
    dia2
  };
  this.cambiosService.updateCambio(this.cambio)
  .subscribe(async (updateCambio)=>{
    this.cambios.splice(id,1), updateCambio;
    this.presentToast('Cambio actualizado');
    this.getCambios();
  });
}

deleteCambio(id: string, index: number){
  this.cambiosService.deleteCambio(id)
  .subscribe(data => {
    this.cambios.splice(index,1);
    console.log(data);
    this.presentToast('Cambio eliminado');
  });
}

}