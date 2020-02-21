declare module 'regexgen' {
  interface Regexgen {
    (inputs: string[], flags?: string): RegExp;
    Trie: typeof Trie;
  }

  class State {
    accepting: boolean;
    transitions: Map<any, any>;
    visit(visited?: Set<any>): void;
  }

  class Trie {
    add(string: string): void;
    addAll(strings: string[]): void;
    minimize(): State;
    toString(flags?: string): string;
    toRegExp(flags?: string): RegExp;
  }

  const regexgen: Regexgen;
  export default regexgen;
}
/*
declare module 'regexgen' {
  namespace regexgen {
    class State {}
    class Trie {
      add(string: string): void;
      addAll(strings: string[]): void;
      minimize(): State;
      toString(flags: string): string;
      toRegExp(flags: string): RegExp;
    }
  }

  function regexgen(inputs: string[], flags: string): RegExp;
  export default regexgen;
}
 */
