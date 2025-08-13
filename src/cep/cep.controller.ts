import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { CepService, CepResponse } from './cep.service';
import { Observable } from 'rxjs';

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  search(@Param('cep') cep: string): Observable<CepResponse> {
    if (!cep || cep.length < 8) {
      throw new BadRequestException('CEP inválido');
    }
    return this.cepService.searchCep(cep);
  }

    @Get('address/:uf/:cidade/:logradouro')
    searchByAddress(
    @Param('uf') uf: string,
    @Param('cidade') cidade: string,
    @Param('logradouro') logradouro: string
    ) {
        return this.cepService.buscarCepPorLogradouro(uf, cidade, logradouro);
    }
}
