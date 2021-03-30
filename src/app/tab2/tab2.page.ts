import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  urlImageStorage : string[] = [];
  constructor(private afStorage : AngularFireStorage,public fotoService : FotoService) {}

  TambahFoto()
  {
    this.fotoService.AddPic();
  }

  async ngOnInit()
  {
    await this.fotoService.loadFoto();
  }

  UploadFoto()
  {
    for(var index in this.fotoService.dataFoto)
    {
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath,this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) =>{
            this.urlImageStorage.unshift(url);
        });
      });
    }
  }
}
