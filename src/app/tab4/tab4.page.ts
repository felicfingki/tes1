import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlImageStorage : string[] = [];
  namaFoto : string[] = [];
  constructor(private afStorage : AngularFireStorage,
    public FotoService : FotoService) { }

  ngOnInit() {
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
