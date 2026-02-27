# Documentação

## Estrutura do projeto

- `index.html`: página principal com o elemento `<canvas>` e carregamento dos assets.
- `styles.css`: estilos básicos da página e responsividade.
- `gameScripts.js`: lógica do jogo (movimento, colisão, pontuação e renderização).
- `vanilla.png`: imagem utilizada no layout.

## Fluxo principal do jogo

1. Ao carregar a página (`window.onload`), o canvas é inicializado.
2. Um loop com `setInterval` atualiza o estado (`moveEverything`) e redesenha (`drawEverything`) em ~30 FPS.
3. A raquete do jogador segue o cursor do mouse.
4. A raquete da direita usa uma IA simples para seguir a bola.
5. Ao atingir 3 pontos, é exibida tela de vitória e um clique reinicia os placares.

## Melhorias sugeridas

- Corrigir o reset de posição da bola em `ballReset`.
- Exibir instruções dentro do próprio canvas.
- Adicionar modo de 2 jogadores com teclado.
- Implementar seleção de dificuldade para a IA.
