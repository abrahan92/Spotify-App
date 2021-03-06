import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas: any[] = [];

  urlSpotify:string = 'https://api.spotify.com/v1/';

  token:string = "BQAbbWFzN8U9hDXsepWZ_iYlF7hW6KjT6cgJI88rMZledfDxOF8jfFkUYK3IPzk-MQJdAofgC5Kb8i6z7hk";

  constructor(public http: HttpClient) {
    console.log("Servicio de spotify listo");
  }

  private getHeaders(): HttpHeaders{
    let headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.token
    });
    return headers;
  }

  getTop( id:string ){
    let url = `${ this.urlSpotify }artists/${ id }/top-tracks?country=US`;

    return this.http.get(url, { headers: this.getHeaders() });

  }

  getArtista(id: string){

    let url = `${ this.urlSpotify }artists/${ id }`;



    return this.http.get(url, { headers: this.getHeaders() });
               // .map( (resp: any) => {
               //    this.artistas = resp.artists.items;
               //    return this.artistas ;
               // });

  }

  getArtistas(termino: string){

      let url = `${ this.urlSpotify }search?query=${termino}&type=artist&limit=20`;

      return this.http.get(url, { headers: this.getHeaders() })
                 .map( (resp: any) => {
                    this.artistas = resp.artists.items;
                    return this.artistas ;
                 });

  }

}
