import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async findAll() {
    return [
      {
        purchaseId: 1,
        date: '2025-10-04T15:30:00Z',
        items: [
          {
            productId: 101,
            name: 'Cadeira Gamer',
            quantity: 1,
            price: 1200.0,
          },
          {
            productId: 102,
            name: 'Mouse Sem Fio',
            quantity: 2,
            price: 150.5,
          },
        ],
        totalAmount: 1501.0,
        paymentMethod: 'Cartão de Crédito',
        status: 'Concluída',
      },
      {
        purchaseId: 2,
        date: '2025-09-28T10:15:00Z',
        items: [
          {
            productId: 103,
            name: 'Teclado Mecânico',
            quantity: 1,
            price: 350.0,
          },
        ],
        totalAmount: 350.0,
        paymentMethod: 'Pix',
        status: 'Concluída',
      },
    ];
  }
}
