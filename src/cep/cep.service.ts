import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Injectable()
export class CepService {
  constructor(private http: HttpService) {}

  searchCep(cep: string): Observable<CepResponse> {
    const cleanCep = cep.replace(/\D/g, '');
    return this.http.get<CepResponse>(`https://viacep.com.br/ws/${cleanCep}/json/`).pipe(
      map(res => res.data),
      catchError(err => throwError(() => new Error('Erro ao consultar CEP')))
    );
  }

  buscarCepPorLogradouro(uf: string, cidade: string, logradouro: string): Observable<CepResponse[]> {
    return this.http.get<CepResponse[]>(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`).pipe(
      map(res => res.data),
      catchError(err => throwError(() => new Error('Erro ao consultar CEP por logradouro')))
    );
  }
  
}
