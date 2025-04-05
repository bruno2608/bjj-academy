/**
 * Modelo de usuário que define a estrutura de dados e métodos relacionados ao usuário
 * Em uma aplicação mais complexa, poderia incluir validações e transformações
 */

export class User {
    constructor(data = {}) {
      this.id = data.id || null;
      this.nome = data.nome || '';
      this.email = data.email || '';
      this.auth_id = data.auth_id || null;
      this.academia_id = data.academia_id || null;
      this.faixa = data.faixa || 'Branca';
      this.grau = data.grau || 0;
      this.dataIngresso = data.dataIngresso || data.data_inicio || '';
      this.proximaAula = data.proximaAula || '';
      this.telefone = data.telefone || '';
      this.peso = data.aluno?.peso || '';
      this.altura = data.aluno?.altura || '';
      this.papeis = data.papeis || [];
    }
  
    // Método para calcular tempo de treino baseado na data de ingresso
    calcularTempoTreino() {
      if (!this.dataIngresso) return 'Não disponível';
      
      // Se o formato é DD/MM/YYYY
      let dataIngresso;
      if (this.dataIngresso.includes('/')) {
        const [dia, mes, ano] = this.dataIngresso.split('/');
        dataIngresso = new Date(`${ano}-${mes}-${dia}`);
      } else {
        // Se for outro formato (como ISO)
        dataIngresso = new Date(this.dataIngresso);
      }
      
      const hoje = new Date();
      
      const diferencaMeses = (hoje.getFullYear() - dataIngresso.getFullYear()) * 12 + 
                            (hoje.getMonth() - dataIngresso.getMonth());
      
      const anos = Math.floor(diferencaMeses / 12);
      const meses = diferencaMeses % 12;
      
      if (anos > 0 && meses > 0) {
        return `${anos} ${anos === 1 ? 'ano' : 'anos'} e ${meses} ${meses === 1 ? 'mês' : 'meses'}`;
      } else if (anos > 0) {
        return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
      } else {
        return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
      }
    }
  
    // Obter a cor da faixa
    getCorFaixa() {
      const coresFaixas = {
        'Branca': '#FFFFFF',
        'Azul': '#1E88E5',
        'Roxa': '#8E24AA',
        'Marrom': '#795548',
        'Preta': '#212121'
      };
      
      return coresFaixas[this.faixa] || '#FFFFFF';
    }
    
    // Verificar se tem um determinado papel
    hasPapel(nomePapel) {
      return Array.isArray(this.papeis) && 
             this.papeis.some(papel => papel.nome === nomePapel);
    }
    
    // Obter o nível de acesso máximo
    getNivelAcesso() {
      if (!Array.isArray(this.papeis) || this.papeis.length === 0) {
        return 0;
      }
      
      return Math.max(...this.papeis.map(papel => papel.nivel_acesso || 0));
    }
  }
  
  // Factory para criar um objeto de usuário a partir de dados
  export const createUser = (userData) => {
    return new User(userData);
  };
  
  export default {
    User,
    createUser
  };