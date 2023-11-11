import { isChangePageBtnDisabled } from '../components/Pagination/utils';

describe('Test isChangePageBtnDisabled function', () => {
  test('Should disable "previous" button on the first page', () => {
    const result = isChangePageBtnDisabled({
      isPrevious: true,
      currentPage: 1,
    });
    expect(result).toBe(true);
  });

  test('should disable "next" button on the last page', () => {
    const totalPages = 10;
    const result = isChangePageBtnDisabled({
      isPrevious: false,
      currentPage: totalPages,
    });
    expect(result).toBe(true);
  });

  test('should not disable "previous" button on pages after the first', () => {
    const result = isChangePageBtnDisabled({
      isPrevious: true,
      currentPage: 2,
    });
    expect(result).toBe(false);
  });
});
