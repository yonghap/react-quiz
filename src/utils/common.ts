export function generateMultipleQuiz<T>(
  data: T[]
): { selected: T; shuffled: T[]; choiceName: string } {
  const selected = data[Math.floor(Math.random() * data.length)];
  const sampled = new Set<T>([selected]);

  while (sampled.size < 3) {
    sampled.add(data[Math.floor(Math.random() * data.length)]);
  }

  const shuffled = [...sampled].sort(() => Math.random() - 0.5);

  return { selected, shuffled, choiceName: '' };
}