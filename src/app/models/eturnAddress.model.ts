class EturnAddress {
  constructor(
      public id: string,
      public cep: string,
      public logradouro: string,
      public bairro: string,
      public estado: string,
      public cidade: string,
      public numeroLocal: string,
      public fkId: string,
  ){}
}

export { EturnAddress };
