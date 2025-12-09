export const CHAR_SETS = {
  LATIN: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  NUMBERS: "0123456789",
  SYMBOLS: "!@#$%^&*()_+-=[]{}|;:,.<>?/~`",
  KATAKANA: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",
  HIRAGANA: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん",
  HANZI: "天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜", // Thousand Character Classic snippet
  HANGUL: "가나다라마바사아자차카타파하",
  CYRILLIC: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
};

export const ALL_CHARS = 
  CHAR_SETS.LATIN + 
  CHAR_SETS.NUMBERS + 
  CHAR_SETS.SYMBOLS + 
  CHAR_SETS.KATAKANA + 
  CHAR_SETS.HIRAGANA + 
  CHAR_SETS.HANZI + 
  CHAR_SETS.HANGUL + 
  CHAR_SETS.CYRILLIC;

export const getRandomChar = () => {
  return ALL_CHARS.charAt(Math.floor(Math.random() * ALL_CHARS.length));
};

export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += getRandomChar();
  }
  return result;
};

// Scramble logic
export class Scrambler {
  queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
  frame = 0;
  totalFrames = 0;
  callback: (text: string) => void;
  chars = ALL_CHARS;

  constructor(callback: (text: string) => void) {
    this.callback = callback;
  }

  setText(newText: string, durationFrames = 60) {
    const oldText = this.queue.map(item => item.to).join("").substring(0, this.queue.length); // approximate or just reset
    // Actually, for a simple implementation, let's just use the length diff
    
    const length = Math.max(oldText.length, newText.length);
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    this.frame = 0;
    this.update();
  }

  update() {
    let output = "";
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = getRandomChar();
          this.queue[i].char = char;
        }
        output += char; //Flashing char
      } else {
        output += from;
      }
    }
    
    this.callback(output);
    this.frame++;
    
    if (complete < this.queue.length) {
      requestAnimationFrame(() => this.update());
    }
  }
}
