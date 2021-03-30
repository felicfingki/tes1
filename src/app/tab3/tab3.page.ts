import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { FotoService } from '../services/foto.service';

export interface fileFoto
{
  name : string;
  path : string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlImageStorage : string[] = [];
  namaFoto : string[] = [];
  constructor(private afStorage : AngularFireStorage,
    public FotoService : FotoService,public Routing : Router) { }

  PindahTab4()
  {
    this.Routing.navigate(['/tab4']);
  }

  async ionViewDidEnter()
  {
    await this.FotoService.loadFoto();
    this.tampilkanData();
  }


  tampilkanData()
  {
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res)=>{
      res.items.forEach((itemRef)=>{
        itemRef.getDownloadURL().then((url)=>{
          this.urlImageStorage.unshift(url);
        });
        refImage.getMetadata().then((metada)=> {
          this.namaFoto.unshift(metada.filepath)
        });
      });
    }).catch((error)=>{
      console.log(error);
    });
  }

 
}
