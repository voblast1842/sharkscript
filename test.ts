import { lexer, TokenType } from './lexer.ts';

const code = `
def array = {"Get", "Set", "Len", "Arrayed LOL!"};
def x = 45 + ( foo * bar ) {"Hello", world};
def y = x / 2 - 10;
`;

const tokens = lexer(code);

tokens.forEach(token => {
    console.log(TokenType[token.type], token.value);
});