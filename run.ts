import { lexer } from "./lexer.ts";

// Recursively get all .shrk files
async function getSharkFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    for await (const entry of Deno.readDir(dir)) {
        const path = `${dir}/${entry.name}`;
        if (entry.isFile && entry.name.endsWith(".shrk")) {
            files.push(path);
        } else if (entry.isDirectory) {
            const nested = await getSharkFiles(path);
            files.push(...nested);
        }
    }
    return files;
}

// Lex each file
async function lexSharkFiles(dir: string) {
    const files = await getSharkFiles(dir);
    for (const file of files) {
        const code = await Deno.readTextFile(file);
        const tokens = lexer(code);
        console.log(`Tokens for ${file}:`);
        for (const t of tokens) {
            console.log(t.type, t.value);
        }
        console.log("\n---\n");
    }
}

// Run in current directory
lexSharkFiles(".");
