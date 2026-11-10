# Atlas de Fugas

Quiz editorial original sobre estilos de viagem, criado para o desafio DIO **Criando um Clone do BuzzFeed com Angular**. Seis escolhas levam a quatro perfis: Alma de trilha, Maré livre, Olhar urbano e Modo refúgio. É uma brincadeira de preferências, sem avaliação psicológica ou recomendação personalizada de viagem.

## Executar

Node 24.16 / npm 11.13 utilizados; Angular 22.2 / CLI 22.2.6 no lockfile.

```sh
npm ci
npm start
npm run build
npm test -- --watch=false
```

## Experiência

Identidade de caderno de viagem, verde/floresta, terracota e papel claro. Ilustração procedural CSS original, tipografia de sistema, layout adaptável e nenhuma dependência de imagens/fontes remotas.

O fluxo tem introdução, seis perguntas e resultado com distribuição dos estilos. É possível selecionar novamente, voltar, revisar e reiniciar. Próxima etapa fica desabilitada até haver seleção. Cliques repetidos em uma opção substituem a resposta da pergunta, sem acrescentar votos. O resultado usa frequência dos estilos; empate favorece o primeiro estilo escolhido entre os líderes. Regras explicadas na própria interface.

Rótulos semânticos, progresso acessível, estados aria-pressed, foco no título após transição, skip link e respeito a movimento reduzido. Escolhas só existem na memória da página; nenhum cadastro ou envio de dados.

## Organização

- src/app/quiz-data.ts: contratos tipados, perguntas e perfis originais, cálculo puro do resultado.
- src/app/app.ts: navegação e estado com signals/computed.
- src/app/app.html: apresentação condicional de cada estágio.
- src/styles.css: identidade visual, ilustrações e regras responsivas.

## Referência e validação

Enunciado DIO consultado em 10/11/2026 permite replicar ou melhorar a proposta e apresentar repositório próprio. Material: https://github.com/felipeAguiarCode/angular-buzzfeed-quizz-clone, commit 30a91d503948eaf408d0fa3354a84a545a697d0f. Componente/fluxo, dados, estilos, Home e módulos oficiais foram examinados. A implementação tem conteúdo próprio e não reutiliza código ou imagens do material.

Melhorias: tipos explícitos, função pura de resultado linear, empate determinístico explicado, validação de escolhas, navegação reversível e reinício. Modelo original usa NgModule/Angular 14; esta implementação usa standalone.

Build de produção sem avisos: 147,97 kB iniciais, 44,42 kB de transferência estimada. Seis testes aprovados, incluindo os 4096 percursos possíveis e interação do fluxo renderizado em DOM simulado. Conferência visual em navegador real permanece pendente pela restrição de acesso local já registrada; não se afirma auditoria visual completa ou acessibilidade certificada.

Sete transcrições oficiais integrais consultadas e registradas em documentacao/25-projeto-atlas-de-fugas.md na pasta da formação. Publicação autorizada pelo usuário em 10/11/2026. Entrega DIO ainda pendente. Sem vínculo com BuzzFeed.


