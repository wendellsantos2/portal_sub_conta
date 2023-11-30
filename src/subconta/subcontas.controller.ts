 
import { BadRequestException, Body, Controller ,Get,HttpException,HttpStatus,Param,Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { CreateSubAccountDTO } from './model/CreateSubAccountDTO';
import { SubContasService } from './subcontas.service';
import { SubConta } from 'src/entities/subconta.entity';

 
 

@ApiTags('subcontas')
@Controller('subconta')
export class SubContasController {
  constructor(private subContaService: SubContasService) {} // Injeção do PaymentService

  
  @Post('create-account')
  @ApiOperation({ summary: 'Criar uma subconta' })
  @ApiResponse({ status: 201, description: 'Conta criada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' }) 
  @ApiBody({
    description: 'Dados para a edição do link de pagamento',
    type: CreateSubAccountDTO,
    examples: {
        example1: {
            summary: 'Criar sub-conta', // Adiciona um resumo para o exemplo
            value: {
              "name": "wemdell costa",
              "email": "wemdellcos@exemplo.com",
              "loginEmail": "wemdellcos@exemplo.com",
              "phone": "92993188317",
              "mobilePhone": "92993188317",
              "address": "Rua Exemplo",
              "addressNumber": "123",
              "complement": "Apartamento 1",
              "province": "Província Exemplo",
              "postalCode": "69041-991",
              "cpfCnpj": "841.266.510-47",
              "birthDate": "1990-01-01",
              "personType": "Física",
              "companyType": "Privada",
              "city": 12345,
              "state": "am",
              "country": "br",
            },
        },
        // Você pode adicionar mais exemplos aqui
    },
})
  async createAccount(@Body() createSubAccountDTO: CreateSubAccountDTO) {
      try {
          const result = await this.subContaService.createSubAccount(createSubAccountDTO);
           
          return result;
     
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }
 
  @Get('list-account')
  @ApiOperation({ summary: 'Lista de Subconta' })
  @ApiResponse({ status: 201, description: 'Conta criada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })  
  async listSubAccount(){
      try {
          return await this.subContaService.listSubAccount();
         
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }
 
  
  @Get()
  async getAllSubAccounts() {
    const subAccounts = await this.subContaService.getAllSubAccounts();
    return subAccounts;
  }

}
