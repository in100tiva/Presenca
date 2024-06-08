
# Controle de Presenças em Sala de Aula

Esta é uma aplicação web para professores controlarem a presença dos alunos em suas aulas. A aplicação permite o cadastro de super módulos, gerenciamento de alunos e verificação de presença com armazenamento local utilizando JSON e LocalStorage.

## Funcionalidades

- **Cadastro de Super Módulos:**
  - Nome do Super Módulo
  - Data de Início
  - Dias das Aulas
  - Hora de Início das Aulas

- **Gerenciamento de Super Módulos:**
  - Listar os Super Módulos cadastrados
  - Botão para abrir uma página específica para cada Super Módulo
  - Cadastro de alunos

- **Controle de Presença:**
  - Botão de calendário para selecionar o dia
  - Marcar presença ou falta dos alunos no dia selecionado

- **Relatórios:**
  - Gerar relatórios em HTML formatados para impressão, incluindo uma tabela com o nome de todos os alunos e sua presença ou falta

## Estrutura de Diretórios

```
controle-presencas/
│
├── index.html
├── styles/
│   └── styles.css
├── scripts/
│   └── scripts.js
├── modules/
│   └── module.html
└── assets/
    └── images/
        └── logo.png
```

## Instruções de Uso

### Página Inicial (`index.html`)

1. Abra o arquivo `index.html` no navegador.
2. Preencha o formulário para cadastrar um novo Super Módulo.
3. Clique no botão "Cadastrar Super Módulo".
4. A lista de Super Módulos cadastrados será exibida abaixo do formulário.

### Página de Gerenciamento de Super Módulo (`modules/module.html`)

1. Clique no botão "Gerenciar" ao lado do Super Módulo desejado na página inicial.
2. Na página de gerenciamento, você pode:
   - Cadastrar novos alunos.
   - Selecionar uma data para verificar se há aula.
   - Marcar presença ou falta dos alunos.
   - Excluir alunos da lista.
   - Gerar um relatório em formato HTML com a presença dos alunos na data selecionada.

### Estilo (`styles/styles.css`)

- O arquivo `styles.css` contém os estilos para a aplicação, incluindo temas escuros e cores quentes para uma aparência moderna e atraente.

### Scripts (`scripts/scripts.js` e `scripts/module.js`)

- `scripts.js`: Contém a lógica para cadastrar e listar Super Módulos.
- `module.js`: Contém a lógica para gerenciar alunos, marcar presença, verificar aulas e gerar relatórios.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- LocalStorage para armazenamento de dados

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.
