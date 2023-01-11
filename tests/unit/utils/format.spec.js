import { format } from '@/utils/format.js';

describe('format.js', () => {
  it('renders formated date correctly', () => {
    const date = new Date('2022-9-9');

    const result = format(date);

    expect(result).toMatch('2022-09-09');
  });

  it('get correct date and does not format it', () => {
    const date = new Date('2022-10-10');

    const result = format(date);

    expect(result).toMatch('2022-10-10');
  });

  it('get date with only month to format', () => {
    const date = new Date('2022-9-10');

    const result = format(date);

    expect(result).toMatch('2022-09-10');
  });

  it('get date with only day to format', () => {
    const date = new Date('2022-10-9');

    const result = format(date);

    expect(result).toMatch('2022-10-09');
  });
});
