import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  inputCidade: string = '';
  cidadeNome: string | null = null;
  graus: number | null = null;
  clima: string | null = null;
  icone: string | null = null;
  tempMax: number | null = null;
  tempMin: number | null = null;

  constructor() { }

  showScreen(dados: any) {
    this.cidadeNome = dados.name;
    this.graus = Math.floor(dados.main.temp - 273.15);
    this.tempMax = Math.floor(dados.main.temp_max - 273.5);
    this.tempMin = Math.floor(dados.main.temp_min - 273.5);

    this.clima = dados.weather[0].description;
    this.icone = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;

    if(this.graus >= 30){
      alert('Se prepare para o calor');
    } 
    if(this.graus <= 15){
      alert("Pegue seu bombojaco. E sua toca porque faz frio em " + (this.cidadeNome));
    }

    

    console.log(dados);
  }

  async enderecos(cidade: string) {
    const key = '6d42f2bc27378e38bc8e995c1cfb7703';
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br`).then(resposta => resposta.json());

    this.showScreen(dados);
  }

  buscar() {
    const cidade = this.inputCidade

    this.enderecos(cidade);
  }

}