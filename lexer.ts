// def x = 45 + ( foo * bar )
// [ DefTk, IdentifierTk, EqualsTk, NumberTk, BinaryOpTk, LParenTk, IdentifierTk, BinaryOpTk, IdentifierTk, RParenTk, EOFtk ]

export enum TokenType {
    Def,         // def
    Identifier,  // (any)
    Equals,      // =
    Number,      // 123, 45, ...
    BinaryOp,    // + - * /
    String,      // "hello", 'world'
    EOF,         // end of file

    // Punctuation includes: ( ) , ; { } [ ]
    LParen,    // (
    RParen,    // )
    LBracket,  // [
    RBracket,  // ]
    LBrace,    // {
    RBrace,    // }
    Comma,     // ,
    Semicolon, // ;
}

export interface Token {
    value: string;
    type: TokenType;
}

export function lexer(sourceCode: string): Token[] {
    const tokens: Token[] = new Array<Token>();
    let i = 0;

    while (i < sourceCode.length) {
        const char = sourceCode[i];

        if (/\s/.test(char)) {
            i++;
            continue;
        }

        if (/[a-zA-Z_]/.test(char)) {
            const start = i;
            while (i < sourceCode.length && /[a-zA-Z0-9_]/.test(sourceCode[i])) {
                i++;
            }
            const value = sourceCode.slice(start, i);
            if (value === "def") {
                tokens.push({ value, type: TokenType.Def });
            } else {
                tokens.push({ value, type: TokenType.Identifier });
            }
            continue;
        }

        if (/\d/.test(char)) {
            const start = i;
            while (i < sourceCode.length && /\d/.test(sourceCode[i])) {
                i++;
            }
            const value = sourceCode.slice(start, i);
            tokens.push({ value, type: TokenType.Number });
            continue;
        }

        if (char === '=') {
            tokens.push({ value: char, type: TokenType.Equals });
            i++;
            continue;
        }

        if (char === '+' || char === '-' || char === '*' || char === '/') {
            tokens.push({ value: char, type: TokenType.BinaryOp });
            i++;
            continue;
        }

        if (char === '"' || char === "'") {
            const quoteType = char;
            const start = i + 1;
            let end = start;
            i++;
            while (end < sourceCode.length && sourceCode[end] !== quoteType) {
                end++;
            }
            const value = sourceCode.slice(start, end);
            i = end + 1;
            tokens.push({ value, type: TokenType.String });
            continue;
        }

        switch (char) {
            case '(':
                tokens.push({ value: char, type: TokenType.LParen });
                i++;
                break;
            case ')':
                tokens.push({ value: char, type: TokenType.RParen });
                i++;
                break;
            case '[':
                tokens.push({ value: char, type: TokenType.LBracket });
                i++;
                break;
            case ']':
                tokens.push({ value: char, type: TokenType.RBracket });
                i++;
                break;
            case '{':
                tokens.push({ value: char, type: TokenType.LBrace });
                i++;
                break;
            case '}':
                tokens.push({ value: char, type: TokenType.RBrace });
                i++;
                break;
            case ',':
                tokens.push({ value: char, type: TokenType.Comma });
                i++;
                break;
            case ';':
                tokens.push({ value: char, type: TokenType.Semicolon });
                i++;
                break;
            default:
                throw new Error(`Unexpected character: ${char}`);
        }

    }

    tokens.push({ value: "", type: TokenType.EOF });
    return tokens;
 }