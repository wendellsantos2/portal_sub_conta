import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'; 
import { CreateSubAccountDTO } from './model/CreateSubAccountDTO';
import { SubConta } from 'src/entities/subconta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubContasService {
    
    private httpClient: AxiosInstance;
 

  
    constructor(
        @InjectRepository(SubConta)
        private readonly subAccountRepository: Repository<SubConta>
    ) {
        
        this.httpClient = axios.create({
            baseURL: 'https://sandbox.asaas.com/api/v3', // Base URL da API
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNTk1NjY6OiRhYWNoX2Y3MTM4YWZmLWNiZjUtNDI4OC1iZGQ2LTgyMjYwZWM5YTJjYg==', // Coloque seu token de acesso aqui
            },
        });
    }
     

    async createSubAccount(createSubAccountDTO: CreateSubAccountDTO) {
        try {
          const response = await this.httpClient.post('accounts', createSubAccountDTO);
          // Cria uma nova instância da sua entidade (por exemplo, SubConta) com os dados da resposta
          const subAccountEntity = new SubConta();
          subAccountEntity.name = response.data.name;
          subAccountEntity.email = response.data.email;
          subAccountEntity.cpfCnpj = response.data.cpfCnpj;
          subAccountEntity.apiKey = response.data.apiKey;
          subAccountEntity.walletId = response.data.walletId;
          subAccountEntity.agency = response.data.agency;
          subAccountEntity.account = response.data.account;
          subAccountEntity.accountDigit = response.data.accountDigit;
    
          // Salva a nova entidade no banco de dados usando o repositório
          const savedSubAccount = await this.subAccountRepository.save(subAccountEntity);
    
          return savedSubAccount;
    
        } catch (error) {
          if (error.response) {
            throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
          } else {
            throw new BadRequestException('Failed to create the sub-account.');
          }
        }
      }


      async getAllSubAccounts(): Promise<SubConta[]> {
        return this.subAccountRepository.find();
      }
      

async listSubAccount(): Promise<CreateSubAccountDTO> {
    try {
        // Aqui você passa o objeto DTO diretamente como payload para a chamada da API
        const response = await this.httpClient.get('accounts');
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
        } else {
            throw new BadRequestException('Failed to create the sub-account.');
        }
    }
}
   
}
